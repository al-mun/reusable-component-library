import { useState, useId } from 'react'
import type { ReactNode } from 'react'

export interface AccordionPanel {
  title: ReactNode
  content: ReactNode
}

export interface AccordionProps {
  panels: AccordionPanel[] //panel is set as an arrow of objects 
  allowMultiplePanelsExpanded?: boolean //true or false for allow multiple panels at same time
  className?: string //ready for css modules
}

export function Accordion({
  panels, 
  allowMultiplePanelsExpanded = true,
  className,
}: AccordionProps) {
  const uid = useId()
  const [expandedPanels, setExpandedPanels] = useState<Set<number>>(new Set())

  const togglePanel = (index: number) => {
    setExpandedPanels((prev) => {
      const next = new Set(prev)

      if (next.has(index)) {
        next.delete(index)
      } else {
        if (!allowMultiplePanelsExpanded) {
          next.clear()
        }
        next.add(index)
      }

      return next
    })
  }

  return (
    <div className={className}>
      {panels.map((panel, index) => {
        const isExpanded = expandedPanels.has(index)
        const buttonId = `${uid}-title-${index}`
        const regionId = `${uid}-region-${index}`

        return (
          <div key={index}>
            <h3>
              <button
                id={buttonId}
                aria-expanded={isExpanded}
                aria-controls={regionId}
                onClick={() => togglePanel(index)}
              >
                {panel.title}
              </button>
            </h3>
            <div
              id={regionId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isExpanded}
            >
              {panel.content}
            </div>
          </div>
        )
      })}
    </div>
  )
}