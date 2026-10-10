import React, { useState } from 'react';
import { X, Users, Shuffle, Star, Plus, Minus, Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Student, Team } from '../types';
import { soundEffects } from '../utils/soundEffects';

interface TeamDividerModalProps {
  students: Student[];
  onClose: () => void;
  onAwardTeamMembers: (studentIds: string[], delta: number, reason: string) => void;
}

const DEFAULT_TEAM_NAMES = [
  { name: 'فريق الخوارزمي (البرمجة والخوارزميات)', color: 'from-blue-600 to-indigo-700', border: 'border-blue-300', bg: 'bg-blue-50/50' },
  { name: 'فريق الكندي (التشفير والأمن السيبراني)', color: 'from-emerald-600 to-teal-700', border: 'border-emerald-300', bg: 'bg-emerald-50/50' },
  { name: 'فريق ابن الهيثم (الذكاء الاصطناعي والرؤية)', color: 'from-purple-600 to-pink-700', border: 'border-purple-300', bg: 'bg-purple-50/50' },
  { name: 'فريق البيروني (علوم البيانات والحساب)', color: 'from-amber-600 to-orange-700', border: 'border-amber-300', bg: 'bg-amber-50/50' },
  { name: 'فريق جابر بن حيان (الابتكار والتصنيع)', color: 'from-rose-600 to-red-700', border: 'border-rose-300', bg: 'bg-rose-50/50' },
  { name: 'فريق الزهراوي (الدقة والتميز)', color: 'from-cyan-600 to-sky-700', border: 'border-cyan-300', bg: 'bg-cyan-50/50' },
];

export const TeamDividerModal: React.FC<TeamDividerModalProps> = ({
  students,
  onClose,
  onAwardTeamMembers,
}) => {
  const [numTeams, setNumTeams] = useState(4);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isDividing, setIsDividing] = useState(false);

  const divideStudents = () => {
    soundEffects.playClick();
    setIsDividing(true);

    setTimeout(() => {
      // Shuffle students array
      const shuffled = [...students].sort(() => Math.random() - 0.5);
      const newTeams: Team[] = [];

      for (let i = 0; i < numTeams; i++) {
        const teamInfo = DEFAULT_TEAM_NAMES[i % DEFAULT_TEAM_NAMES.length];
        newTeams.push({
          id: `team-${i + 1}`,
          name: teamInfo.name,
          color: teamInfo.color,
          members: [],
          score: 0,
        });
      }

      shuffled.forEach((student, index) => {
        const teamIndex = index % numTeams;
        newTeams[teamIndex].members.push(student);
      });

      setTeams(newTeams);
      setIsDividing(false);
      soundEffects.playFanfare();
      try {
        confetti({ particleCount: 60, spread: 70 });
      } catch {}
    }, 600);
  };

  const handleTeamScore = (teamId: string, delta: number) => {
    if (delta > 0) {
      soundEffects.playStarSound();
    } else {
      soundEffects.playBuzzerSound();
    }
    setTeams((prev) =>
      prev.map((t) => (t.id === teamId ? { ...t, score: Math.max(0, t.score + delta) } : t))
    );
  };

  const handleRewardWholeTeam = (team: Team) => {
    soundEffects.playStarSound();
    const ids = team.members.map((m) => m.id);
    onAwardTeamMembers(ids, 1, `فوز ${team.name} في النشاط الجماعي`);
    try {
      confetti({ particleCount: 70, spread: 80 });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-scale-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 via-blue-800 to-indigo-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md">
              <Users className="w-6 h-6 text-indigo-200" />
            </div>
            <div>
              <h2 className="text-xl font-bold">تقسيم الطلبة إلى مجموعات العمل</h2>
              <p className="text-indigo-100 text-xs">توزيع عشوائي متوازن للأنشطة التعاونية والتنافسية</p>
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
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {/* Controls Bar */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">عدد المجموعات المطلوبة:</span>
              <div className="flex items-center gap-1">
                {[2, 3, 4, 5, 6].map((n) => (
                  <button
                    key={n}
                    onClick={() => {
                      soundEffects.playClick();
                      setNumTeams(n);
                    }}
                    className={`w-9 h-9 rounded-xl font-black text-sm transition-all ${
                      numTeams === n
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={divideStudents}
              disabled={isDividing}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
            >
              <Shuffle className={`w-4 h-4 ${isDividing ? 'animate-spin' : ''}`} />
              <span>{isDividing ? 'جاري التوزيع...' : 'إجراء التقسيم العشوائي 🎲'}</span>
            </button>
          </div>

          {/* Teams Grid */}
          {teams.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Users className="w-16 h-16 mx-auto mb-2 opacity-40 text-indigo-400" />
              <p className="font-bold text-slate-600 text-base">اختر عدد المجموعات ثم اضغط على زر التقسيم العشوائي</p>
              <p className="text-xs text-slate-400 mt-1">سيتم توزيع {students.length} طالب تلقائياً وبالتساوي</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teams.map((team, idx) => {
                const teamInfo = DEFAULT_TEAM_NAMES[idx % DEFAULT_TEAM_NAMES.length];
                return (
                  <div
                    key={team.id}
                    className={`rounded-2xl border-2 ${teamInfo.border} ${teamInfo.bg} p-4 shadow-xs flex flex-col justify-between`}
                  >
                    <div>
                      {/* Team Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${team.color}`} />
                          <h4 className="font-extrabold text-slate-900 text-sm">{team.name}</h4>
                        </div>

                        {/* Team Score */}
                        <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-xl border border-slate-200 shadow-2xs">
                          <button
                            onClick={() => handleTeamScore(team.id, -1)}
                            disabled={team.score <= 0}
                            className="text-slate-400 hover:text-rose-600 p-0.5 disabled:opacity-30"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-black text-blue-900 text-sm tabular-nums">
                            {team.score} ⭐
                          </span>
                          <button
                            onClick={() => handleTeamScore(team.id, 1)}
                            className="text-slate-400 hover:text-emerald-600 p-0.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Members List */}
                      <div className="flex flex-wrap gap-1.5 min-h-[60px]">
                        {team.members.map((member) => (
                          <span
                            key={member.id}
                            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200/80 text-xs font-bold text-slate-800 shadow-2xs"
                          >
                            {member.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Quick Award Whole Team button */}
                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500">
                        العدد: {team.members.length} طالب
                      </span>
                      <button
                        onClick={() => handleRewardWholeTeam(team)}
                        className="text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-white hover:bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200 transition-colors flex items-center gap-1 shadow-2xs"
                      >
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>منح نجمة لجميع أفراد الفريق</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
