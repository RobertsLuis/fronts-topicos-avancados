import { useEffect, useId, useRef, useState } from 'react';

export default function Dropdown({ label, value, options, onChange }) {
  const identifier = useId();
  const container = useRef(null);
  const trigger = useRef(null);
  const optionButtons = useRef([]);
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const selectedIndex = options.findIndex((option) => option.value === value);
  const selectedOption = options[selectedIndex];

  useEffect(() => {
    if (!open) return undefined;
    function closeOutside(event) {
      if (!container.current?.contains(event.target)) setOpen(false);
    }
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('focusin', closeOutside);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('focusin', closeOutside);
    };
  }, [open]);

  useEffect(() => {
    if (open) optionButtons.current[focusedIndex]?.focus();
  }, [open, focusedIndex]);

  function openMenu(index = Math.max(0, selectedIndex)) {
    if (!options.length) return;
    setFocusedIndex(index);
    setOpen(true);
  }

  function selectOption(option) {
    onChange(option.value);
    setOpen(false);
    trigger.current?.focus();
  }

  function navigate(event) {
    const positions = {
      ArrowDown: (focusedIndex + 1) % options.length,
      ArrowUp: (focusedIndex - 1 + options.length) % options.length,
      Home: 0,
      End: options.length - 1,
    };
    if (event.key in positions) {
      event.preventDefault();
      setFocusedIndex(positions[event.key]);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
      trigger.current?.focus();
    } else if (event.key === 'Tab') {
      setOpen(false);
    }
  }

  return (
    <div className="dropdown" ref={container}>
      <button
        ref={trigger}
        type="button"
        className={`dropdown-trigger${open ? ' is-open' : ''}`}
        aria-label={`${label}: ${selectedOption?.label || 'Selecionar'}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${identifier}-options`}
        disabled={!options.length}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            openMenu(
              event.key === 'ArrowUp'
                ? options.length - 1
                : Math.max(0, selectedIndex),
            );
          }
        }}
      >
        <span>{selectedOption?.label || label}</span>
        <span aria-hidden="true">⌄</span>
      </button>
      {open && (
        <div
          className="dropdown-menu"
          role="listbox"
          id={`${identifier}-options`}
          aria-label={label}
          onKeyDown={navigate}
        >
          {options.map((option, index) => (
            <button
              key={option.value}
              ref={(element) => {
                optionButtons.current[index] = element;
              }}
              type="button"
              role="option"
              aria-selected={option.value === value}
              tabIndex={index === focusedIndex ? 0 : -1}
              className={`dropdown-option${option.value === value ? ' is-selected' : ''}`}
              onClick={() => selectOption(option)}
              onFocus={() => setFocusedIndex(index)}
            >
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
