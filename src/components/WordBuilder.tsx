/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WordItem, Language, GameMode } from '../types';
import { gameAudio } from './AudioEngine';
import { Sparkles, HelpCircle, Volume2 } from 'lucide-react';

interface WordBuilderProps {
  wordItem: WordItem;
  language: Language;
  mode: GameMode;
  onLevelComplete: () => void;
  onWrongAnswer: () => void;
  soundEnabled: boolean;
}

interface LetterToy {
  id: string;
  char: string;
  color: string;
  isCorrect: boolean;
  isPlaced: boolean;
  placedSlotIndex: number | null;
}

interface SlotState {
  index: number;
  expectedChar: string;
  isPreFilled: boolean;
  placedLetterId: string | null;
}

// Playful gradients with solid 3D bevel borders for the letter blocks
const TILE_GRADIENTS = [
  'from-rose-400 to-pink-500 border-rose-600 shadow-pink-300',
  'from-cyan-400 to-blue-500 border-blue-600 shadow-blue-300',
  'from-amber-400 to-orange-500 border-orange-600 shadow-orange-300',
  'from-emerald-400 to-teal-500 border-teal-600 shadow-emerald-300',
  'from-purple-400 to-fuchsia-500 border-fuchsia-600 shadow-purple-300',
  'from-indigo-400 to-violet-500 border-violet-600 shadow-indigo-300'
];

