import { Student, Badge, ITQuizQuestion, HardwareSoftwareItem, GradeLevel } from '../types';

export const INITIAL_BADGES: Badge[] = [
  { id: 'prog', name: 'مبرمج المستقبل', icon: '💻', color: 'bg-blue-100 text-blue-700 border-blue-300', description: 'تميز في كتابة الأوامر والبرمجة' },
  { id: 'cyber', name: 'بطل الأمن السيبراني', icon: '🛡️', color: 'bg-emerald-100 text-emerald-700 border-emerald-300', description: 'وعي عالٍ بحماية البيانات وكلمات المرور' },
  { id: 'ai', name: 'خبير الذكاء الاصطناعي', icon: '🤖', color: 'bg-purple-100 text-purple-700 border-purple-300', description: 'فهم وتطبيق أدوات التقنية الحديثة' },
  { id: 'robot', name: 'مهندس الروبوتات', icon: '🦾', color: 'bg-teal-100 text-teal-700 border-teal-300', description: 'براعة في تركيب وبرمجة الحساسات والروبوت' },
  { id: 'web', name: 'مصمم المواقع الرقمية', icon: '🌐', color: 'bg-cyan-100 text-cyan-700 border-cyan-300', description: 'إبداع في تنسيق وبناء صفحات الويب' },
  { id: 'typing', name: 'أسرع طابع', icon: '⌨️', color: 'bg-amber-100 text-amber-700 border-amber-300', description: 'دقة وسرعة في استخدام لوحة المفاتيح' },
  { id: 'team', name: 'المتعاون الرقمي', icon: '🤝', color: 'bg-indigo-100 text-indigo-700 border-indigo-300', description: 'مساعدة الزملاء في المعمل الرقمي' },
  { id: 'star', name: 'المفكر المبدع', icon: '💡', color: 'bg-rose-100 text-rose-700 border-rose-300', description: 'إبداع وابتكار في حل المشكلات التقنية' },
];

export const INITIAL_STUDENTS_GRADE5: Student[] = [
  { id: 'g5-1', name: 'الجوهرة أحمد', stars: 0, badges: [] },
  { id: 'g5-2', name: 'الحسن سليم', stars: 0, badges: [] },
  { id: 'g5-3', name: 'المجتهد سيف', stars: 0, badges: [] },
  { id: 'g5-4', name: 'الوليد خالد', stars: 0, badges: [] },
  { id: 'g5-5', name: 'تميم خالد', stars: 0, badges: [] },
  { id: 'g5-6', name: 'جنان أنور', stars: 0, badges: [] },
  { id: 'g5-7', name: 'جواد ناصر', stars: 0, badges: [] },
  { id: 'g5-8', name: 'حنايا مازن', stars: 0, badges: [] },
  { id: 'g5-9', name: 'حور حمدون', stars: 0, badges: [] },
  { id: 'g5-10', name: 'حور موسى', stars: 0, badges: [] },
  { id: 'g5-11', name: 'رزان حمد', stars: 0, badges: [] },
  { id: 'g5-12', name: 'رضوان عادل', stars: 0, badges: [] },
  { id: 'g5-13', name: 'زاهر ناصر', stars: 0, badges: [] },
  { id: 'g5-14', name: 'ساجدة موسى', stars: 0, badges: [] },
  { id: 'g5-15', name: 'سالم حمود', stars: 0, badges: [] },
  { id: 'g5-16', name: 'شهد فيصل', stars: 0, badges: [] },
  { id: 'g5-17', name: 'عبدالله سلطان', stars: 0, badges: [] },
  { id: 'g5-18', name: 'فاطمة سعيد', stars: 0, badges: [] },
  { id: 'g5-19', name: 'محمد طارق', stars: 0, badges: [] },
  { id: 'g5-20', name: 'مريم ناصر', stars: 0, badges: [] },
];

