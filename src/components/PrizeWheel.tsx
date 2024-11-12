import React, { useState, useCallback } from 'react';
import useSound from 'use-sound';
import type { Language } from '../config/language';

interface PrizeWheelProps {
  onWin: (prize: string, description: string, isFirstSpin: boolean) => void;
  spinRef: React.RefObject<() => void>;
  language: Language;
}

export default function PrizeWheel({ onWin, spinRef, language }: PrizeWheelProps) {
  const SECTORS = language.prizeWheel.prizes.map((prize, index) => ({
    ...prize,
    color: [
      '#C13584', // Instagram gradient pink
      '#E1306C', // Instagram pink
      '#833AB4', // Instagram purple
      '#5851DB', // Instagram blue
      '#405DE6', // Instagram bright blue
      '#FD1D1D', // Instagram red
    ][index],
  }));

  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winningIndex, setWinningIndex] = useState<number | null>(null);
  const [isFirstSpin, setIsFirstSpin] = useState(true);
  
  const [playClick] = useSound('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3', {
    sprite: {
      click: [0, 100],
    },
    interrupt: true,
  });

  const calculatePrizeIndex = (degrees: number) => {
    const normalizedDegrees = degrees % 360;
    const sectorSize = 360 / SECTORS.length;
    const index = Math.floor((360 - normalizedDegrees) / sectorSize);
    return index % SECTORS.length;
  };

  const getTargetRotation = (targetIndex: number) => {
    const sectorSize = 360 / SECTORS.length;
    const targetDegrees = sectorSize * targetIndex;
    const spins = 5;
    return spins * 360 + (360 - targetDegrees);
  };

  const spinWheel = useCallback(() => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setWinningIndex(null);
    
    const clickInterval = setInterval(() => playClick({ id: 'click' }), 100);
    
    // For first spin, always land on "TRY AGAIN" (last sector)
    const targetIndex = isFirstSpin ? SECTORS.length - 1 : Math.floor(Math.random() * (SECTORS.length - 1));
    const totalDegrees = rotation + getTargetRotation(targetIndex);
    
    setRotation(totalDegrees);
    
    setTimeout(() => {
      clearInterval(clickInterval);
      setIsSpinning(false);
      const index = calculatePrizeIndex(totalDegrees);
      setWinningIndex(index);
      onWin(
        SECTORS[index].prize.replace('\n', ' '),
        isFirstSpin ? language.modal.oneMoreTry : SECTORS[index].description,
        isFirstSpin
      );
      setIsFirstSpin(false);
    }, 5000);
  }, [isSpinning, rotation, playClick, onWin, isFirstSpin, SECTORS, language.modal.oneMoreTry]);

  React.useEffect(() => {
    if (spinRef) {
      spinRef.current = spinWheel;
    }
  }, [spinRef, spinWheel]);

  return (
    <div className="relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 z-10">
        <div className="w-8 h-12 relative">
          <div className="absolute w-full h-8 bg-[#833AB4] border-2 border-white rounded-t-full shadow-lg" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[16px] border-t-[#833AB4]" style={{ filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.3))' }} />
        </div>
      </div>

      <svg
        className="w-[350px] h-[350px] md:w-[500px] md:h-[500px]"
        viewBox="-50 -50 100 100"
      >
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodOpacity="0.3"/>
          </filter>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <g
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)',
          }}
          transform-origin="0 0"
        >
          {SECTORS.map((sector, i) => {
            const angle = (i * 60) - 90;
            const nextAngle = angle + 60;
            const rad = (angle * Math.PI) / 180;
            const nextRad = (nextAngle * Math.PI) / 180;
            const x1 = 40 * Math.cos(rad);
            const y1 = 40 * Math.sin(rad);
            const x2 = 40 * Math.cos(nextRad);
            const y2 = 40 * Math.sin(nextRad);
            
            const textRad = ((angle + 30) * Math.PI) / 180;
            const textX = 25 * Math.cos(textRad);
            const textY = 25 * Math.sin(textRad);
            
            const lines = sector.prize.split('\n');
            const isWinner = winningIndex === i;
            
            return (
              <g key={i}>
                <path
                  d={`M 0 0 L ${x1} ${y1} A 40 40 0 0 1 ${x2} ${y2} Z`}
                  fill={sector.color}
                  className={`transition-all duration-300 ${isWinner ? 'opacity-100 brightness-110' : 'opacity-90'}`}
                  stroke="white"
                  strokeWidth="0.5"
                  filter={isWinner ? 'url(#glow)' : 'url(#shadow)'}
                />
                <g
                  transform={`rotate(${angle + 30}, ${textX}, ${textY})`}
                  className="select-none pointer-events-none"
                >
                  {lines.map((line, lineIndex) => (
                    <text
                      key={lineIndex}
                      x={textX}
                      y={textY + (lineIndex - (lines.length - 1) / 2) * 5}
                      fill="white"
                      fontSize="4.5"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
                    >
                      {line}
                    </text>
                  ))}
                </g>
              </g>
            );
          })}
        </g>
        
        <circle cx="0" cy="0" r="5" fill="#833AB4" filter="url(#shadow)" />
        <circle cx="0" cy="0" r="3" fill="#E1306C" />
      </svg>

      <button
        onClick={spinWheel}
        disabled={isSpinning}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-gradient-to-r from-[#833AB4] to-[#E1306C] text-white px-8 py-4 rounded-full text-xl font-semibold hover:from-[#9B4DCA] hover:to-[#E4567C] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${isSpinning ? 'animate-pulse' : 'animate-pulsate'}`}
      >
        {isSpinning ? language.prizeWheel.spinningText : isFirstSpin ? language.prizeWheel.spinButton : language.prizeWheel.tryAgainButton}
      </button>
    </div>
  );
}