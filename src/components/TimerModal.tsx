import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Plus, Clock, Bell, Volume2, Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface TimerModalProps {
  onClose: () => void;
}

export const TimerModal: React.FC<TimerModalProps> = ({ onClose }) => {
  const [initialSeconds, setInitialSeconds] = useState(120); // 2 minutes default
  const [timeLeft, setTimeLeft] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [activityTitle, setActivityTitle] = useState('تطبيق عملي على الحاسوب');
  const timerRef = useRef<number | null>(null);

  const presets = [
    { label: '30 ثانية', seconds: 30, title: 'إجابة سريعة' },
    { label: 'دقيقة 1', seconds: 60, title: 'تفكير ومشاركة' },
    { label: 'دقيقتان 2', seconds: 120, title: 'تطبيق عملي على الحاسوب' },
    { label: '3 دقائق', seconds: 180, title: 'حل ورقة عمل' },
    { label: '5 دقائق', seconds: 300, title: 'تحدي المجموعات' },
    { label: '10 دقائق', seconds: 600, title: 'مشروع الحصة' },
  ];

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            soundEffects.playAlarmSound();
            return 0;
          }
          if (prev <= 5) {
            soundEffects.playTickSound();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    soundEffects.playClick();
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    soundEffects.playClick();
    setIsRunning(false);
    setTimeLeft(initialSeconds);
  };

  const addSeconds = (secs: number) => {
    soundEffects.playClick();
    setTimeLeft((prev) => prev + secs);
  };

  const selectPreset = (secs: number, title: string) => {
    soundEffects.playClick();
    setIsRunning(false);
    setInitialSeconds(secs);
    setTimeLeft(secs);
    setActivityTitle(title);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progressPercent = initialSeconds > 0 ? ((initialSeconds - timeLeft) / initialSeconds) * 100 : 0;
  const isFinished = timeLeft === 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-800 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md">
              <Clock className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold">مؤقت الحصة التفاعلي</h2>
              <p className="text-emerald-100 text-xs">إدارة أوقات الأنشطة والتمارين في معمل تقنية المعلومات</p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          {/* Activity title banner */}
          <div className="mb-4 inline-block px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-sm font-extrabold border border-emerald-200">
            📌 النشاط الحالي: {activityTitle}
          </div>

          {/* Big Circular Clock Display */}
          <div className="relative w-64 h-64 mx-auto my-3 flex items-center justify-center">
            {/* SVG Progress Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                className="stroke-slate-100"
                strokeWidth="7"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="44"
                className={`transition-all duration-1000 ${
                  isFinished
                    ? 'stroke-rose-500 animate-pulse'
                    : timeLeft <= 10
                    ? 'stroke-amber-500'
                    : 'stroke-emerald-500'
                }`}
                strokeWidth="7"
                strokeDasharray={276.4}
                strokeDashoffset={276.4 - (276.4 * (100 - progressPercent)) / 100}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Inner Digits Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {isFinished ? (
                <div className="flex flex-col items-center animate-bounce text-rose-600">
                  <Bell className="w-10 h-10 mb-1" />
                  <span className="text-2xl font-black">انتهى الوقت!</span>
                </div>
              ) : (
                <>
                  <div className="text-5xl sm:text-6xl font-black text-slate-800 tracking-tight tabular-nums">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                  </div>
                  <div className="text-xs font-semibold text-slate-400 mt-1">
                    {isRunning ? 'الوقت يمضي...' : 'متوقف مؤقتاً'}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-center gap-3 my-4">
            <button
              onClick={resetTimer}
              className="p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="إعادة ضبط"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={toggleTimer}
              className={`px-8 py-3.5 rounded-2xl font-extrabold text-lg text-white shadow-lg transition-transform active:scale-95 flex items-center gap-2 ${
                isRunning
                  ? 'bg-amber-500 hover:bg-amber-600'
                  : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5" />
                  <span>إيقاف مؤقت</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>بدء المؤقت</span>
                </>
              )}
            </button>

            <button
              onClick={() => addSeconds(30)}
              className="px-3.5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors"
              title="إضافة 30 ثانية"
            >
              <Plus className="w-4 h-4" />
              <span>30 ثانية</span>
            </button>
          </div>

          {/* Activity Presets Grid */}
          <div className="mt-5 border-t border-slate-100 pt-4">
            <div className="text-xs font-bold text-slate-500 mb-2">أوقات مسبقة للأنشطة الصفية:</div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.seconds}
                  onClick={() => selectPreset(preset.seconds, preset.title)}
                  className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                    initialSeconds === preset.seconds
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-800 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="text-slate-900 font-extrabold">{preset.label}</div>
                  <div className="text-[10px] text-slate-500 truncate mt-0.5">{preset.title}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