export const INITIAL_STUDENTS_GRADE6: Student[] = [
  { id: 'g6-1', name: 'أحمد سعيد البلوشي', stars: 0, badges: [] },
  { id: 'g6-2', name: 'إيلاف يوسف الشحية', stars: 0, badges: [] },
  { id: 'g6-3', name: 'حمد ماجد العامري', stars: 0, badges: [] },
  { id: 'g6-4', name: 'ديمة سالم الوهيبية', stars: 0, badges: [] },
  { id: 'g6-5', name: 'سعود فيصل المقبالي', stars: 0, badges: [] },
  { id: 'g6-6', name: 'شما طارق الحبسية', stars: 0, badges: [] },
  { id: 'g6-7', name: 'عمر خالد الرواحي', stars: 0, badges: [] },
  { id: 'g6-8', name: 'ميار هيثم البوسعيدية', stars: 0, badges: [] },
  { id: 'g6-9', name: 'نواف سيف المعمري', stars: 0, badges: [] },
  { id: 'g6-10', name: 'يارا بدر الحارثية', stars: 0, badges: [] },
  { id: 'g6-11', name: 'يحيى حمود المعولي', stars: 0, badges: [] },
  { id: 'g6-12', name: 'روان ناصر الغافرية', stars: 0, badges: [] },
];

export const INITIAL_STUDENTS_GRADE7: Student[] = [
  { id: 'g7-1', name: 'باسل حمد الخروصي', stars: 0, badges: [] },
  { id: 'g7-2', name: 'تسنيم عيسى الهنائية', stars: 0, badges: [] },
  { id: 'g7-3', name: 'حمزة راشد السعدي', stars: 0, badges: [] },
  { id: 'g7-4', name: 'ريان محمود الفارسي', stars: 0, badges: [] },
  { id: 'g7-5', name: 'سارة جاسم البلوشية', stars: 0, badges: [] },
  { id: 'g7-6', name: 'صهيب عبدالله الكندي', stars: 0, badges: [] },
  { id: 'g7-7', name: 'عائشة ناصر الزدجالية', stars: 0, badges: [] },
  { id: 'g7-8', name: 'قصي حاتم الحوسني', stars: 0, badges: [] },
  { id: 'g7-9', name: 'لجين بدر السالمية', stars: 0, badges: [] },
  { id: 'g7-10', name: 'معاذ هلال الشبيبي', stars: 0, badges: [] },
];

export const INITIAL_STUDENTS_GRADE8: Student[] = [
  { id: 'g8-1', name: 'أسامة فهد النبهاني', stars: 0, badges: [] },
  { id: 'g8-2', name: 'بشرى صالح اليعربية', stars: 0, badges: [] },
  { id: 'g8-3', name: 'حسام ناصر الشكيلي', stars: 0, badges: [] },
  { id: 'g8-4', name: 'ريم سعيد السيابية', stars: 0, badges: [] },
  { id: 'g8-5', name: 'سليمان داود البلوشي', stars: 0, badges: [] },
  { id: 'g8-6', name: 'ضحى سالم المعمرية', stars: 0, badges: [] },
  { id: 'g8-7', name: 'عبدالعزيز خالد الغساني', stars: 0, badges: [] },
  { id: 'g8-8', name: 'مارية أحمد الهاشمية', stars: 0, badges: [] },
];

