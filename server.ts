import express, { type Request, type Response } from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ViteDevServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const PORT = Number(process.env.PORT) || 3000;

const SUPPORTED_LOCALES = ["en", "es", "fr"];
const DEFAULT_LOCALE = "en";

function detectLocale(headers: Request["headers"]): string {
  const cookieHeader = headers["cookie"];
  if (cookieHeader) {
    const match = cookieHeader.match(/(?:^|;\s*)locale=([a-z]{2})/);
    if (match && SUPPORTED_LOCALES.includes(match[1])) return match[1];
  }
  const acceptLang = headers["accept-language"];
  if (acceptLang) {
    const preferred = acceptLang
      .split(",")
      .map((s) => s.split(";")[0].trim().slice(0, 2).toLowerCase());
    for (const lang of preferred) {
      if (SUPPORTED_LOCALES.includes(lang)) return lang;
    }
  }
  return DEFAULT_LOCALE;
}

interface ServerEntry {
  render: (
    url: string,
    locale: string,
  ) => Promise<{ html: string; head?: string }>;
}

async function createServer(): Promise<void> {
  const app = express();
  let vite: ViteDevServer | undefined;

  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    vite = await createViteServer({
      server: { middlewareMode: true, hmr: { port: 24679 } },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    const compression = (await import("compression")).default;
    const serveStatic = (await import("serve-static")).default;
    app.use(compression());
    app.use(
      serveStatic(path.resolve(__dirname, "dist/client"), { index: false }),
    );
  }

  app.use("*", async (req: Request, res: Response) => {
    const url = req.originalUrl;
    const locale = detectLocale(req.headers);

    try {
      let template: string;
      let render: ServerEntry["render"];

      if (!isProd && vite) {
        template = fs.readFileSync(
          path.resolve(__dirname, "index.html"),
          "utf-8",
        );
        template = await vite.transformIndexHtml(url, template);
        const mod = (await vite.ssrLoadModule(
          "/src/entry-server.tsx",
        )) as ServerEntry;
        render = mod.render;
      } else {
        const templatePath = path.resolve(__dirname, "dist/client/index.html");
        if (!fs.existsSync(templatePath))
          throw new Error(`Missing index.html at ${templatePath}`);

        template = fs.readFileSync(templatePath, "utf-8");
        const entry =
          (await import("./dist/server-entry/entry-server.js")) as ServerEntry;
        render = entry.render;
      }

      const { html: appHtml, head = "" } = await render(url, locale);

      const finalHtml = template
        .replace("<!--ssr-outlet-->", appHtml)
        .replace("</head>", `${head}\n</head>`);

      res.status(200).set({ "Content-Type": "text/html" }).end(finalHtml);
    } catch (err: unknown) {
      vite?.ssrFixStacktrace(err as Error);
      console.error((err as Error).stack);
      res.status(500).end((err as Error).stack);
    }
  });

  app.listen(PORT, () => {
    console.log(`🚀 SSR server running at http://localhost:${PORT}`);
    console.log(`Mode: ${isProd ? "production" : "development (HMR enabled)"}`);
  });
}

createServer();
