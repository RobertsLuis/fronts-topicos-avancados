import { useId, useRef, useState } from 'react';

export default function Tabs({
  tabs,
  onTabChange,
  label = 'Seções do painel',
}) {
  const identifier = useId();
  const buttons = useRef([]);
  const [selectedTab, setSelectedTab] = useState(tabs[0]?.id);
  const selectedIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === selectedTab),
  );

  function selectTab(tabId) {
    setSelectedTab(tabId);
    onTabChange?.(tabId);
  }

  function navigate(event, index) {
    const positions = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    };
    if (!(event.key in positions)) return;
    event.preventDefault();
    const nextIndex = positions[event.key];
    selectTab(tabs[nextIndex].id);
    buttons.current[nextIndex]?.focus();
  }

  return (
    <div className="tabs">
      <div className="tab-list" role="tablist" aria-label={label}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            className={`tab-button${index === selectedIndex ? ' is-active' : ''}`}
            role="tab"
            id={`${identifier}-tab-${index}`}
            aria-selected={index === selectedIndex}
            aria-controls={`${identifier}-panel-${index}`}
            tabIndex={index === selectedIndex ? 0 : -1}
            onClick={() => selectTab(tab.id)}
            onKeyDown={(event) => navigate(event, index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <section
          key={tab.id}
          className="tab-panel"
          id={`${identifier}-panel-${index}`}
          role="tabpanel"
          aria-labelledby={`${identifier}-tab-${index}`}
          hidden={index !== selectedIndex}
          tabIndex={0}
        >
          {tab.content}
        </section>
      ))}
    </div>
  );
}
