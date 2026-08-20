import { useState } from 'react'
import type { FaqItem } from '../../data/faq'
import { Icon } from './Icon'

export interface FAQAccordionProps {
  items: FaqItem[]
  /** Id of the first item to open on load. */
  defaultOpenId?: string
}

export function FAQAccordion({ items, defaultOpenId }: FAQAccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(defaultOpenId ? [defaultOpenId] : [])

  const toggle = (id: string) =>
    setOpenIds((current) =>
      current.includes(id) ? current.filter((openId) => openId !== id) : [...current, id],
    )

  return (
    <div className="divide-white/8 border-white/8 bg-night-900/50 divide-y overflow-hidden rounded-card border">
      {items.map((item) => {
        const isOpen = openIds.includes(item.id)
        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                id={`faq-trigger-${item.id}`}
                className="hover:bg-white/3 flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition sm:px-6"
              >
                <span
                  className={`font-display text-[0.98rem] font-medium transition sm:text-lg ${
                    isOpen ? 'text-glow-200' : 'text-mist-100'
                  }`}
                >
                  {item.question}
                </span>
                <Icon
                  name="chevronDown"
                  className={`text-mist-400 h-5 w-5 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'text-glow-300 rotate-180' : ''
                  }`}
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${item.id}`}
              role="region"
              aria-labelledby={`faq-trigger-${item.id}`}
              hidden={!isOpen}
              className="px-5 pb-5 sm:px-6"
            >
              <p className="text-mist-300 max-w-2xl text-[0.95rem] leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
