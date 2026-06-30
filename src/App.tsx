/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, GameMode, GameStats } from './types';
import { WORD_LEVELS, TRANSLATIONS, LANGUAGES_INFO } from './data/words';
import { gameAudio } from './components/AudioEngine';
import { FloatingIsland } from './components/FloatingIsland';
import { WordBuilder } from './components/WordBuilder';
import { ParentDashboard } from './components/ParentDashboard';
import { ScreenshotModal } from './components/ScreenshotModal';
import {
  Star,
  Home,
  RotateCcw,
  Volume2,
  VolumeX,
  Award,
  Camera,
  Play,
  Heart,
  Trophy,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function App() {
  // 1. Core State
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);
  const [currentLevelIndex, setCurrentLevelIndex] = useState<number>(0);
  const [currentMode, setCurrentMode] = useState<GameMode>('full');
  
  const [stars, setStars] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [totalElapsedTime, setTotalElapsedTime] = useState<number>(0);

  // Sound and UI states
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [showParentDashboard, setShowParentDashboard] = useState<boolean>(false);
  const [showScreenshot, setShowScreenshot] = useState<boolean>(false);
  const [gameState, setGameState] = useState<'lang_select' | 'mode_select' | 'playing' | 'completed'>('lang_select');

  // Animation and level progress feedback
  const [levelSuccess, setLevelSuccess] = useState<boolean>(false);
  const [celebrationConfetti, setCelebrationConfetti] = useState<{ id: number; x: number; y: number; color: string }[]>([]);

  // Calculate current active levels list based on language
  const activeLevels = currentLanguage ? WORD_LEVELS[currentLanguage] : [];
  const currentLevelItem = activeLevels[currentLevelIndex];

  // Initialize SpeechSynthesis on mount/interaction and manage background music
  useEffect(() => {
    gameAudio.toggleSound(soundEnabled);
    gameAudio.toggleVoice(voiceEnabled);
    if (soundEnabled && gameState === 'playing') {
      gameAudio.startBGM();
    } else {
      gameAudio.stopBGM();
    }
  }, [soundEnabled, voiceEnabled, gameState]);

  // Track time played
  useEffect(() => {
    if (gameState === 'playing' && startTime === 0) {
      setStartTime(Date.now());
    } else if (gameState !== 'playing' && startTime > 0) {
      const elapsed = Math.round((Date.now() - startTime) / 1000);
      setTotalElapsedTime(prev => prev + elapsed);
      setStartTime(0);
    }
  }, [gameState, startTime]);

  // Spawn confetti particles for rewards
  const triggerConfetti = () => {
    const colors = ['#f43f5e', '#3b82f6', '#eab308', '#10b981', '#a855f7', '#ff7849'];
    const particles = Array.from({ length: 45 }).map((_, i) => ({
      id: Date.now() + i,
      x: 10 + Math.random() * 80, // percentage x-axis
      y: 10 + Math.random() * 40, // percentage y-axis
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setCelebrationConfetti(particles);
    // Clear after animation
    setTimeout(() => setCelebrationConfetti([]), 3500);
  };

  // Handle successful word building completion
  const handleLevelSuccess = () => {
    setLevelSuccess(true);
    setStars(prev => prev + 3);
    setScore(prev => prev + 100);
    setCorrectCount(prev => prev + 1);

    if (soundEnabled) {
      gameAudio.playKidsCheering();
      // Pronounce spelled word in native language
      if (currentLanguage && currentLevelItem) {
        setTimeout(() => {
          gameAudio.speak(currentLevelItem.phonetic, currentLanguage);
        }, 1200);
      }
    }

    triggerConfetti();
  };

  // Move to next level or complete adventure
  const handleNextLevel = () => {
    setLevelSuccess(false);
    if (currentLevelIndex < activeLevels.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
    } else {
      setGameState('completed');
      if (soundEnabled) {
        gameAudio.playSuccess();
      }
    }
  };

  // Reset the game/level
  const handleRestart = () => {
    setCurrentLevelIndex(0);
    setStars(0);
    setScore(0);
    setCorrectCount(0);
    setStartTime(Date.now());
    setTotalElapsedTime(0);
    setLevelSuccess(false);
    setGameState('playing');
    if (soundEnabled) gameAudio.playClick();
  };

  // Handle wrong letter drops/placements
  const handleWrongDrop = () => {
    // Child-friendly feedback - does not subtract scores
  };

  // Get active translations
  const activeT = currentLanguage ? TRANSLATIONS[currentLanguage] : TRANSLATIONS.en;
  const isRTL = currentLanguage === 'ar';

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#87CEEB] to-[#E0F7FA] overflow-x-hidden flex flex-col select-none">
      
      {/* Absolute floating clouds on background layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ x: [-100, window.innerWidth + 100] }}
          transition={{ repeat: Infinity, duration: 45, ease: 'linear' }}
          className="absolute top-[8%] opacity-35"
        >
          <svg width="120" height="80" viewBox="0 0 120 80" fill="#ffffff">
            <path d="M30 40 a20 20 0 0 1 40 0 a25 25 0 0 1 50 0 a15 15 0 0 1 0 30 L10 70 a15 15 0 0 1 0 -30 Z" />
          </svg>
        </motion.div>
        <motion.div
          animate={{ x: [window.innerWidth + 100, -100] }}
          transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
          className="absolute top-[22%] opacity-20"
        >
          <svg width="160" height="100" viewBox="0 0 120 80" fill="#ffffff">
            <path d="M30 40 a20 20 0 0 1 40 0 a25 25 0 0 1 50 0 a15 15 0 0 1 0 30 L10 70 a15 15 0 0 1 0 -30 Z" />
          </svg>
        </motion.div>
        <div className="absolute bottom-4 left-6 text-[10px] text-blue-900/40 font-semibold tracking-wider font-mono">
          IMPACT HUB EGYPT EDU COOP
        </div>
      </div>

      {/* Confetti celebration container */}
      {celebrationConfetti.map(p => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, x: `${p.x}%`, y: '-5%' }}
          animate={{
            y: '105%',
            rotate: [0, 360],
            opacity: [1, 1, 0]
          }}
          transition={{ duration: 2.2 + Math.random() * 1.5, ease: 'easeOut' }}
          className="fixed w-3.5 h-3.5 rounded-sm z-50 pointer-events-none"
          style={{ backgroundColor: p.color }}
        />
      ))}

      {/* RENDER VIEW: 1. LANGUAGE SELECT */}
      {gameState === 'lang_select' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full text-center space-y-8"
          >
            {/* Main branding & Title Card */}
            <div className="space-y-3.5">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="inline-flex p-4 bg-white/80 rounded-3xl shadow-xl shadow-teal-700/5 border border-white"
              >
                <Trophy className="w-12 h-12 text-teal-600" />
              </motion.div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
                3D Word Builder Adventure
              </h1>
              <p className="text-xs font-bold text-teal-700 tracking-widest uppercase">
                Game #3 — Impact Hub Egypt Educational Collection
              </p>
            </div>

            {/* Selection instructions */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl py-3 px-6 max-w-sm mx-auto border border-white/40 text-sm font-semibold text-slate-600 shadow-sm">
              🌍 Choose Your Language / اختر لغتك
            </div>

            {/* Language grid cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">
              {LANGUAGES_INFO.map((lang) => (
                <motion.button
                  key={lang.code}
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => {
                    setCurrentLanguage(lang.code);
                    setGameState('mode_select');
                    if (soundEnabled) {
                      gameAudio.playClick();
                      gameAudio.speak(TRANSLATIONS[lang.code].title, lang.code);
                    }
                  }}
                  className={`flex flex-col items-center justify-center p-6 bg-white rounded-3xl border-2 border-b-8 border-slate-200 hover:border-blue-500 hover:border-b-8 active:border-b-2 shadow-[0_12px_24px_rgba(0,0,0,0.04)] cursor-pointer text-center gap-3 transition-all group relative overflow-hidden`}
                >
                  <div className="text-5xl group-hover:scale-110 transition-transform">{lang.flag}</div>
                  <div>
                    <h3 className={`text-lg font-extrabold text-blue-950 ${lang.font}`}>{lang.name}</h3>
                    <p className={`text-[11px] font-bold text-blue-800/60 ${lang.font}`}>{lang.nativeName}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="text-[11px] text-blue-900/60 font-semibold uppercase tracking-widest">
              Developed by Impact Hub Egypt • All Rights Reserved 2026
            </div>
          </motion.div>
        </div>
      )}

      {/* RENDER VIEW: 2. GAME MODE SELECT */}
      {gameState === 'mode_select' && currentLanguage && (
        <div className={`flex-1 flex flex-col items-center justify-center p-6 relative z-10 ${isRTL ? 'font-cairo' : 'font-sans'}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl w-full text-center space-y-6"
          >
            {/* Back button to languages */}
            <button
              onClick={() => {
                setGameState('lang_select');
                if (soundEnabled) gameAudio.playClick();
              }}
              className="absolute top-6 left-6 flex items-center gap-1.5 px-4 py-2 bg-white/75 hover:bg-white text-blue-900 rounded-full text-xs font-bold border border-slate-200 shadow-sm transition-all cursor-pointer"
            >
              ← {activeT.home}
            </button>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-blue-950">{activeT.modeSelection}</h2>
              <p className="text-sm text-blue-800/70 font-semibold">{activeT.subtitle}</p>
            </div>

            {/* Mode selection buttons */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentMode('full');
                  setGameState('playing');
                  setStartTime(Date.now());
                  if (soundEnabled) gameAudio.playClick();
                }}
                className="flex flex-col items-center p-6 bg-white rounded-3xl border-2 border-b-8 border-teal-600 shadow-sm cursor-pointer text-center gap-2 group transition-all"
              >
                <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl group-hover:bg-teal-500 group-hover:text-white transition-all">
                  <Play size={24} />
                </div>
                <h3 className="font-extrabold text-blue-950 text-lg">{activeT.modeFull}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  {currentLanguage === 'ar' ? 'قم ببناء الكلمة بأكملها عن طريق سحب جميع الحروف' : 'Spell the complete word from scratch with all scrambled blocks.'}
                </p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentMode('missing');
                  setGameState('playing');
                  setStartTime(Date.now());
                  if (soundEnabled) gameAudio.playClick();
                }}
                className="flex flex-col items-center p-6 bg-white rounded-3xl border-2 border-b-8 border-emerald-600 shadow-sm cursor-pointer text-center gap-2 group transition-all"
              >
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <Lightbulb size={24} />
                </div>
                <h3 className="font-extrabold text-blue-950 text-lg">{activeT.modeMissing}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  {currentLanguage === 'ar' ? 'ابحث عن الحروف الناقصة وأكمل الكلمة' : 'Some letters are filled in; search and complete the empty spots.'}
                </p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setCurrentMode('extra');
                  setGameState('playing');
                  setStartTime(Date.now());
                  if (soundEnabled) gameAudio.playClick();
                }}
                className="flex flex-col items-center p-6 bg-white rounded-3xl border-2 border-b-8 border-amber-600 shadow-sm cursor-pointer text-center gap-2 group transition-all"
              >
                <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl group-hover:bg-amber-500 group-hover:text-white transition-all">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-extrabold text-blue-950 text-lg">{activeT.modeExtra}</h3>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                  {currentLanguage === 'ar' ? 'رتب الحروف واحذر الأحرف الدخيلة الإضافية' : 'Build the word from mixed letter blocks with extra distractor letters.'}
                </p>
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}

      {/* RENDER VIEW: 3. ACTIVE PLAYGROUND */}
      {gameState === 'playing' && currentLanguage && currentLevelItem && (
        <div 
          dir={isRTL ? 'rtl' : 'ltr'} 
          className={`flex-1 flex flex-col items-center justify-between p-4 relative z-10 ${isRTL ? 'font-cairo rtl' : 'font-sans ltr'}`}
        >
          
          {/* TOP ACTION BAR (GEOMETRIC BALANCE CLASSMOPHISM) */}
          <div className="w-full max-w-5xl h-16 flex items-center justify-between px-6 bg-white/20 backdrop-blur-md border-b border-white/30 rounded-2xl z-50 shadow-sm mb-4">
            
            {/* Logo and home back action */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setGameState('mode_select');
                  if (soundEnabled) gameAudio.playClick();
                }}
                className="w-10 h-10 bg-white/40 hover:bg-white/60 rounded-full flex items-center justify-center border border-white/40 text-lg shadow-sm transition-colors cursor-pointer"
                title="Go Home"
              >
                🏠
              </button>
              
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center shadow-lg transform -rotate-6">
                  <span className="text-white font-black text-base">IH</span>
                </div>
                <div className="hidden sm:block text-left">
                  <h1 className="text-xs font-bold text-blue-900 leading-none">3D Word Builder</h1>
                  <p className="text-[9px] text-blue-800/70 font-medium font-cairo">Impact Hub Egypt</p>
                </div>
              </div>
            </div>

            {/* Level title & info */}
            <div className="text-center">
              <span className="text-[9px] font-black text-blue-900/60 uppercase tracking-widest leading-none block">
                {activeT.level} {currentLevelIndex + 1} / {activeLevels.length}
              </span>
              <span className="text-xs font-extrabold text-blue-900 leading-none">
                {currentLevelItem.translation}
              </span>
            </div>

            {/* Progress Bar & Buttons */}
            <div className="flex items-center gap-3">
              {/* Live dynamic level progress gauge */}
              <div className="hidden md:flex items-center gap-3 bg-white/40 px-3 py-1 rounded-full border border-white/40 shadow-sm">
                <div className="flex flex-col items-end">
                  <span className="text-[8px] uppercase tracking-wider font-bold text-blue-900">Progress</span>
                  <div className="w-24 h-1.5 bg-blue-100 rounded-full mt-0.5 overflow-hidden border border-blue-200">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 shadow-[0_0_8px_rgba(251,191,36,0.5)] transition-all duration-500"
                      style={{ width: `${activeLevels.length ? ((currentLevelIndex) / activeLevels.length) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 ml-1 bg-white/50 px-2 py-0.5 rounded-full">
                  <span className="text-orange-500 text-xs">⭐</span>
                  <span className="font-black text-xs text-blue-900">{stars}</span>
                </div>
              </div>

              {/* Sound toggle button */}
              {/* Take Screenshot / Capture Certificate button */}
              <button
                onClick={() => {
                  setShowScreenshot(true);
                  if (soundEnabled) gameAudio.playClick();
                }}
                className="w-10 h-10 bg-white/40 hover:bg-white/60 rounded-full flex items-center justify-center border border-white/40 text-lg shadow-sm transition-colors cursor-pointer"
                title={currentLanguage === 'ar' ? 'التقاط شهادة' : 'Capture Certificate'}
              >
                📸
              </button>

              <button
                onClick={() => {
                  setSoundEnabled(p => !p);
                  setVoiceEnabled(p => !p);
                  if (!soundEnabled) gameAudio.playClick();
                }}
                className="w-10 h-10 bg-white/40 hover:bg-white/60 rounded-full flex items-center justify-center border border-white/40 text-lg shadow-sm transition-colors cursor-pointer"
                title="Toggle Speaker"
              >
                {soundEnabled ? '🔊' : '🔇'}
              </button>

              {/* Cockpit parent settings toggle */}
              <button
                onClick={() => {
                  setShowParentDashboard(true);
                  if (soundEnabled) gameAudio.playClick();
                }}
                className="px-3 h-10 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full border-b-4 border-blue-800 shadow-lg flex items-center gap-1 hover:translate-y-0.5 transition-all text-xs cursor-pointer"
              >
                ⚙️ Cockpit
              </button>
            </div>
          </div>

          {/* ACTIVE LEVEL MAIN BODY CONTAINER */}
          <div className="flex-1 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 items-center gap-2 md:gap-10 py-1 md:py-4">
            
            {/* LEFT COLUMN: GORGEOUS 3D FLOATING ISLAND WITH ACTIVE OBJECT */}
            <div className="flex flex-col items-center justify-center relative min-h-[190px] md:min-h-[290px] w-full">
              
              {/* Interactive prompt header bubble */}
              <div className="absolute top-0 px-3 py-1 md:px-4 md:py-2 bg-white/80 border border-white rounded-2xl shadow-md text-[10px] md:text-xs font-bold text-teal-800 select-none animate-pulse">
                {currentLevelItem.word} {currentLevelItem.hint ? `| ${currentLevelItem.hint}` : ''}
              </div>

              <FloatingIsland visualType={currentLevelItem.visualType} isCorrect={levelSuccess} />
            </div>

            {/* RIGHT COLUMN: DRAG/TAP GAMEPLAY SLOTS */}
            <div className="flex items-center justify-center w-full">
              <WordBuilder
                key={`${currentLevelIndex}-${currentMode}`}
                wordItem={currentLevelItem}
                language={currentLanguage}
                mode={currentMode}
                onLevelComplete={handleLevelSuccess}
                onWrongAnswer={handleWrongDrop}
                soundEnabled={soundEnabled}
              />
            </div>
          </div>

          {/* LEVEL SUCCESS CONGRATS OVERLAY */}
          <AnimatePresence>
            {levelSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute bottom-4 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto w-full max-w-lg p-5 rounded-2xl bg-gradient-to-r from-teal-500/95 to-emerald-500/95 backdrop-blur-md border border-white text-white flex items-center justify-between shadow-xl gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🥳</div>
                  <div>
                    <h3 className="font-extrabold text-sm">{activeT.success}</h3>
                    <p className="text-[11px] text-teal-100 mt-0.5">
                      {currentLevelItem.word} = {currentLevelItem.translation} (+100 Score)
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextLevel}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-white text-teal-800 font-extrabold rounded-xl text-xs shadow-md cursor-pointer hover:bg-teal-50 transition-colors"
                >
                  {activeT.nextLevel}
                  <ArrowRight size={14} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* RENDER VIEW: 4. ALL LEVELS COMPLETED CELEBRATION */}
      {gameState === 'completed' && currentLanguage && (
        <div className={`flex-1 flex items-center justify-center p-6 relative z-10 ${isRTL ? 'font-cairo' : 'font-sans'}`}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="max-w-xl w-full bg-white rounded-[32px] p-8 border-2 border-b-8 border-slate-300 text-center shadow-2xl space-y-6 relative overflow-hidden"
          >
            {/* Rotating light ray backdrop behind seal */}
            <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
 
            <div className="space-y-3 relative z-10">
              <div className="text-7xl">🏆</div>
              <h2 className="text-3xl font-black text-blue-950">{activeT.congratsTitle}</h2>
              <p className="text-sm text-blue-900/70 font-semibold px-6">{activeT.congratsDesc}</p>
            </div>
 
            {/* Final performance cards */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto relative z-10">
              <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-b-4 border-emerald-200 flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide">
                  {activeT.correctCount}
                </span>
                <span className="text-2xl font-black text-emerald-800">{correctCount}</span>
              </div>
 
              <div className="p-4 bg-sky-50 rounded-2xl border-2 border-b-4 border-sky-200 flex flex-col gap-0.5">
                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wide">
                  {activeT.totalTime}
                </span>
                <span className="text-2xl font-black text-sky-800">
                  {totalElapsedTime > 0 ? totalElapsedTime : 45} {activeT.seconds}
                </span>
              </div>
            </div>
 
            {/* Action Buttons */}
            <div className="flex flex-col gap-3 max-w-sm mx-auto relative z-10">
              <button
                onClick={() => {
                  setShowScreenshot(true);
                  if (soundEnabled) gameAudio.playClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-sm shadow-md cursor-pointer border-b-4 border-orange-700 hover:translate-y-[2px] transition-all"
              >
                <Award size={18} />
                {activeT.screenshot}
              </button>
 
              <button
                onClick={handleRestart}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm shadow-sm cursor-pointer border-b-4 border-teal-800 hover:translate-y-[2px] transition-all"
              >
                <RotateCcw size={16} />
                {activeT.playAgain}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* COMPONENT MODALS OVERLAYS */}
      <AnimatePresence>
        {showParentDashboard && (
          <ParentDashboard
            language={currentLanguage || 'en'}
            onClose={() => setShowParentDashboard(false)}
            stats={{
              stars,
              completedLevels: currentLevelIndex,
              correctAnswers: correctCount,
              totalTimeSeconds: totalElapsedTime
            }}
            currentMode={currentMode}
            onModeChange={(m) => setCurrentMode(m)}
            soundEnabled={soundEnabled}
            onSoundToggle={(s) => setSoundEnabled(s)}
            voiceEnabled={voiceEnabled}
            onVoiceToggle={(v) => setVoiceEnabled(v)}
          />
        )}

        {showScreenshot && (
          <ScreenshotModal
            language={currentLanguage || 'en'}
            stats={{
              stars,
              completedLevels: currentLevelIndex + (gameState === 'completed' ? 1 : 0),
              correctAnswers: correctCount,
              totalTimeSeconds: totalElapsedTime
            }}
            onClose={() => setShowScreenshot(false)}
            soundEnabled={soundEnabled}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