// --- GRADE-SPECIFIC QUIZ QUESTIONS ---
export const GRADE_QUIZ_QUESTIONS: Record<GradeLevel, ITQuizQuestion[]> = {
  grade5: [
    {
      id: 'g5-q1',
      question: 'أي من التالي يُعتبر من المكونات المادية للحاسوب (عتاد / Hardware)؟',
      options: ['الفأرة (Mouse)', 'نظام التشغيل ويندوز', 'برنامج الرسام Paint', 'متصفح الإنترنت كروم'],
      correctIndex: 0,
      explanation: 'الفأرة جهاز ملموس باليد بينما البقية برمجيات وتطبيقات.',
      category: 'مكونات الحاسوب',
      grade: 'grade5',
    },
    {
      id: 'g5-q2',
      question: 'ما هو الجزء المسؤول عن معالجة البيانات والعمليات الحسابية في الحاسوب؟',
      options: ['المعالج (CPU)', 'الشاشة (Monitor)', 'الطابعة (Printer)', 'السماعات'],
      correctIndex: 0,
      explanation: 'وحدة المعالجة المركزية (CPU) هي عقل الحاسوب والمسؤول الأول عن التفكير والمعالجة.',
      category: 'المكونات المادية',
      grade: 'grade5',
    },
    {
      id: 'g5-q3',
      question: 'في برنامج سكراتش (Scratch)، أي لبنة نستخدمها لكي يتحرك الكائن على المنصة؟',
      options: ['لبنة تحرك (Move)', 'لبنة قل مرحباً (Say)', 'لبنة انتظر (Wait)', 'لبنة كرر (Repeat)'],
      correctIndex: 0,
      explanation: 'لبنة (تحرك 10 خطوات) مسؤولة عن الحركة الفيزيائية للكائن على محاور المنصة.',
      category: 'البرمجة بسكراتش',
      grade: 'grade5',
    },
    {
      id: 'g5-q4',
      question: 'أي من الأجهزة التالية يُعد وحدة إدخال (Input Device) فقط؟',
      options: ['لوحة المفاتيح والماسح الضوئي', 'الشاشة والطابعة', 'السماعات ومكبر الصوت', 'عارض البيانات بروجيكتور'],
      correctIndex: 0,
      explanation: 'لوحة المفاتيح والماسح يدخلان النصوص والصور إلى داخل الحاسوب.',
      category: 'وحدات الإدخال والإخراج',
      grade: 'grade5',
    },
    {
      id: 'g5-q5',
      question: 'ما هي الطريقة الصحيحة لإنشاء كلمة مرور قوية لحسابك المدرسي؟',
      options: [
        'دمج حروف كبيرة وصغيرة وأرقام ورموز خاصة',
        'كتابة اسمك وتاريخ ميلادك',
        'استخدام كلمة 12345678',
        'مشاركتها مع جميع الأصدقاء'
      ],
      correctIndex: 0,
      explanation: 'كلمة المرور القوية تمنع اختراق وتخمين حساباتك الشخصية.',
      category: 'الأمن السيبراني',
      grade: 'grade5',
    },
    {
      id: 'g5-q6',
      question: 'برنامج الرسام (Paint) وبرنامج معالج النصوص (Word) يعتبران من:',
      options: ['البرمجيات والتطبيقات (Software)', 'العتاد الصلب (Hardware)', 'وحدات التخزين', 'لوحات التحكم'],
      correctIndex: 0,
      explanation: 'البرمجيات هي التعليمات والتطبيقات الرقمية التي تعمل داخل الحاسوب.',
      category: 'البرمجيات',
      grade: 'grade5',
    },
  ],

  grade6: [
    {
      id: 'g6-q1',
      question: 'في الروبوت التعليمي، ما هو الحساس الذي يمكن الروبوت من تجنب الاصطدام بالحواجز وقياس المسافة؟',
      options: ['حساس الموجات فوق الصوتية (Ultrasonic)', 'حساس اللمس (Touch Sensor)', 'حساس الصوت (Sound)', 'حساس الجيروسكوب'],
      correctIndex: 0,
      explanation: 'يرسل حساس الموجات فوق الصوتية موجات ترتد عند الاصطدام بحاجز ليحسب المسافة بدقة.',
      category: 'الروبوت والحساسات',
      grade: 'grade6',
    },
    {
      id: 'g6-q2',
      question: 'في برنامج الجداول الحسابية (Excel)، ما هي الدالة المستخدمة لحساب مجموع درجات الطلبة؟',
      options: ['دالة الجمع (=SUM)', 'دالة المعدل (=AVERAGE)', 'دالة أكبر قيمة (=MAX)', 'دالة العد (=COUNT)'],
      correctIndex: 0,
      explanation: 'دالة SUM تجمع تلقائياً القيم الرقمية في النطاق المحدد.',
      category: 'جداول البيانات Excel',
      grade: 'grade6',
    },
    {
      id: 'g6-q3',
      question: 'الخوارزمية في البرمجة تعني:',
      options: [
        'خطوات منطقية ومرتبة بدقة لحل مشكلة أو إنجاز مهمة',
        'لعبة فيديو يتم تنزيلها من الإنترنت',
        'جهاز حاسوب محمول فائق السرعة',
        'سلك يربط بين الشاشة واللوحة الأم'
      ],
      correctIndex: 0,
      explanation: 'الخوارزمية، المنسوبة للعالم الخوارزمي، هي تسلسل منظم من التعليمات لحل المشاكل.',
      category: 'الخوارزميات والمنطق',
      grade: 'grade6',
    },
    {
      id: 'g6-q4',
      question: 'ما هو التصيد الاحتيالي (Phishing) في الأمن الرقمي؟',
      options: [
        'رسائل خادعة تنتحل صفة جهات رسمية لسرقة كلمات المرور والبيانات',
        'تنزيل صور من محرك البحث جوجل',
        'شراء شاشة حاسوب جديدة من المتجر',
        'تحديث تطبيق محادثة رسمية'
      ],
      correctIndex: 0,
      explanation: 'التصيد يستدرج الضحية عبر روابط وهمية لكشف بياناته الحساسة.',
      category: 'الأمن السيبراني',
      grade: 'grade6',
    },
    {
      id: 'g6-q5',
      question: 'أي من الحساسات التالية يُستخدم لتتبع الخط الأسود على أرضية حلبة الروبوت؟',
      options: ['حساس الضوء / اللون (Color/Light Sensor)', 'حساس الحرارة', 'حساس الرطوبة', 'حساس اللمس'],
      correctIndex: 0,
      explanation: 'حساس اللون والضوء يميز بين شدة انعكاس الضوء على اللون الأبيض والأسود.',
      category: 'الروبوت والتحكم',
      grade: 'grade6',
    },
    {
      id: 'g6-q6',
      question: 'الرمز الذي يجب أن تبدأ به أي معادلة أو صيغة حسابية في برنامج إكسل هو:',
      options: ['علامة يساوي (=)', 'علامة زائد (+)', 'علامة النجمة (*)', 'علامة الاستفهام (؟)'],
      correctIndex: 0,
      explanation: 'تخبر علامة (=) البرنامج بأن ما يليها صيغة رياضية يجب حسابها وليس نصاً عادياً.',
      category: 'جداول البيانات Excel',
      grade: 'grade6',
    },
  ],

  grade7: [
    {
      id: 'g7-q1',
      question: 'في لغة بناء صفحات الويب (HTML)، ما هو الوسم المستخدم لإدراج صورة في الصفحة؟',
      options: ['الوسم <img>', 'الوسم <p>', 'الوسم <a>', 'الوسم <h1>'],
      correctIndex: 0,
      explanation: 'الوسم <img> (Image) هو المسؤول عن تضمين الصور مع خاصية src لتحديد المسار.',
      category: 'تصميم الويب HTML',
      grade: 'grade7',
    },
    {
      id: 'g7-q2',
      question: 'ما هي التقنية التي تمكّن الحواسيب والأنظمة من التعرف على الوجوه وفهم الصور؟',
      options: ['الرؤية الحاسوبية (Computer Vision)', 'لوحة المفاتيح الرقمية', 'محرك الأقراص المدمجة', 'كابل الشبكة'],
      correctIndex: 0,
      explanation: 'الرؤية الحاسوبية فرع من فروع الذكاء الاصطناعي يدرب الآلات على فهم وتحليل الصور والفيديو.',
      category: 'الذكاء الاصطناعي',
      grade: 'grade7',
    },
    {
      id: 'g7-q3',
      question: 'الجهاز الشبكي الذي يوجه حزم البيانات ويربط شبكتك المحلية بشبكة الإنترنت العالمية يُسمى:',
      options: ['الموجه (Router)', 'المبدل (Switch)', 'القرص الصلب (Hard Disk)', 'الفأرة اللاسلكية'],
      correctIndex: 0,
      explanation: 'الموجه (الراوتر) يحدد أفضل مسار لانتقال البيانات بين الشبكات المختلفة.',
      category: 'شبكات الحاسوب',
      grade: 'grade7',
    },
    {
      id: 'g7-q4',
      question: 'أي وسم HTML يُستخدم لإنشاء رابط تشعبي ينقل المستخدم لصفحة أخرى؟',
      options: ['الوسم <a href="...">', 'الوسم <link-go>', 'الوسم <b>', 'الوسم <ul>'],
      correctIndex: 0,
      explanation: 'الوسم <a> (Anchor) مع السمة href ينشئ الروابط التشعبية التفاعلية في صفحات الإنترنت.',
      category: 'تصميم الويب HTML',
      grade: 'grade7',
    },
    {
      id: 'g7-q5',
      question: 'التشفير (Encryption) في تقنية المعلومات يعني:',
      options: [
        'تحويل البيانات الأصلية إلى صيغة غير مفهومة لمنع قراءتها إلا بمفتاح فك الشفرة',
        'حذف الملفات نهائياً من سلة المحذوفات',
        'زيادة سطوع شاشة الحاسوب',
        'تسريع مروحة التبريد'
      ],
      correctIndex: 0,
      explanation: 'التشفير هو الركيزة الأساسية لحماية المحادثات والبيانات البنكية عبر الإنترنت.',
      category: 'الأمن السيبراني والتشفير',
      grade: 'grade7',
    },
    {
      id: 'g7-q6',
      question: 'لغة CSS (Cascading Style Sheets) مسؤولة في مواقع الويب عن:',
      options: ['تنسيق الألوان والخطوط والمظهر الخارجي', 'تخزين كلمات المرور في قاعدة البيانات', 'تشغيل المعالج', 'توصيل الكهرباء للحاسوب'],
      correctIndex: 0,
      explanation: 'تهتم لغة CSS بالجانب الجمالي وتنسيق عناصر الصفحة من ألوان وظلال وأبعاد.',
      category: 'تنسيق الويب CSS',
      grade: 'grade7',
    },
  ],

  grade8: [
    {
      id: 'g8-q1',
      question: 'في قواعد البيانات (Database)، ما هو الحقل الذي يحتوي على قيمة فريدة لا تتكرر لتمييز كل سجل؟',
      options: ['المفتاح الأساسي (Primary Key)', 'اسم الطالب', 'حقل الملاحظات', 'تاريخ التسجيل'],
      correctIndex: 0,
      explanation: 'المفتاح الأساسي (مثل الرقم المدني أو الرقم الأكاديمي) فريد ولا يتكرر إطلاقاً.',
      category: 'قواعد البيانات',
      grade: 'grade8',
    },
    {
      id: 'g8-q2',
      question: 'مفهوم إنترنت الأشياء (IoT - Internet of Things) يشير إلى:',
      options: [
        'ربط الأجهزة الذكية والأشياء المادية بالإنترنت لتبادل البيانات والتحكم بها عن بُعد',
        'تصفح مواقع التواصل الاجتماعي فقط',
        'إصلاح أسلاك الكهرباء المنزلية',
        'طباعة مستندات نصية أبيض وأسود'
      ],
      correctIndex: 0,
      explanation: 'إنترنت الأشياء يربط المنازل الذكية، السيارات، الحساسات الزراعية بالسحابة.',
      category: 'إنترنت الأشياء IoT',
      grade: 'grade8',
    },
    {
      id: 'g8-q3',
      question: 'في برامج التصميم ثلاثي الأبعاد (مثل Tinkercad)، المحاور الثلاثة التي نحدد بها أبعاد المجسم في الفضاء هي:',
      options: ['المحاور (X, Y, Z)', 'المحاور (A, B, C)', 'المحاور (1, 2, 3)', 'المحاور (شمال، جنوب، شرق)'],
      correctIndex: 0,
      explanation: 'محور X للعرض، و Y للعمق، و Z للارتفاع العمودي في الفضاء ثلاثي الأبعاد.',
      category: 'النمذجة ثلاثية الأبعاد',
      grade: 'grade8',
    },
    {
      id: 'g8-q4',
      question: 'الحوسبة السحابية (Cloud Computing) توفر للمستخدمين ميزة:',
      options: [
        'تخزين الملفات والوصول إلى البرامج والمعالجة عبر الإنترنت من أي جهاز في العالم',
        'منع انقطاع الإنترنت نهائياً',
        'تنظيف شاشة الحاسوب تلقائياً',
        'شحن بطارية الهاتف بدون شاحن'
      ],
      correctIndex: 0,
      explanation: 'السحابة تتيح التخزين ومشاركة المستندات والتعاون اللحظي مثل Google Drive و OneDrive.',
      category: 'الحوسبة السحابية',
      grade: 'grade8',
    },
  ],

  general: [
    {
      id: 'gen-q1',
      question: 'أي من الأجهزة التالية يُعتبر جهازاً ذكياً قادراً على الاتصال بالإنترنت والمعالجة؟',
      options: ['الهاتف الذكي والحاسوب اللوحي', 'السبورة الخشبية التقليدية', 'القلم الجاف العادي', 'المسطرة البلاستيكية'],
      correctIndex: 0,
      explanation: 'الهواتف الذكية تحتوي على معالجات وأنظمة تشغيل واتصال بالشبكة.',
      category: 'الثقافة الرقمية',
      grade: 'general',
    },
    {
      id: 'gen-q2',
      question: 'عندما تلاحظ موقعاً إلكترونياً يبدأ بـ (https://) مع وجود رمز القفل، فهذا يدل على أن الموقع:',
      options: ['مشفر وآمن في نقل البيانات', 'مغلق ومحجوب عن الجميع', 'يحتوي على فيروسات', 'بطيء جداً'],
      correctIndex: 0,
      explanation: 'بروتوكول HTTPS المشفر يؤمن نقل البيانات بين متصفحك وخادم الموقع.',
      category: 'الأمن الرقمي',
      grade: 'general',
    },
  ],
};

