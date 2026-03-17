import { JSX, Children, cloneElement, isValidElement, ReactNode } from 'react'
import Box from '@mui/material/Box'

interface SectionListProps {
  children: ReactNode
}

/**
 * Wraps a list of section components and automatically injects an
 * `index` prop into each direct child, so their backgrounds alternate:
 *
 *   even index (0, 2, 4…) → background.default  (warm beige)
 *   odd  index (1, 3, 5…) → background.paper    (white)
 *
 * Usage:
 *   <SectionList>
 *     <ServicesSection />      ← index 0 → background.default
 *     <ProcessSection />       ← index 1 → background.paper
 *     <TestimonialsSection />  ← index 2 → background.default
 *     <BlogSection />          ← index 3 → background.paper
 *     <ConsultationSection />  ← index 4 → background.default
 *   </SectionList>
 *
 * To change the alternation order, just reorder the children.
 * No `bgcolor` or `index` prop needed on any section.
 */
export default function SectionList({ children }: SectionListProps): JSX.Element {
  return (
    <Box>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return cloneElement(child as any, { index: i })
      })}
    </Box>
  )
}
