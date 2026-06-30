/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Language, WordItem } from '../types';

export const LANGUAGES_INFO = [
  { code: 'ar', name: 'العربية', dir: 'rtl', flag: '🇪🇬', nativeName: 'العربية', font: 'font-cairo' },
  { code: 'en', name: 'English', dir: 'ltr', flag: '🇬🇧', nativeName: 'English', font: 'font-sans' },
  { code: 'fr', name: 'Français', dir: 'ltr', flag: '🇫🇷', nativeName: 'Français', font: 'font-sans' },
  { code: 'de', name: 'Deutsch', dir: 'ltr', flag: '🇩🇪', nativeName: 'Deutsch', font: 'font-sans' }
] as const;

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  ar: {
    title: 'مغامرة بناء الكلمات ثلاثية الأبعاد',
    subtitle: 'اللعبة الثالثة - إمباكت هب مصر',
    selectLang: 'اختر لغتك للبدء',
    hubEgypt: 'إمباكت هب مصر',
    developedBy: 'تم التطوير بواسطة إمباكت هب مصر',
    instruction: 'اسحب الحروف الملونة إلى مكانها الصحيح لتكوين الكلمة!',
    missingInstruction: 'أكمل الحرف المفقود في الكلمة!',
    extraInstruction: 'جد الحروف الصحيحة ورتبها لتكوين الكلمة!',
    success: 'أحسنت صنعاً! ممتاز!',
    tryAgain: 'حاول مرة أخرى، أنت تستطيع فعلها!',
    nextLevel: 'المستوى التالي',
    playAgain: 'العب مجدداً',
    parentZone: 'منطقة الآباء والمعلمين',
    screenshot: 'حفظ الشهادة',
    stars: 'النجوم',
    level: 'المستوى',
    modeSelection: 'اختر وضع اللعب',
    modeFull: 'كلمة كاملة',
    modeMissing: 'حروف مفقودة',
    modeExtra: 'حروف ومشتتات',
    close: 'إغلاق',
    sound: 'الصوت',
    pronounce: 'نطق الكلمة',
    restart: 'إعادة البدء',
    home: 'الرئيسية',
    congratsTitle: 'بطل الكلمات المذهل!',
    congratsDesc: 'لقد أكملت جميع المستويات بنجاح وحصلت على وسام إمباكت هب مصر للتعليم المتطور!',
    correctCount: 'الإجابات الصحيحة',
    totalTime: 'الوقت الإجمالي',
    seconds: 'ثانية',
    downloadTitle: 'تحميل نسخة أوفلاين مستقلة (HTML)',
    downloadDesc: 'اضغط للتحميل المباشر للعبة لتعمل على أي جهاز بدون إنترنت بالكامل!',
    nextjsTitle: 'كود Next.js للإنتاج',
    nextjsDesc: 'ملفات جاهزة للنشر الفوري على Vercel أو GitHub.'
  },
  en: {
    title: '3D Word Builder Adventure',
    subtitle: 'Game #3 - Impact Hub Egypt',
    selectLang: 'Choose Your Language to Start',
    hubEgypt: 'Impact Hub Egypt',
    developedBy: 'Developed by Impact Hub Egypt',
    instruction: 'Drag the colorful letters into their correct spots to build the word!',
    missingInstruction: 'Fill in the missing letter to complete the word!',
    extraInstruction: 'Find the correct letters and arrange them, ignore extra ones!',
    success: 'Fantastic Job! Outstanding!',
    tryAgain: 'Try again, you can do it!',
    nextLevel: 'Next Level',
    playAgain: 'Play Again',
    parentZone: 'Parent & Teacher Dashboard',
    screenshot: 'Save Certificate',
    stars: 'Stars',
    level: 'Level',
    modeSelection: 'Choose Game Mode',
    modeFull: 'Full Word',
    modeMissing: 'Missing Letter',
    modeExtra: 'Letters & Distractors',
    close: 'Close',
    sound: 'Sound',
    pronounce: 'Pronounce Word',
    restart: 'Restart',
    home: 'Home',
    congratsTitle: 'Word Adventure Hero!',
    congratsDesc: 'You have completed all levels and earned the Impact Hub Egypt Educational Badge!',
    correctCount: 'Correct Words',
    totalTime: 'Total Time',
    seconds: 'seconds',
    downloadTitle: 'Download Standalone Offline Version (HTML)',
    downloadDesc: 'Get a single self-contained HTML file that runs instantly without internet!',
    nextjsTitle: 'Next.js Production Code',
    nextjsDesc: 'Files ready for immediate deployment on Vercel or GitHub.'
  },
  fr: {
    title: "Aventure d'Assemblage de Mots 3D",
    subtitle: 'Jeu #3 - Impact Hub Égypte',
    selectLang: 'Choisissez votre langue pour commencer',
    hubEgypt: 'Impact Hub Égypte',
    developedBy: 'Développé par Impact Hub Égypte',
    instruction: 'Faites glisser les lettres colorées dans les bonnes cases pour former le mot !',
    missingInstruction: 'Complétez la lettre manquante pour finir le mot !',
    extraInstruction: 'Trouvez les bonnes lettres et ordonnez-les, ignorez les intrus !',
    success: 'Excellent travail ! Magnifique !',
    tryAgain: 'Réessaie, tu vas y arriver !',
    nextLevel: 'Niveau Suivant',
    playAgain: 'Rejouer',
    parentZone: 'Tableau de bord Parents & Enseignants',
    screenshot: 'Sauvegarder le Certificat',
    stars: 'Étoiles',
    level: 'Niveau',
    modeSelection: 'Mode de jeu',
    modeFull: 'Mot Complet',
    modeMissing: 'Lettre Manquante',
    modeExtra: 'Lettres & Intrus',
    close: 'Fermer',
    sound: 'Son',
    pronounce: 'Prononcer le mot',
    restart: 'Recommencer',
    home: 'Accueil',
    congratsTitle: 'Héros des Mots !',
    congratsDesc: "Tu as terminé tous les niveaux et remporté le badge éducatif d'Impact Hub Égypte !",
    correctCount: 'Mots Corrects',
    totalTime: 'Temps Total',
    seconds: 'secondes',
    downloadTitle: 'Télécharger la version autonome hors ligne (HTML)',
    downloadDesc: "Obtenez un fichier HTML unique fonctionnant instantanément sans connexion Internet !",
    nextjsTitle: 'Code de production Next.js',
    nextjsDesc: 'Fichiers prêts pour un déploiement immédiat sur Vercel ou GitHub.'
  },
  de: {
    title: '3D-Wortbau-Abenteuer',
    subtitle: 'Spiel #3 - Impact Hub Ägypten',
    selectLang: 'Wähle deine Sprache zum Starten',
    hubEgypt: 'Impact Hub Ägypten',
    developedBy: 'Entwickelt von Impact Hub Ägypten',
    instruction: 'Ziehe die bunten Buchstaben in die richtigen Felder, um das Wort zu bauen!',
    missingInstruction: 'Füge den fehlenden Buchstaben ein, um das Wort zu vervollständigen!',
    extraInstruction: 'Finde die richtigen Buchstaben und ordne sie, ignoriere die falschen!',
    success: 'Fantastische Arbeit! Ausgezeichnet!',
    tryAgain: 'Versuche es noch einmal, du schaffst das!',
    nextLevel: 'Nächstes Level',
    playAgain: 'Noch einmal spielen',
    parentZone: 'Eltern- & Lehrer-Bereich',
    screenshot: 'Zertifikat speichern',
    stars: 'Sterne',
    level: 'Level',
    modeSelection: 'Spielmodus wählen',
    modeFull: 'Ganzes Wort',
    modeMissing: 'Fehlender Buchstabe',
    modeExtra: 'Buchstaben & Ablenkungen',
    close: 'Schließen',
    sound: 'Ton',
    pronounce: 'Wort aussprechen',
    restart: 'Neustart',
    home: 'Startseite',
    congratsTitle: 'Wort-Abenteuer Held!',
    congratsDesc: 'Du hast alle Level abgeschlossen und das pädagogische Abzeichen des Impact Hub Ägypten erhalten!',
    correctCount: 'Richtige Wörter',
    totalTime: 'Gesamtzeit',
    seconds: 'Sekunden',
    downloadTitle: 'Eigenständige Offline-Version herunterladen (HTML)',
    downloadDesc: 'Holen Sie sich eine einzelne HTML-Datei, die sofort ohne Internet läuft!',
    nextjsTitle: 'Next.js Produktionscode',
    nextjsDesc: 'Dateien bereit für die sofortige Bereitstellung auf Vercel oder GitHub.'
  }
};

