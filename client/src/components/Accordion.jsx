import { useState } from "react"
import AccordionItem from "./AccordionItem"

export default function Accordion({ items = [] }) {
  const [expandedItem, setExpandedItem] = useState(0)

  return (
    <div id="accordionGroup" className="accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={item.title}
          title={item.title}
          isExpanded={expandedItem === index}
          onExpand={() => setExpandedItem(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  )
}
