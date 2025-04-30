
import React from 'react';

interface DoobleArrowProps {
  className?: string;
  color?: string;
  direction?: 'right' | 'left' | 'up' | 'down';
}

const DoobleArrow = ({ 
  className = "", 
  color = "#7C65F6", 
  direction = 'right' 
}: DoobleArrowProps) => {

  const getRotation = () => {
    switch(direction) {
      case 'right': return '';
      case 'left': return 'rotate-180';
      case 'up': return '-rotate-90';
      case 'down': return 'rotate-90';
      default: return '';
    }
  };

  return (
    <svg
      className={`${className} ${getRotation()}`}
      width="60"
      height="30"
      viewBox="0 0 60 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 15C10.6667 15.6667 33.2 18.8 49 22C37 18.8 23.6667 12 19 9M35 3C40.1667 5.83333 51.6 13.4 57 21C53.8 19.8 45.6667 18.3333 42 18"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DoobleArrow;