export const WordBuilder: React.FC<WordBuilderProps> = ({
  wordItem,
  language,
  mode,
  onLevelComplete,
  onWrongAnswer,
  soundEnabled
}) => {
  const targetWord = wordItem.word;
  const isRTL = language === 'ar';

  const [slots, setSlots] = useState<SlotState[]>([]);
  const [lettersSupply, setLettersSupply] = useState<LetterToy[]>([]);
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [highlightedChar, setHighlightedChar] = useState<string | null>(null);
  const [wrongToyId, setWrongToyId] = useState<string | null>(null);

  // Initialize slots and letter blocks whenever the level word changes
  useEffect(() => {
    setHighlightedChar(null);
    setWrongToyId(null);
    // 1. Parse target word into character array (Arabic letters can be split as string chars)
    const chars: string[] = Array.from(targetWord) as string[];

    // 2. Determine which slots are pre-filled in "missing" mode
    let preFilledIndices: number[] = [];
    if (mode === 'missing') {
      // Pre-fill about 50% of the word, but at least 1 and leave at least 1 empty
      if (chars.length <= 3) {
        preFilledIndices = [0]; // prefill first, leave rest
      } else {
        // Prefill alternating indices
        for (let i = 0; i < chars.length; i++) {
          if (i % 2 === 0 && preFilledIndices.length < chars.length - 1) {
            preFilledIndices.push(i);
          }
        }
      }
    }

    const initialSlots: SlotState[] = chars.map((char, index) => ({
      index,
      expectedChar: char,
      isPreFilled: preFilledIndices.includes(index),
      placedLetterId: null
    }));

    setSlots(initialSlots);

    // 3. Generate letter blocks supply
    // Create correct letter toys for empty slots
    const correctToys: LetterToy[] = [];
    chars.forEach((char, idx) => {
      if (!preFilledIndices.includes(idx)) {
        const randomGrad = TILE_GRADIENTS[Math.floor(Math.random() * TILE_GRADIENTS.length)];
        correctToys.push({
          id: `${char}-${idx}-${Math.random()}`,
          char,
          color: randomGrad,
          isCorrect: true,
          isPlaced: false,
          placedSlotIndex: null
        });
      }
    });

    // Add extra/distractor letters if mode is "extra" or randomly for fun
    const distractorToys: LetterToy[] = [];
    if (mode === 'extra') {
      const alphabet: Record<Language, string[]> = {
        ar: ['أ', 'ب', 'ت', 'ج', 'د', 'ر', 'س', 'م', 'ن', 'و', 'ي'],
        en: ['X', 'Z', 'Y', 'W', 'K', 'J', 'Q', 'B', 'M', 'S'],
        fr: ['X', 'Z', 'Y', 'W', 'K', 'H', 'G', 'P', 'R', 'S'],
        de: ['X', 'Z', 'Y', 'W', 'K', 'Ä', 'Ö', 'Ü', 'B', 'M']
      };

      const langAlphabet = alphabet[language] || alphabet.en;
      // Add 2-3 distractor letters that are not in the target word
      let count = 0;
      while (count < 2) {
        const randomChar = langAlphabet[Math.floor(Math.random() * langAlphabet.length)];
        // Check both native casing and uppercase/lowercase
        if (!targetWord.toLowerCase().includes(randomChar.toLowerCase())) {
          const randomGrad = TILE_GRADIENTS[Math.floor(Math.random() * TILE_GRADIENTS.length)];
          distractorToys.push({
            id: `extra-${randomChar}-${count}-${Math.random()}`,
            char: randomChar,
            color: randomGrad,
            isCorrect: false,
            isPlaced: false,
            placedSlotIndex: null
          });
          count++;
        }
      }
    }

    // Mix correct and distractor letters, shuffle them
    const combinedSupply = [...correctToys, ...distractorToys];
    // Simple modern shuffle algorithm
    for (let i = combinedSupply.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combinedSupply[i], combinedSupply[j]] = [combinedSupply[j], combinedSupply[i]];
    }

    setLettersSupply(combinedSupply);
    setShowHint(false);
  }, [targetWord, mode, language]);

  // Handle placing a letter toy into a slot
  const handlePlaceLetter = (toyId: string, slotIndex: number) => {
    const toy = lettersSupply.find(t => t.id === toyId);
    if (!toy) return;

    // Check if the slot already has a letter placed
    const currentSlot = slots[slotIndex];
    if (currentSlot.isPreFilled || currentSlot.placedLetterId) {
      return; // Slot is occupied or pre-filled
    }

    // Speak the letter
    if (soundEnabled) {
      gameAudio.speakLetter(toy.char, language);
      gameAudio.playPickup();
    }

    // Check if it's the correct character for this slot
    const isCharMatch = currentSlot.expectedChar.toLowerCase() === toy.char.toLowerCase();

    if (isCharMatch) {
      // 1. Update Slots
      setSlots(prev => prev.map(s => s.index === slotIndex ? { ...s, placedLetterId: toyId } : s));

      // 2. Update Letters Supply
      setLettersSupply(prev => prev.map(t => t.id === toyId ? { ...t, isPlaced: true, placedSlotIndex: slotIndex } : t));

      // Play success visual sparkle & sound
      if (soundEnabled) {
        gameAudio.playSparkle();
      }

      // Check if word is fully built
      checkGameStatus(slotIndex, toyId);
    } else {
      // Wrong placement! Trigger shake and gently return
      setShakeTrigger(true);
      setTimeout(() => setShakeTrigger(false), 500);

      if (soundEnabled) {
        gameAudio.playError();
      }
      onWrongAnswer();
    }
  };

  // Check if all slots are correctly filled
  const checkGameStatus = (justPlacedSlotIndex: number, justPlacedToyId: string) => {
    // We update slots and letters state synchronously here to verify win conditions
    setSlots(currentSlots => {
      const updatedSlots = currentSlots.map(s => s.index === justPlacedSlotIndex ? { ...s, placedLetterId: justPlacedToyId } : s);
      const isComplete = updatedSlots.every(s => s.isPreFilled || s.placedLetterId !== null);

      if (isComplete) {
        // Delay complete call for snap animation to finish
        setTimeout(() => {
          onLevelComplete();
        }, 700);
      }
      return updatedSlots;
    });
  };

  // Tap handler to automatically place or return a letter
  const handleToyTap = (toy: LetterToy) => {
    if (toy.isPlaced) {
      // Remove it from the slot and return to supply
      const slotIndex = toy.placedSlotIndex;
      if (slotIndex !== null) {
        setSlots(prev => prev.map(s => s.index === slotIndex ? { ...s, placedLetterId: null } : s));
        setLettersSupply(prev => prev.map(t => t.id === toy.id ? { ...t, isPlaced: false, placedSlotIndex: null } : t));
        if (soundEnabled) {
          gameAudio.playPickup();
        }
      }
    } else {
      // Find the first empty, non-prefilled slot in sequential order
      const nextActiveSlot = slots.find(s => !s.isPreFilled && !s.placedLetterId);

      if (nextActiveSlot) {
        const requiredChar = nextActiveSlot.expectedChar;
        const isMatch = toy.char.toLowerCase() === requiredChar.toLowerCase();

        if (isMatch) {
          // Correct! Place it
          handlePlaceLetter(toy.id, nextActiveSlot.index);
          // Clear any current highlights
          setHighlightedChar(null);
          setWrongToyId(null);
        } else {
          // Wrong letter clicked! Trigger error, shake, and highlight the correct one
          setWrongToyId(toy.id);
          setHighlightedChar(requiredChar.toLowerCase());
          setShakeTrigger(true);
          
          if (soundEnabled) {
            gameAudio.playError();
          }
          onWrongAnswer();

          setTimeout(() => {
            setShakeTrigger(false);
            setWrongToyId(null);
          }, 600);

          // Keep highlight active for 2.5 seconds to guide the child
          setTimeout(() => {
            setHighlightedChar(null);
          }, 2500);
        }
      } else {
        // No slots available! Shake supply
        setShakeTrigger(true);
        setTimeout(() => setShakeTrigger(false), 500);
        if (soundEnabled) {
          gameAudio.playError();
        }
      }
    }
  };

  const nextActiveSlot = slots.find(s => !s.isPreFilled && !s.placedLetterId);

  return (
    <div 
      dir={isRTL ? 'rtl' : 'ltr'} 
      className={`w-full flex flex-col items-center gap-3 md:gap-5 px-2 md:px-4 ${isRTL ? 'rtl' : 'ltr'}`}
    >
      
      {/* 3D-styled Word Empty & Pre-filled Slots Bar */}
      <motion.div
        dir="ltr"
        className={`flex flex-wrap justify-center items-center gap-2 md:gap-4 py-3 px-4 md:py-5 md:px-6 rounded-2xl md:rounded-3xl bg-white/30 backdrop-blur-md shadow-lg border border-white/50 max-w-full ${
          shakeTrigger ? 'animate-shake' : ''
        }`}
        animate={shakeTrigger ? { x: [-10, 10, -8, 8, -5, 5, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        {(isRTL ? [...slots].reverse() : slots).map((slot) => {
          // Find the toy placed in this slot, if any
          const placedToy = lettersSupply.find(t => t.id === slot.placedLetterId);
          const isNextActive = nextActiveSlot && nextActiveSlot.index === slot.index;

          return (
            <div
              key={slot.index}
              className={`relative w-12 h-16 md:w-20 md:h-24 flex items-center justify-center rounded-xl md:rounded-2xl transition-all duration-300 ${
                slot.isPreFilled
                  ? 'bg-green-100/40 border-2 md:border-4 border-dashed border-green-500/50 text-green-600 shadow-inner'
                  : slot.placedLetterId
                  ? 'border-transparent bg-transparent'
                  : isNextActive
                  ? 'bg-amber-500/15 border-2 md:border-4 border-dashed border-amber-500/60 shadow-[0_0_12px_rgba(245,158,11,0.45)] animate-pulse'
                  : 'bg-blue-900/10 border-2 md:border-4 border-dashed border-blue-900/20 shadow-inner'
              }`}
            >
              {/* Display text if prefilled */}
              {slot.isPreFilled && (
                <div className="w-10 h-14 md:w-16 md:h-20 bg-white rounded-lg md:rounded-xl shadow-md border-2 border-green-200 flex items-center justify-center">
                  <span className={`text-2xl md:text-4xl font-black ${isRTL ? 'font-cairo' : 'font-sans'} text-green-600 select-none`}>
                    {slot.expectedChar}
                  </span>
                </div>
              )}

              {/* Display placed letter block with entrance pop */}
              <AnimatePresence>
                {placedToy && (
                  <motion.div
                    layoutId={`toy-${placedToy.id}`}
                    initial={{ scale: 0.8, y: -20, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={() => handleToyTap(placedToy)}
                    className={`absolute inset-0 flex items-center justify-center rounded-xl md:rounded-2xl cursor-pointer ${isRTL ? 'font-cairo' : 'font-sans'} text-2xl md:text-4xl font-black text-white bg-gradient-to-br border-b-4 md:border-b-8 ${placedToy.color} shadow-lg hover:-translate-y-1 transition-transform`}
                  >
                    {placedToy.char}
                    <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-white/40" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Underlying hint indicator */}
              {!slot.isPreFilled && !slot.placedLetterId && showHint && (
                <span className={`absolute text-xs md:text-sm font-black text-blue-900/30 ${isRTL ? 'font-cairo' : 'font-sans'}`}>
                  {slot.expectedChar}
                </span>
              )}
            </div>
          );
        })}
      </motion.div>

      {/* Instruction & Helper row */}
      <div className="flex items-center gap-3 md:gap-4 text-center select-none py-0.5">
        <button
          onClick={() => {
            setShowHint(prev => !prev);
            if (soundEnabled) gameAudio.playClick();
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[11px] md:text-xs font-medium transition-all ${
            showHint
              ? 'bg-amber-100 text-amber-700 border border-amber-300 shadow-sm'
              : 'bg-white/40 hover:bg-white/60 text-slate-600 border border-slate-200'
          }`}
        >
          <HelpCircle size={12} className="md:w-3.5 md:h-3.5" />
          {language === 'ar' ? 'تلميح' : language === 'fr' ? 'Indice' : language === 'de' ? 'Hinweis' : 'Hint'}
        </button>

        <button
          onClick={() => {
            gameAudio.speak(wordItem.phonetic, language);
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full text-[11px] md:text-xs font-medium bg-white/40 hover:bg-white/60 text-slate-600 border border-slate-200 transition-all"
        >
          <Volume2 size={12} className="md:w-3.5 md:h-3.5" />
          {language === 'ar' ? 'اسمع الكلمة' : language === 'fr' ? 'Écouter' : language === 'de' ? 'Anhören' : 'Listen'}
        </button>
      </div>

      {/* Scrambled Supply Letters Container */}
      <div className="w-full max-w-xl flex flex-col items-center gap-2">
        <p className="text-[10px] md:text-xs font-semibold text-slate-500/90 tracking-wide uppercase select-none">
          {language === 'ar'
            ? 'اضغط على الحروف لتركيب الكلمة'
            : language === 'fr'
            ? 'Appuyez sur les lettres pour former le mot'
            : language === 'de'
            ? 'Tippe auf die Buchstaben, um das Wort zu bauen'
            : 'Tap the letters to build the word'}
        </p>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 p-3 md:p-6 bg-white/30 backdrop-blur-xl rounded-2xl md:rounded-[40px] border border-white/50 shadow-2xl w-full">
          <AnimatePresence>
            {lettersSupply
              .filter(toy => !toy.isPlaced)
              .map((toy) => {
                const isHighlighted = highlightedChar === toy.char.toLowerCase();
                const isWrong = wrongToyId === toy.id;

                let toyStyle = toy.color;
                if (isHighlighted) {
                  toyStyle = 'from-amber-300 via-yellow-400 to-orange-500 border-yellow-600 shadow-[0_0_20px_rgba(251,191,36,0.95)] ring-4 ring-yellow-400/80 ring-offset-2';
                } else if (isWrong) {
                  toyStyle = 'from-red-400 to-rose-600 border-rose-800 shadow-rose-300/50';
                }

                const textColor = isHighlighted ? 'text-amber-950' : 'text-white';

                return (
                  <motion.div
                    key={toy.id}
                    layoutId={`toy-${toy.id}`}
                    initial={{ scale: 0, rotate: -10 }}
                    animate={
                      isHighlighted
                        ? {
                            scale: [1, 1.15, 1],
                            y: [0, -10, 0],
                            rotate: [0, 5, -5, 0],
                          }
                        : isWrong
                        ? {
                            x: [-8, 8, -6, 6, -4, 4, 0],
                            scale: 1,
                            y: 0,
                          }
                        : {
                            scale: 1,
                            rotate: 0,
                            y: [0, -4, 0],
                          }
                    }
                    exit={{ scale: 0, rotate: 10 }}
                    transition={
                      isHighlighted
                        ? {
                            y: {
                              repeat: Infinity,
                              duration: 0.6,
                              ease: 'easeInOut',
                            },
                            scale: {
                              repeat: Infinity,
                              duration: 0.6,
                              ease: 'easeInOut',
                            },
                          }
                        : isWrong
                        ? {
                            duration: 0.4,
                          }
                        : {
                            y: {
                              repeat: Infinity,
                              duration: 2 + Math.random() * 2,
                              ease: 'easeInOut',
                            },
                            scale: { type: 'spring', damping: 15 }
                          }
                    }
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleToyTap(toy)}
                    className={`w-11 h-11 md:w-20 md:h-20 flex items-center justify-center rounded-xl md:rounded-3xl cursor-pointer font-sans text-xl md:text-4xl font-black bg-gradient-to-br border-b-4 md:border-b-8 ${toyStyle} ${textColor} shadow-lg select-none relative transition-colors`}
                  >
                    {toy.char}
                    {/* Glossy Toy reflection */}
                    <div className="absolute top-1 right-1 w-2 h-2 md:w-3 md:h-3 rounded-full bg-white/35" />
                    <div className="absolute bottom-1 left-2 right-2 h-1 md:h-1.5 rounded-full bg-black/10" />
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
