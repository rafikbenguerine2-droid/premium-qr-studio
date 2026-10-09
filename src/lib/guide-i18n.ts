type Tr = { title: string; short: string; description: string; sections: { title: string; text: string }[]; searches?: string[] };

export const guideTranslations: Record<'en' | 'ar', Record<string, Tr>> = {
  en: {
    campus: { title: 'Finding your way on campus', short: 'Campus', description: 'The right landmarks to find your way around ENSTP.', sections: [
      { title: 'Your starting point', text: 'ENSTP Francis Jeanson is located on rue Sidi Garidi, Kouba, Algiers. Look up the school on Google Maps before your first visit.' },
      { title: 'When you arrive', text: 'At the entrance, ask for the registrar’s office and the preparatory classes department. They can direct you to your group and rooms.' },
      { title: 'Landmarks to identify', text: 'Main entrance, registrar, lecture halls, library, labs and dining areas: note where they are during your first visit.' },
      { title: 'Indoor map', text: 'The building map and room-by-room routes still need to be surveyed and validated on site. No unverified indoor route is published.' }], searches: ['Locate ENSTP'] },
    salles: { title: 'Finding my room', short: 'Rooms & classes', description: 'Your group, your timetable and good habits.', sections: [
      { title: 'Start with your timetable', text: 'Find your group, the module, the session type (lecture, tutorial or lab) and the room code. Make sure you have the latest version.' },
      { title: 'Can’t find a room or group?', text: 'Show your timetable to the preparatory classes department or the registrar. Ask for the building, floor and exact number.' },
      { title: 'Before your first class', text: 'Locate your room in advance and keep a copy of your timetable on your phone.' },
      { title: 'Room directory', text: 'Room numbers, groups and schedules are not in the project document. They must be confirmed by the school before publication.' }] },
    services: { title: 'Paperwork, stress-free', short: 'Services & paperwork', description: 'Know who to ask, at the right time.', sections: [
      { title: 'Registration or certificate', text: 'The registrar is your first point of contact for student documents. Confirm the required papers and procedure with the office.' },
      { title: 'Lost student card', text: 'Report the loss to the registrar. Ask about the replacement procedure before preparing your file.' },
      { title: 'Absence or timetable', text: 'Contact your department’s secretariat to learn the applicable procedure and deadlines for justification.' },
      { title: 'Teachers and modules', text: 'Ask the department for the official list of teachers and their institutional contacts. Personal details are never published without permission.' }], searches: ['Visit the official website'] },
    manger: { title: 'Eating well on a budget', short: 'Food & groceries', description: 'A lunch break or groceries for the evening.', sections: [
      { title: 'Around the school', text: 'Compare restaurants, bakeries and mini-markets around rue Sidi Garidi. The links below open a map search, not a list of verified addresses.' },
      { title: 'Keep the budget in mind', text: 'Check the menu and price before ordering. Ask students in your year for their usual spots.' },
      { title: 'Plan for the evening', text: 'Check opening hours directly with the shop and plan your shopping before heading back to the residence.' },
      { title: 'Addresses being collected', text: 'Prices, distances and hours will be added after an on-site survey. No shop is presented here as open or recommended without verification.' }], searches: ['Nearby restaurants', 'Bakeries & mini-markets'] },
    transport: { title: 'Getting around Algiers', short: 'Transport', description: 'Plan your trip, from your first class back to the residence.', sections: [
      { title: 'Plan a trip', text: 'Use ENSTP in Kouba as your destination in your map app. Compare the available options from your starting point.' },
      { title: 'Buses and stops', text: 'Confirm lines, directions and stops with operators or on site. The project does not provide verified lines or schedules.' },
      { title: 'Getting back', text: 'Locate your stop in both directions and check the last departure. Keep a backup option if you finish late.' }], searches: ['Plan my route', 'Find bus stops'] },
    sport: { title: 'Move, breathe, repeat', short: 'Sports & activities', description: 'Student life happens outside class too.', sections: [
      { title: 'Find the facilities', text: 'Ask the school which fields and sports areas are open to students, and the rules for using them.' },
      { title: 'Find your team', text: 'Football, running, basketball or walking: ask associations and your classmates about existing activities.' },
      { title: 'An idea: ENSTP Running Club', text: 'The document suggests a student running club. It is an idea to organise, not an already confirmed club or calendar.' },
      { title: 'Organise with no budget', text: 'Choose an accessible activity, get permission to use the facilities and agree together on a place and time.' }] },
    'vie-etudiante': { title: 'Finding your place', short: 'Student life', description: 'New encounters, mutual help and new bearings.', sections: [
      { title: 'Meet your classmates', text: 'Start with a study group or a sports activity. Ask older students how to join clubs recognised by the school.' },
      { title: 'Living in residence', text: 'Ask your residence about dining, study spaces, services and weekend access conditions.' },
      { title: 'A student mentor', text: 'Mentoring between older and new students is an idea from the project. Ask your department whether a scheme already exists.' },
      { title: 'Help between cities', text: 'The proposed solidarity network is still to be organised. No money, no forbidden items and no public personal data; member validation and reporting are required before any connection.' }] },
    alger: { title: 'Algiers, your new city', short: 'Discover Algiers', description: 'A city to explore, one weekend at a time.', sections: [
      { title: 'The Jardin d’Essai', text: 'An outing idea to discover the Hamma garden. Check access conditions and opening hours before you go.' },
      { title: 'The Casbah & downtown Algiers', text: 'Discover the city’s heritage and historic streets. Plan your route and prefer a guided first visit.' },
      { title: 'Notre-Dame d’Afrique', text: 'Another destination suggested in the project to discover Algiers. Confirm visiting arrangements with the site.' },
      { title: 'A weekend at your pace', text: 'Plan your round-trip transport and check current prices. No unconfirmed budget or travel time is announced.' }], searches: ['Jardin d’Essai du Hamma', 'The Casbah of Algiers', 'Notre-Dame d’Afrique'] },
    aide: { title: 'Need a hand?', short: 'Help & guidance', description: 'One problem, one first point of contact.', sections: [
      { title: 'An administrative problem', text: 'Start with the registrar. Explain your situation and ask which office should receive your file.' },
      { title: 'A question about classes', text: 'Your department’s secretariat can guide you on groups, modules and the timetable.' },
      { title: 'Feeling isolated?', text: 'Talk to a classmate, a teacher or someone in charge at your residence. Asking for help is a first step, not a failure.' },
      { title: 'Emergency or health', text: 'In immediate danger, contact local emergency services or school staff. For routine care, find a pharmacy and confirm its hours.' }], searches: ['Pharmacies near the school'] },
    impression: { title: 'Printing & supplies', short: 'Printing & stationery', description: 'Your notes, your plans and everything you need.', sections: [
      { title: 'Prepare your document', text: 'Export your file as PDF and check the format, page count and colour or black-and-white choice.' },
      { title: 'Find a provider', text: 'Look for copy shops and stationers around Kouba. Call or visit to confirm the services offered.' },
      { title: 'Before printing', text: 'Ask for the total cost, double-sided options and turnaround time. For a technical drawing, specify the format and scale.' }], searches: ['Copy & print shops', 'Stationers in Kouba'] },
  },
  ar: {
    campus: { title: 'التوجّه داخل الحرم الجامعي', short: 'الحرم الجامعي', description: 'المعالم الصحيحة لتجد طريقك في المدرسة.', sections: [
      { title: 'نقطة انطلاقك', text: 'تقع المدرسة الوطنية العليا للأشغال العمومية فرانسيس جونسون في شارع سيدي قاريدي، القبة، الجزائر. ابحث عن موقعها على خرائط غوغل قبل زيارتك الأولى.' },
      { title: 'عند وصولك', text: 'عند المدخل، اسأل عن مصلحة التمدرس وقسم الأقسام التحضيرية. سيوجهونك إلى فوجك وقاعاتك.' },
      { title: 'المعالم التي يجب معرفتها', text: 'المدخل الرئيسي، التمدرس، المدرجات، المكتبة، المخابر وأماكن الإطعام: سجّل مواقعها خلال زيارتك الأولى.' },
      { title: 'المخطط الداخلي', text: 'مخطط المباني والمسارات من قاعة إلى أخرى لا يزال بحاجة إلى رصد وتأكيد في الموقع. لا يُنشر أي مسار داخلي غير مؤكد.' }], searches: ['تحديد موقع المدرسة'] },
    salles: { title: 'إيجاد قاعتي', short: 'القاعات والدروس', description: 'فوجك، جدولك الزمني والعادات الجيدة.', sections: [
      { title: 'ابدأ بجدولك الزمني', text: 'حدد الفوج، المقياس، نوع الحصة (محاضرة، أعمال موجهة أو تطبيقية) ورمز القاعة. تأكد من أنك تطلع على أحدث نسخة.' },
      { title: 'لم تجد القاعة أو الفوج؟', text: 'اعرض جدولك على قسم الأقسام التحضيرية أو مصلحة التمدرس. اسأل عن المبنى والطابق والرقم بالضبط.' },
      { title: 'قبل حصتك الأولى', text: 'حدد قاعتك مسبقًا واحتفظ بنسخة من جدولك على هاتفك.' },
      { title: 'دليل القاعات', text: 'أرقام القاعات والأفواج والمواعيد غير موجودة في وثيقة المشروع. يجب أن تؤكدها المدرسة قبل النشر.' }] },
    services: { title: 'إجراءاتي بدون توتر', short: 'الخدمات والإجراءات', description: 'اعرف لمن تتوجه، في الوقت المناسب.', sections: [
      { title: 'التسجيل أو شهادة', text: 'مصلحة التمدرس هي أول جهة توجّه للوثائق الطلابية. تأكد من الوثائق المطلوبة والإجراء لدى المصلحة.' },
      { title: 'ضياع بطاقة الطالب', text: 'بلّغ مصلحة التمدرس بالضياع. اسأل عن إجراءات الاستبدال قبل تحضير ملفك.' },
      { title: 'غياب أو جدول زمني', text: 'توجّه إلى أمانة قسمك لمعرفة الإجراء المعمول به وآجال التبرير.' },
      { title: 'الأساتذة والمقاييس', text: 'اطلب من القسم القائمة الرسمية للأساتذة ووسائل الاتصال المؤسساتية. لا تُنشر البيانات الشخصية أبدًا دون إذن.' }], searches: ['زيارة الموقع الرسمي'] },
    manger: { title: 'أكل جيد بميزانية صغيرة', short: 'الأكل والتسوّق', description: 'استراحة غداء أو مشتريات للمساء.', sections: [
      { title: 'حول المدرسة', text: 'قارن بين المطاعم والمخابز والمحلات حول شارع سيدي قاريدي. الروابط أدناه تفتح بحثًا على الخريطة، وليست قائمة عناوين مؤكدة.' },
      { title: 'راعِ ميزانيتك', text: 'تحقق من القائمة والسعر قبل الطلب. اسأل زملاءك عن أماكنهم المعتادة.' },
      { title: 'خطط للمساء', text: 'تحقق من مواعيد العمل مباشرة لدى المحل وخطط لمشترياتك قبل العودة إلى الإقامة.' },
      { title: 'عناوين قيد الجمع', text: 'ستُضاف الأسعار والمسافات والمواعيد بعد تحقيق ميداني. لا يُقدَّم أي محل هنا على أنه مفتوح أو موصى به دون تحقق.' }], searches: ['مطاعم قريبة', 'مخابز ومحلات'] },
    transport: { title: 'التنقل في الجزائر', short: 'النقل', description: 'حضّر رحلتك، من أول حصة إلى العودة للإقامة.', sections: [
      { title: 'تحضير رحلة', text: 'استعمل المدرسة في القبة كوجهة في تطبيق الخرائط. قارن الخيارات المتاحة حسب نقطة انطلاقك.' },
      { title: 'الحافلات والمحطات', text: 'تأكد من الخطوط والاتجاهات والمحطات لدى المتعاملين أو في الموقع. المشروع لا يوفر خطوطًا أو مواعيد مؤكدة.' },
      { title: 'للعودة', text: 'حدد محطتك في الاتجاهين واستعلم عن آخر انطلاق. احتفظ بحل بديل إذا أنهيت متأخرًا.' }], searches: ['تحضير مساري', 'البحث عن محطات الحافلات'] },
    sport: { title: 'تحرّك، تنفّس، أعد الكرّة', short: 'الرياضة والأنشطة', description: 'الحياة الطلابية تُعاش أيضًا خارج الدروس.', sections: [
      { title: 'معرفة المنشآت', text: 'اسأل المدرسة عن الملاعب والفضاءات الرياضية المتاحة للطلبة وقواعد استعمالها.' },
      { title: 'إيجاد فريقك', text: 'كرة القدم، الجري، كرة السلة أو المشي: استعلم لدى الجمعيات وزملائك عن الأنشطة الموجودة.' },
      { title: 'فكرة: نادي ENSTP للجري', text: 'تقترح الوثيقة ناديًا طلابيًا للجري. إنها فكرة للتنظيم، وليست ناديًا أو رزنامة مؤكدة.' },
      { title: 'التنظيم دون ميزانية', text: 'اختر نشاطًا في المتناول، واحصل على الإذن لاستعمال المنشآت، وحددوا معًا مكانًا وموعدًا.' }] },
    'vie-etudiante': { title: 'إيجاد مكانك', short: 'الحياة الطلابية', description: 'لقاءات وتضامن ومعالم جديدة.', sections: [
      { title: 'التعرّف على دفعتك', text: 'ابدأ بفوج عمل أو نشاط رياضي. اسأل الطلبة القدامى عن كيفية الانضمام إلى النوادي المعترف بها.' },
      { title: 'العيش في الإقامة', text: 'استعلم لدى إقامتك عن الإطعام وفضاءات العمل والخدمات وشروط الدخول في نهاية الأسبوع.' },
      { title: 'طالب مرافق', text: 'الإرشاد بين القدامى والجدد فكرة من المشروع. اسأل قسمك إن كان هناك نظام قائم.' },
      { title: 'التضامن بين المدن', text: 'شبكة التضامن المقترحة لا تزال قيد التنظيم. لا أموال، لا أغراض ممنوعة ولا بيانات شخصية علنية؛ يلزم التحقق من الأعضاء والتبليغ قبل أي تواصل.' }] },
    alger: { title: 'الجزائر، مدينتك الجديدة', short: 'اكتشف الجزائر', description: 'مدينة لتستكشفها، عطلة أسبوعية تلو الأخرى.', sections: [
      { title: 'حديقة التجارب', text: 'فكرة نزهة لاكتشاف حديقة الحامة. تحقق من شروط الدخول والمواعيد قبل تنقّلك.' },
      { title: 'القصبة ووسط الجزائر', text: 'اكتشف تراث المدينة وشوارعها التاريخية. حضّر مسارك وفضّل زيارة أولى برفقة أحد.' },
      { title: 'السيدة الإفريقية', text: 'وجهة أخرى مقترحة في المشروع لاكتشاف الجزائر. تأكد من شروط الزيارة لدى المكان.' },
      { title: 'عطلة على إيقاعك', text: 'خطط لنقلك ذهابًا وإيابًا وتحقق من الأسعار الحالية. لا تُعلن أي ميزانية أو مدة تنقل غير مؤكدة.' }], searches: ['حديقة التجارب بالحامة', 'قصبة الجزائر', 'السيدة الإفريقية'] },
    aide: { title: 'تحتاج يد العون؟', short: 'المساعدة والتوجيه', description: 'مشكلة واحدة، أول جهة اتصال.', sections: [
      { title: 'مشكلة إدارية', text: 'ابدأ بمصلحة التمدرس. اشرح وضعك واسأل لأي مصلحة تقدّم ملفك.' },
      { title: 'سؤال عن الدروس', text: 'أمانة قسمك يمكنها توجيهك بخصوص الأفواج والمقاييس والجدول الزمني.' },
      { title: 'تشعر بالعزلة؟', text: 'تحدّث مع زميل أو أستاذ أو مسؤول في إقامتك. طلب المساعدة خطوة أولى، وليس فشلًا.' },
      { title: 'طوارئ أو صحة', text: 'في حالة خطر فوري، اتصل بخدمات الطوارئ المحلية أو بموظفي المدرسة. للعلاج العادي، ابحث عن صيدلية وتأكد من مواعيدها.' }], searches: ['صيدليات قرب المدرسة'] },
    impression: { title: 'الطباعة واللوازم', short: 'الطباعة والقرطاسية', description: 'دروسك ومخططاتك وكل ما تحتاجه.', sections: [
      { title: 'حضّر وثيقتك', text: 'صدّر ملفك بصيغة PDF وتحقق من المقاس وعدد الصفحات واختيار الألوان أو الأبيض والأسود.' },
      { title: 'إيجاد مقدّم خدمة', text: 'ابحث عن محلات النسخ والقرطاسية حول القبة. اتصل أو تنقّل لتأكيد الخدمات المقدّمة.' },
      { title: 'قبل الطباعة', text: 'اسأل عن التكلفة الإجمالية وخيارات الطباعة على الوجهين والآجال. للمخطط التقني، حدد المقاس والسلّم.' }], searches: ['النسخ والطباعة', 'القرطاسيات في القبة'] },
  },
};
