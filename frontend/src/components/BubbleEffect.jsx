import React, { useEffect, useRef } from 'react';
import './BubbleEffect.css';

function BubbleEffect() {
  return (
    <div className="bubble-container">
      {[...Array(20)].map((_, i) => (
        <div key={i} className={`bubble bubble-${i + 1}`}></div>
      ))}
      {[...Array(30)].map((_, i) => (
        <div key={`snow-${i}`} className={`snowflake snowflake-${i + 1}`}>❄</div>
      ))}
    </div>
  );
}

export default BubbleEffect;
