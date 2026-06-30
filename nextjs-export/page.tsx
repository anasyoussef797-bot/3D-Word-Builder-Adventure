'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Star,
  Home,
  RotateCcw,
  Volume2,
  VolumeX,
  Award,
  Camera,
  Play,
  Trophy,
  Lightbulb,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Activity,
  Settings,
  Download,
  Code,
  X,
  BookOpen,
  CheckCircle
} from 'lucide-react';

// ==========================================
// DATA DEFINITIONS (MULTILINGUAL)
// ==========================================
export const LANGUAGES_INFO = [
  { code: 'ar', name: 'العربية', dir: 'rtl', flag: '🇪🇬', nativeName: 'العربية', font: 'font-cairo' },
  { code: 'en', name: 'English', dir: 'ltr', flag: '🇬🇧', nativeName: 'English', font: 'font-sans' },
  { code: 'fr', name: 'Français', dir: 'ltr', flag: '🇫🇷', nativeName: 'Français', font: 'font-sans' },
  { code: 'de', name: 'Deutsch', dir: 'ltr', flag: '🇩🇪', nativeName: 'Deutsch', font: 'font-sans' }
] as const;

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  ar: {
    title: 'مغامرة بناء الكلمات ثلاثية الأبعاد',
    subtitle: 'اللعبة الثالثة - إمباكت هب مصر',
    selectLang: 'اختر لغتك للبدء',
    instruction: 'اسحب الحروف الملونة إلى مكانها الصحيح لتكوين الكلمة!',
    success: 'أحسنت صنعاً! ممتاز!',
    nextLevel: 'المستوى التالي',
    playAgain: 'العب مجدداً',
    parentZone: 'منطقة الآباء والمعلمين',
    stars: 'النجوم',
    level: 'المستوى',
    modeSelection: 'اختر وضع اللعب',
    modeFull: 'كلمة كاملة',
    modeMissing: 'حروف مفقودة',
    modeExtra: 'حروف ومشتتات',
    close: 'إغلاق',
    sound: 'الصوت',
    restart: 'إعادة البدء',
    home: 'الرئيسية',
    congratsTitle: 'بطل الكلمات المذهل!',
    congratsDesc: 'لقد أكملت جميع المستويات بنجاح وحصلت على وسام إمباكت هب مصر للتعليم المتطور!',
    correctCount: 'الإجابات الصحيحة',
    totalTime: 'الوقت الإجمالي',
    seconds: 'ثانية'
  },
  en: {
    title: '3D Word Builder Adventure',
    subtitle: 'Game #3 - Impact Hub Egypt',
    selectLang: 'Choose Your Language to Start',
    instruction: 'Drag the colorful letters into their correct spots to build the word!',
    success: 'Fantastic Job! Outstanding!',
    nextLevel: 'Next Level',
    playAgain: 'Play Again',
    parentZone: 'Parent & Teacher Dashboard',
    stars: 'Stars',
    level: 'Level',
    modeSelection: 'Choose Game Mode',
    modeFull: 'Full Word',
    modeMissing: 'Missing Letter',
    modeExtra: 'Letters & Distractors',
    close: 'Close',
    sound: 'Sound',
    restart: 'Restart',
    home: 'Home',
    congratsTitle: 'Word Adventure Hero!',
    congratsDesc: 'You have completed all levels and earned the Impact Hub Egypt Educational Badge!',
    correctCount: 'Correct Words',
    totalTime: 'Total Time',
    seconds: 'seconds'
  },
  fr: {
    title: "Aventure d'Assemblage de Mots 3D",
    subtitle: 'Jeu #3 - Impact Hub Égypte',
    selectLang: 'Choisissez votre langue pour commencer',
    instruction: 'Faites glisser les lettres colorées dans les bonnes cases pour former le mot !',
    success: 'Excellent travail ! Magnifique !',
    nextLevel: 'Niveau Suivant',
    playAgain: 'Rejouer',
    parentZone: 'Tableau de bord Parents & Enseignants',
    stars: 'Étoiles',
    level: 'Niveau',
    modeSelection: 'Mode de jeu',
    modeFull: 'Mot Complet',
    modeMissing: 'Lettre Manquante',
    modeExtra: 'Lettres & Intrus',
    close: 'Fermer',
    sound: 'Son',
    restart: 'Recommencer',
    home: 'Accueil',
    congratsTitle: 'Héros des Mots !',
    congratsDesc: "Tu as terminé tous les niveaux et remporté le badge éducatif d'Impact Hub Égypte !",
    correctCount: 'Mots Corrects',
    totalTime: 'Temps Total',
    seconds: 'secondes'
  },
  de: {
    title: '3D-Wortbau-Abenteuer',
    subtitle: 'Spiel #3 - Impact Hub Ägypten',
    selectLang: 'Wähle deine Sprache zum Starten',
    instruction: 'Ziehe die bunten Buchstaben in die richtigen Felder, um das Wort zu bauen!',
    success: 'Fantastische Arbeit! Ausgezeichnet!',
    nextLevel: 'Nächstes Level',
    playAgain: 'Noch einmal spielen',
    parentZone: 'Eltern- & Lehrer-Bereich',
    stars: 'Sterne',
    level: 'Level',
    modeSelection: 'Spielmodus wählen',
    modeFull: 'Ganzes Wort',
    modeMissing: 'Fehlender Buchstabe',
    modeExtra: 'Buchstaben & Ablenkungen',
    close: 'Schließen',
    sound: 'Ton',
    restart: 'Neustart',
    home: 'Startseite',
    congratsTitle: 'Wort-Abenteuer Held!',
    congratsDesc: 'Du hast alle Level abgeschlossen und das Abzeichen des Impact Hub Ägypten erhalten!',
    correctCount: 'Richtige Wörter',
    totalTime: 'Gesamtzeit',
    seconds: 'Sekunden'
  }
};

