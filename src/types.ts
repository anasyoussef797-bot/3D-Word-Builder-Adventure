/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'ar' | 'en' | 'fr' | 'de';

export type GameMode = 'full' | 'missing' | 'extra';

export interface WordItem {
  id: number;
  word: string;       // Native word, e.g. "تفاحة" or "Apple"
  translation: string; // English meaning/reference, e.g. "Apple"
  visualType: string;  // SVG identifier (e.g., 'apple', 'rabbit')
  phonetic: string;    // Text to speech string or helper
  hint: string;        // Short descriptive hint in native language
}

export interface LevelConfig {
  id: number;
  language: Language;
  words: WordItem[];
}

export interface GameStats {
  stars: number;
  completedLevels: number;
  correctAnswers: number;
  totalTimeSeconds: number;
}
