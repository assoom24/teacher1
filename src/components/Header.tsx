import React from 'react';
import {
  Shuffle,
  Clock,
  Gamepad2,
  Star,
  HelpCircle,
  Users,
  Settings2,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  School,
  BarChart3
} from 'lucide-react';
import { soundEffects } from '../utils/soundEffects';

interface HeaderProps {
  activeTab: string | null;
  setActiveTab: (tab: string | null) => void;
  currentClass: string;
  onClassChange: (className: string) => void;
  availableClasses: string[];
  totalStars: number;
  onResetPoints: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  currentClass,
  onClassChange,
  availableClasses,
  totalStars,
  onResetPoints,
  isMuted,
  onToggleMute,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const toggleFullscreen = () => {
    soundEffects.playClick();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const navItems = [
    {
      id: 'random',
      title: 'الاسم العشوائي',
      icon: Shuffle,
      color: 'hover:border-blue-400 text-blue-800 bg-white shadow-xs',
      activeColor: 'bg-blue-600 text-white shadow-md',
    },
    {
      id: 'timer',
      title: 'المؤقت',
      icon: Clock,
      color: 'hover:border-emerald-400 text-emerald-800 bg-white shadow-xs',
      activeColor: 'bg-emerald-600 text-white shadow-md',
    },
    {
      id: 'games',
      title: 'الألعاب التفاعلية',
      icon: Gamepad2,
      color: 'hover:border-purple-400 text-purple-800 bg-white shadow-xs',
      activeColor: 'bg-purple-600 text-white shadow-md',
    },
    {
      id: 'leaderboard',
      title: 'نقاطي',
      icon: Star,
      color: 'hover:border-amber-400 text-amber-800 bg-white shadow-xs',
      activeColor: 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md ring-2 ring-amber-300',
    },
    {
      id: 'reports',
      title: 'تقارير الأداء 📊',
      icon: BarChart3,
      color: 'hover:border-violet-400 text-violet-800 bg-white shadow-xs',
      activeColor: 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md',
    },
    {
      id: 'quiz',
      title: 'مسابقة',
      icon: HelpCircle,
      color: 'hover:border-cyan-400 text-cyan-800 bg-white shadow-xs',
      activeColor: 'bg-cyan-600 text-white shadow-md',
    },
    {
      id: 'teams',
      title: 'تقسيم الطلبة',
      icon: Users,
      color: 'hover:border-indigo-400 text-indigo-800 bg-white shadow-xs',
      activeColor: 'bg-indigo-600 text-white shadow-md',
    },
    {
      id: 'manage',
      title: 'تخصيص الطلبة',
      icon: Settings2,
      color: 'hover:border-slate-400 text-slate-800 bg-white shadow-xs',
      activeColor: 'bg-slate-800 text-white shadow-md',
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-slate-100/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Identity Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
          {/* Right side in RTL: Oman Ministry & Teacher Name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-amber-300 font-bold border border-white/20">
              <School className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold flex items-center gap-1.5 text-white">
                <span>سلطنة عُمان · وزارة التربية والتعليم</span>
                <span className="text-amber-400">★</span>
                <span>مادة تقنية المعلومات</span>
              </div>
              <div className="text-blue-200 text-xs flex items-center gap-2">
                <span>برنامج المعلم المبدع</span>
                <span>•</span>
                <span className="font-semibold text-amber-300">تنفيذ وإعداد: أ. أسماء العلوية</span>
              </div>
            </div>
          </div>

          {/* Quick stats and classroom switcher */}
          <div className="flex items-center gap-3">
            {/* Class switcher */}
            <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg border border-white/15">
              <span className="text-blue-200 text-xs">الصف:</span>
              <select
                value={currentClass}
                onChange={(e) => {
                  soundEffects.playClick();
                  onClassChange(e.target.value);
                }}
                className="bg-transparent text-white font-semibold text-xs focus:outline-none cursor-pointer"
              >
                {availableClasses.map((cls) => (
                  <option key={cls} value={cls} className="bg-slate-900 text-white">
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            {/* Total stars counter */}
            <div className="flex items-center gap-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 px-3 py-1 rounded-lg font-bold">
              <span>{totalStars}</span>
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            </div>

            {/* Sound toggle */}
            <button
              onClick={() => {
                soundEffects.playClick();
                onToggleMute();
              }}
              title={isMuted ? 'تشغيل المؤثرات الصوتية' : 'كتم الصوت'}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-blue-100 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-300" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
            </button>

            {/* Fullscreen toggle for Smart Board */}
            <button
              onClick={toggleFullscreen}
              title="ملء الشاشة للشاشة التفاعلية"
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-blue-100 transition-colors hidden sm:flex items-center gap-1 text-xs"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              <span>الشاشة التفاعلية</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar Matching the Reference Classroom Photo */}
      <div className="max-w-7xl mx-auto px-3 py-2.5">
        <div className="flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5">
          <div className="flex items-center gap-2 md:gap-3 flex-wrap sm:flex-nowrap">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundEffects.playClick();
                    setActiveTab(isActive ? null : item.id);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold border transition-all duration-200 cursor-pointer whitespace-nowrap active:scale-95 ${
                    isActive
                      ? item.activeColor
                      : `${item.color} border-slate-200 hover:shadow-xs`
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>

          {/* Quick reset or star burst helper */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (window.confirm('هل تريد تصفير نقاط الحصة لجميع الطلبة لبدء درس جديد؟')) {
                  soundEffects.playClick();
                  onResetPoints();
                }
              }}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200 transition-colors"
              title="تصفير نجوم الحصة"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>تصفير النجوم</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
