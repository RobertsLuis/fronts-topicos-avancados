import { useId, useState } from 'react';

export default function Accordion({ items }) {
  const identifier = useId();
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const expanded = expandedId === item.id;
        const triggerId = `${identifier}-trigger-${index}`;
        const panelId = `${identifier}-panel-${index}`;
        return (
          <div
            className={`accordion-item${expanded ? ' is-open' : ''}`}
            key={item.id}
          >
            <h3>
              <button
                type="button"
                className="accordion-trigger"
                id={triggerId}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setExpandedId(expanded ? null : item.id)}
              >
                <span>{item.title}</span>
                <span aria-hidden="true">{expanded ? '−' : '+'}</span>
              </button>
            </h3>
            <div
              className="accordion-content"
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!expanded}
              inert={!expanded}
              data-expanded={expanded}
            >
              <div className="accordion-inner">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
