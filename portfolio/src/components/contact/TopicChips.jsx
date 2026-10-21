import React from 'react';
import { motion } from 'framer-motion';

export default function TopicChips({ chips, selectedChip, onSelectChip }) {
  const handleKeyDown = (e, index) => {
    let nextIndex = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % chips.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + chips.length) % chips.length;
    }
    if (nextIndex !== null) {
      onSelectChip(chips[nextIndex]);
      const nextBtn = document.getElementById(
        `topic-chip-${chips[nextIndex].replace(/\s+/g, '-').toLowerCase()}`
      );
      if (nextBtn) nextBtn.focus();
    }
  };

  return (
    <div className="topic-chips-section">
      <p id="topic-chips-label" className="topic-chips-title">
        What would you like to talk about?
      </p>

      <div
        className="topic-chips-row"
        role="radiogroup"
        aria-labelledby="topic-chips-label"
      >
        {chips.map((chip, idx) => {
          const isSelected = selectedChip === chip;
          const chipId = `topic-chip-${chip.replace(/\s+/g, '-').toLowerCase()}`;

          return (
            <button
              key={chip}
              id={chipId}
              type="button"
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => onSelectChip(chip)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`topic-chip-pill ${isSelected ? 'is-selected' : ''}`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeTopicChipBackground"
                  className="chip-active-backdrop"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="chip-text-inner">{chip}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
