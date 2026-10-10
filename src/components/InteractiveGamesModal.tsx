import React, { useState, useEffect } from 'react';
import {
  X,
  Gamepad2,
  Cpu,
  ShieldCheck,
  Brain,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Award,
  Sparkles,
  Layers,
  Code,
  Table,
  Globe,
  Database,
  Radio,
  Box,
  Binary,
  Star
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HARDWARE_SOFTWARE_ITEMS } from '../data/initialData';
import { soundEffects } from '../utils/soundEffects';
import { GradeLevel, detectGradeLevel, getGradeLabel } from '../types';

interface InteractiveGamesModalProps {
  currentClass: string;
  onClose: () => void;
  onAwardGameWinner?: (points: number, reason: string) => void;
}

export const InteractiveGamesModal: React.FC<InteractiveGamesModalProps> = ({
  currentClass,
  onClose,
}) => {
  const detectedInitialGrade = detectGradeLevel(currentClass);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(
    detectedInitialGrade === 'general' ? 'grade5' : detectedInitialGrade
  );

  // Active sub-game within the selected grade
  const [activeGameKey, setActiveGameKey] = useState<string>('g5_classifier');

  // When grade tab changes, reset active sub-game to the first game of that grade
  const handleGradeChange = (grade: GradeLevel) => {
    soundEffects.playClick();
    setSelectedGrade(grade);
    if (grade === 'grade5') setActiveGameKey('g5_classifier');
    else if (grade === 'grade6') setActiveGameKey('g6_robot');
    else if (grade === 'grade7') setActiveGameKey('g7_html');
    else if (grade === 'grade8') setActiveGameKey('g8_db');
    else setActiveGameKey('g5_classifier');
  };

  // --- GRADE 5: GAME 1 (HARDWARE VS SOFTWARE) ---
  const [g5Index, setG5Index] = useState(0);
  const [g5Score, setG5Score] = useState(0);
  const [g5Feedback, setG5Feedback] = useState<'correct' | 'wrong' | null>(null);
  const [g5Finished, setG5Finished] = useState(false);
  const currentG5Item = HARDWARE_SOFTWARE_ITEMS[g5Index];

  const handleG5Answer = (chosenType: 'hardware' | 'software') => {
    if (g5Feedback !== null || g5Finished) return;
    if (chosenType === currentG5Item.type) {
      soundEffects.playStarSound();
      setG5Score((prev) => prev + 10);
      setG5Feedback('correct');
    } else {
      soundEffects.playBuzzerSound();
      setG5Feedback('wrong');
    }
    setTimeout(() => {
      setG5Feedback(null);
      if (g5Index + 1 < HARDWARE_SOFTWARE_ITEMS.length) {
        setG5Index((prev) => prev + 1);
      } else {
        setG5Finished(true);
        soundEffects.playFanfare();
        try { confetti({ particleCount: 70, spread: 60 }); } catch {}
      }
    }, 850);
  };

  // --- GRADE 5: GAME 2 (SCRATCH BLOCKS SEQUENCER) ---
  const scratchChallenges = [
    {
      goal: 'اجعل قط سكراتش يتحرك للأمام 50 خطوة ثم يقول "مرحباً بكم!"',
      blocks: ['عند النقر على العلم الأخضر 🏁', 'تحرك 50 خطوة 🐾', 'قل "مرحباً بكم!" لمدة ثانيتين 💬'],
      options: [
        ['عند النقر على العلم الأخضر 🏁', 'تحرك 50 خطوة 🐾', 'قل "مرحباً بكم!" لمدة ثانيتين 💬'],
        ['قل "مرحباً بكم!" لمدة ثانيتين 💬', 'عند النقر على العلم الأخضر 🏁', 'تحرك 50 خطوة 🐾'],
        ['تحرك 50 خطوة 🐾', 'قل "مرحباً بكم!" لمدة ثانيتين 💬', 'عند النقر على العلم الأخضر 🏁'],
      ],
      correctOption: 0,
    },
    {
      goal: 'برمجة دوران كامل للكائن 4 مرات متتالية',
      blocks: ['عند النقر على العلم الأخضر 🏁', 'كرر 4 مرات 🔁', 'استدر 90 درجة 🔄'],
      options: [
        ['استدر 90 درجة 🔄', 'عند النقر على العلم الأخضر 🏁', 'كرر 4 مرات 🔁'],
        ['عند النقر على العلم الأخضر 🏁', 'كرر 4 مرات 🔁', 'استدر 90 درجة 🔄'],
        ['كرر 4 مرات 🔁', 'عند النقر على العلم الأخضر 🏁', 'استدر 90 درجة 🔄'],
      ],
      correctOption: 1,
    },
    {
      goal: 'تغيير مظهر الكائن وتشغيل صوت المواء',
      blocks: ['عند الضغط على مفتاح المسافة ⌨️', 'المظهر التالي 🎭', 'ابدأ الصوت (مواء) 🔊'],
      options: [
        ['ابدأ الصوت (مواء) 🔊', 'المظهر التالي 🎭', 'عند الضغط على مفتاح المسافة ⌨️'],
        ['المظهر التالي 🎭', 'ابدأ الصوت (مواء) 🔊', 'عند الضغط على مفتاح المسافة ⌨️'],
        ['عند الضغط على مفتاح المسافة ⌨️', 'المظهر التالي 🎭', 'ابدأ الصوت (مواء) 🔊'],
      ],
      correctOption: 2,
    },
  ];
  const [scratchIdx, setScratchIdx] = useState(0);
  const [scratchScore, setScratchScore] = useState(0);
  const [scratchResult, setScratchResult] = useState<'correct' | 'wrong' | null>(null);

  const handleScratchChoice = (optIdx: number) => {
    if (scratchResult !== null) return;
    const isCorrect = optIdx === scratchChallenges[scratchIdx].correctOption;
    if (isCorrect) {
      soundEffects.playStarSound();
      setScratchScore((s) => s + 20);
      setScratchResult('correct');
    } else {
      soundEffects.playBuzzerSound();
      setScratchResult('wrong');
    }
    setTimeout(() => {
      setScratchResult(null);
      setScratchIdx((prev) => (prev + 1) % scratchChallenges.length);
    }, 1500);
  };

  // --- GRADE 6: GAME 1 (ROBOTICS & SENSORS ARENA) ---
  const robotScenarios = [
    {
      situation: 'الروبوت يسير إلى الأمام واقترب من جدار خرساني على بُعد 10 سم، ما الحساس الذي يجب تفعيله لإيقافه وتجنب الاصطدام؟',
      correctSensor: 'حساس الموجات فوق الصوتية (Ultrasonic)',
      options: ['حساس الموجات فوق الصوتية (Ultrasonic)', 'حساس اللمس (Touch Sensor)', 'حساس الضوء واللون', 'المحرك الكبير'],
      hint: 'يقيس المسافة بدقة عبر ارتداد الصدى الصوتي',
      icon: '🦇',
    },
    {
      situation: 'في مسابقة تتبع المسار، يريد الروبوت البقاء فوق الخط الأسود المرسوم على أرضية بيضاء، ما الحساس المسؤول؟',
      correctSensor: 'حساس الضوء / اللون (Color Sensor)',
      options: ['حساس الضوء / اللون (Color Sensor)', 'حساس الصوت (Sound)', 'حساس الجيروسكوب', 'حساس الحرارة'],
      hint: 'يميز بين شدة انعكاس الضوء على الأسطح الداكنة والفاتحة',
      icon: '🎨',
    },
    {
      situation: 'الروبوت مزود بذراع ميكانيكية، ونريد أن يتوقف فور أن يضغط الزميل على الزر الأمامي كزر الطوارئ، ما الحساس؟',
      correctSensor: 'حساس اللمس (Touch Sensor)',
      options: ['حساس اللمس (Touch Sensor)', 'حساس المسافة', 'مستشعر البوصلة', 'حساس الرطوبة'],
      hint: 'يعمل كمفتاح كهربائي عند الضغط عليه أو تحريره',
      icon: '🔘',
    },
    {
      situation: 'يريد الروبوت الدوران بدقة 90 درجة إلى اليمين في متاهة مستقيمة، ما الحساس الذي يحسب زاوية الدوران بدقة؟',
      correctSensor: 'حساس الجيروسكوب (Gyro Sensor)',
      options: ['حساس الجيروسكوب (Gyro Sensor)', 'حساس اللمس', 'حساس الضوء', 'السماعة الصوتية'],
      hint: 'يقيس معدل الدوران والزوايا الأفقية والرأسية',
      icon: '🧭',
    },
  ];
  const [robotIdx, setRobotIdx] = useState(0);
  const [robotScore, setRobotScore] = useState(0);
  const [robotFeedback, setRobotFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleRobotChoice = (sensor: string) => {
    if (robotFeedback !== null) return;
    const isCorrect = sensor === robotScenarios[robotIdx].correctSensor;
    if (isCorrect) {
      soundEffects.playStarSound();
      setRobotScore((s) => s + 25);
      setRobotFeedback('correct');
    } else {
      soundEffects.playBuzzerSound();
      setRobotFeedback('wrong');
    }
    setTimeout(() => {
      setRobotFeedback(null);
      setRobotIdx((prev) => (prev + 1) % robotScenarios.length);
    }, 1400);
  };

  // --- GRADE 6: GAME 2 (EXCEL SPREADSHEET MASTER) ---
  const excelScenarios = [
    {
      task: 'نريد جمع درجات الاختبار القصير لجميع طلبة الصف في الخلايا (B2:B20):',
      correctFormula: '=SUM(B2:B20)',
      options: ['=SUM(B2:B20)', '=AVERAGE(B2:B20)', '=MAX(B2:B20)', '=COUNT(B2:B20)'],
      explanation: 'دالة الجمع SUM تحسب إجمالي القيم الرقمية.',
    },
    {
      task: 'نريد معرفة أعلى وأفضل درجة تم تسجيلها في مادة تقنية المعلومات:',
      correctFormula: '=MAX(B2:B20)',
      options: ['=MAX(B2:B20)', '=MIN(B2:B20)', '=SUM(B2:B20)', '=LARGE_NUM(B2:B20)'],
      explanation: 'دالة MAX تعيد أكبر قيمة رقمية في النطاق المحدد.',
    },
    {
      task: 'نريد حساب متوسط (معدل) أداء الصف في النشاط العملي:',
      correctFormula: '=AVERAGE(B2:B20)',
      options: ['=AVERAGE(B2:B20)', '=MEAN(B2:B20)', '=SUM(B2:B20)', '=COUNT(B2:B20)'],
      explanation: 'دالة AVERAGE تقسم مجموع الدرجات على عدد الطلبة تلقائياً.',
    },
    {
      task: 'نريد معرفة عدد الطلبة الذين حضروا وسُجلت لهم درجات عددية:',
      correctFormula: '=COUNT(B2:B20)',
      options: ['=COUNT(B2:B20)', '=TOTAL(B2:B20)', '=SUM(B2:B20)', '=NUMBER(B2:B20)'],
      explanation: 'دالة COUNT تحسب عدد الخلايا التي تحتوي على أرقام فقط.',
    },
  ];
  const [excelIdx, setExcelIdx] = useState(0);
  const [excelScore, setExcelScore] = useState(0);
  const [excelFeedback, setExcelFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleExcelChoice = (f: string) => {
    if (excelFeedback !== null) return;
    const isCorrect = f === excelScenarios[excelIdx].correctFormula;
    if (isCorrect) {
      soundEffects.playStarSound();
      setExcelScore((s) => s + 25);
      setExcelFeedback('correct');
    } else {
      soundEffects.playBuzzerSound();
      setExcelFeedback('wrong');
    }
    setTimeout(() => {
      setExcelFeedback(null);
      setExcelIdx((prev) => (prev + 1) % excelScenarios.length);
    }, 1400);
  };

  // --- GRADE 7: GAME 1 (HTML & WEB CRAFTER) ---
  const htmlQuestions = [
    {
      tag: '<img src="logo.png">',
      desc: 'ما الوظيفة التي يقوم بها هذا الوسم في صفحة الويب؟',
      correct: 'إدراج صورة لعرضها في الصفحة',
      options: ['إدراج صورة لعرضها في الصفحة', 'إنشاء عنوان عريض رئيسي', 'تغيير لون الخلفية', 'إضافة زر تسجيل الدخول'],
    },
    {
      tag: '<a href="https://moe.gov.om">بوابة سلطنة عمان</a>',
      desc: 'ما الوظيفة التي يقوم بها هذا الوسم في صفحة الويب؟',
      correct: 'إنشاء رابط تشعبي ينقل المستخدم للموقع',
      options: ['إنشاء رابط تشعبي ينقل المستخدم للموقع', 'تشغيل مقطع فيديو', 'حفظ الصفحة في المفضلة', 'إنشاء جدول دراسي'],
    },
    {
      tag: '<h1>مرحباً بكم في معمل تقنية المعلومات</h1>',
      desc: 'ما الوظيفة التي يقوم بها هذا الوسم في صفحة الويب؟',
      correct: 'إنشاء عنوان رئيسي كبير بأعلى درجة أهمية',
      options: ['إنشاء عنوان رئيسي كبير بأعلى درجة أهمية', 'إنشاء فقرة نصية عادية صغرى', 'إدراج خط فاصل', 'إغلاق المتصفح'],
    },
    {
      tag: '<button onclick="save()">حفظ المشروع</button>',
      desc: 'ما الوظيفة التي يقوم بها هذا الوسم في صفحة الويب؟',
      correct: 'زر تفاعلي ينفذ أمراً عند النقر عليه',
      options: ['زر تفاعلي ينفذ أمراً عند النقر عليه', 'صورة متحركة', 'قائمة منسدلة', 'تسطير الكلمات'],
    },
  ];
  const [htmlIdx, setHtmlIdx] = useState(0);
  const [htmlScore, setHtmlScore] = useState(0);
  const [htmlFeedback, setHtmlFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleHtmlChoice = (ans: string) => {
    if (htmlFeedback !== null) return;
    const isCorrect = ans === htmlQuestions[htmlIdx].correct;
    if (isCorrect) {
      soundEffects.playStarSound();
      setHtmlScore((s) => s + 25);
      setHtmlFeedback('correct');
    } else {
      soundEffects.playBuzzerSound();
      setHtmlFeedback('wrong');
    }
    setTimeout(() => {
      setHtmlFeedback(null);
      setHtmlIdx((prev) => (prev + 1) % htmlQuestions.length);
    }, 1400);
  };

  // --- GRADE 7: GAME 2 (AI MODEL TRAINER) ---
  const aiSamples = [
    {
      data: 'صورة قطة تلعب بالكرة',
      domain: 'رؤية حاسوبية (Computer Vision)',
      type: 'صورة (Image Data)',
      options: ['رؤية حاسوبية (Computer Vision)', 'معالجة لغات طبيعية (NLP)', 'بيانات صوتية (Audio)'],
      correct: 'رؤية حاسوبية (Computer Vision)',
    },
    {
      data: 'تسجيل صوتي يقول: "يا سيري، ما هي حالة الطقس في مسقط؟"',
      domain: 'تعرف على الكلام الصوتي (Speech Recognition)',
      type: 'صوت (Audio Data)',
      options: ['تعرف على الكلام الصوتي (Speech Recognition)', 'تصميم ثلاثي الأبعاد', 'جدول قواعد بيانات'],
      correct: 'تعرف على الكلام الصوتي (Speech Recognition)',
    },
    {
      data: 'ترجمة نص كامل من اللغة العربية إلى اللغة الإنجليزية فورياً',
      domain: 'معالجة اللغات الطبيعية (NLP)',
      type: 'نص (Text Data)',
      options: ['معالجة اللغات الطبيعية (NLP)', 'تحكم في عتاد الحاسوب', 'حساس روبوت بالموجات'],
      correct: 'معالجة اللغات الطبيعية (NLP)',
    },
  ];
  const [aiIdx, setAiIdx] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [aiFeedback, setAiFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleAiChoice = (choice: string) => {
    if (aiFeedback !== null) return;
    const isCorrect = choice === aiSamples[aiIdx].correct;
    if (isCorrect) {
      soundEffects.playStarSound();
      setAiScore((s) => s + 30);
      setAiFeedback('correct');
    } else {
      soundEffects.playBuzzerSound();
      setAiFeedback('wrong');
    }
    setTimeout(() => {
      setAiFeedback(null);
      setAiIdx((prev) => (prev + 1) % aiSamples.length);
    }, 1400);
  };

  // --- GRADE 8: GAME 1 (DATABASE & SQL EXPLORER) ---
  const dbQuestions = [
    {
      queryTask: 'أي من الحقول التالية يمثل المفتاح الأساسي (Primary Key) في جدول بيانات الطلبة؟',
      correct: 'الرقم المدني العماني (لا يتكرر نهائياً)',
      options: ['الرقم المدني العماني (لا يتكرر نهائياً)', 'اسم الطالب الأول', 'تاريخ الميلاد', 'اللون المفضل'],
      hint: 'يجب أن تكون قيمة فريدة حصرية لكل شخص',
    },
    {
      queryTask: 'في لغة قواعد البيانات SQL، ما هو الأمر المستخدم لاسترجاع وعرض بيانات الطلبة المتفوقين؟',
      correct: 'SELECT * FROM Students',
      options: ['SELECT * FROM Students', 'DELETE FROM Students', 'DROP TABLE Students', 'INSERT INTO Students'],
      hint: 'الأمر SELECT يعني اختر واسترجع البيانات',
    },
    {
      queryTask: 'الجدول في قاعدة البيانات يتكون من أعمدة وصفوف؛ ماذا يمثل كل صف أفقي (Row)؟',
      correct: 'سجل كامل لطالب واحد (Record)',
      options: ['سجل كامل لطالب واحد (Record)', 'اسم البرنامج فقط', 'سعة الذاكرة', 'حقل بيانات وحيد'],
      hint: 'يحتوي على كافة بيانات الكائن المحدد',
    },
  ];
  const [dbIdx, setDbIdx] = useState(0);
  const [dbScore, setDbScore] = useState(0);
  const [dbFeedback, setDbFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleDbChoice = (choice: string) => {
    if (dbFeedback !== null) return;
    const isCorrect = choice === dbQuestions[dbIdx].correct;
    if (isCorrect) {
      soundEffects.playStarSound();
      setDbScore((s) => s + 30);
      setDbFeedback('correct');
    } else {
      soundEffects.playBuzzerSound();
      setDbFeedback('wrong');
    }
    setTimeout(() => {
      setDbFeedback(null);
      setDbIdx((prev) => (prev + 1) % dbQuestions.length);
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[94vh] animate-scale-up">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 text-white p-4 sm:p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/15 backdrop-blur-md">
              <Gamepad2 className="w-6 h-6 text-purple-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold">واحة الألعاب التفاعلية لتقنية المعلومات</h2>
                <span className="bg-amber-400 text-amber-950 text-[11px] font-black px-2 py-0.5 rounded-full">
                  {getGradeLabel(selectedGrade)}
                </span>
              </div>
              <p className="text-purple-100 text-xs">ألعاب خاصة ومنهجية مخصصة لكل صف دراسي على الشاشة التفاعلية</p>
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

        {/* Primary Grade Selector Bar */}
        <div className="bg-slate-900 text-white p-2.5 px-4 flex items-center justify-between flex-wrap gap-2 shrink-0">
          <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <span>اختر المرحلة الصفية:</span>
            <span className="text-[10px] text-amber-300">(محددة تلقائياً لـ {currentClass})</span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {(['grade5', 'grade6', 'grade7', 'grade8'] as GradeLevel[]).map((grade) => (
              <button
                key={grade}
                onClick={() => handleGradeChange(grade)}
                className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  selectedGrade === grade
                    ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950 shadow-md font-black ring-2 ring-amber-300'
                    : 'bg-white/10 hover:bg-white/20 text-slate-200'
                }`}
              >
                {getGradeLabel(grade)}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Sub-Games Selector for the Selected Grade */}
        <div className="bg-slate-100 p-2.5 border-b border-slate-200 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          {selectedGrade === 'grade5' && (
            <>
              <button
                onClick={() => { soundEffects.playClick(); setActiveGameKey('g5_classifier'); }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeGameKey === 'g5_classifier' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>تصنيف العتاد والبرمجيات</span>
              </button>
              <button
                onClick={() => { soundEffects.playClick(); setActiveGameKey('g5_scratch'); }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeGameKey === 'g5_scratch' ? 'bg-amber-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>ترتيب لبنات سكراتش 🐱</span>
              </button>
            </>
          )}

          {selectedGrade === 'grade6' && (
            <>
              <button
                onClick={() => { soundEffects.playClick(); setActiveGameKey('g6_robot'); }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeGameKey === 'g6_robot' ? 'bg-teal-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>تحدي الروبوت والحساسات 🦾</span>
              </button>
              <button
                onClick={() => { soundEffects.playClick(); setActiveGameKey('g6_excel'); }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeGameKey === 'g6_excel' ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Table className="w-3.5 h-3.5" />
                <span>خبير معادلات إكسل =SUM</span>
              </button>
            </>
          )}

          {selectedGrade === 'grade7' && (
            <>
              <button
                onClick={() => { soundEffects.playClick(); setActiveGameKey('g7_html'); }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeGameKey === 'g7_html' ? 'bg-cyan-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>باني وسوم الويب HTML 🌐</span>
              </button>
              <button
                onClick={() => { soundEffects.playClick(); setActiveGameKey('g7_ai'); }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeGameKey === 'g7_ai' ? 'bg-purple-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Brain className="w-3.5 h-3.5" />
                <span>مختبر تدريب الذكاء الاصطناعي 🤖</span>
              </button>
            </>
          )}

          {selectedGrade === 'grade8' && (
            <>
              <button
                onClick={() => { soundEffects.playClick(); setActiveGameKey('g8_db'); }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeGameKey === 'g8_db' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>محلل قواعد البيانات SQL 🗄️</span>
              </button>
            </>
          )}
        </div>

        {/* Game Stage Area */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {/* --- GRADE 5: HARDWARE VS SOFTWARE --- */}
          {selectedGrade === 'grade5' && activeGameKey === 'g5_classifier' && (
            <div className="flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs font-bold text-slate-500 mb-4 pb-2 border-b border-slate-100">
                <span>العنصر {g5Index + 1} من {HARDWARE_SOFTWARE_ITEMS.length}</span>
                <span className="text-blue-700 font-extrabold text-sm">النقاط: {g5Score} ⭐</span>
                <button
                  onClick={() => { setG5Index(0); setG5Score(0); setG5Finished(false); }}
                  className="flex items-center gap-1 text-slate-400 hover:text-slate-700"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة اللعبة</span>
                </button>
              </div>

              {!g5Finished ? (
                <div className="w-full max-w-md flex flex-col items-center">
                  <div
                    className={`w-full p-8 rounded-3xl border-2 shadow-sm text-center transition-all ${
                      g5Feedback === 'correct'
                        ? 'bg-emerald-50 border-emerald-400 scale-105'
                        : g5Feedback === 'wrong'
                        ? 'bg-rose-50 border-rose-400 shake'
                        : 'bg-gradient-to-b from-white to-slate-50 border-blue-200'
                    }`}
                  >
                    <div className="text-6xl mb-3">{currentG5Item.icon}</div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-1">{currentG5Item.name}</h3>
                    <p className="text-xs text-slate-500 font-semibold">{currentG5Item.hint}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 w-full mt-6">
                    <button
                      onClick={() => handleG5Answer('hardware')}
                      disabled={g5Feedback !== null}
                      className="p-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-extrabold text-lg shadow-md transition-transform active:scale-95 flex flex-col items-center gap-1"
                    >
                      <span className="text-2xl">🖥️</span>
                      <span>عتاد (Hardware)</span>
                      <span className="text-[11px] opacity-80 font-normal">مكون مادي ملموس</span>
                    </button>

                    <button
                      onClick={() => handleG5Answer('software')}
                      disabled={g5Feedback !== null}
                      className="p-5 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-700 hover:from-purple-700 hover:to-pink-800 text-white font-extrabold text-lg shadow-md transition-transform active:scale-95 flex flex-col items-center gap-1"
                    >
                      <span className="text-2xl">💾</span>
                      <span>برمجيات (Software)</span>
                      <span className="text-[11px] opacity-80 font-normal">تطبيقات غير ملموسة</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 animate-scale-up">
                  <div className="text-6xl mb-3">🏆</div>
                  <h3 className="text-3xl font-black text-slate-800 mb-2">أحسنتم يا أبطال الصف الخامس!</h3>
                  <p className="text-slate-600 font-semibold mb-4">
                    مجموع النقاط: <span className="text-blue-700 font-extrabold">{g5Score} نقطة</span>
                  </p>
                  <button
                    onClick={() => { setG5Index(0); setG5Score(0); setG5Finished(false); }}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md"
                  >
                    اللعب مرة أخرى
                  </button>
                </div>
              )}
            </div>
          )}

          {/* --- GRADE 5: SCRATCH BLOCKS SEQUENCER --- */}
          {selectedGrade === 'grade5' && activeGameKey === 'g5_scratch' && (
            <div className="flex flex-col items-center max-w-lg mx-auto">
              <div className="w-full flex items-center justify-between text-xs font-bold text-slate-500 mb-4 pb-2 border-b border-slate-100">
                <span>تحدي سكراتش {scratchIdx + 1} من {scratchChallenges.length}</span>
                <span className="text-amber-700 font-extrabold text-sm">النقاط: {scratchScore} 🐱</span>
              </div>

              <div className="w-full p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-right mb-4">
                <div className="text-xs font-black text-amber-900 mb-1">🎯 الهدف البرمجي المطلوب:</div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">{scratchChallenges[scratchIdx].goal}</h4>
              </div>

              <div className="text-xs font-bold text-slate-500 mb-2 text-right w-full">
                أي تسلسل للبنات البرمجية هو الصحيح لتنفيذ الهدف؟
              </div>

              <div className="space-y-3 w-full">
                {scratchChallenges[scratchIdx].options.map((optionStack, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleScratchChoice(optIdx)}
                    disabled={scratchResult !== null}
                    className={`w-full p-4 rounded-2xl border-2 text-right transition-all flex flex-col gap-1.5 ${
                      scratchResult !== null && optIdx === scratchChallenges[scratchIdx].correctOption
                        ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300'
                        : 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/40'
                    }`}
                  >
                    <div className="text-[11px] font-bold text-slate-400">الترتيب {optIdx + 1}:</div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {optionStack.map((block, bIdx) => (
                        <span key={bIdx} className="bg-amber-100 text-amber-950 font-extrabold text-xs px-2.5 py-1 rounded-lg border border-amber-300 shadow-2xs">
                          {block}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* --- GRADE 6: ROBOTICS & SENSORS --- */}
          {selectedGrade === 'grade6' && activeGameKey === 'g6_robot' && (
            <div className="flex flex-col items-center max-w-lg mx-auto">
              <div className="w-full flex items-center justify-between text-xs font-bold text-slate-500 mb-4 pb-2 border-b border-slate-100">
                <span>الموقف {robotIdx + 1} من {robotScenarios.length}</span>
                <span className="text-teal-700 font-extrabold text-sm">النقاط: {robotScore} 🦾</span>
              </div>

              <div className="w-full p-6 rounded-3xl bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-300 text-right mb-6 shadow-2xs">
                <div className="text-3xl mb-2">{robotScenarios[robotIdx].icon}</div>
                <h4 className="text-lg font-black text-slate-900 leading-relaxed mb-2">
                  {robotScenarios[robotIdx].situation}
                </h4>
                <div className="text-xs text-teal-800 font-bold bg-teal-100/70 p-2 rounded-xl inline-block">
                  💡 تلميح: {robotScenarios[robotIdx].hint}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                {robotScenarios[robotIdx].options.map((sensor, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => handleRobotChoice(sensor)}
                    disabled={robotFeedback !== null}
                    className={`p-4 rounded-2xl border-2 text-right font-black text-sm transition-all ${
                      robotFeedback !== null && sensor === robotScenarios[robotIdx].correctSensor
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-300'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-teal-400 hover:bg-teal-50/40'
                    }`}
                  >
                    <span>{sensor}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* --- GRADE 6: EXCEL MASTER --- */}
          {selectedGrade === 'grade6' && activeGameKey === 'g6_excel' && (
            <div className="flex flex-col items-center max-w-lg mx-auto">
              <div className="w-full flex items-center justify-between text-xs font-bold text-slate-500 mb-4 pb-2 border-b border-slate-100">
                <span>المسألة {excelIdx + 1} من {excelScenarios.length}</span>
                <span className="text-emerald-700 font-extrabold text-sm">النقاط: {excelScore} 📊</span>
              </div>

              <div className="w-full p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 text-right mb-6 shadow-2xs">
                <div className="text-xs font-extrabold text-emerald-900 mb-1">📋 مهمة جدول البيانات:</div>
                <h4 className="text-lg font-black text-slate-900 leading-relaxed mb-2">
                  {excelScenarios[excelIdx].task}
                </h4>
                <div className="text-xs text-emerald-800 font-semibold">
                  اختر الصيغة أو الدالة المناسبة لتنفيذ العملية في إكسل.
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full">
                {excelScenarios[excelIdx].options.map((formula, fIdx) => (
                  <button
                    key={fIdx}
                    onClick={() => handleExcelChoice(formula)}
                    disabled={excelFeedback !== null}
                    className={`p-4 rounded-2xl border-2 text-center font-black text-base transition-all ltr-direction ${
                      excelFeedback !== null && formula === excelScenarios[excelIdx].correctFormula
                        ? 'bg-emerald-100 border-emerald-500 text-emerald-950 ring-2 ring-emerald-400'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-emerald-400 hover:bg-emerald-50/50'
                    }`}
                  >
                    <span className="font-mono">{formula}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* --- GRADE 7: HTML TAG CRAFTER --- */}
          {selectedGrade === 'grade7' && activeGameKey === 'g7_html' && (
            <div className="flex flex-col items-center max-w-lg mx-auto">
              <div className="w-full flex items-center justify-between text-xs font-bold text-slate-500 mb-4 pb-2 border-b border-slate-100">
                <span>الوسم {htmlIdx + 1} من {htmlQuestions.length}</span>
                <span className="text-cyan-700 font-extrabold text-sm">النقاط: {htmlScore} 🌐</span>
              </div>

              <div className="w-full p-6 rounded-3xl bg-cyan-50 border-2 border-cyan-300 text-center mb-6 shadow-2xs">
                <div className="inline-block px-4 py-2 bg-slate-900 text-cyan-300 font-mono text-xl sm:text-2xl rounded-2xl mb-3 shadow-inner">
                  {htmlQuestions[htmlIdx].tag}
                </div>
                <p className="text-sm font-bold text-slate-800">{htmlQuestions[htmlIdx].desc}</p>
              </div>

              <div className="space-y-3 w-full">
                {htmlQuestions[htmlIdx].options.map((option, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleHtmlChoice(option)}
                    disabled={htmlFeedback !== null}
                    className={`w-full p-4 rounded-2xl border-2 text-right font-bold text-sm transition-all ${
                      htmlFeedback !== null && option === htmlQuestions[htmlIdx].correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-cyan-400 hover:bg-cyan-50/30'
                    }`}
                  >
                    <span>{option}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* --- GRADE 7: AI MODEL TRAINER --- */}
          {selectedGrade === 'grade7' && activeGameKey === 'g7_ai' && (
            <div className="flex flex-col items-center max-w-lg mx-auto">
              <div className="w-full flex items-center justify-between text-xs font-bold text-slate-500 mb-4 pb-2 border-b border-slate-100">
                <span>العينة {aiIdx + 1} من {aiSamples.length}</span>
                <span className="text-purple-700 font-extrabold text-sm">النقاط: {aiScore} 🤖</span>
              </div>

              <div className="w-full p-6 rounded-3xl bg-purple-50 border-2 border-purple-300 text-right mb-6 shadow-2xs">
                <div className="text-xs font-extrabold text-purple-900 mb-1">🧠 عينة البيانات المدخلة:</div>
                <h4 className="text-xl font-black text-slate-900 mb-2">{aiSamples[aiIdx].data}</h4>
                <div className="text-xs text-purple-700 font-semibold">
                  نوع البيانات: {aiSamples[aiIdx].type}
                </div>
              </div>

              <div className="text-xs font-bold text-slate-500 mb-2 w-full text-right">
                أي مجال من مجالات الذكاء الاصطناعي هو الأنسب لمعالجة هذه العينة؟
              </div>

              <div className="space-y-3 w-full">
                {aiSamples[aiIdx].options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleAiChoice(opt)}
                    disabled={aiFeedback !== null}
                    className={`w-full p-4 rounded-2xl border-2 text-right font-bold text-sm transition-all ${
                      aiFeedback !== null && opt === aiSamples[aiIdx].correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-purple-400 hover:bg-purple-50/30'
                    }`}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* --- GRADE 8: DATABASE EXPLORER --- */}
          {selectedGrade === 'grade8' && activeGameKey === 'g8_db' && (
            <div className="flex flex-col items-center max-w-lg mx-auto">
              <div className="w-full flex items-center justify-between text-xs font-bold text-slate-500 mb-4 pb-2 border-b border-slate-100">
                <span>السؤال {dbIdx + 1} من {dbQuestions.length}</span>
                <span className="text-indigo-700 font-extrabold text-sm">النقاط: {dbScore} 🗄️</span>
              </div>

              <div className="w-full p-6 rounded-3xl bg-indigo-50 border-2 border-indigo-300 text-right mb-6 shadow-2xs">
                <h4 className="text-lg font-black text-slate-900 leading-relaxed mb-2">
                  {dbQuestions[dbIdx].queryTask}
                </h4>
                <div className="text-xs text-indigo-800 font-bold bg-indigo-100 p-2 rounded-xl inline-block">
                  💡 تلميح: {dbQuestions[dbIdx].hint}
                </div>
              </div>

              <div className="space-y-3 w-full">
                {dbQuestions[dbIdx].options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    onClick={() => handleDbChoice(opt)}
                    disabled={dbFeedback !== null}
                    className={`w-full p-4 rounded-2xl border-2 text-right font-bold text-sm transition-all ${
                      dbFeedback !== null && opt === dbQuestions[dbIdx].correct
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300'
                        : 'bg-white border-slate-200 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/30'
                    }`}
                  >
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
