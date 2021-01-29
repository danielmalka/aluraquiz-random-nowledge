import React from 'react';
import { motion } from 'framer-motion';

function Path(...props) {
  return (
    <motion.path
      fill="transparent"
      strokeWidth="3"
      stroke="hsl(0, 0%, 18%)"
      strokeLinecap="round"
      {...props}
      />
  );
};


export default function CloseButton({close}) {
  return (
    <button onClick={close} className="close">
      <svg width="24px" height="24px" viewBox="0 0 24 24">
        <Path d="M 3 16.5 L 17 2.5" />
        <Path d="M 3 2.5 L 17 16" />
      </svg>
    </button>
  )
}