// Fallback initial quiz list
export const IT_QUIZ_QUESTIONS = GRADE_QUIZ_QUESTIONS.grade5;

export const HARDWARE_SOFTWARE_ITEMS: HardwareSoftwareItem[] = [
  { id: 'hs-1', name: 'لوحة المفاتيح', type: 'hardware', categoryAr: 'عتاد', icon: '⌨️', hint: 'وحدة إدخال ملموسة' },
  { id: 'hs-2', name: 'نظام ويندوز 11', type: 'software', categoryAr: 'برمجيات', icon: '🪟', hint: 'نظام تشغيل لإدارة الحاسوب' },
  { id: 'hs-3', name: 'المعالج CPU', type: 'hardware', categoryAr: 'عتاد', icon: '🧠', hint: 'شريحة إلكترونية للمعالجة' },
  { id: 'hs-4', name: 'برنامج الرسام Paint', type: 'software', categoryAr: 'برمجيات', icon: '🎨', hint: 'تطبيق للرسم والتصميم' },
  { id: 'hs-5', name: 'الشاشة Display', type: 'hardware', categoryAr: 'عتاد', icon: '🖥️', hint: 'وحدة إخراج مرئية' },
  { id: 'hs-6', name: 'متصفح الإنترنت Chrome', type: 'software', categoryAr: 'برمجيات', icon: '🌐', hint: 'برنامج لتصفح الويب' },
  { id: 'hs-7', name: 'القرص الصلب SSD', type: 'hardware', categoryAr: 'عتاد', icon: '💾', hint: 'وحدة تخزين بيانات مادية' },
  { id: 'hs-8', name: 'برنامج سكراتش Scratch', type: 'software', categoryAr: 'برمجيات', icon: '🐱', hint: 'بيئة برمجية للأطفال' },
  { id: 'hs-9', name: 'الفأرة Mouse', type: 'hardware', categoryAr: 'عتاد', icon: '🖱️', hint: 'وحدة إشارة وتأشير ملموسة' },
  { id: 'hs-10', name: 'مضاد الفيروسات Antivirus', type: 'software', categoryAr: 'برمجيات', icon: '🛡️', hint: 'برنامج حماية سيبراني' },
];

export const PRAISE_PHRASES = [
  'أحسنت يا بطل! 🌟',
  'إجابة تقنية رائعة! 💻',
  'نجمة التفوق والإبداع! ✨',
  'مبرمج المستقبل المبدع! 🚀',
  'مشاركة متميزة جداً! 👏',
  'تفكير منطقي سليم! 💡',
  'فخر معلمة تقنية المعلومات! 🎓',
];

export const PENALTY_REASONS = [
  'تشتت الانتباه أثناء الشرح',
  'التحدث بدون إذن',
  'عدم الالتزام بتعليمات معمل الحاسوب',
  'العبث بالأجهزة المجاورة',
  'التأخر عن بدء النشاط',
];