export const WORD_LEVELS: Record<Language, WordItem[]> = {
  ar: [
    {
      id: 1,
      word: 'تفاحة',
      translation: 'Apple',
      visualType: 'apple',
      phonetic: 'تُفَّاحَة',
      hint: 'فاكهة حمراء أو خضراء لذيذة ومقرمشة'
    },
    {
      id: 2,
      word: 'أرنب',
      translation: 'Rabbit',
      visualType: 'rabbit',
      phonetic: 'أَرْنَب',
      hint: 'حيوان لطيف سريع القفز يحب الجزر'
    },
    {
      id: 3,
      word: 'بطة',
      translation: 'Duck',
      visualType: 'duck',
      phonetic: 'بَطَّة',
      hint: 'طائر مائي جميل يقول كواك كواك'
    },
    {
      id: 4,
      word: 'فيل',
      translation: 'Elephant',
      visualType: 'elephant',
      phonetic: 'فِيل',
      hint: 'حيوان ضخم جداً وله خرطوم طويل وأذنان كبيرتان'
    },
    {
      id: 5,
      word: 'سمكة',
      translation: 'Fish',
      visualType: 'fish',
      phonetic: 'سَمَكَة',
      hint: 'مخلوق بحري ملون يسبح بمهارة في الماء'
    }
  ],
  en: [
    {
      id: 1,
      word: 'Apple',
      translation: 'Apple',
      visualType: 'apple',
      phonetic: 'Apple',
      hint: 'A sweet, crunchy fruit that can be red, green, or yellow.'
    },
    {
      id: 2,
      word: 'Rabbit',
      translation: 'Rabbit',
      visualType: 'rabbit',
      phonetic: 'Rabbit',
      hint: 'A small, fluffy animal with long ears that loves to hop.'
    },
    {
      id: 3,
      word: 'Duck',
      translation: 'Duck',
      visualType: 'duck',
      phonetic: 'Duck',
      hint: 'A friendly water bird that says quack-quack!'
    },
    {
      id: 4,
      word: 'Elephant',
      translation: 'Elephant',
      phonetic: 'Elephant',
      visualType: 'elephant',
      hint: 'The largest land animal, with big ears and a long trunk.'
    },
    {
      id: 5,
      word: 'Fish',
      translation: 'Fish',
      visualType: 'fish',
      phonetic: 'Fish',
      hint: 'A colorful animal with scales that swims gracefully under water.'
    }
  ],
  fr: [
    {
      id: 1,
      word: 'Avion',
      translation: 'Airplane',
      visualType: 'airplane',
      phonetic: 'Avion',
      hint: 'Un grand appareil volant qui voyage dans les nuages.'
    },
    {
      id: 2,
      word: 'Chat',
      translation: 'Cat',
      visualType: 'cat',
      phonetic: 'Chat',
      hint: 'Un petit animal domestique très doux qui fait miaou.'
    },
    {
      id: 3,
      word: 'Poisson',
      translation: 'Fish',
      visualType: 'fish',
      phonetic: 'Poisson',
      hint: 'Un habitant coloré de la mer qui respire sous l\'eau.'
    },
    {
      id: 4,
      word: 'Banane',
      translation: 'Banana',
      visualType: 'banana',
      phonetic: 'Banane',
      hint: 'Un fruit jaune, doux, courbé et très facile à éplucher.'
    },
    {
      id: 5,
      word: 'Maison',
      translation: 'House',
      visualType: 'house',
      phonetic: 'Maison',
      hint: 'Un endroit chaleureux où vit notre petite famille.'
    }
  ],
  de: [
    {
      id: 1,
      word: 'Affe',
      translation: 'Monkey',
      visualType: 'monkey',
      phonetic: 'Affe',
      hint: 'Ein verspieltes Tier, das gerne auf Bäume klettert und Bananen isst.'
    },
    {
      id: 2,
      word: 'Apfel',
      translation: 'Apple',
      visualType: 'apple',
      phonetic: 'Apfel',
      hint: 'Eine knackige, gesunde Frucht, die rot, grün oder gelb sein kann.'
    },
    {
      id: 3,
      word: 'Haus',
      translation: 'House',
      visualType: 'house',
      phonetic: 'Haus',
      hint: 'Ein gemütliches Gebäude, in dem eine Familie wohnt.'
    },
    {
      id: 4,
      word: 'Ente',
      translation: 'Duck',
      visualType: 'duck',
      phonetic: 'Ente',
      hint: 'Ein freundlicher Wasservogel, der schnattert und schwimmt.'
    },
    {
      id: 5,
      word: 'Fisch',
      translation: 'Fish',
      visualType: 'fish',
      phonetic: 'Fisch',
      hint: 'Ein schuppiges Tier mit Flossen, das tief im Wasser lebt.'
    }
  ]
};
