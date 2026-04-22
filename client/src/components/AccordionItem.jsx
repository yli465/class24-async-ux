import { useId } from "react"

export default function AccordionItem({ title, children, isExpanded, onExpand }) {

  // Accessibility: generate unique IDs for aria attributes
  const id = useId()
  const triggerId = `accordion-trigger-${id}`
  const contentId = `accordion-content-${id}`

  return (
    <>
      <h3>
        <button
          type="button"
          aria-expanded={isExpanded}
          className="accordion-trigger"
          aria-controls={contentId}
          id={triggerId}
          onClick={onExpand}
        >
          <span className="accordion-title">
            {title}
            <span className="accordion-icon" />
          </span>
        </button>
      </h3>

      <div id={contentId} role="region" aria-labelledby={triggerId} className="accordion-panel" hidden={!isExpanded}>
        {children}
      </div>
    </>
  )
}
