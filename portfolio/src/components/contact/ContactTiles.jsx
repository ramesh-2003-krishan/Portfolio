import React from 'react';
import { motion } from 'framer-motion';

function TileIcon({ type }) {
  switch (type) {
    case 'address':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      );
    case 'email':
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      );
  }
}

export default function ContactTiles({ tiles, selectedTileId, onSelectTile }) {
  const handleKeyDown = (e, index) => {
    let nextIndex = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (index + 1) % tiles.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (index - 1 + tiles.length) % tiles.length;
    }
    if (nextIndex !== null) {
      onSelectTile(tiles[nextIndex].id);
      const nextBtn = document.getElementById(`contact-tile-${tiles[nextIndex].id}`);
      if (nextBtn) nextBtn.focus();
    }
  };

  return (
    <div
      className="contact-tiles-row"
      role="radiogroup"
      aria-label="Direct contact methods"
    >
      {tiles.map((tile, idx) => {
        const isSelected = selectedTileId === tile.id;
        return (
          <button
            key={tile.id}
            id={`contact-tile-${tile.id}`}
            type="button"
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onSelectTile(tile.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            className={`contact-tile-btn ${isSelected ? 'is-selected' : ''}`}
          >
            {isSelected && (
              <motion.div
                layoutId="activeContactTileBackground"
                className="tile-active-backdrop"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}
            <span className="tile-content-inner">
              <span className="tile-icon-wrap" aria-hidden="true">
                <TileIcon type={tile.iconType} />
              </span>
              <span className="tile-label">{tile.label}</span>
              <span
                className={`tile-value ${
                  tile.id === 'email'
                    ? 'cemail'
                    : tile.id === 'phone'
                    ? 'cphone'
                    : ''
                }`}
                title={tile.value}
              >
                {tile.value}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