export const WORD_LEVELS = {
  ar: [
    { id: 1, word: 'تفاحة', translation: 'Apple', visualType: 'apple', phonetic: 'تُفَّاحَة' },
    { id: 2, word: 'أرنب', translation: 'Rabbit', visualType: 'rabbit', phonetic: 'أَرْنَب' },
    { id: 3, word: 'بطة', translation: 'Duck', visualType: 'duck', phonetic: 'بَطَّة' }
  ],
  en: [
    { id: 1, word: 'Apple', translation: 'Apple', visualType: 'apple', phonetic: 'Apple' },
    { id: 2, word: 'Rabbit', translation: 'Rabbit', visualType: 'rabbit', phonetic: 'Rabbit' },
    { id: 3, word: 'Duck', translation: 'Duck', visualType: 'duck', phonetic: 'Duck' }
  ],
  fr: [
    { id: 1, word: 'Avion', translation: 'Airplane', visualType: 'airplane', phonetic: 'Avion' },
    { id: 2, word: 'Chat', translation: 'Cat', visualType: 'cat', phonetic: 'Chat' },
    { id: 3, word: 'Poisson', translation: 'Fish', visualType: 'fish', phonetic: 'Poisson' }
  ],
  de: [
    { id: 1, word: 'Affe', translation: 'Monkey', visualType: 'monkey', phonetic: 'Affe' },
    { id: 2, word: 'Apfel', translation: 'Apple', visualType: 'apple', phonetic: 'Apfel' },
    { id: 3, word: 'Haus', translation: 'House', visualType: 'house', phonetic: 'Haus' }
  ]
};

// ==========================================
// OFFLINE SPEECH & RETRO AUDIO SYNTH
// ==========================================
class NextAudio {
  private ctx: AudioContext | null = null;
  private isEnabled = true;

  init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) this.ctx = new AudioContextClass();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    this.init();
    if (!this.ctx || !this.isEnabled) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playSuccess() {
    this.init();
    if (!this.ctx || !this.isEnabled) return;
    const t = this.ctx.currentTime;
    [261, 329, 392, 523].forEach((f, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.frequency.setValueAtTime(f, t + i * 0.08);
      gain.gain.setValueAtTime(0.1, t + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t + i * 0.08);
      osc.stop(t + i * 0.08 + 0.35);
    });
  }

  playError() {
    this.init();
    if (!this.ctx || !this.isEnabled) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(90, this.ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  speak(text: string, lang: string) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ar' ? 'ar-EG' : lang === 'fr' ? 'fr-FR' : lang === 'de' ? 'de-DE' : 'en-GB';
    utterance.pitch = 1.2;
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }
}

