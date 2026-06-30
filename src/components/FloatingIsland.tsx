/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

interface FloatingIslandProps {
  visualType: string;
  isCorrect?: boolean;
}

export const FloatingIsland: React.FC<FloatingIslandProps> = ({ visualType, isCorrect = false }) => {
  // Render cartoon SVG assets based on visualType
  const renderVisualAsset = () => {
    switch (visualType) {
      case 'apple':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_20px_35px_rgba(239,68,68,0.45)]">
            <defs>
              <radialGradient id="appleGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ff6b6b" />
                <stop offset="65%" stopColor="#e81d1d" />
                <stop offset="100%" stopColor="#a30808" />
              </radialGradient>
              <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a8e063" />
                <stop offset="100%" stopColor="#56ab2f" />
              </linearGradient>
            </defs>
            {/* Stem */}
            <path d="M100,50 Q105,25 118,20 Q116,40 102,48 Z" fill="#8B4513" />
            {/* Leaf */}
            <path d="M105,28 Q130,12 145,28 Q118,38 105,28 Z" fill="url(#leafGrad)" />
            {/* Main Apple Body */}
            <path
              d="M100,60 C75,55 35,70 35,115 C35,160 75,175 100,165 C125,175 165,160 165,115 C165,70 125,55 100,60 Z"
              fill="url(#appleGrad)"
            />
            {/* Shiny Highlight */}
            <ellipse cx="70" cy="90" rx="15" ry="25" fill="#ffffff" opacity="0.45" transform="rotate(-25 70 90)" />
            <ellipse cx="60" cy="80" rx="5" ry="8" fill="#ffffff" opacity="0.6" transform="rotate(-25 60 80)" />
          </svg>
        );

      case 'rabbit':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_20px_35px_rgba(160,174,192,0.4)]">
            <defs>
              <radialGradient id="rabbitGrad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="85%" stopColor="#f7fafc" />
                <stop offset="100%" stopColor="#e2e8f0" />
              </radialGradient>
              <linearGradient id="earGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffb6c1" />
                <stop offset="100%" stopColor="#ff9eb5" />
              </linearGradient>
            </defs>
            {/* Back Ear */}
            <path d="M75,65 Q65,10 55,15 Q65,65 75,70 Z" fill="url(#rabbitGrad)" />
            <path d="M72,60 Q65,22 59,25 Q65,60 72,63 Z" fill="url(#earGrad)" opacity="0.8" />
            {/* Front Ear */}
            <path d="M90,60 Q85,5 75,10 Q80,60 90,65 Z" fill="url(#rabbitGrad)" />
            <path d="M87,55 Q82,17 76,20 Q80,55 87,58 Z" fill="url(#earGrad)" />
            {/* Feet */}
            <ellipse cx="70" cy="165" rx="15" ry="10" fill="url(#rabbitGrad)" />
            <ellipse cx="130" cy="165" rx="15" ry="10" fill="url(#rabbitGrad)" />
            {/* Fluffy Tail */}
            <circle cx="50" cy="145" r="16" fill="#f7fafc" />
            {/* Body */}
            <ellipse cx="100" cy="135" rx="45" ry="35" fill="url(#rabbitGrad)" />
            {/* Head */}
            <circle cx="115" cy="85" r="28" fill="url(#rabbitGrad)" />
            {/* Cheek Pink */}
            <circle cx="125" cy="95" r="6" fill="#ffb6c1" opacity="0.6" />
            {/* Eye */}
            <circle cx="124" cy="80" r="4.5" fill="#2d3748" />
            <circle cx="126" cy="78" r="1.5" fill="#ffffff" />
            {/* Nose */}
            <polygon points="138,87 138,91 134,89" fill="#ff9eb5" />
            {/* Whiskers */}
            <line x1="135" y1="94" x2="152" y2="94" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" />
            <line x1="134" y1="91" x2="150" y2="86" stroke="#a0aec0" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'duck':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_20px_35px_rgba(246,224,94,0.55)]">
            <defs>
              <radialGradient id="duckGrad" cx="40%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#fff380" />
                <stop offset="80%" stopColor="#f6e05e" />
                <stop offset="100%" stopColor="#d69e2e" />
              </radialGradient>
              <linearGradient id="beakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ed8936" />
                <stop offset="100%" stopColor="#dd6b20" />
              </linearGradient>
            </defs>
            {/* Wing */}
            <path d="M75,130 Q105,100 135,120 Q105,150 75,130 Z" fill="url(#duckGrad)" opacity="0.7" />
            {/* Tail */}
            <path d="M45,110 Q50,90 60,95 Q55,115 45,110 Z" fill="url(#duckGrad)" />
            {/* Body */}
            <path d="M50,110 C50,150 140,155 140,110 C140,85 115,80 115,80 L105,80 C105,80 50,75 50,110 Z" fill="url(#duckGrad)" />
            {/* Neck & Head */}
            <path d="M100,100 L110,75 C110,75 110,45 128,45 C145,45 145,75 145,75 L135,100 Z" fill="url(#duckGrad)" />
            {/* Cheek Blush */}
            <circle cx="120" cy="65" r="7" fill="#f56565" opacity="0.5" />
            {/* Eye */}
            <circle cx="125" cy="58" r="4.5" fill="#2d3748" />
            <circle cx="127" cy="56" r="1.5" fill="#ffffff" />
            {/* Beak */}
            <path d="M138,58 Q165,60 155,72 C143,72 138,65 138,58 Z" fill="url(#beakGrad)" />
          </svg>
        );

      case 'elephant':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_20px_35px_rgba(90,103,191,0.35)]">
            <defs>
              <radialGradient id="eleGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#b3c5e6" />
                <stop offset="80%" stopColor="#7a97c7" />
                <stop offset="100%" stopColor="#5575a6" />
              </radialGradient>
              <linearGradient id="innerEarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffccd5" />
                <stop offset="100%" stopColor="#ffa6b6" />
              </linearGradient>
            </defs>
            {/* Feet */}
            <rect x="65" y="145" width="22" height="30" rx="8" fill="url(#eleGrad)" />
            <rect x="110" y="145" width="22" height="30" rx="8" fill="url(#eleGrad)" />
            {/* Tail */}
            <path d="M48,125 Q32,130 35,145" stroke="#7a97c7" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* Body */}
            <ellipse cx="95" cy="120" rx="55" ry="42" fill="url(#eleGrad)" />
            {/* Head */}
            <circle cx="130" cy="95" r="33" fill="url(#eleGrad)" />
            {/* Trunk */}
            <path
              d="M148,102 Q180,108 172,130 Q164,142 152,132"
              stroke="url(#eleGrad)"
              strokeWidth="15"
              strokeLinecap="round"
              fill="none"
            />
            {/* Eye */}
            <circle cx="138" cy="85" r="5" fill="#2d3748" />
            <circle cx="140" cy="83" r="1.5" fill="#ffffff" />
            {/* Cheek Blush */}
            <circle cx="128" cy="98" r="6" fill="#ffa6b6" opacity="0.6" />
            {/* Big Ear */}
            <ellipse cx="98" cy="88" rx="28" ry="34" fill="url(#eleGrad)" />
            <ellipse cx="98" cy="88" rx="20" ry="26" fill="url(#innerEarGrad)" />
          </svg>
        );

      case 'fish':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_20px_35px_rgba(237,137,54,0.45)]">
            <defs>
              <linearGradient id="fishGrad" x1="0%" y1="30%" x2="100%" y2="70%">
                <stop offset="0%" stopColor="#f6ad55" />
                <stop offset="50%" stopColor="#ed8936" />
                <stop offset="100%" stopColor="#dd6b20" />
              </linearGradient>
              <linearGradient id="finGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fbd38d" />
                <stop offset="100%" stopColor="#f6ad55" />
              </linearGradient>
            </defs>
            {/* Back Fin */}
            <path d="M45,100 Q15,70 20,100 Q15,130 45,100 Z" fill="url(#finGrad)" />
            {/* Top Fin */}
            <path d="M85,65 Q110,35 130,62 Z" fill="url(#finGrad)" />
            {/* Bottom Fin */}
            <path d="M95,135 Q115,155 125,133 Z" fill="url(#finGrad)" />
            {/* Main Fish Body */}
            <path d="M40,100 C60,60 145,55 165,100 C145,145 60,140 40,100 Z" fill="url(#fishGrad)" />
            {/* White Stripes */}
            <path d="M100,68 C110,85 110,115 100,132" stroke="#ffffff" strokeWidth="12" fill="none" opacity="0.9" />
            <path d="M70,75 C78,88 78,112 70,125" stroke="#ffffff" strokeWidth="10" fill="none" opacity="0.9" />
            {/* Pectoral Fin */}
            <path d="M110,105 Q125,115 118,125 Q105,120 110,105 Z" fill="url(#finGrad)" />
            {/* Eye */}
            <circle cx="142" cy="90" r="7.5" fill="#2d3748" />
            <circle cx="145" cy="87" r="2.5" fill="#ffffff" />
            {/* Friendly Smile */}
            <path d="M152,102 Q145,112 138,105" stroke="#dd6b20" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          </svg>
        );

      case 'airplane':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_20px_35px_rgba(56,178,172,0.4)]">
            <defs>
              <linearGradient id="planeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e6fffa" />
                <stop offset="80%" stopColor="#b2f5ea" />
                <stop offset="100%" stopColor="#4fd1c5" />
              </linearGradient>
              <linearGradient id="wingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#319795" />
                <stop offset="100%" stopColor="#234e52" />
              </linearGradient>
            </defs>
            {/* Back Wing / Tail */}
            <polygon points="40,95 18,65 32,65 52,90" fill="url(#wingGrad)" />
            {/* Back Wing Top */}
            <polygon points="50,90 25,35 42,35 65,85" fill="url(#wingGrad)" />
            {/* Main Body */}
            <path d="M25,100 C25,82 145,65 175,98 C145,130 25,112 25,100 Z" fill="url(#planeGrad)" />
            {/* Front Wing */}
            <polygon points="100,105 115,165 135,165 125,105" fill="url(#wingGrad)" />
            {/* Nose Cone */}
            <path d="M164,88 Q178,98 164,108 Z" fill="#e53e3e" />
            {/* Cabin Windows */}
            <circle cx="75" cy="95" r="4.5" fill="#2d3748" opacity="0.7" />
            <circle cx="95" cy="95" r="4.5" fill="#2d3748" opacity="0.7" />
            <circle cx="115" cy="95" r="4.5" fill="#2d3748" opacity="0.7" />
            <circle cx="135" cy="95" r="4.5" fill="#2d3748" opacity="0.7" />
          </svg>
        );

      case 'cat':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_20px_35px_rgba(246,173,85,0.4)]">
            <defs>
              <radialGradient id="catBodyGrad" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#fbd38d" />
                <stop offset="70%" stopColor="#f6ad55" />
                <stop offset="100%" stopColor="#dd6b20" />
              </radialGradient>
              <linearGradient id="catEar" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#feb2b2" />
                <stop offset="100%" stopColor="#f6ad55" />
              </linearGradient>
            </defs>
            {/* Tail */}
            <path d="M48,135 Q22,125 35,90 Q42,95 40,110 L48,125" fill="url(#catBodyGrad)" />
            {/* Body */}
            <ellipse cx="90" cy="130" rx="46" ry="34" fill="url(#catBodyGrad)" />
            {/* Back Feet */}
            <ellipse cx="60" cy="160" rx="12" ry="7" fill="#fbd38d" />
            <ellipse cx="120" cy="160" rx="12" ry="7" fill="#fbd38d" />
            {/* Head */}
            <circle cx="120" cy="90" r="28" fill="url(#catBodyGrad)" />
            {/* Ears */}
            <polygon points="98,75 106,45 118,68" fill="url(#catEar)" />
            <polygon points="122,68 134,45 142,75" fill="url(#catEar)" />
            {/* Cheeks */}
            <circle cx="110" cy="98" r="5" fill="#feb2b2" opacity="0.6" />
            <circle cx="130" cy="98" r="5" fill="#feb2b2" opacity="0.6" />
            {/* Closed sleeping eyes */}
            <path d="M106,88 Q111,94 116,88" stroke="#2d3748" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M124,88 Q129,94 134,88" stroke="#2d3748" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            {/* Pink Nose */}
            <polygon points="118,94 122,94 120,97" fill="#f56565" />
            {/* Whiskers */}
            <line x1="134" y1="96" x2="148" y2="92" stroke="#4a5568" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="135" y1="101" x2="149" y2="101" stroke="#4a5568" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="106" y1="96" x2="92" y2="92" stroke="#4a5568" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="105" y1="101" x2="91" y2="101" stroke="#4a5568" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );

      case 'banana':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_20px_35px_rgba(236,201,75,0.45)]">
            <defs>
              <linearGradient id="bananaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="30%" stopColor="#fef08a" />
                <stop offset="75%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>
            </defs>
            {/* Main Banana 1 */}
            <path
              d="M145,55 C120,75 55,100 55,145 C55,152 65,155 72,148 C105,115 155,95 160,65 Z"
              fill="url(#bananaGrad)"
            />
            {/* Main Banana 2 (Offset) */}
            <path
              d="M135,45 C110,65 42,95 42,135 C42,142 52,145 60,138 C90,105 142,85 148,55 Z"
              fill="url(#bananaGrad)"
              opacity="0.85"
            />
            {/* Stem base (Brown) */}
            <path d="M135,45 Q145,35 152,40 Q148,52 138,50 Z" fill="#713f12" />
            {/* Tips (Brown) */}
            <circle cx="55" cy="144" r="5" fill="#451a03" />
            <circle cx="42" cy="134" r="4.5" fill="#451a03" />
          </svg>
        );

      case 'house':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_20px_35px_rgba(245,101,101,0.4)]">
            <defs>
              <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fc8181" />
                <stop offset="100%" stopColor="#e53e3e" />
              </linearGradient>
              <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ebf8ff" />
                <stop offset="100%" stopColor="#bee3f8" />
              </linearGradient>
              <linearGradient id="doorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#b7791f" />
                <stop offset="100%" stopColor="#744210" />
              </linearGradient>
            </defs>
            {/* Chimney */}
            <rect x="60" y="45" width="16" height="35" fill="#a0aec0" />
            <rect x="56" y="40" width="24" height="6" fill="#4a5568" />
            {/* Roof (Triangle) */}
            <polygon points="100,28 35,80 165,80" fill="url(#roofGrad)" />
            {/* Main Walls */}
            <rect x="48" y="80" width="104" height="80" rx="5" fill="url(#wallGrad)" />
            {/* Wooden Door */}
            <rect x="85" y="115" width="30" height="45" rx="3" fill="url(#doorGrad)" />
            <circle cx="92" cy="138" r="2.5" fill="#ecc94b" />
            {/* Round Window */}
            <circle cx="100" cy="58" r="10" fill="#feebc8" stroke="#dd6b20" strokeWidth="2" />
            <line x1="100" y1="48" x2="100" y2="68" stroke="#dd6b20" strokeWidth="1.5" />
            <line x1="90" y1="58" x2="110" y2="58" stroke="#dd6b20" strokeWidth="1.5" />
            {/* Square Windows */}
            <rect x="60" y="95" width="22" height="22" rx="2" fill="#fff" stroke="#4299e1" strokeWidth="2.5" />
            <line x1="71" y1="95" x2="71" y2="117" stroke="#4299e1" strokeWidth="1.5" />
            <line x1="60" y1="106" x2="82" y2="106" stroke="#4299e1" strokeWidth="1.5" />

            <rect x="118" y="95" width="22" height="22" rx="2" fill="#fff" stroke="#4299e1" strokeWidth="2.5" />
            <line x1="129" y1="95" x2="129" y2="117" stroke="#4299e1" strokeWidth="1.5" />
            <line x1="118" y1="106" x2="140" y2="106" stroke="#4299e1" strokeWidth="1.5" />
          </svg>
        );

      case 'monkey':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_20px_35px_rgba(139,69,19,0.4)]">
            <defs>
              <radialGradient id="monkeyBody" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#a0522d" />
                <stop offset="70%" stopColor="#8b4513" />
                <stop offset="100%" stopColor="#5c2e0b" />
              </radialGradient>
              <linearGradient id="faceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffeedd" />
                <stop offset="100%" stopColor="#f3d9c1" />
              </linearGradient>
            </defs>
            {/* Ears */}
            <circle cx="50" cy="100" r="18" fill="url(#monkeyBody)" />
            <circle cx="50" cy="100" r="11" fill="url(#faceGrad)" />
            <circle cx="150" cy="100" r="18" fill="url(#monkeyBody)" />
            <circle cx="150" cy="100" r="11" fill="url(#faceGrad)" />
            {/* Tail */}
            <path d="M60,135 Q30,170 15,145 Q8,135 20,130" stroke="#8b4513" strokeWidth="6" strokeLinecap="round" fill="none" />
            {/* Main Head */}
            <circle cx="100" cy="105" r="42" fill="url(#monkeyBody)" />
            {/* Face Mask */}
            <ellipse cx="88" cy="108" rx="20" ry="24" fill="url(#faceGrad)" />
            <ellipse cx="112" cy="108" rx="20" ry="24" fill="url(#faceGrad)" />
            <ellipse cx="100" cy="120" rx="28" ry="20" fill="url(#faceGrad)" />
            {/* Eyes */}
            <circle cx="88" cy="98" r="4" fill="#2d3748" />
            <circle cx="90" cy="96" r="1.5" fill="#ffffff" />
            <circle cx="112" cy="98" r="4" fill="#2d3748" />
            <circle cx="114" cy="96" r="1.5" fill="#ffffff" />
            {/* Snout/Nose */}
            <ellipse cx="100" cy="115" rx="5" ry="3.5" fill="#a0522d" opacity="0.8" />
            {/* Happy Smile */}
            <path d="M88,122 Q100,132 112,122" stroke="#5c2e0b" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative w-full max-w-[180px] h-[180px] md:max-w-[280px] md:h-[280px] flex items-center justify-center select-none">
      {/* Cartoon Sky and Cloud Backdrop behind the island */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300/40 to-cyan-100/10 rounded-full blur-2xl opacity-60 scale-110 pointer-events-none" />

      {/* Floating Island (Layered 3D Perspective Shapes) */}
      <div className="absolute bottom-[2%] w-[150px] h-[55px] md:w-[250px] md:h-[90px] pointer-events-none">
        {/* Layer 3: Main Island Shadow */}
        <div className="absolute inset-0 bg-emerald-950/20 blur-md rounded-full scale-105 translate-y-1 md:translate-y-2" />

        {/* Layer 2: 3D Dirt/Rock layer underneath */}
        <div className="absolute top-[12px] md:top-[20px] left-[5%] w-[90%] h-[42px] md:h-[70px] bg-gradient-to-b from-amber-800 to-amber-950 rounded-full shadow-[inset_0_-8px_16px_rgba(0,0,0,0.6)] transform rotate-1 scale-x-95">
          {/* Layered steps in the 3D mud/rock */}
          <div className="absolute bottom-1 left-[25%] w-[50%] h-[8px] md:h-[12px] bg-amber-900 rounded-full opacity-60" />
        </div>

        {/* Layer 1: Grassy Floating Platform on Top */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.35),_inset_0_4px_8px_rgba(255,255,255,0.45)] flex flex-col justify-between p-1 overflow-hidden">
          {/* Subtle grass pattern/sparkle inside */}
          <div className="w-full h-full relative rounded-full opacity-35 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]" />
        </div>

        {/* Tiny cartoon flowers and grass blades popping off the island */}
        <div className="absolute -top-[8px] md:-top-[12px] left-[20%] w-[6px] md:w-[10px] h-[12px] md:h-[18px] bg-emerald-500 rounded-t-full rotate-[-15deg]" />
        <div className="absolute -top-[10px] md:-top-[16px] left-[24%] w-[8px] md:w-[12px] h-[14px] md:h-[22px] bg-emerald-400 rounded-t-full rotate-[10deg]" />
        <div className="absolute -top-[6px] md:-top-[10px] right-[25%] w-[6px] md:w-[10px] h-[10px] md:h-[16px] bg-emerald-500 rounded-t-full rotate-[20deg]" />

        {/* Mini Cartoon Flower */}
        <div className="absolute -top-[10px] md:-top-[14px] left-[15%] flex items-center justify-center">
          <div className="absolute w-[5px] md:w-[8px] h-[5px] md:h-[8px] bg-yellow-400 rounded-full" />
          <div className="absolute w-[2px] md:w-[4px] h-[2px] md:h-[4px] bg-white rounded-full -top-0.5 md:-top-1" />
          <div className="absolute w-[2px] md:w-[4px] h-[2px] md:h-[4px] bg-white rounded-full -bottom-0.5 md:-bottom-1" />
          <div className="absolute w-[2px] md:w-[4px] h-[2px] md:h-[4px] bg-white rounded-full -left-0.5 md:-left-1" />
          <div className="absolute w-[2px] md:w-[4px] h-[2px] md:h-[4px] bg-white rounded-full -right-0.5 md:-right-1" />
        </div>
        <div className="absolute -top-[6px] md:-top-[10px] right-[18%] flex items-center justify-center">
          <div className="absolute w-[4px] md:w-[6px] h-[4px] md:h-[6px] bg-pink-400 rounded-full" />
          <div className="absolute w-[2px] md:w-[3px] h-[2px] md:h-[3px] bg-white rounded-full -top-0.5" />
          <div className="absolute w-[2px] md:w-[3px] h-[2px] md:h-[3px] bg-white rounded-full -bottom-0.5" />
          <div className="absolute w-[2px] md:w-[3px] h-[2px] md:h-[3px] bg-white rounded-full -left-0.5" />
          <div className="absolute w-[2px] md:w-[3px] h-[2px] md:h-[3px] bg-white rounded-full -right-0.5" />
        </div>
      </div>

      {/* Dynamic 3D Object Shadow underneath the object on the grass */}
      <motion.div
        className="absolute bottom-[20px] md:bottom-[35px] w-[70px] md:w-[110px] h-[15px] md:h-[25px] bg-emerald-950/40 rounded-full blur-sm pointer-events-none"
        animate={{
          scale: isCorrect ? [1, 1.25, 1] : [1, 0.85, 1],
          opacity: isCorrect ? [0.4, 0.5, 0.4] : [0.4, 0.6, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: isCorrect ? 0.6 : 3.2,
          ease: 'easeInOut',
        }}
      />

      {/* Floating Level Asset Component */}
      <motion.div
        className="absolute bottom-[30px] md:bottom-[50px] w-[120px] md:w-[200px] h-[120px] md:h-[200px] flex items-center justify-center cursor-pointer active:scale-105 transition-transform duration-200"
        animate={
          isCorrect
            ? {
                y: [0, -25, -2, -12, 0],
                rotate: [0, 15, -10, 5, 0],
                scale: [1, 1.15, 1.05, 1.1, 1],
              }
            : {
                y: [0, -12, 0],
                rotate: [0, 2.5, -2.5, 0],
              }
        }
        transition={{
          repeat: isCorrect ? 0 : Infinity,
          duration: isCorrect ? 1.0 : 3.2,
          ease: 'easeInOut',
        }}
      >
        {renderVisualAsset()}
      </motion.div>
    </div>
  );
};
