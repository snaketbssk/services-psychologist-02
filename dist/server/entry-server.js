import { renderToString } from "react-dom/server";
import { Link, NavLink, Outlet, Route, Routes, StaticRouter } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles/index.js";
import CssBaseline from "@mui/material/CssBaseline/index.js";
import { CacheProvider } from "@emotion/react";
import createEmotionServer from "@emotion/server/create-instance";
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import AppBar from "@mui/material/AppBar/index.js";
import Toolbar from "@mui/material/Toolbar/index.js";
import Typography from "@mui/material/Typography/index.js";
import Box from "@mui/material/Box/index.js";
import Button from "@mui/material/Button/index.js";
import IconButton from "@mui/material/IconButton/index.js";
import Drawer from "@mui/material/Drawer/index.js";
import List from "@mui/material/List/index.js";
import ListItem from "@mui/material/ListItem/index.js";
import ListItemButton from "@mui/material/ListItemButton/index.js";
import ListItemText from "@mui/material/ListItemText/index.js";
import Divider from "@mui/material/Divider/index.js";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ButtonGroup from "@mui/material/ButtonGroup/index.js";
import Card from "@mui/material/Card/index.js";
import CardContent from "@mui/material/CardContent/index.js";
import Chip from "@mui/material/Chip/index.js";
import Grid from "@mui/material/Grid/index.js";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import BoltIcon from "@mui/icons-material/Bolt";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StarIcon from "@mui/icons-material/Star";
import TextField from "@mui/material/TextField/index.js";
import Select from "@mui/material/Select/index.js";
import MenuItem from "@mui/material/MenuItem/index.js";
import FormControl from "@mui/material/FormControl/index.js";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import Avatar from "@mui/material/Avatar/index.js";
import InputAdornment from "@mui/material/InputAdornment/index.js";
import SearchIcon from "@mui/icons-material/Search";
import createCache from "@emotion/cache";
//#region src/context/ServerDataContext.tsx
var ServerDataContext = createContext(null);
function ServerDataProvider({ data, children }) {
	return /* @__PURE__ */ jsx(ServerDataContext.Provider, {
		value: data,
		children
	});
}
function useServerData() {
	return useContext(ServerDataContext);
}
//#endregion
//#region src/i18n/types.ts
var SUPPORTED_LOCALES = [
	"en",
	"es",
	"fr"
];
var LOCALE_LABELS = {
	en: "🇬🇧 English",
	es: "🇪🇸 Español",
	fr: "🇫🇷 Français"
};
//#endregion
//#region src/i18n/context.tsx
var I18nContext = createContext(null);
function I18nProvider({ locale: initialLocale, translations: initialT, allTranslations, children }) {
	const [locale, setLocaleState] = useState(initialLocale);
	const [t, setT] = useState(initialT);
	const setLocale = useCallback((next) => {
		if (!SUPPORTED_LOCALES.includes(next)) return;
		setLocaleState(next);
		setT(allTranslations[next]);
		document.cookie = `locale=${next};path=/;max-age=31536000`;
	}, [allTranslations]);
	return /* @__PURE__ */ jsx(I18nContext.Provider, {
		value: {
			locale,
			t,
			setLocale
		},
		children
	});
}
function useI18n() {
	const ctx = useContext(I18nContext);
	if (!ctx) throw new Error("useI18n must be used inside <I18nProvider>");
	return ctx;
}
/** Replaces {{key}} placeholders in a translation string */
function interpolate(str, vars) {
	return str.replace(/\{\{(\w+)\}\}/g, (_, key) => String(vars[key] ?? ""));
}
//#endregion
//#region src/components/LanguageSwitcher.tsx
function LanguageSwitcher() {
	const { locale, setLocale } = useI18n();
	return /* @__PURE__ */ jsx(ButtonGroup, {
		size: "small",
		variant: "outlined",
		sx: { "& .MuiButton-root": {
			textTransform: "none",
			fontWeight: 700,
			fontSize: "0.7rem",
			minWidth: 36,
			px: 1
		} },
		children: SUPPORTED_LOCALES.map((l) => /* @__PURE__ */ jsx(Button, {
			variant: locale === l ? "contained" : "outlined",
			disableElevation: true,
			onClick: () => setLocale(l),
			title: LOCALE_LABELS[l],
			children: l.toUpperCase()
		}, l))
	});
}
//#endregion
//#region src/components/Layout.tsx
function Layout() {
	const { t } = useI18n();
	const [drawerOpen, setDrawerOpen] = useState(false);
	const navItems = [
		[
			"/",
			t.nav.home,
			true
		],
		[
			"/about",
			t.nav.about,
			false
		],
		[
			"/posts",
			t.nav.posts,
			false
		]
	];
	return /* @__PURE__ */ jsxs(Box, {
		sx: {
			minHeight: "100vh",
			display: "flex",
			flexDirection: "column",
			bgcolor: "background.default"
		},
		children: [
			/* @__PURE__ */ jsx(AppBar, {
				position: "sticky",
				children: /* @__PURE__ */ jsxs(Toolbar, {
					sx: {
						maxWidth: 1200,
						width: "100%",
						mx: "auto",
						px: {
							xs: 2,
							sm: 3
						},
						gap: 1,
						minHeight: {
							xs: 56,
							sm: 64
						}
					},
					children: [
						/* @__PURE__ */ jsx(Typography, {
							variant: "subtitle2",
							fontWeight: 700,
							color: "text.primary",
							sx: {
								flexShrink: 0,
								mr: 1
							},
							children: "⚡ Vite 8 SSR"
						}),
						/* @__PURE__ */ jsx(Box, {
							sx: {
								display: {
									xs: "none",
									sm: "flex"
								},
								gap: .5,
								flex: 1
							},
							children: navItems.map(([to, label, end]) => /* @__PURE__ */ jsx(NavLink, {
								to,
								end,
								style: { textDecoration: "none" },
								children: ({ isActive }) => /* @__PURE__ */ jsx(Button, {
									size: "small",
									variant: isActive ? "contained" : "text",
									disableElevation: true,
									sx: {
										fontSize: "0.875rem",
										color: isActive ? "primary.contrastText" : "text.secondary",
										"&:hover": { bgcolor: isActive ? void 0 : "action.hover" }
									},
									children: label
								})
							}, to))
						}),
						/* @__PURE__ */ jsx(Box, { sx: { flex: {
							xs: 1,
							sm: 0
						} } }),
						/* @__PURE__ */ jsx(Box, {
							sx: { display: {
								xs: "none",
								sm: "flex"
							} },
							children: /* @__PURE__ */ jsx(LanguageSwitcher, {})
						}),
						/* @__PURE__ */ jsx(IconButton, {
							onClick: () => setDrawerOpen(true),
							sx: {
								display: {
									xs: "flex",
									sm: "none"
								},
								color: "text.primary",
								ml: "auto"
							},
							"aria-label": "open menu",
							children: /* @__PURE__ */ jsx(MenuIcon, {})
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs(Drawer, {
				anchor: "right",
				open: drawerOpen,
				onClose: () => setDrawerOpen(false),
				PaperProps: { sx: {
					width: 260,
					bgcolor: "background.paper"
				} },
				children: [
					/* @__PURE__ */ jsxs(Box, {
						sx: {
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							px: 2,
							py: 1.5
						},
						children: [/* @__PURE__ */ jsx(Typography, {
							variant: "subtitle2",
							fontWeight: 700,
							children: "⚡ Vite 8 SSR"
						}), /* @__PURE__ */ jsx(IconButton, {
							onClick: () => setDrawerOpen(false),
							size: "small",
							"aria-label": "close menu",
							children: /* @__PURE__ */ jsx(CloseIcon, { fontSize: "small" })
						})]
					}),
					/* @__PURE__ */ jsx(Divider, {}),
					/* @__PURE__ */ jsx(List, {
						disablePadding: true,
						children: navItems.map(([to, label, end]) => /* @__PURE__ */ jsx(NavLink, {
							to,
							end,
							style: {
								textDecoration: "none",
								color: "inherit"
							},
							onClick: () => setDrawerOpen(false),
							children: ({ isActive }) => /* @__PURE__ */ jsx(ListItem, {
								disablePadding: true,
								children: /* @__PURE__ */ jsx(ListItemButton, {
									selected: isActive,
									sx: {
										py: 1.5,
										px: 2,
										"&.Mui-selected": {
											bgcolor: "primary.main",
											color: "primary.contrastText",
											"&:hover": { bgcolor: "primary.dark" }
										}
									},
									children: /* @__PURE__ */ jsx(ListItemText, {
										primary: label,
										primaryTypographyProps: {
											fontWeight: isActive ? 700 : 400,
											fontSize: "0.95rem"
										}
									})
								})
							})
						}, to))
					}),
					/* @__PURE__ */ jsx(Divider, {}),
					/* @__PURE__ */ jsx(Box, {
						sx: { p: 2 },
						children: /* @__PURE__ */ jsx(LanguageSwitcher, {})
					})
				]
			}),
			/* @__PURE__ */ jsx(Box, {
				component: "main",
				sx: {
					flex: 1,
					width: "100%"
				},
				children: /* @__PURE__ */ jsx(Outlet, {})
			}),
			/* @__PURE__ */ jsx(Box, {
				component: "footer",
				sx: {
					borderTop: "1px solid",
					borderColor: "divider",
					py: 2.5,
					px: 2,
					textAlign: "center"
				},
				children: /* @__PURE__ */ jsxs(Typography, {
					variant: "caption",
					color: "text.secondary",
					children: [
						t.footer,
						" · ",
						/* @__PURE__ */ jsx("a", {
							href: "https://vite.dev",
							target: "_blank",
							rel: "noreferrer",
							children: "vite.dev"
						})
					]
				})
			})
		]
	});
}
//#endregion
//#region src/components/sections/SectionWrapper.tsx
function SectionWrapper({ children, bgcolor = "background.default", py = {
	xs: 6,
	sm: 8,
	md: 12
} }) {
	return /* @__PURE__ */ jsx(Box, {
		component: "section",
		sx: {
			bgcolor,
			py,
			width: "100%",
			boxSizing: "border-box"
		},
		children: /* @__PURE__ */ jsx(Box, {
			sx: {
				maxWidth: 960,
				mx: "auto",
				px: {
					xs: 2,
					sm: 3
				}
			},
			children
		})
	});
}
//#endregion
//#region src/components/sections/SectionHeader.tsx
function SectionHeader({ eyebrow, title, subtitle, align = "center", action }) {
	return /* @__PURE__ */ jsxs(Box, {
		sx: {
			display: "flex",
			flexDirection: align === "center" ? "column" : {
				xs: "column",
				md: "row"
			},
			alignItems: align === "center" ? "center" : "flex-start",
			justifyContent: "space-between",
			textAlign: align,
			gap: {
				xs: 1.5,
				md: 2
			},
			mb: {
				xs: 4,
				md: 6
			}
		},
		children: [/* @__PURE__ */ jsxs(Box, {
			sx: { flex: 1 },
			children: [
				/* @__PURE__ */ jsx(Typography, {
					variant: "overline",
					sx: {
						color: "text.secondary",
						letterSpacing: "0.12em",
						fontSize: "0.68rem",
						fontWeight: 700
					},
					children: eyebrow
				}),
				/* @__PURE__ */ jsx(Typography, {
					variant: "h3",
					fontWeight: 700,
					color: "text.primary",
					sx: {
						mt: .75,
						mb: subtitle ? 1 : 0,
						fontSize: {
							xs: "1.6rem",
							sm: "2rem",
							md: "2.4rem"
						}
					},
					children: title
				}),
				subtitle && /* @__PURE__ */ jsx(Typography, {
					variant: "body2",
					color: "text.secondary",
					sx: {
						maxWidth: align === "center" ? 500 : void 0,
						mx: align === "center" ? "auto" : void 0,
						fontSize: {
							xs: "0.8rem",
							sm: "0.875rem"
						}
					},
					children: subtitle
				})
			]
		}), action && /* @__PURE__ */ jsx(Box, {
			sx: {
				flexShrink: 0,
				mt: {
					xs: .5,
					md: align === "left" ? .5 : 0
				},
				alignSelf: {
					xs: "flex-start",
					md: "center"
				}
			},
			children: action
		})]
	});
}
//#endregion
//#region src/components/sections/ServicesSection.tsx
function ServicesSection() {
	const { t } = useI18n();
	const items = [
		t.services.items.individual,
		t.services.items.family,
		t.services.items.couples,
		t.services.items.group,
		t.services.items.adolescent,
		t.services.items.trauma
	];
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		bgcolor: "background.default",
		children: [/* @__PURE__ */ jsx(SectionHeader, {
			eyebrow: t.services.eyebrow,
			title: t.services.title,
			subtitle: t.services.subtitle,
			align: "left",
			action: /* @__PURE__ */ jsx(Button, {
				variant: "outlined",
				endIcon: /* @__PURE__ */ jsx(ArrowForwardIcon, {}),
				sx: {
					borderRadius: 99,
					borderColor: "text.primary",
					color: "text.primary",
					fontWeight: 600,
					px: {
						xs: 2,
						sm: 3
					},
					fontSize: {
						xs: "0.8rem",
						sm: "0.875rem"
					},
					"&:hover": {
						bgcolor: "text.primary",
						color: "background.paper"
					}
				},
				children: t.services.cta
			})
		}), /* @__PURE__ */ jsx(Grid, {
			container: true,
			spacing: {
				xs: 1.5,
				sm: 2
			},
			children: items.map((item) => /* @__PURE__ */ jsx(Grid, {
				item: true,
				xs: 12,
				sm: 6,
				md: 4,
				children: /* @__PURE__ */ jsx(Card, {
					sx: {
						height: "100%",
						display: "flex",
						flexDirection: "column",
						transition: "border-color 0.2s",
						"&:hover": { borderColor: "primary.main" }
					},
					children: /* @__PURE__ */ jsxs(CardContent, {
						sx: {
							p: {
								xs: 2.5,
								sm: 3.5
							},
							flex: 1,
							display: "flex",
							flexDirection: "column"
						},
						children: [
							/* @__PURE__ */ jsx(Typography, {
								variant: "subtitle1",
								fontWeight: 700,
								color: "text.primary",
								gutterBottom: true,
								sx: { fontSize: {
									xs: "0.95rem",
									sm: "1rem"
								} },
								children: item.title
							}),
							/* @__PURE__ */ jsx(Typography, {
								variant: "body2",
								color: "text.secondary",
								sx: {
									flex: 1,
									lineHeight: 1.7,
									fontSize: {
										xs: "0.8rem",
										sm: "0.875rem"
									}
								},
								children: item.description
							}),
							/* @__PURE__ */ jsxs(Box, {
								sx: {
									display: "flex",
									alignItems: "center",
									gap: .75,
									mt: 2.5,
									fontSize: "0.85rem",
									fontWeight: 600,
									color: "text.primary"
								},
								children: [
									t.services.readMore,
									" ",
									/* @__PURE__ */ jsx(ArrowForwardIcon, { sx: { fontSize: 15 } })
								]
							})
						]
					})
				})
			}, item.title))
		})]
	});
}
//#endregion
//#region src/components/sections/ProcessSection.tsx
function ProcessSection() {
	const { t } = useI18n();
	const steps = [
		{
			number: 1,
			...t.process.steps.step1
		},
		{
			number: 2,
			...t.process.steps.step2
		},
		{
			number: 3,
			...t.process.steps.step3
		},
		{
			number: 4,
			...t.process.steps.step4
		}
	];
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		bgcolor: "background.paper",
		children: [/* @__PURE__ */ jsx(SectionHeader, {
			eyebrow: t.process.eyebrow,
			title: t.process.title,
			subtitle: t.process.subtitle,
			align: "center"
		}), /* @__PURE__ */ jsxs(Box, {
			sx: { position: "relative" },
			children: [/* @__PURE__ */ jsx(Box, { sx: {
				display: {
					xs: "none",
					md: "block"
				},
				position: "absolute",
				top: 21,
				left: "12.5%",
				right: "12.5%",
				height: "1px",
				bgcolor: "divider",
				zIndex: 0
			} }), /* @__PURE__ */ jsx(Box, {
				sx: {
					display: "grid",
					gridTemplateColumns: {
						xs: "1fr",
						sm: "repeat(2, 1fr)",
						md: "repeat(4, 1fr)"
					},
					gap: {
						xs: 3,
						sm: 4,
						md: 3
					},
					position: "relative",
					zIndex: 1
				},
				children: steps.map((step) => /* @__PURE__ */ jsxs(Box, {
					sx: {
						display: "flex",
						flexDirection: {
							xs: "row",
							sm: "column",
							md: "column"
						},
						alignItems: {
							xs: "flex-start",
							sm: "center",
							md: "center"
						},
						gap: {
							xs: 2,
							sm: 2
						}
					},
					children: [
						/* @__PURE__ */ jsxs(Box, {
							sx: {
								display: {
									xs: "flex",
									sm: "none"
								},
								flexDirection: "column",
								alignItems: "center",
								flexShrink: 0
							},
							children: [/* @__PURE__ */ jsx(Box, {
								sx: {
									width: 40,
									height: 40,
									borderRadius: "50%",
									bgcolor: "primary.light",
									border: "2px solid",
									borderColor: "primary.main",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									boxShadow: (theme) => `0 0 0 4px ${theme.palette.background.paper}, 0 0 0 5px ${theme.palette.divider}`
								},
								children: /* @__PURE__ */ jsx(Typography, {
									variant: "body2",
									fontWeight: 800,
									color: "primary.contrastText",
									children: step.number
								})
							}), step.number < steps.length && /* @__PURE__ */ jsx(Box, { sx: {
								width: "2px",
								height: 32,
								bgcolor: "divider",
								mt: 1
							} })]
						}),
						/* @__PURE__ */ jsx(Box, {
							sx: {
								display: {
									xs: "none",
									sm: "flex"
								},
								width: 44,
								height: 44,
								borderRadius: "50%",
								bgcolor: "primary.light",
								border: "2px solid",
								borderColor: "primary.main",
								alignItems: "center",
								justifyContent: "center",
								flexShrink: 0,
								boxShadow: (theme) => `0 0 0 5px ${theme.palette.background.paper}, 0 0 0 6px ${theme.palette.divider}`
							},
							children: /* @__PURE__ */ jsx(Typography, {
								variant: "body2",
								fontWeight: 800,
								color: "primary.contrastText",
								children: step.number
							})
						}),
						/* @__PURE__ */ jsxs(Box, {
							sx: { textAlign: {
								xs: "left",
								sm: "center",
								md: "center"
							} },
							children: [/* @__PURE__ */ jsx(Typography, {
								variant: "subtitle2",
								fontWeight: 700,
								color: "text.primary",
								gutterBottom: true,
								sx: { fontSize: {
									xs: "0.9rem",
									sm: "0.875rem"
								} },
								children: step.title
							}), /* @__PURE__ */ jsx(Typography, {
								variant: "body2",
								color: "text.secondary",
								sx: {
									lineHeight: 1.7,
									fontSize: {
										xs: "0.8rem",
										sm: "0.78rem"
									}
								},
								children: step.description
							})]
						})
					]
				}, step.number))
			})]
		})]
	});
}
//#endregion
//#region src/components/sections/TestimonialsSection.tsx
function TestimonialsSection() {
	const { t } = useI18n();
	const [active, setActive] = useState(0);
	const testimonials = [
		t.testimonials.items.t1,
		t.testimonials.items.t2,
		t.testimonials.items.t3
	];
	const stats = [
		t.testimonials.stats.experience,
		t.testimonials.stats.customers,
		t.testimonials.stats.projects,
		t.testimonials.stats.awards
	];
	const current = testimonials[active];
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		bgcolor: "background.default",
		children: [/* @__PURE__ */ jsx(SectionHeader, {
			eyebrow: t.testimonials.eyebrow,
			title: t.testimonials.title,
			subtitle: t.testimonials.subtitle,
			align: "center"
		}), /* @__PURE__ */ jsx(Card, {
			sx: {
				borderRadius: {
					xs: 2,
					sm: 4
				},
				overflow: "hidden"
			},
			children: /* @__PURE__ */ jsxs(CardContent, {
				sx: { p: 0 },
				children: [/* @__PURE__ */ jsxs(Box, {
					sx: {
						display: "flex",
						flexDirection: {
							xs: "column",
							md: "row"
						}
					},
					children: [/* @__PURE__ */ jsx(Box, {
						sx: {
							width: {
								xs: "100%",
								md: 240
							},
							height: {
								xs: 160,
								sm: 200,
								md: "auto"
							},
							minHeight: { md: 280 },
							flexShrink: 0,
							bgcolor: "secondary.light",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: /* @__PURE__ */ jsx(Box, {
							sx: {
								width: {
									xs: 64,
									sm: 80
								},
								height: {
									xs: 64,
									sm: 80
								},
								borderRadius: "50%",
								bgcolor: "primary.light",
								display: "flex",
								alignItems: "center",
								justifyContent: "center"
							},
							children: /* @__PURE__ */ jsx(Typography, {
								variant: "h4",
								color: "primary.contrastText",
								fontWeight: 700,
								sx: { fontSize: {
									xs: "1.5rem",
									sm: "2.125rem"
								} },
								children: current.author.charAt(0)
							})
						})
					}), /* @__PURE__ */ jsxs(Box, {
						sx: {
							p: {
								xs: 2.5,
								sm: 3.5,
								md: 5
							},
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							flex: 1
						},
						children: [
							/* @__PURE__ */ jsx(Box, {
								sx: {
									display: "flex",
									gap: .25,
									mb: 1.5
								},
								children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx(StarIcon, { sx: {
									fontSize: {
										xs: 15,
										sm: 18
									},
									color: "primary.main"
								} }, i))
							}),
							/* @__PURE__ */ jsxs(Typography, {
								variant: "h6",
								fontWeight: 600,
								color: "text.primary",
								sx: {
									lineHeight: 1.6,
									mb: 2.5,
									fontSize: {
										xs: "0.95rem",
										sm: "1.1rem",
										md: "1.25rem"
									}
								},
								children: [
									"“",
									current.quote,
									"”"
								]
							}),
							/* @__PURE__ */ jsx(Typography, {
								variant: "body2",
								fontWeight: 600,
								color: "text.primary",
								children: current.author
							}),
							/* @__PURE__ */ jsx(Typography, {
								variant: "caption",
								color: "text.secondary",
								sx: { mb: 2.5 },
								children: current.role
							}),
							/* @__PURE__ */ jsxs(Box, {
								sx: {
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									flexWrap: "wrap",
									gap: 1
								},
								children: [/* @__PURE__ */ jsx(Box, {
									sx: {
										display: "flex",
										gap: 1
									},
									children: testimonials.map((_, i) => /* @__PURE__ */ jsx(Box, {
										onClick: () => setActive(i),
										sx: {
											width: i === active ? 20 : 8,
											height: 8,
											borderRadius: 99,
											cursor: "pointer",
											transition: "all 0.2s",
											bgcolor: i === active ? "primary.main" : "divider"
										}
									}, i))
								}), /* @__PURE__ */ jsxs(Box, {
									sx: {
										display: "flex",
										alignItems: "center",
										gap: .5,
										cursor: "pointer"
									},
									children: [/* @__PURE__ */ jsx(Typography, {
										variant: "body2",
										fontWeight: 600,
										color: "text.primary",
										sx: { fontSize: {
											xs: "0.78rem",
											sm: "0.875rem"
										} },
										children: t.testimonials.readMore
									}), /* @__PURE__ */ jsx(ArrowForwardIcon, { sx: {
										fontSize: 14,
										color: "text.primary"
									} })]
								})]
							})
						]
					})]
				}), /* @__PURE__ */ jsx(Box, {
					sx: {
						borderTop: "1px solid",
						borderColor: "divider",
						display: "grid",
						gridTemplateColumns: {
							xs: "repeat(2, 1fr)",
							md: "repeat(4, 1fr)"
						}
					},
					children: stats.map((stat, i) => /* @__PURE__ */ jsxs(Box, {
						sx: {
							py: {
								xs: 2.5,
								sm: 3
							},
							px: {
								xs: 2,
								sm: 3.5
							},
							borderRight: {
								xs: i % 2 === 0 ? "1px solid" : "none",
								md: i < 3 ? "1px solid" : "none"
							},
							borderBottom: {
								xs: i < 2 ? "1px solid" : "none",
								md: "none"
							},
							borderColor: "divider"
						},
						children: [/* @__PURE__ */ jsx(Typography, {
							variant: "h4",
							fontWeight: 800,
							color: "text.primary",
							sx: { fontSize: {
								xs: "1.4rem",
								sm: "2.125rem"
							} },
							children: stat.value
						}), /* @__PURE__ */ jsx(Typography, {
							variant: "caption",
							color: "text.secondary",
							sx: { fontSize: {
								xs: "0.7rem",
								sm: "0.75rem"
							} },
							children: stat.label
						})]
					}, stat.label))
				})]
			})
		})]
	});
}
//#endregion
//#region src/components/sections/BlogSection.tsx
function BlogSection() {
	const { t } = useI18n();
	const posts = [
		{
			id: "p1",
			...t.blog.posts.p1
		},
		{
			id: "p2",
			...t.blog.posts.p2
		},
		{
			id: "p3",
			...t.blog.posts.p3
		},
		{
			id: "p4",
			...t.blog.posts.p4
		}
	];
	return /* @__PURE__ */ jsxs(SectionWrapper, {
		bgcolor: "background.paper",
		children: [/* @__PURE__ */ jsx(SectionHeader, {
			eyebrow: t.blog.eyebrow,
			title: t.blog.title,
			subtitle: t.blog.subtitle,
			align: "center"
		}), /* @__PURE__ */ jsx(Grid, {
			container: true,
			spacing: {
				xs: 1.5,
				sm: 2,
				md: 2.5
			},
			children: posts.map((post) => /* @__PURE__ */ jsx(Grid, {
				item: true,
				xs: 6,
				sm: 6,
				md: 3,
				children: /* @__PURE__ */ jsxs(Card, {
					sx: {
						borderRadius: {
							xs: 2,
							sm: 3
						},
						overflow: "hidden",
						height: "100%",
						cursor: "pointer",
						transition: "transform 0.2s",
						"&:hover": { transform: "translateY(-4px)" }
					},
					children: [/* @__PURE__ */ jsxs(Box, {
						sx: { position: "relative" },
						children: [/* @__PURE__ */ jsx(Box, { sx: {
							height: {
								xs: 140,
								sm: 180,
								md: 220
							},
							bgcolor: "secondary.light"
						} }), /* @__PURE__ */ jsxs(Box, {
							sx: {
								position: "absolute",
								top: 8,
								left: 8,
								bgcolor: "text.primary",
								color: "background.paper",
								borderRadius: 1,
								px: .75,
								py: .5,
								textAlign: "center",
								minWidth: 30
							},
							children: [/* @__PURE__ */ jsx(Typography, {
								sx: {
									fontSize: {
										xs: "0.7rem",
										sm: "0.85rem"
									},
									fontWeight: 700,
									lineHeight: 1,
									color: "inherit"
								},
								children: post.day
							}), /* @__PURE__ */ jsx(Typography, {
								sx: {
									fontSize: {
										xs: "0.5rem",
										sm: "0.6rem"
									},
									fontWeight: 600,
									textTransform: "uppercase",
									color: "inherit",
									letterSpacing: "0.05em"
								},
								children: post.month
							})]
						})]
					}), /* @__PURE__ */ jsxs(CardContent, {
						sx: {
							p: {
								xs: 1.5,
								sm: 2
							},
							pb: "12px !important"
						},
						children: [/* @__PURE__ */ jsx(Typography, {
							variant: "overline",
							sx: {
								color: "text.secondary",
								fontSize: {
									xs: "0.58rem",
									sm: "0.65rem"
								},
								letterSpacing: "0.08em",
								fontWeight: 600
							},
							children: post.category
						}), /* @__PURE__ */ jsx(Typography, {
							variant: "subtitle1",
							fontWeight: 600,
							color: "text.primary",
							sx: {
								mt: .25,
								lineHeight: 1.4,
								fontSize: {
									xs: "0.8rem",
									sm: "0.95rem",
									md: "1rem"
								}
							},
							children: post.title
						})]
					})]
				})
			}, post.id))
		})]
	});
}
//#endregion
//#region src/theme/tokens.ts
var tokens = {
	bgDefault: "hsl(40, 20%, 93%)",
	bgPaper: "hsl(0, 0%, 100%)",
	primary: "hsl(28, 60%, 62%)",
	primaryDark: "hsl(28, 60%, 52%)",
	primaryLight: "hsl(28, 60%, 74%)",
	primaryContrast: "#ffffff",
	secondary: "hsl(30, 40%, 35%)",
	secondaryContrast: "#ffffff",
	textPrimary: "hsl(30, 40%, 16%)",
	textSecondary: "hsl(30, 15%, 50%)",
	divider: "hsl(35, 18%, 83%)",
	border: "hsl(35, 18%, 83%)",
	chipBg: "hsl(38, 25%, 88%)",
	chipFg: "hsl(30, 30%, 28%)",
	secondary100: "hsl(38, 25%, 88%)",
	success: "hsl(140, 55%, 42%)",
	successContrast: "#ffffff",
	error: "hsl(0, 72%, 60%)",
	errorContrast: "#ffffff",
	warning: "hsl(38, 92%, 50%)",
	warningContrast: "#ffffff",
	info: "hsl(207, 65%, 55%)",
	infoContrast: "#ffffff",
	radiusSm: "6px",
	radiusMd: "8px",
	radiusLg: "12px",
	radiusXl: "16px",
	fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
	fontMono: "ui-monospace, 'Cascadia Code', 'Fira Code', monospace"
};
//#endregion
//#region src/theme/theme.ts
var theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: tokens.primary,
			dark: tokens.primaryDark,
			light: tokens.primaryLight,
			contrastText: tokens.primaryContrast
		},
		secondary: {
			main: tokens.secondary,
			contrastText: tokens.secondaryContrast
		},
		background: {
			default: tokens.bgDefault,
			paper: tokens.bgPaper
		},
		text: {
			primary: tokens.textPrimary,
			secondary: tokens.textSecondary
		},
		divider: tokens.divider,
		success: {
			main: tokens.success,
			contrastText: tokens.successContrast
		},
		error: {
			main: tokens.error,
			contrastText: tokens.errorContrast
		},
		warning: {
			main: tokens.warning,
			contrastText: tokens.warningContrast
		},
		info: {
			main: tokens.info,
			contrastText: tokens.infoContrast
		}
	},
	typography: {
		fontFamily: tokens.fontFamily,
		h1: {
			fontWeight: 900,
			letterSpacing: "-0.04em",
			lineHeight: 1.05
		},
		h2: {
			fontWeight: 900,
			letterSpacing: "-0.03em",
			lineHeight: 1.1
		},
		h3: {
			fontWeight: 700,
			letterSpacing: "-0.02em"
		},
		h4: {
			fontWeight: 800,
			letterSpacing: "-0.02em"
		},
		h5: {
			fontWeight: 700,
			letterSpacing: "-0.01em"
		},
		h6: { fontWeight: 600 },
		subtitle1: {
			fontWeight: 600,
			lineHeight: 1.4
		},
		subtitle2: {
			fontWeight: 600,
			lineHeight: 1.4
		},
		body1: { lineHeight: 1.6 },
		body2: { lineHeight: 1.6 },
		button: {
			textTransform: "none",
			fontWeight: 600
		},
		caption: { lineHeight: 1.5 }
	},
	components: {
		MuiAppBar: {
			defaultProps: {
				elevation: 0,
				color: "transparent"
			},
			styleOverrides: { root: {
				backgroundColor: "rgba(255, 255, 255, 0.88)",
				backdropFilter: "blur(8px)",
				borderBottom: `1px solid ${tokens.border}`,
				color: tokens.textPrimary
			} }
		},
		MuiAvatar: { styleOverrides: { root: {
			backgroundColor: tokens.primary,
			color: tokens.primaryContrast,
			fontWeight: 700
		} } },
		MuiButton: {
			defaultProps: { disableElevation: true },
			styleOverrides: {
				root: {
					textTransform: "none",
					fontWeight: 600,
					borderRadius: tokens.radiusMd
				},
				containedPrimary: { "&:hover": { backgroundColor: tokens.primaryDark } },
				outlinedPrimary: {
					borderColor: tokens.border,
					"&:hover": {
						backgroundColor: tokens.secondary100,
						borderColor: tokens.primary
					}
				}
			}
		},
		MuiCard: {
			defaultProps: { elevation: 0 },
			styleOverrides: { root: {
				border: `1px solid ${tokens.border}`,
				borderRadius: tokens.radiusLg,
				transition: "border-color 0.15s ease"
			} }
		},
		MuiChip: { styleOverrides: {
			root: {
				fontWeight: 600,
				borderRadius: tokens.radiusSm
			},
			filled: {
				backgroundColor: tokens.chipBg,
				color: tokens.chipFg
			}
		} },
		MuiCssBaseline: { styleOverrides: {
			"*, *::before, *::after": { boxSizing: "border-box" },
			body: { margin: 0 },
			a: {
				color: tokens.primary,
				textDecoration: "none"
			},
			"a:hover": { textDecoration: "underline" },
			code: {
				fontFamily: tokens.fontMono,
				fontSize: "0.85em",
				background: tokens.chipBg,
				color: tokens.textPrimary,
				padding: "0.15em 0.45em",
				borderRadius: tokens.radiusSm
			}
		} },
		MuiDivider: { styleOverrides: { root: { borderColor: tokens.border } } },
		MuiLink: {
			defaultProps: { underline: "hover" },
			styleOverrides: { root: { color: tokens.primary } }
		},
		MuiPaper: {
			defaultProps: { elevation: 0 },
			styleOverrides: {
				root: {
					border: `1px solid ${tokens.border}`,
					borderRadius: tokens.radiusLg
				},
				elevation0: { boxShadow: "none" }
			}
		},
		MuiSelect: {
			defaultProps: {
				size: "small",
				variant: "outlined"
			},
			styleOverrides: { outlined: {
				borderRadius: tokens.radiusMd,
				backgroundColor: tokens.bgPaper
			} }
		},
		MuiTextField: {
			defaultProps: {
				size: "small",
				variant: "outlined"
			},
			styleOverrides: { root: { "& .MuiOutlinedInput-root": {
				borderRadius: tokens.radiusMd,
				backgroundColor: tokens.bgPaper,
				"& fieldset": { borderColor: tokens.border },
				"&:hover fieldset": { borderColor: tokens.primary },
				"&.Mui-focused fieldset": { borderColor: tokens.primary }
			} } }
		},
		MuiTooltip: { styleOverrides: { tooltip: {
			backgroundColor: tokens.textPrimary,
			color: tokens.bgPaper,
			fontSize: "0.75rem",
			borderRadius: tokens.radiusSm
		} } }
	},
	shape: { borderRadius: parseInt(tokens.radiusLg, 10) }
});
//#endregion
//#region src/components/sections/ConsultationSection.tsx
function ConsultationSection() {
	const { t } = useI18n();
	const c = t.consultation;
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		service: "",
		message: ""
	});
	const [submitted, setSubmitted] = useState(false);
	const handleChange = (field) => (e) => setForm((f) => ({
		...f,
		[field]: e.target.value
	}));
	const handleSubmit = () => {
		if (form.name && form.email) setSubmitted(true);
	};
	const contactItems = [
		{
			icon: /* @__PURE__ */ jsx(EmailOutlinedIcon, { sx: { fontSize: {
				xs: 16,
				sm: 18
			} } }),
			text: c.contact.email
		},
		{
			icon: /* @__PURE__ */ jsx(PhoneOutlinedIcon, { sx: { fontSize: {
				xs: 16,
				sm: 18
			} } }),
			text: c.contact.phone
		},
		{
			icon: /* @__PURE__ */ jsx(PlaceOutlinedIcon, { sx: { fontSize: {
				xs: 16,
				sm: 18
			} } }),
			text: c.contact.address
		}
	];
	return /* @__PURE__ */ jsx(SectionWrapper, {
		bgcolor: "background.default",
		children: /* @__PURE__ */ jsx(Card, {
			sx: {
				borderRadius: {
					xs: 2,
					sm: 4
				},
				overflow: "hidden"
			},
			children: /* @__PURE__ */ jsx(CardContent, {
				sx: { p: 0 },
				children: /* @__PURE__ */ jsxs(Box, {
					sx: {
						display: "flex",
						flexDirection: {
							xs: "column",
							md: "row"
						}
					},
					children: [/* @__PURE__ */ jsxs(Box, {
						sx: {
							flex: 1,
							p: {
								xs: 3,
								sm: 4,
								md: 6
							},
							display: "flex",
							flexDirection: "column",
							justifyContent: "center"
						},
						children: [
							/* @__PURE__ */ jsx(Typography, {
								variant: "overline",
								sx: {
									color: "text.secondary",
									letterSpacing: "0.12em",
									fontSize: "0.65rem",
									fontWeight: 700,
									mb: 1.5
								},
								children: c.eyebrow
							}),
							/* @__PURE__ */ jsx(Typography, {
								variant: "h4",
								fontWeight: 700,
								color: "text.primary",
								sx: {
									mb: 2,
									lineHeight: 1.25,
									fontSize: {
										xs: "1.4rem",
										sm: "1.75rem",
										md: "2.125rem"
									}
								},
								children: c.title
							}),
							/* @__PURE__ */ jsx(Typography, {
								variant: "body2",
								color: "text.secondary",
								sx: {
									mb: {
										xs: 3,
										sm: 4
									},
									fontSize: {
										xs: "0.8rem",
										sm: "0.875rem"
									}
								},
								children: c.description
							}),
							/* @__PURE__ */ jsx(Box, { sx: {
								height: 1,
								bgcolor: "divider",
								mb: {
									xs: 2.5,
									sm: 3
								}
							} }),
							/* @__PURE__ */ jsx(Box, {
								sx: {
									display: "flex",
									flexDirection: "column",
									gap: {
										xs: 1,
										sm: 1.5
									}
								},
								children: contactItems.map((item, i) => /* @__PURE__ */ jsxs(Box, {
									sx: {
										display: "flex",
										alignItems: "flex-start",
										gap: 1.5
									},
									children: [/* @__PURE__ */ jsx(Box, {
										sx: {
											mt: .1,
											flexShrink: 0,
											color: "text.secondary"
										},
										children: item.icon
									}), /* @__PURE__ */ jsx(Typography, {
										variant: "body2",
										color: "text.secondary",
										sx: { fontSize: {
											xs: "0.78rem",
											sm: "0.875rem"
										} },
										children: item.text
									})]
								}, i))
							}),
							/* @__PURE__ */ jsxs(Box, {
								sx: {
									display: "flex",
									alignItems: "center",
									gap: .75,
									mt: {
										xs: 2.5,
										sm: 3.5
									},
									cursor: "pointer",
									width: "fit-content"
								},
								children: [/* @__PURE__ */ jsx(Typography, {
									variant: "body2",
									fontWeight: 700,
									color: "text.primary",
									sx: { fontSize: {
										xs: "0.8rem",
										sm: "0.875rem"
									} },
									children: c.openMap
								}), /* @__PURE__ */ jsx(ArrowForwardIcon, { sx: {
									fontSize: {
										xs: 14,
										sm: 16
									},
									color: "text.primary"
								} })]
							})
						]
					}), /* @__PURE__ */ jsxs(Box, {
						sx: {
							width: {
								xs: "100%",
								md: 360
							},
							flexShrink: 0,
							bgcolor: "background.paper",
							p: {
								xs: 3,
								sm: 4,
								md: 5
							},
							borderTop: {
								xs: "1px solid",
								md: "none"
							},
							borderLeft: { md: "1px solid" },
							borderColor: "divider",
							display: "flex",
							flexDirection: "column",
							gap: {
								xs: 1.5,
								sm: 2
							}
						},
						children: [/* @__PURE__ */ jsx(Typography, {
							variant: "h6",
							fontWeight: 700,
							color: "text.primary",
							textAlign: "center",
							sx: {
								mb: .5,
								fontSize: {
									xs: "1rem",
									sm: "1.25rem"
								}
							},
							children: c.formTitle
						}), submitted ? /* @__PURE__ */ jsxs(Box, {
							sx: {
								textAlign: "center",
								py: {
									xs: 3,
									sm: 4
								}
							},
							children: [/* @__PURE__ */ jsx(Typography, {
								variant: "h6",
								color: "primary",
								fontWeight: 600,
								children: c.successTitle
							}), /* @__PURE__ */ jsx(Typography, {
								variant: "body2",
								color: "text.secondary",
								mt: 1,
								children: c.successMessage
							})]
						}) : /* @__PURE__ */ jsxs(Fragment, { children: [
							/* @__PURE__ */ jsx(TextField, {
								placeholder: c.fields.name,
								size: "small",
								fullWidth: true,
								value: form.name,
								onChange: handleChange("name")
							}),
							/* @__PURE__ */ jsx(TextField, {
								placeholder: c.fields.email,
								size: "small",
								fullWidth: true,
								type: "email",
								value: form.email,
								onChange: handleChange("email")
							}),
							/* @__PURE__ */ jsx(TextField, {
								placeholder: c.fields.phone,
								size: "small",
								fullWidth: true,
								value: form.phone,
								onChange: handleChange("phone")
							}),
							/* @__PURE__ */ jsx(FormControl, {
								size: "small",
								fullWidth: true,
								children: /* @__PURE__ */ jsx(Select, {
									displayEmpty: true,
									value: form.service,
									onChange: (e) => setForm((f) => ({
										...f,
										service: e.target.value
									})),
									renderValue: (v) => v || /* @__PURE__ */ jsx(Typography, {
										color: "text.secondary",
										variant: "body2",
										children: c.fields.service
									}),
									children: c.services.map((s) => /* @__PURE__ */ jsx(MenuItem, {
										value: s,
										children: s
									}, s))
								})
							}),
							/* @__PURE__ */ jsx(TextField, {
								placeholder: c.fields.message,
								size: "small",
								fullWidth: true,
								multiline: true,
								rows: 4,
								value: form.message,
								onChange: handleChange("message")
							}),
							/* @__PURE__ */ jsx(Button, {
								variant: "contained",
								fullWidth: true,
								size: "large",
								onClick: handleSubmit,
								sx: {
									bgcolor: tokens.primaryLight,
									color: tokens.textPrimary,
									fontWeight: 700,
									fontSize: {
										xs: "0.875rem",
										sm: "1rem"
									},
									"&:hover": {
										bgcolor: tokens.primary,
										color: "#fff"
									}
								},
								children: c.submit
							})
						] })]
					})]
				})
			})
		})
	});
}
//#endregion
//#region src/pages/Home.tsx
function Home() {
	const { t } = useI18n();
	const serverData = useServerData();
	const [count, setCount] = useState(0);
	const features = [
		{
			icon: "🦀",
			...t.home.features.rolldown
		},
		{
			icon: "🌐",
			...t.home.features.ssr
		},
		{
			icon: "🔷",
			...t.home.features.typescript
		},
		{
			icon: "🌍",
			...t.home.features.i18n
		}
	];
	return /* @__PURE__ */ jsxs(Box, { children: [
		/* @__PURE__ */ jsx(Box, {
			sx: {
				maxWidth: 1200,
				mx: "auto",
				px: {
					xs: 2,
					sm: 3
				},
				py: {
					xs: 4,
					sm: 5
				}
			},
			children: /* @__PURE__ */ jsxs(Box, {
				sx: {
					display: "flex",
					flexDirection: "column",
					gap: {
						xs: 3,
						sm: 4,
						md: 5
					}
				},
				children: [
					/* @__PURE__ */ jsxs(Box, { children: [
						/* @__PURE__ */ jsxs(Typography, {
							variant: "h2",
							component: "h1",
							sx: {
								fontWeight: 900,
								letterSpacing: "-0.04em",
								lineHeight: 1.05,
								fontSize: {
									xs: "2rem",
									sm: "2.5rem",
									md: "3.5rem"
								}
							},
							children: [
								"Vite ",
								/* @__PURE__ */ jsx(Box, {
									component: "span",
									color: "primary.main",
									children: "8"
								}),
								" + SSR"
							]
						}),
						/* @__PURE__ */ jsx(Typography, {
							variant: "h5",
							color: "info.main",
							sx: {
								fontWeight: 700,
								mt: .5
							},
							children: t.home.subtitle
						}),
						/* @__PURE__ */ jsx(Typography, {
							variant: "body1",
							color: "text.secondary",
							sx: {
								mt: 1.5,
								maxWidth: 520
							},
							children: t.home.description
						})
					] }),
					serverData && /* @__PURE__ */ jsxs(Box, {
						sx: {
							display: "flex",
							flexDirection: "column",
							gap: 2
						},
						children: [
							/* @__PURE__ */ jsxs(Box, {
								sx: {
									display: "inline-flex",
									alignItems: "center",
									gap: 1,
									bgcolor: "background.paper",
									border: "1px solid",
									borderColor: "divider",
									borderRadius: 99,
									px: 1.5,
									py: .5,
									width: "fit-content"
								},
								children: [/* @__PURE__ */ jsx(Box, { sx: {
									width: 7,
									height: 7,
									borderRadius: "50%",
									bgcolor: "success.main",
									boxShadow: "0 0 6px #4caf50",
									flexShrink: 0,
									animation: "ssrPulse 2s ease-in-out infinite",
									"@keyframes ssrPulse": {
										"0%,100%": { opacity: 1 },
										"50%": { opacity: .35 }
									}
								} }), /* @__PURE__ */ jsxs(Typography, {
									variant: "caption",
									color: "text.secondary",
									children: ["Server-rendered · fetched at ", new Date(serverData.homeData.fetchedAt).toLocaleTimeString()]
								})]
							}),
							/* @__PURE__ */ jsx(Grid, {
								container: true,
								spacing: 1.5,
								children: serverData.homeData.stats.map((stat) => /* @__PURE__ */ jsx(Grid, {
									item: true,
									xs: 6,
									md: 3,
									children: /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, {
										sx: {
											p: 2,
											"&:last-child": { pb: 2 }
										},
										children: [
											/* @__PURE__ */ jsx(Typography, {
												variant: "h4",
												color: "primary",
												sx: {
													fontWeight: 800,
													lineHeight: 1
												},
												children: stat.value
											}),
											/* @__PURE__ */ jsx(Typography, {
												variant: "caption",
												color: "text.secondary",
												display: "block",
												sx: { mt: .5 },
												children: stat.label
											}),
											/* @__PURE__ */ jsxs(Box, {
												sx: {
													display: "flex",
													alignItems: "center",
													gap: .5,
													mt: .5
												},
												children: [stat.up ? /* @__PURE__ */ jsx(TrendingUpIcon, { sx: {
													fontSize: 13,
													color: "success.main"
												} }) : /* @__PURE__ */ jsx(TrendingDownIcon, { sx: {
													fontSize: 13,
													color: "error.main"
												} }), /* @__PURE__ */ jsx(Typography, {
													variant: "caption",
													sx: {
														fontWeight: 600,
														color: stat.up ? "success.main" : "error.main"
													},
													children: stat.trend
												})]
											})
										]
									}) })
								}, stat.label))
							}),
							/* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsxs(Box, {
								sx: {
									display: "flex",
									alignItems: "center",
									gap: 1,
									mb: 1.5
								},
								children: [/* @__PURE__ */ jsx(Typography, {
									variant: "subtitle2",
									fontWeight: 600,
									children: "Recent Posts"
								}), /* @__PURE__ */ jsx(Chip, {
									label: "from server",
									size: "small"
								})]
							}), serverData.homeData.recentPosts.map((post, i) => /* @__PURE__ */ jsxs(Box, { children: [i > 0 && /* @__PURE__ */ jsx(Divider, { sx: { my: 1.5 } }), /* @__PURE__ */ jsxs(Box, {
								sx: {
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									gap: 2,
									flexWrap: "wrap"
								},
								children: [/* @__PURE__ */ jsxs(Box, { children: [/* @__PURE__ */ jsx(Typography, {
									variant: "body2",
									fontWeight: 500,
									children: post.title
								}), /* @__PURE__ */ jsxs(Box, {
									sx: {
										display: "flex",
										alignItems: "center",
										gap: .5,
										mt: .25
									},
									children: [/* @__PURE__ */ jsx(AccessTimeIcon, { sx: {
										fontSize: 12,
										color: "text.secondary"
									} }), /* @__PURE__ */ jsxs(Typography, {
										variant: "caption",
										color: "text.secondary",
										children: [
											post.date,
											" · ",
											post.readingTime,
											" min"
										]
									})]
								})] }), /* @__PURE__ */ jsx(Box, {
									sx: {
										display: "flex",
										gap: .5,
										flexWrap: "wrap"
									},
									children: post.tags.map((tag) => /* @__PURE__ */ jsx(Chip, {
										label: tag,
										size: "small",
										variant: "outlined"
									}, tag))
								})]
							})] }, post.id))] }) })
						]
					}),
					/* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { children: [
						/* @__PURE__ */ jsxs(Box, {
							sx: {
								display: "flex",
								alignItems: "center",
								gap: 1,
								mb: .5
							},
							children: [/* @__PURE__ */ jsx(BoltIcon, {
								color: "primary",
								fontSize: "small"
							}), /* @__PURE__ */ jsx(Typography, {
								variant: "subtitle2",
								fontWeight: 600,
								children: t.home.counter.title
							})]
						}),
						/* @__PURE__ */ jsx(Typography, {
							variant: "body2",
							color: "text.secondary",
							sx: { mb: 2 },
							children: t.home.counter.description
						}),
						/* @__PURE__ */ jsx(Button, {
							variant: "contained",
							disableElevation: true,
							onClick: () => setCount((c) => c + 1),
							children: interpolate(t.home.counter.button, { count })
						})
					] }) }),
					/* @__PURE__ */ jsx(Grid, {
						container: true,
						spacing: 1.5,
						children: features.map(({ icon, title, description }) => /* @__PURE__ */ jsx(Grid, {
							item: true,
							xs: 6,
							md: 3,
							children: /* @__PURE__ */ jsx(Card, {
								sx: {
									height: "100%",
									"&:hover": { borderColor: "primary.main" }
								},
								children: /* @__PURE__ */ jsxs(CardContent, { children: [
									/* @__PURE__ */ jsx(Typography, {
										fontSize: "1.75rem",
										lineHeight: 1,
										mb: 1,
										children: icon
									}),
									/* @__PURE__ */ jsx(Typography, {
										variant: "subtitle2",
										fontWeight: 600,
										gutterBottom: true,
										children: title
									}),
									/* @__PURE__ */ jsx(Typography, {
										variant: "body2",
										color: "text.secondary",
										children: description
									})
								] })
							})
						}, title))
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(ServicesSection, {}),
		/* @__PURE__ */ jsx(ProcessSection, {}),
		/* @__PURE__ */ jsx(TestimonialsSection, {}),
		/* @__PURE__ */ jsx(BlogSection, {}),
		/* @__PURE__ */ jsx(ConsultationSection, {})
	] });
}
//#endregion
//#region src/pages/About.tsx
function About() {
	const { t } = useI18n();
	const steps = [
		t.about.i18n.step1,
		t.about.i18n.step2,
		t.about.i18n.step3,
		t.about.i18n.step4,
		t.about.i18n.step5
	];
	return /* @__PURE__ */ jsx(Box, {
		sx: {
			maxWidth: 1200,
			mx: "auto",
			px: {
				xs: 2,
				sm: 3
			},
			py: 5
		},
		children: /* @__PURE__ */ jsxs(Box, {
			sx: {
				display: "flex",
				flexDirection: "column",
				gap: 3
			},
			children: [
				/* @__PURE__ */ jsxs(Box, { children: [/* @__PURE__ */ jsx(Typography, {
					variant: "h4",
					fontWeight: 900,
					letterSpacing: "-0.03em",
					children: t.about.title
				}), /* @__PURE__ */ jsx(Typography, {
					variant: "body2",
					color: "text.secondary",
					mt: .5,
					children: t.about.lead
				})] }),
				/* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsx(Typography, {
					variant: "subtitle2",
					fontWeight: 600,
					gutterBottom: true,
					children: t.about.structure.title
				}), /* @__PURE__ */ jsx(Box, {
					component: "pre",
					sx: {
						fontFamily: "ui-monospace, monospace",
						fontSize: "0.78rem",
						lineHeight: 1.7,
						bgcolor: "background.default",
						p: 2,
						borderRadius: 1,
						overflowX: "auto",
						color: "text.primary",
						mt: 1
					},
					children: `vite8-ssr-ts/
├── Dockerfile
├── index.html
├── server.ts               # Detects locale from headers/cookie
├── vite.config.ts
└── src/
    ├── mui/
    │   └── createEmotionCache.ts
    ├── theme/
    │   ├── tokens.ts       # Sand tokens (single source of truth)
    │   ├── palette.ts      # MUI PaletteOptions
    │   ├── typography.ts   # MUI TypographyVariantsOptions
    │   ├── components.ts   # Barrel: imports all component overrides
    │   ├── theme.ts        # createTheme() assembler
    │   ├── index.ts        # Public barrel export
    │   └── components/
    │       ├── MuiAppBar.ts
    │       ├── MuiAvatar.ts
    │       ├── MuiButton.ts
    │       ├── MuiCard.ts
    │       ├── MuiChip.ts
    │       ├── MuiCssBaseline.ts
    │       ├── MuiDivider.ts
    │       ├── MuiLink.ts
    │       ├── MuiPaper.ts
    │       ├── MuiSelect.ts
    │       ├── MuiTextField.ts
    │       └── MuiTooltip.ts
    ├── i18n/               # context, loader, types
    ├── locales/            # en.json / es.json / fr.json
    ├── entry-server.tsx    # Extracts Emotion CSS for SSR
    └── entry-client.tsx    # Hydrates with same Emotion cache`
				})] }) }),
				/* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardContent, { children: [/* @__PURE__ */ jsx(Typography, {
					variant: "subtitle2",
					fontWeight: 600,
					gutterBottom: true,
					children: t.about.i18n.title
				}), steps.map((step, i) => /* @__PURE__ */ jsxs(Box, { children: [i > 0 && /* @__PURE__ */ jsx(Divider, { sx: { my: 1.5 } }), /* @__PURE__ */ jsxs(Box, {
					sx: {
						display: "flex",
						gap: 1.5,
						alignItems: "flex-start"
					},
					children: [/* @__PURE__ */ jsx(Avatar, {
						sx: {
							width: 22,
							height: 22,
							fontSize: "0.65rem",
							fontWeight: 700,
							flexShrink: 0,
							mt: .1
						},
						children: i + 1
					}), /* @__PURE__ */ jsx(Typography, {
						variant: "body2",
						color: "text.secondary",
						children: step
					})]
				})] }, i))] }) })
			]
		})
	});
}
//#endregion
//#region src/pages/Posts.tsx
var MOCK_POSTS = [
	{
		id: 1,
		title: "Getting Started with Vite 8",
		date: "2026-03-01",
		excerpt: "Vite 8 ships Rolldown as the default bundler — learn how to migrate and what to expect.",
		tags: ["vite", "tooling"]
	},
	{
		id: 2,
		title: "SSR vs SSG: When to Use Each",
		date: "2026-03-05",
		excerpt: "Server-side rendering and static site generation serve different use cases. Here's how to choose.",
		tags: ["ssr", "architecture"]
	},
	{
		id: 3,
		title: "React 19 New Features",
		date: "2026-03-10",
		excerpt: "React 19 brings Actions, useOptimistic, and improved Server Component support.",
		tags: ["react", "typescript"]
	},
	{
		id: 4,
		title: "Hydration in React Explained",
		date: "2026-03-12",
		excerpt: "What exactly happens when hydrateRoot() runs? Understanding the client takeover process.",
		tags: ["react", "ssr"]
	},
	{
		id: 5,
		title: "TypeScript 5.5 Inferred Predicates",
		date: "2026-03-14",
		excerpt: "TypeScript 5.5 can now infer type predicates automatically, reducing boilerplate significantly.",
		tags: ["typescript"]
	}
];
function Posts() {
	const { t } = useI18n();
	const [filter, setFilter] = useState("");
	const [activeTag, setActiveTag] = useState(null);
	const [sortBy, setSortBy] = useState("date");
	const allTags = useMemo(() => Array.from(new Set(MOCK_POSTS.flatMap((p) => p.tags))).sort(), []);
	const filtered = useMemo(() => MOCK_POSTS.filter((p) => {
		const matchText = !filter || p.title.toLowerCase().includes(filter.toLowerCase()) || p.excerpt.toLowerCase().includes(filter.toLowerCase());
		const matchTag = !activeTag || p.tags.includes(activeTag);
		return matchText && matchTag;
	}).sort((a, b) => sortBy === "date" ? b.date.localeCompare(a.date) : a.title.localeCompare(b.title)), [
		filter,
		activeTag,
		sortBy
	]);
	return /* @__PURE__ */ jsx(Box, {
		sx: {
			maxWidth: 1200,
			mx: "auto",
			px: {
				xs: 2,
				sm: 3
			},
			py: 5
		},
		children: /* @__PURE__ */ jsxs(Box, {
			sx: {
				display: "flex",
				flexDirection: "column",
				gap: 3
			},
			children: [
				/* @__PURE__ */ jsxs(Box, { children: [/* @__PURE__ */ jsx(Typography, {
					variant: "h4",
					fontWeight: 900,
					letterSpacing: "-0.03em",
					children: t.posts.title
				}), /* @__PURE__ */ jsx(Typography, {
					variant: "body2",
					color: "text.secondary",
					mt: .5,
					children: t.posts.lead
				})] }),
				/* @__PURE__ */ jsxs(Box, {
					sx: {
						display: "flex",
						gap: 1.5,
						flexWrap: "wrap"
					},
					children: [/* @__PURE__ */ jsx(TextField, {
						placeholder: t.posts.searchPlaceholder,
						value: filter,
						onChange: (e) => setFilter(e.target.value),
						sx: {
							flex: 1,
							minWidth: 180
						},
						InputProps: { startAdornment: /* @__PURE__ */ jsx(InputAdornment, {
							position: "start",
							children: /* @__PURE__ */ jsx(SearchIcon, { fontSize: "small" })
						}) }
					}), /* @__PURE__ */ jsxs(Select, {
						size: "small",
						value: sortBy,
						onChange: (e) => setSortBy(e.target.value),
						sx: { minWidth: 140 },
						children: [/* @__PURE__ */ jsx(MenuItem, {
							value: "date",
							children: t.posts.sort.newest
						}), /* @__PURE__ */ jsx(MenuItem, {
							value: "title",
							children: t.posts.sort.az
						})]
					})]
				}),
				/* @__PURE__ */ jsxs(Box, {
					sx: {
						display: "flex",
						flexWrap: "wrap",
						gap: 1
					},
					children: [/* @__PURE__ */ jsx(Button, {
						size: "small",
						variant: activeTag === null ? "contained" : "outlined",
						disableElevation: true,
						onClick: () => setActiveTag(null),
						children: t.posts.all
					}), allTags.map((tag) => /* @__PURE__ */ jsx(Button, {
						size: "small",
						variant: activeTag === tag ? "contained" : "outlined",
						disableElevation: true,
						onClick: () => setActiveTag(tag === activeTag ? null : tag),
						children: tag
					}, tag))]
				}),
				/* @__PURE__ */ jsx(Box, {
					sx: {
						display: "flex",
						flexDirection: "column",
						gap: 1.5
					},
					children: filtered.length === 0 ? /* @__PURE__ */ jsx(Typography, {
						color: "text.secondary",
						textAlign: "center",
						py: 5,
						children: t.posts.empty
					}) : filtered.map((post) => /* @__PURE__ */ jsx(Card, {
						sx: { "&:hover": { borderColor: "primary.main" } },
						children: /* @__PURE__ */ jsxs(CardContent, { children: [
							/* @__PURE__ */ jsx(Typography, {
								variant: "caption",
								color: "text.secondary",
								children: post.date
							}),
							/* @__PURE__ */ jsx(Typography, {
								variant: "subtitle1",
								fontWeight: 600,
								children: post.title
							}),
							/* @__PURE__ */ jsx(Typography, {
								variant: "body2",
								color: "text.secondary",
								mt: .5,
								children: post.excerpt
							}),
							/* @__PURE__ */ jsxs(Box, {
								sx: {
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									mt: 1.5,
									flexWrap: "wrap",
									gap: 1
								},
								children: [/* @__PURE__ */ jsx(Box, {
									sx: {
										display: "flex",
										gap: .75,
										flexWrap: "wrap"
									},
									children: post.tags.map((tag) => /* @__PURE__ */ jsx(Chip, {
										label: tag,
										size: "small"
									}, tag))
								}), /* @__PURE__ */ jsx(Button, {
									size: "small",
									variant: "text",
									color: "primary",
									children: t.posts.readMore
								})]
							})
						] })
					}, post.id))
				})
			]
		})
	});
}
//#endregion
//#region src/pages/NotFound.tsx
function NotFound() {
	const { t } = useI18n();
	return /* @__PURE__ */ jsx(Box, {
		sx: {
			maxWidth: 1200,
			mx: "auto",
			px: {
				xs: 2,
				sm: 3
			}
		},
		children: /* @__PURE__ */ jsxs(Box, {
			sx: {
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				py: 12,
				gap: 2,
				textAlign: "center"
			},
			children: [
				/* @__PURE__ */ jsx(Typography, {
					variant: "h1",
					color: "primary",
					sx: {
						fontSize: "6rem",
						fontWeight: 900,
						lineHeight: 1
					},
					children: t.notFound.code
				}),
				/* @__PURE__ */ jsx(Typography, {
					variant: "h5",
					fontWeight: 700,
					children: t.notFound.title
				}),
				/* @__PURE__ */ jsx(Typography, {
					color: "text.secondary",
					children: t.notFound.description
				}),
				/* @__PURE__ */ jsx(Button, {
					component: Link,
					to: "/",
					variant: "contained",
					disableElevation: true,
					children: t.notFound.back
				})
			]
		})
	});
}
//#endregion
//#region src/App.tsx
function App({ serverData = null }) {
	return /* @__PURE__ */ jsx(ServerDataProvider, {
		data: serverData,
		children: /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsxs(Route, {
			path: "/",
			element: /* @__PURE__ */ jsx(Layout, {}),
			children: [
				/* @__PURE__ */ jsx(Route, {
					index: true,
					element: /* @__PURE__ */ jsx(Home, {})
				}),
				/* @__PURE__ */ jsx(Route, {
					path: "about",
					element: /* @__PURE__ */ jsx(About, {})
				}),
				/* @__PURE__ */ jsx(Route, {
					path: "posts",
					element: /* @__PURE__ */ jsx(Posts, {})
				}),
				/* @__PURE__ */ jsx(Route, {
					path: "*",
					element: /* @__PURE__ */ jsx(NotFound, {})
				})
			]
		}) })
	});
}
//#endregion
//#region src/i18n/loader.ts
var ALL_TRANSLATIONS = {
	en: {
		nav: {
			"home": "Home",
			"about": "About",
			"posts": "Posts"
		},
		home: {
			"title": "Vite 8 + SSR",
			"titleHighlight": "8",
			"subtitle": "+ TypeScript + i18n",
			"description": "Powered by Rolldown — Vite's Rust-based bundler. Pages render on the server, then hydrate seamlessly on the client. Fully typed and internationalized.",
			"counter": {
				"title": "Interactive Counter",
				"description": "This HTML was rendered on the server. Click the button — it's now hydrated and interactive.",
				"button": "Count: {{count}}"
			},
			"features": {
				"rolldown": {
					"title": "Rolldown",
					"description": "Vite 8 uses Rolldown (Rust) as its bundler — up to 10–30× faster builds than before."
				},
				"ssr": {
					"title": "SSR Ready",
					"description": "Server-renders HTML for fast first paint and great SEO, then hydrates for interactivity."
				},
				"typescript": {
					"title": "TypeScript",
					"description": "Fully typed — server, client, components and shared types all checked by tsc."
				},
				"i18n": {
					"title": "i18n",
					"description": "JSON-based translations loaded server-side and passed to the client — no extra requests."
				}
			}
		},
		about: {
			"title": "About This Project",
			"lead": "A minimal, fully-typed SSR starter using Vite 8, React 19, React Router 7, TypeScript, and i18n.",
			"structure": { "title": "Project Structure" },
			"flow": { "title": "SSR Flow" },
			"i18n": {
				"title": "How i18n Works",
				"step1": "The server detects the locale from the Accept-Language header (or cookie)",
				"step2": "The matching JSON file is loaded and passed into renderToString()",
				"step3": "The locale and translations are serialized into a <script> tag in the HTML",
				"step4": "The client reads from that script tag — no extra fetch needed",
				"step5": "Switching language updates the context and re-renders instantly"
			}
		},
		posts: {
			"title": "Posts",
			"lead": "Server-rendered post list. Search and filter — all activated after hydration.",
			"searchPlaceholder": "Search posts…",
			"sort": {
				"label": "Sort:",
				"newest": "Newest",
				"az": "A–Z"
			},
			"all": "All",
			"readMore": "Read more →",
			"empty": "No posts match your search.",
			"minRead": "min read"
		},
		notFound: {
			"code": "404",
			"title": "Page Not Found",
			"description": "The page you're looking for doesn't exist.",
			"back": "← Back to Home"
		},
		footer: "Built with Vite 8 · React 19 · TypeScript · SSR · i18n",
		services: {
			"eyebrow": "What We Do",
			"title": "Counseling & Therapy Services",
			"subtitle": "We offer a wide range of services to meet your personal needs.",
			"cta": "Explore Our Services",
			"readMore": "Read More",
			"items": {
				"individual": {
					"title": "Individual Counseling",
					"description": "Personal support to help you overcome stress, anxiety, and regain confidence in your everyday life."
				},
				"family": {
					"title": "Family Therapy",
					"description": "Improve family relationships, resolve conflicts, and build a healthy, supportive living environment."
				},
				"couples": {
					"title": "Couples Therapy",
					"description": "Enhance understanding between partners, helping to strengthen and renew the relationship."
				},
				"group": {
					"title": "Group Therapy",
					"description": "Share experiences and support in a guided, safe group setting with others facing similar challenges."
				},
				"adolescent": {
					"title": "Child & Adolescent Therapy",
					"description": "Specialised support for children and teens navigating emotional challenges and building resilience."
				},
				"trauma": {
					"title": "Trauma Counseling",
					"description": "Focused therapy to help you heal from past trauma and regain a sense of control and peace."
				}
			}
		},
		process: {
			"eyebrow": "How We Work",
			"title": "Counseling & Therapy Process",
			"subtitle": "Supporting you from initial consultation to a successful path to mental well-being.",
			"steps": {
				"step1": {
					"title": "Contact Consultation",
					"description": "Reach out to schedule your free initial consultation. We discuss your needs and answer any questions you may have."
				},
				"step2": {
					"title": "Customised Plan",
					"description": "Together we create a personalised therapy plan tailored to your goals and unique circumstances."
				},
				"step3": {
					"title": "Therapy Sessions",
					"description": "Begin regular sessions in a safe, supportive environment, working steadily toward meaningful change."
				},
				"step4": {
					"title": "Ongoing Support",
					"description": "We monitor your progress and adjust the approach as needed to help you sustain the positive changes you have made."
				}
			}
		},
		testimonials: {
			"eyebrow": "Client Testimonials",
			"title": "What Our Clients Are Saying",
			"subtitle": "Hear firsthand accounts of healing and positive change.",
			"readMore": "Read More Stories",
			"stats": {
				"experience": {
					"value": "20 Years",
					"label": "Years experience"
				},
				"customers": {
					"value": "2k",
					"label": "Happy customers"
				},
				"projects": {
					"value": "46",
					"label": "Projects completed"
				},
				"awards": {
					"value": "15",
					"label": "Awards achievement"
				}
			},
			"items": {
				"t1": {
					"author": "Jane Carter",
					"role": "CEO, TherapyFirst",
					"quote": "We sincerely appreciate the outstanding support and guidance your team provided. Special thanks to Susan and Vaibhav for their dedication."
				},
				"t2": {
					"author": "James R.",
					"role": "Couples Therapy Client",
					"quote": "After just a few sessions I noticed a significant shift. The approach was thoughtful, non-judgmental, and deeply effective."
				},
				"t3": {
					"author": "Elena W.",
					"role": "Individual Counseling Client",
					"quote": "I had tried other therapists before but never felt truly heard. Here the experience was completely different — warm, professional, and transformative."
				}
			}
		},
		blog: {
			"eyebrow": "Favourite Topics",
			"title": "Healingy Blog & Resources",
			"subtitle": "Your go-to source for mental health insights, tools, and advice.",
			"posts": {
				"p1": {
					"day": "12",
					"month": "Sep",
					"category": "Therapy",
					"title": "Mindfulness For Better Mental Health"
				},
				"p2": {
					"day": "14",
					"month": "Sep",
					"category": "Wellness",
					"title": "Self-Care for Emotional Well-being"
				},
				"p3": {
					"day": "16",
					"month": "Sep",
					"category": "Therapy",
					"title": "Cognitive Behavioral Therapy for Stress"
				},
				"p4": {
					"day": "18",
					"month": "Sep",
					"category": "Wellness",
					"title": "How Therapy Helps with Trauma"
				}
			}
		},
		consultation: {
			"eyebrow": "Book a Consultation",
			"title": "Free Consultation – Begin Your Healing Journey",
			"description": "Connect with a dedicated specialist today and take the first step towards a healthier, more fulfilling life.",
			"formTitle": "Get A Free Consultation",
			"fields": {
				"name": "Your Name *",
				"email": "Your Email *",
				"phone": "Phone Number",
				"service": "Choose Services",
				"message": "Your message"
			},
			"submit": "Submit",
			"successTitle": "Thank you!",
			"successMessage": "We'll be in touch within 24 hours.",
			"openMap": "Open map",
			"contact": {
				"email": "hello@healingcenter.com",
				"phone": "1-333-345-6868",
				"address": "101 E 129th St, East Chicago, IN 46312, US"
			},
			"services": [
				"Individual Counseling",
				"Couples Therapy",
				"Family Therapy",
				"Group Therapy",
				"Child & Adolescent Therapy",
				"Trauma Counseling"
			]
		}
	},
	es: {
		nav: {
			"home": "Inicio",
			"about": "Acerca de",
			"posts": "Artículos"
		},
		home: {
			"title": "Vite 8 + SSR",
			"titleHighlight": "8",
			"subtitle": "+ TypeScript + i18n",
			"description": "Impulsado por Rolldown — el empaquetador Rust de Vite. Las páginas se renderizan en el servidor y se hidratan en el cliente. Completamente tipado e internacionalizado.",
			"counter": {
				"title": "Contador Interactivo",
				"description": "Este HTML fue renderizado en el servidor. Haz clic en el botón — ya está hidratado e interactivo.",
				"button": "Contador: {{count}}"
			},
			"features": {
				"rolldown": {
					"title": "Rolldown",
					"description": "Vite 8 usa Rolldown (Rust) como empaquetador — hasta 10–30× más rápido que antes."
				},
				"ssr": {
					"title": "SSR Listo",
					"description": "Renderiza HTML en el servidor para una primera carga rápida y buen SEO, luego se hidrata."
				},
				"typescript": {
					"title": "TypeScript",
					"description": "Completamente tipado — servidor, cliente y tipos compartidos verificados por tsc."
				},
				"i18n": {
					"title": "i18n",
					"description": "Traducciones JSON cargadas en el servidor y enviadas al cliente — sin peticiones extra."
				}
			}
		},
		about: {
			"title": "Acerca del Proyecto",
			"lead": "Un starter SSR mínimo y completamente tipado usando Vite 8, React 19, TypeScript e i18n.",
			"structure": { "title": "Estructura del Proyecto" },
			"flow": { "title": "Flujo SSR" },
			"i18n": {
				"title": "Cómo Funciona el i18n",
				"step1": "El servidor detecta el idioma desde la cabecera Accept-Language (o cookie)",
				"step2": "El archivo JSON correspondiente se carga y se pasa a renderToString()",
				"step3": "El idioma y las traducciones se serializan en una etiqueta <script> en el HTML",
				"step4": "El cliente lee desde esa etiqueta — sin petición extra necesaria",
				"step5": "Cambiar de idioma actualiza el contexto y re-renderiza al instante"
			}
		},
		posts: {
			"title": "Artículos",
			"lead": "Lista de artículos renderizada en el servidor. Busca y filtra — activado tras la hidratación.",
			"searchPlaceholder": "Buscar artículos…",
			"sort": {
				"label": "Ordenar:",
				"newest": "Más reciente",
				"az": "A–Z"
			},
			"all": "Todos",
			"readMore": "Leer más →",
			"empty": "Ningún artículo coincide con tu búsqueda.",
			"minRead": "min de lectura"
		},
		notFound: {
			"code": "404",
			"title": "Página No Encontrada",
			"description": "La página que buscas no existe.",
			"back": "← Volver al Inicio"
		},
		footer: "Creado con Vite 8 · React 19 · TypeScript · SSR · i18n",
		services: {
			"eyebrow": "Lo Que Hacemos",
			"title": "Servicios de Consejería y Terapia",
			"subtitle": "Ofrecemos una amplia gama de servicios para satisfacer tus necesidades personales.",
			"cta": "Explorar Nuestros Servicios",
			"readMore": "Leer Más",
			"items": {
				"individual": {
					"title": "Consejería Individual",
					"description": "Apoyo personal para superar el estrés, la ansiedad y recuperar la confianza en tu vida diaria."
				},
				"family": {
					"title": "Terapia Familiar",
					"description": "Mejora las relaciones familiares, resuelve conflictos y construye un entorno de vida saludable."
				},
				"couples": {
					"title": "Terapia de Parejas",
					"description": "Mejora la comprensión entre los socios, ayudando a fortalecer y renovar la relación."
				},
				"group": {
					"title": "Terapia de Grupo",
					"description": "Comparte experiencias y apoyo en un entorno de grupo guiado y seguro con otros en situaciones similares."
				},
				"adolescent": {
					"title": "Terapia Infantil y Adolescente",
					"description": "Apoyo especializado para niños y adolescentes que navegan desafíos emocionales y construyen resiliencia."
				},
				"trauma": {
					"title": "Consejería de Trauma",
					"description": "Terapia enfocada para ayudarte a sanar traumas pasados y recuperar un sentido de control y paz."
				}
			}
		},
		process: {
			"eyebrow": "Cómo Trabajamos",
			"title": "Proceso de Consejería y Terapia",
			"subtitle": "Apoyándote desde la consulta inicial hasta un camino exitoso hacia el bienestar mental.",
			"steps": {
				"step1": {
					"title": "Consulta Inicial",
					"description": "Contáctanos para programar tu consulta inicial gratuita. Discutimos tus necesidades y respondemos tus preguntas."
				},
				"step2": {
					"title": "Plan Personalizado",
					"description": "Juntos creamos un plan de terapia personalizado adaptado a tus objetivos y circunstancias únicas."
				},
				"step3": {
					"title": "Sesiones de Terapia",
					"description": "Comienza sesiones regulares en un entorno seguro y de apoyo, avanzando hacia un cambio significativo."
				},
				"step4": {
					"title": "Apoyo Continuo",
					"description": "Monitoreamos tu progreso y ajustamos el enfoque según sea necesario para ayudarte a mantener los cambios positivos."
				}
			}
		},
		testimonials: {
			"eyebrow": "Testimonios de Clientes",
			"title": "Lo Que Dicen Nuestros Clientes",
			"subtitle": "Escucha testimonios de primera mano sobre la curación y el cambio positivo.",
			"readMore": "Leer Más Historias",
			"stats": {
				"experience": {
					"value": "20 Años",
					"label": "Años de experiencia"
				},
				"customers": {
					"value": "2k",
					"label": "Clientes satisfechos"
				},
				"projects": {
					"value": "46",
					"label": "Proyectos completados"
				},
				"awards": {
					"value": "15",
					"label": "Premios obtenidos"
				}
			},
			"items": {
				"t1": {
					"author": "Jane Carter",
					"role": "CEO, TherapyFirst",
					"quote": "Apreciamos sinceramente el apoyo y la orientación excepcionales que brindó su equipo. Gracias especiales a Susan y Vaibhav por su dedicación."
				},
				"t2": {
					"author": "James R.",
					"role": "Cliente de Terapia de Parejas",
					"quote": "Después de solo unas pocas sesiones noté un cambio significativo. El enfoque fue reflexivo, sin prejuicios y profundamente efectivo."
				},
				"t3": {
					"author": "Elena W.",
					"role": "Cliente de Consejería",
					"quote": "Había probado otros terapeutas antes pero nunca me sentí verdaderamente escuchada. Aquí la experiencia fue completamente diferente."
				}
			}
		},
		blog: {
			"eyebrow": "Temas Favoritos",
			"title": "Blog y Recursos de Healingy",
			"subtitle": "Tu fuente de referencia para conocimientos, herramientas y consejos sobre salud mental.",
			"posts": {
				"p1": {
					"day": "12",
					"month": "Sep",
					"category": "Terapia",
					"title": "Mindfulness Para Una Mejor Salud Mental"
				},
				"p2": {
					"day": "14",
					"month": "Sep",
					"category": "Bienestar",
					"title": "Autocuidado Para el Bienestar Emocional"
				},
				"p3": {
					"day": "16",
					"month": "Sep",
					"category": "Terapia",
					"title": "Terapia Cognitivo-Conductual Para el Estrés"
				},
				"p4": {
					"day": "18",
					"month": "Sep",
					"category": "Bienestar",
					"title": "Cómo la Terapia Ayuda con el Trauma"
				}
			}
		},
		consultation: {
			"eyebrow": "Reservar una Consulta",
			"title": "Consulta Gratuita – Comienza Tu Viaje de Curación",
			"description": "Conéctate con un especialista dedicado hoy y da el primer paso hacia una vida más saludable y plena.",
			"formTitle": "Obtén una Consulta Gratuita",
			"fields": {
				"name": "Tu Nombre *",
				"email": "Tu Email *",
				"phone": "Número de Teléfono",
				"service": "Elegir Servicios",
				"message": "Tu mensaje"
			},
			"submit": "Enviar",
			"successTitle": "¡Gracias!",
			"successMessage": "Nos pondremos en contacto en 24 horas.",
			"openMap": "Abrir mapa",
			"contact": {
				"email": "hola@centrocuracion.com",
				"phone": "1-333-345-6868",
				"address": "101 E 129th St, East Chicago, IN 46312, EE.UU."
			},
			"services": [
				"Consejería Individual",
				"Terapia de Parejas",
				"Terapia Familiar",
				"Terapia de Grupo",
				"Terapia Infantil y Adolescente",
				"Consejería de Trauma"
			]
		}
	},
	fr: {
		nav: {
			"home": "Accueil",
			"about": "À propos",
			"posts": "Articles"
		},
		home: {
			"title": "Vite 8 + SSR",
			"titleHighlight": "8",
			"subtitle": "+ TypeScript + i18n",
			"description": "Propulsé par Rolldown — le bundler Rust de Vite. Les pages sont rendues côté serveur, puis hydratées côté client. Entièrement typé et internationalisé.",
			"counter": {
				"title": "Compteur Interactif",
				"description": "Ce HTML a été rendu côté serveur. Cliquez sur le bouton — il est maintenant hydraté et interactif.",
				"button": "Compteur : {{count}}"
			},
			"features": {
				"rolldown": {
					"title": "Rolldown",
					"description": "Vite 8 utilise Rolldown (Rust) — jusqu'à 10–30× plus rapide qu'avant."
				},
				"ssr": {
					"title": "SSR Prêt",
					"description": "Rendu HTML côté serveur pour un affichage rapide et un bon SEO, puis hydratation."
				},
				"typescript": {
					"title": "TypeScript",
					"description": "Entièrement typé — serveur, client et types partagés vérifiés par tsc."
				},
				"i18n": {
					"title": "i18n",
					"description": "Traductions JSON chargées côté serveur et transmises au client — sans requête supplémentaire."
				}
			}
		},
		about: {
			"title": "À Propos du Projet",
			"lead": "Un starter SSR minimal et entièrement typé utilisant Vite 8, React 19, TypeScript et i18n.",
			"structure": { "title": "Structure du Projet" },
			"flow": { "title": "Flux SSR" },
			"i18n": {
				"title": "Comment fonctionne l'i18n",
				"step1": "Le serveur détecte la langue depuis l'en-tête Accept-Language (ou un cookie)",
				"step2": "Le fichier JSON correspondant est chargé et passé à renderToString()",
				"step3": "La locale et les traductions sont sérialisées dans une balise <script> dans le HTML",
				"step4": "Le client lit depuis cette balise — aucune requête supplémentaire nécessaire",
				"step5": "Changer de langue met à jour le contexte et re-rend instantanément"
			}
		},
		posts: {
			"title": "Articles",
			"lead": "Liste d'articles rendue côté serveur. Recherchez et filtrez — activé après l'hydratation.",
			"searchPlaceholder": "Rechercher des articles…",
			"sort": {
				"label": "Trier :",
				"newest": "Plus récent",
				"az": "A–Z"
			},
			"all": "Tous",
			"readMore": "Lire la suite →",
			"empty": "Aucun article ne correspond à votre recherche.",
			"minRead": "min de lecture"
		},
		notFound: {
			"code": "404",
			"title": "Page Introuvable",
			"description": "La page que vous recherchez n'existe pas.",
			"back": "← Retour à l'Accueil"
		},
		footer: "Construit avec Vite 8 · React 19 · TypeScript · SSR · i18n",
		services: {
			"eyebrow": "Ce Que Nous Faisons",
			"title": "Services de Conseil et Thérapie",
			"subtitle": "Nous proposons une large gamme de services pour répondre à vos besoins personnels.",
			"cta": "Explorer Nos Services",
			"readMore": "Lire Plus",
			"items": {
				"individual": {
					"title": "Conseil Individuel",
					"description": "Soutien personnel pour surmonter le stress, l'anxiété et retrouver confiance au quotidien."
				},
				"family": {
					"title": "Thérapie Familiale",
					"description": "Améliorez les relations familiales, résolvez les conflits et créez un environnement de vie sain."
				},
				"couples": {
					"title": "Thérapie de Couple",
					"description": "Renforcez la compréhension entre partenaires et aidez à consolider la relation."
				},
				"group": {
					"title": "Thérapie de Groupe",
					"description": "Partagez vos expériences dans un cadre de groupe guidé et sécurisé avec d'autres personnes."
				},
				"adolescent": {
					"title": "Thérapie Enfants et Ados",
					"description": "Soutien spécialisé pour les enfants et adolescents face aux défis émotionnels."
				},
				"trauma": {
					"title": "Conseil en Traumatologie",
					"description": "Thérapie ciblée pour vous aider à guérir des traumatismes passés et retrouver la paix intérieure."
				}
			}
		},
		process: {
			"eyebrow": "Comment Nous Travaillons",
			"title": "Processus de Conseil et Thérapie",
			"subtitle": "Vous accompagnant de la consultation initiale jusqu'à un chemin réussi vers le bien-être mental.",
			"steps": {
				"step1": {
					"title": "Consultation Initiale",
					"description": "Contactez-nous pour planifier votre consultation initiale gratuite. Nous discutons de vos besoins et répondons à vos questions."
				},
				"step2": {
					"title": "Plan Personnalisé",
					"description": "Ensemble, nous créons un plan thérapeutique personnalisé adapté à vos objectifs et circonstances."
				},
				"step3": {
					"title": "Séances de Thérapie",
					"description": "Commencez des séances régulières dans un environnement sûr, en progressant vers un changement durable."
				},
				"step4": {
					"title": "Soutien Continu",
					"description": "Nous suivons vos progrès et ajustons l'approche si nécessaire pour vous aider à maintenir les changements positifs."
				}
			}
		},
		testimonials: {
			"eyebrow": "Témoignages Clients",
			"title": "Ce Que Disent Nos Clients",
			"subtitle": "Découvrez des témoignages de guérison et de changement positif.",
			"readMore": "Lire Plus de Témoignages",
			"stats": {
				"experience": {
					"value": "20 Ans",
					"label": "Années d'expérience"
				},
				"customers": {
					"value": "2k",
					"label": "Clients satisfaits"
				},
				"projects": {
					"value": "46",
					"label": "Projets réalisés"
				},
				"awards": {
					"value": "15",
					"label": "Prix obtenus"
				}
			},
			"items": {
				"t1": {
					"author": "Jane Carter",
					"role": "PDG, TherapyFirst",
					"quote": "Nous apprécions sincèrement le soutien et les conseils exceptionnels fournis par votre équipe. Merci à Susan et Vaibhav pour leur dévouement."
				},
				"t2": {
					"author": "James R.",
					"role": "Client en Thérapie de Couple",
					"quote": "Après quelques séances seulement, j'ai remarqué un changement significatif. L'approche était réfléchie, sans jugement et profondément efficace."
				},
				"t3": {
					"author": "Elena W.",
					"role": "Client en Conseil Individuel",
					"quote": "J'avais essayé d'autres thérapeutes mais je ne me sentais jamais vraiment écoutée. Ici l'expérience était complètement différente."
				}
			}
		},
		blog: {
			"eyebrow": "Sujets Favoris",
			"title": "Blog et Ressources Healingy",
			"subtitle": "Votre source de référence pour les connaissances, outils et conseils en santé mentale.",
			"posts": {
				"p1": {
					"day": "12",
					"month": "Sep",
					"category": "Thérapie",
					"title": "La Pleine Conscience Pour Une Meilleure Santé Mentale"
				},
				"p2": {
					"day": "14",
					"month": "Sep",
					"category": "Bien-être",
					"title": "L'Auto-soin Pour le Bien-être Émotionnel"
				},
				"p3": {
					"day": "16",
					"month": "Sep",
					"category": "Thérapie",
					"title": "La Thérapie Cognitive Pour le Stress"
				},
				"p4": {
					"day": "18",
					"month": "Sep",
					"category": "Bien-être",
					"title": "Comment la Thérapie Aide avec le Trauma"
				}
			}
		},
		consultation: {
			"eyebrow": "Réserver une Consultation",
			"title": "Consultation Gratuite – Commencez Votre Parcours de Guérison",
			"description": "Connectez-vous avec un spécialiste dédié aujourd'hui et faites le premier pas vers une vie plus saine.",
			"formTitle": "Obtenez une Consultation Gratuite",
			"fields": {
				"name": "Votre Nom *",
				"email": "Votre Email *",
				"phone": "Numéro de Téléphone",
				"service": "Choisir les Services",
				"message": "Votre message"
			},
			"submit": "Envoyer",
			"successTitle": "Merci !",
			"successMessage": "Nous vous contacterons dans les 24 heures.",
			"openMap": "Ouvrir la carte",
			"contact": {
				"email": "bonjour@centresoin.fr",
				"phone": "1-333-345-6868",
				"address": "101 E 129th St, East Chicago, IN 46312, États-Unis"
			},
			"services": [
				"Conseil Individuel",
				"Thérapie de Couple",
				"Thérapie Familiale",
				"Thérapie de Groupe",
				"Thérapie Enfants et Ados",
				"Conseil en Traumatologie"
			]
		}
	}
};
function getTranslations(locale) {
	return ALL_TRANSLATIONS[locale] ?? ALL_TRANSLATIONS["en"];
}
//#endregion
//#region src/server/fetchHomeData.ts
/** Simulates a ~80ms server-side data fetch */
async function fetchHomeData() {
	await new Promise((r) => setTimeout(r, 80));
	return {
		stats: [
			{
				label: "Posts Published",
				value: "5",
				trend: "+2 this week",
				up: true
			},
			{
				label: "Total Readers",
				value: "1,284",
				trend: "+18% vs last month",
				up: true
			},
			{
				label: "Avg. Read Time",
				value: "5.2m",
				trend: "-0.3m vs last month",
				up: false
			},
			{
				label: "Tags",
				value: "6",
				trend: "2 new this month",
				up: true
			}
		],
		recentPosts: [
			{
				id: 5,
				title: "TypeScript 5.5 Inferred Predicates",
				date: "2026-03-14",
				tags: ["typescript"],
				readingTime: 3
			},
			{
				id: 4,
				title: "Hydration in React Explained",
				date: "2026-03-12",
				tags: ["react", "ssr"],
				readingTime: 5
			},
			{
				id: 3,
				title: "React 19 New Features",
				date: "2026-03-10",
				tags: ["react", "typescript"],
				readingTime: 8
			}
		],
		fetchedAt: (/* @__PURE__ */ new Date()).toISOString()
	};
}
//#endregion
//#region src/mui/createEmotionCache.ts
function createEmotionCache() {
	return createCache({
		key: "css",
		prepend: true
	});
}
//#endregion
//#region src/entry-server.tsx
async function render(url, locale) {
	const translations = getTranslations(locale);
	const serverData = { homeData: await fetchHomeData() };
	const cache = createEmotionCache();
	const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);
	const html = renderToString(/* @__PURE__ */ jsx(CacheProvider, {
		value: cache,
		children: /* @__PURE__ */ jsxs(ThemeProvider, {
			theme,
			children: [/* @__PURE__ */ jsx(CssBaseline, {}), /* @__PURE__ */ jsx(StaticRouter, {
				location: url,
				children: /* @__PURE__ */ jsx(I18nProvider, {
					locale,
					translations,
					allTranslations: ALL_TRANSLATIONS,
					children: /* @__PURE__ */ jsx(App, { serverData })
				})
			})]
		})
	}));
	return {
		html,
		head: `${constructStyleTagsFromChunks(extractCriticalToChunks(html))}
    <script>
      window.__I18N__ = ${JSON.stringify({
			locale,
			translations,
			allTranslations: ALL_TRANSLATIONS
		})};
      window.__SERVER_DATA__ = ${JSON.stringify(serverData)};
    <\/script>`
	};
}
//#endregion
export { render };
