/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Language, GameStats } from '../types';
import { TRANSLATIONS } from '../data/words';
import { Download, X, Award, CheckCircle } from 'lucide-react';
import { gameAudio } from './AudioEngine';

interface ScreenshotModalProps {
  language: Language;
  stats: GameStats;
  onClose: () => void;
  soundEnabled: boolean;
}

export const ScreenshotModal: React.FC<ScreenshotModalProps> = ({
  language,
  stats,
  onClose,
  soundEnabled
}) => {
  const t = TRANSLATIONS[language];
  const isRTL = language === 'ar';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  useEffect(() => {
    // Generate beautiful Egypt Educational Games Certificate of Achievement on canvas
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-res canvas sizes
    canvas.width = 800;
    canvas.height = 600;

    // 1. Draw solid background with beautiful gradient border
    const grad = ctx.createRadialGradient(400, 300, 50, 400, 300, 500);
    grad.addColorStop(0, '#f0fdfa');
    grad.addColorStop(1, '#ccfbf1');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 800, 600);

    // Decorative inner geometric gold border
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, 760, 560);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.strokeRect(32, 32, 736, 536);

    // Egyptian/Islamic styled corner triangles
    const drawCorner = (x: number, y: number, r: number) => {
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };
    drawCorner(20, 20, 10);
    drawCorner(780, 20, 10);
    drawCorner(20, 580, 10);
    drawCorner(780, 580, 10);

    // 2. Draw Top Heading Banner
    ctx.fillStyle = '#0d9488';
    ctx.fillRect(200, 0, 400, 60);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('IMPACT HUB EGYPT', 400, 30);

    // 3. Certificate of Achievement texts
    ctx.fillStyle = '#111827';
    ctx.font = 'bold 42px system-ui, -apple-system, sans-serif';
    ctx.fillText('CERTIFICATE', 400, 140);

    ctx.fillStyle = '#d97706';
    ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
    ctx.fillText('OF EXCELLENT SPELLING ADVENTURE', 400, 185);

    ctx.fillStyle = '#4b5563';
    ctx.font = 'italic 18px system-ui, -apple-system, sans-serif';
    ctx.fillText('This award certifies that a brilliant young spell builder completed', 400, 250);
    
    ctx.fillStyle = '#0f766e';
    ctx.font = 'bold 28px system-ui, -apple-system, sans-serif';
    ctx.fillText('3D Word Builder Adventure', 400, 300);

    // 4. Stars and Score achievements
    ctx.fillStyle = '#d97706';
    ctx.font = 'bold 48px system-ui, -apple-system, sans-serif';
    ctx.fillText('★ ★ ★ ★ ★', 400, 365);

    // Stats
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 18px system-ui, -apple-system, sans-serif';
    ctx.fillText(`Stars Earned: ${stats.stars}  |  Completed Levels: ${stats.completedLevels}`, 400, 420);

    // Arabic complementary text for Egypt collection
    ctx.fillStyle = '#0d9488';
    ctx.font = 'bold 22px "Cairo", system-ui, -apple-system, sans-serif';
    ctx.fillText('وسام التميز لبطل الحروف المتفوق', 400, 470);

    // 5. Signatures and branding seal
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(150, 530);
    ctx.lineTo(300, 530);
    ctx.moveTo(500, 530);
    ctx.lineTo(650, 530);
    ctx.stroke();

    ctx.fillStyle = '#64748b';
    ctx.font = '12px system-ui, -apple-system, sans-serif';
    ctx.fillText('Egypt EduTech Director', 225, 548);
    ctx.fillText('Impact Hub Egypt Curator', 575, 548);

    // Gold Seal circle
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(400, 520, 35, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#d97706';
    ctx.stroke();

    ctx.fillStyle = '#b45309';
    ctx.font = 'bold 10px system-ui, -apple-system, sans-serif';
    ctx.fillText('APPROVED', 400, 522);

    // Extract image URL
    try {
      const url = canvas.toDataURL('image/png');
      setImgUrl(url);
    } catch (e) {
      console.error("Canvas export failed", e);
    }
  }, [stats, language]);

  const handleDownload = () => {
    if (!imgUrl) return;
    const link = document.createElement('a');
    link.href = imgUrl;
    link.download = 'Impact_Hub_Egypt_Certificate.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (soundEnabled) {
      gameAudio.playSuccess();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full p-6 flex flex-col gap-4 text-center border border-white"
      >
        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
          <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <Award className="text-teal-600" size={18} />
            {language === 'ar' ? 'شهادة التميز للبطل' : 'Achievement Certificate'}
          </h3>
          <button
            onClick={() => {
              if (soundEnabled) gameAudio.playClick();
              onClose();
            }}
            className="p-1 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-slate-400 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Hidden Canvas used for generating the high-res image */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Image preview of certificate */}
        {imgUrl ? (
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-slate-50 relative group">
            <img src={imgUrl} alt="Egypt EduTech Certificate" className="w-full h-auto aspect-[4/3] object-contain" />
            <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
              <span className="bg-white/90 text-teal-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                {language === 'ar' ? 'جاهز للحفظ' : 'Ready to save'}
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full aspect-[4/3] bg-slate-100 rounded-2xl flex items-center justify-center animate-pulse text-xs text-slate-400">
            Generating award...
          </div>
        )}

        <div className="flex flex-col gap-2">
          <p className="text-xs text-slate-500 leading-relaxed px-4">
            {language === 'ar'
              ? 'احفظ هذه الشهادة الفاخرة للاحتفال بإنجازات طفلك في بناء الكلمات ومشاركتها مع المعلمين!'
              : 'Download this elegant educational certificate to print or share with teachers in Egypt!'}
          </p>

          <button
            onClick={handleDownload}
            disabled={!imgUrl}
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Download size={16} />
            {language === 'ar' ? 'حفظ الشهادة إلى جهازك' : 'Save Certificate (PNG)'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