const audio = new NextAudio();

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
export default function NextGamePage() {
  const [lang, setLang] = useState<string | null>(null);
  const [gameState, setGameState] = useState<'lang' | 'play' | 'win'>('lang');
  const [currentLevelIdx, setCurrentLevelIdx] = useState<number>(0);
  const [stars, setStars] = useState<number>(0);
  const [levelSuccess, setLevelSuccess] = useState<boolean>(false);

  const activeT = lang ? TRANSLATIONS[lang] : TRANSLATIONS.en;
  const isRTL = lang === 'ar';
  const levels = lang ? WORD_LEVELS[lang as 'ar' | 'en' | 'fr' | 'de'] : [];
  const currentLevel = levels[currentLevelIdx];

  // Letters building states
  const [slots, setSlots] = useState<{ index: number; expectedChar: string; placedLetter: any }[]>([]);
  const [lettersSupply, setLettersSupply] = useState<{ id: string; char: string; color: string; isPlaced: boolean }[]>([]);

  useEffect(() => {
    if (lang && currentLevel) {
      const chars = Array.from(currentLevel.word);
      setSlots(chars.map((char, index) => ({
        index,
        expectedChar: char,
        placedLetter: null
      })));

      const colors = [
        'from-rose-400 to-pink-500 shadow-pink-300',
        'from-cyan-400 to-blue-500 shadow-blue-300',
        'from-amber-400 to-orange-500 shadow-orange-300',
        'from-emerald-400 to-teal-500 shadow-emerald-300',
        'from-purple-400 to-fuchsia-500 shadow-purple-300'
      ];

      const toys = chars.map((char, index) => ({
        id: `toy-${index}`,
        char,
        color: colors[Math.floor(Math.random() * colors.length)],
        isPlaced: false
      }));

      setLettersSupply(toys.sort(() => Math.random() - 0.5));
      setLevelSuccess(false);
    }
  }, [lang, currentLevelIdx, currentLevel]);

  const tapLetter = (toy: any) => {
    if (levelSuccess) return;
    const emptySlot = slots.find(s => !s.placedLetter && s.expectedChar.toLowerCase() === toy.char.toLowerCase());
    if (emptySlot) {
      audio.playPop();
      audio.speak(toy.char, lang || 'en');
      
      const updatedSlots = slots.map(s => s.index === emptySlot.index ? { ...s, placedLetter: toy } : s);
      setSlots(updatedSlots);
      setLettersSupply(prev => prev.map(t => t.id === toy.id ? { ...t, isPlaced: true } : t));

      // Check win
      const allFilled = updatedSlots.every(s => s.placedLetter && s.placedLetter.char.toLowerCase() === s.expectedChar.toLowerCase());
      if (allFilled) {
        setLevelSuccess(true);
        setStars(prev => prev + 3);
        audio.playSuccess();
        setTimeout(() => {
          audio.speak(currentLevel.word, lang || 'en');
        }, 500);
      }
    } else {
      audio.playError();
    }
  };

  const returnLetter = (slotIndex: number) => {
    if (levelSuccess) return;
    const slot = slots[slotIndex];
    if (!slot.placedLetter) return;

    audio.playPop();
    const toy = slot.placedLetter;
    setSlots(prev => prev.map(s => s.index === slotIndex ? { ...s, placedLetter: null } : s));
    setLettersSupply(prev => prev.map(t => t.id === toy.id ? { ...t, isPlaced: false } : t));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-cyan-50 to-emerald-100 flex flex-col justify-between p-4 selection:bg-teal-200">
      
      {/* 1. LANG SCREEN */}
      {gameState === 'lang' && (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl w-full text-center space-y-6">
            <span className="text-6xl animate-bounce inline-block">🎮</span>
            <h1 className="text-4xl font-extrabold text-slate-800">3D Word Builder</h1>
            <p className="text-xs font-bold text-teal-700 tracking-wider">GAME #3 • IMPACT HUB EGYPT</p>
            
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {LANGUAGES_INFO.map(l => (
                <button
                  key={l.code}
                  onClick={() => {
                    setLang(l.code);
                    setGameState('play');
                    setCurrentLevelIdx(0);
                    setStars(0);
                    audio.init();
                    audio.speak(TRANSLATIONS[l.code].title, l.code);
                  }}
                  className="p-5 bg-white rounded-3xl border-2 border-slate-100 shadow-md hover:scale-105 active:scale-95 transition-all text-center cursor-pointer"
                >
                  <span className="text-4xl">{l.flag}</span>
                  <h3 className="text-md font-bold text-slate-800 mt-2">{l.name}</h3>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* 2. PLAY SCREEN */}
      {gameState === 'play' && lang && currentLevel && (
        <div className={`flex-1 flex flex-col items-center justify-between gap-6 py-4 max-w-4xl mx-auto w-full ${isRTL ? 'font-cairo' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
          {/* TOP ACTION BAR */}
          <div className="w-full flex items-center justify-between bg-white/70 backdrop-blur-md rounded-2xl p-3 border border-white/40 shadow-sm">
            <button onClick={() => setGameState('lang')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-all cursor-pointer">
              🏠 {activeT.home}
            </button>
            <div className="text-center">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeT.level} {currentLevelIdx + 1} / {levels.length}</span>
              <h2 className="text-sm font-black text-teal-800">{currentLevel.translation}</h2>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-amber-100">
              ⭐ {stars}
            </div>
          </div>

          {/* ISLAND GRAPHIC BACKDROP */}
          <div className="flex flex-col items-center justify-center min-h-[200px] relative w-full my-4">
            <div className="absolute bottom-2 w-40 h-10 bg-emerald-950/20 rounded-full blur-sm"></div>
            <div className="absolute bottom-4 w-48 h-12 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full shadow-lg flex flex-col items-center justify-center">
              <div className="absolute bottom-[20px] scale-110 text-6xl">
                {currentLevel.visualType === 'apple' ? '🍎' : currentLevel.visualType === 'rabbit' ? '🐰' : '🦆'}
              </div>
            </div>
          </div>

          {/* SLOTS BAR */}
          <div className="flex justify-center gap-3 py-4 px-6 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/40 shadow-sm w-full max-w-md">
            {slots.map((slot) => (
              <div
                key={slot.index}
                onClick={() => returnLetter(slot.index)}
                className={`w-14 h-14 flex items-center justify-center rounded-xl border-2 transition-all cursor-pointer ${
                  slot.placedLetter
                    ? `bg-gradient-to-b ${slot.placedLetter.color} border-transparent text-white text-2xl font-bold shadow-md hover:scale-105`
                    : 'border-dashed border-sky-400/50 bg-sky-50/30'
                }`}
              >
                {slot.placedLetter?.char || ''}
              </div>
            ))}
          </div>

          {/* ALPHABET LETTERS */}
          <div className="w-full max-w-md text-center space-y-3">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
              {isRTL ? 'انقر على الحروف لتكوين الكلمة' : 'Tap the letters to build the word'}
            </p>
            <div className="flex flex-wrap justify-center gap-3 min-h-[80px] p-4 bg-white/10 rounded-2xl border border-white/20">
              {lettersSupply.filter(t => !t.isPlaced).map(toy => (
                <button
                  key={toy.id}
                  onClick={() => tapLetter(toy)}
                  className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-b ${toy.color} text-white text-2xl font-bold shadow-lg hover:scale-110 active:scale-95 transition-all relative`}
                >
                  {toy.char}
                  <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white/40"></div>
                </button>
              ))}
            </div>
          </div>

          {/* WIN BANNER */}
          {levelSuccess && (
            <div className="w-full max-w-md p-4 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white flex items-center justify-between shadow-xl animate-bounce">
              <div>
                <h3 className="font-bold text-sm">🎉 {activeT.success}</h3>
                <p className="text-[10px] text-teal-100">{currentLevel.word} = {currentLevel.translation}</p>
              </div>
              <button
                onClick={() => {
                  if (currentLevelIdx < levels.length - 1) {
                    setCurrentLevelIdx(prev => prev + 1);
                  } else {
                    setGameState('win');
                  }
                }}
                className="px-4 py-2 bg-white text-teal-800 font-bold rounded-xl text-xs shadow-md hover:bg-teal-50"
              >
                {activeT.nextLevel} →
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. WIN SCREEN */}
      {gameState === 'win' && lang && (
        <div className="flex-1 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-white text-center shadow-2xl space-y-6">
            <span className="text-7xl">🏆</span>
            <h2 className="text-2xl font-black text-slate-800">{activeT.congratsTitle}</h2>
            <p className="text-sm text-slate-600 px-4">{activeT.congratsDesc}</p>
            <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100 inline-block px-8">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wide block">Total Stars</span>
              <span className="text-2xl font-black text-teal-800">⭐ {stars}</span>
            </div>
            <button onClick={() => setGameState('lang')} className="w-full py-3.5 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all">
              {activeT.playAgain}
            </button>
          </motion.div>
        </div>
      )}

      {/* FOOTER COOP */}
      <footer className="text-center text-[10px] text-slate-400 font-semibold tracking-wider">
        DEVELOPED BY IMPACT HUB EGYPT • EDUTECH LABS
      </footer>
    </div>
  );
}
