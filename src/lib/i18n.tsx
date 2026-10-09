import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { guides, type Guide } from '@/lib/guide-data';
import { guideTranslations } from '@/lib/guide-i18n';

export type Lang = 'fr' | 'en' | 'ar';
export const languages: { code: Lang; label: string }[] = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'ع' },
];

const ui = {
  fr: {
    tagline: 'LE CAMPUS · LA VILLE · LE MOUVEMENT', navGuide: 'Le guide', navCampus: 'Le campus', navLife: 'Vie étudiante', navAlger: 'Découvrir Alger',
    search: 'Rechercher', help: 'Besoin d’aide', openMenu: 'Ouvrir le menu', searchPh: 'Une salle, un service, une envie…', searchAria: 'Rechercher dans le guide', closeSearch: 'Fermer la recherche',
    noResult: 'Aucun résultat. Essayez « salle », « bus » ou « aide ».', footerTag: 'Fait pour les étudiants, par les étudiants.', official: 'Site officiel de l’ENSTP', footerNote: 'Guide indépendant · Projet étudiant 2026',
    eyebrow: 'NOUVEAU CHAPITRE. NOUVEAUX REPÈRES.', h1a: 'Votre aventure', h1b: 'commence ici.', quote: '« Tous ceux qui errent ne sont pas perdus. »',
    heroCopyA: 'Un campus à découvrir. Une ville à explorer.', heroCopyB: 'Tous les repères pour vivre pleinement votre première année.', explore: 'Explorer le guide', discoverCampus: 'Découvrir le campus',
    caption: 'Alger, votre nouvelle ville', heroAlt: 'Vue panoramique illustrative d’Alger et de sa baie', looking: 'JE CHERCHE…', qRoom: 'Ma salle', qFood: 'Où manger', qBus: 'Mon transport', qHelp: 'Un coup de main',
    daily: 'VOTRE QUOTIDIEN, SIMPLIFIÉ', need: 'De quoi avez-vous besoin ?', needSub: 'Les bonnes informations, au bon endroit. À vous de choisir.', count: '10 rubriques à explorer', filterAria: 'Filtrer les rubriques', all: 'Tout explorer',
    firstTitle: 'Premiers jours ? On est avec vous.', firstA: 'Les salles, les démarches, les nouveaux visages…', firstB: 'Prenez vos marques, une étape à la fois.', firstLink: 'Les essentiels pour bien commencer',
    beyond: 'AU-DELÀ DU CAMPUS', algerTitle: 'Et si on découvrait Alger ?', algerA: 'La Casbah, le Jardin d’Essai, une balade en bord de mer…', algerB: 'Votre prochain souvenir n’est pas loin.', algerLink: 'Trouver ma prochaine sortie',
    onMap: 'Sur la carte', keepExploring: 'Continuer l’exploration', statusA: 'Guide étudiant indépendant.', statusB: 'Les informations pratiques non confirmées sont signalées. Pour les procédures officielles, consultez votre service à l’ENSTP.', schoolSite: 'Site officiel de l’école', language: 'Langue',
    groups: { Campus: 'Campus', Quotidien: 'Quotidien', 'Vie étudiante': 'Vie étudiante', 'Découvertes': 'Découvertes' } as Record<string, string>,
  },
  en: {
    tagline: 'CAMPUS · CITY · MOVEMENT', navGuide: 'The guide', navCampus: 'Campus', navLife: 'Student life', navAlger: 'Discover Algiers',
    search: 'Search', help: 'Need help', openMenu: 'Open menu', searchPh: 'A room, a service, a craving…', searchAria: 'Search the guide', closeSearch: 'Close search',
    noResult: 'No results. Try “room”, “bus” or “help”.', footerTag: 'Made for students, by students.', official: 'Official ENSTP website', footerNote: 'Independent guide · Student project 2026',
    eyebrow: 'NEW CHAPTER. NEW BEARINGS.', h1a: 'Your adventure', h1b: 'starts here.', quote: '“Not all those who wander are lost.”',
    heroCopyA: 'A campus to discover. A city to explore.', heroCopyB: 'Everything you need to make the most of your first year.', explore: 'Explore the guide', discoverCampus: 'Discover the campus',
    caption: 'Algiers, your new city', heroAlt: 'Illustrative panoramic view of Algiers and its bay', looking: 'I’M LOOKING FOR…', qRoom: 'My room', qFood: 'Where to eat', qBus: 'Getting around', qHelp: 'A helping hand',
    daily: 'YOUR DAILY LIFE, SIMPLIFIED', need: 'What do you need?', needSub: 'The right information, in the right place. Your choice.', count: '10 sections to explore', filterAria: 'Filter sections', all: 'Explore all',
    firstTitle: 'First days? We’ve got you.', firstA: 'Rooms, paperwork, new faces…', firstB: 'Find your feet, one step at a time.', firstLink: 'The essentials to get started',
    beyond: 'BEYOND CAMPUS', algerTitle: 'How about discovering Algiers?', algerA: 'The Casbah, the Jardin d’Essai, a seaside stroll…', algerB: 'Your next memory isn’t far away.', algerLink: 'Find my next outing',
    onMap: 'On the map', keepExploring: 'Keep exploring', statusA: 'Independent student guide.', statusB: 'Unconfirmed practical information is flagged. For official procedures, contact the relevant ENSTP office.', schoolSite: 'Official school website', language: 'Language',
    groups: { Campus: 'Campus', Quotidien: 'Daily life', 'Vie étudiante': 'Student life', 'Découvertes': 'Discoveries' } as Record<string, string>,
  },
  ar: {
    tagline: 'الحرم · المدينة · الحركة', navGuide: 'الدليل', navCampus: 'الحرم الجامعي', navLife: 'الحياة الطلابية', navAlger: 'اكتشف الجزائر',
    search: 'بحث', help: 'تحتاج مساعدة', openMenu: 'فتح القائمة', searchPh: 'قاعة، خدمة، رغبة…', searchAria: 'ابحث في الدليل', closeSearch: 'إغلاق البحث',
    noResult: 'لا توجد نتائج. جرّب «قاعة» أو «حافلة» أو «مساعدة».', footerTag: 'من الطلبة، إلى الطلبة.', official: 'الموقع الرسمي للمدرسة', footerNote: 'دليل مستقل · مشروع طلابي 2026',
    eyebrow: 'فصل جديد. معالم جديدة.', h1a: 'مغامرتك', h1b: 'تبدأ هنا.', quote: '«ليس كل من يتجوّل تائهًا.»',
    heroCopyA: 'حرم جامعي لتكتشفه. مدينة لتستكشفها.', heroCopyB: 'كل ما تحتاجه لتعيش سنتك الأولى بالكامل.', explore: 'استكشف الدليل', discoverCampus: 'اكتشف الحرم',
    caption: 'الجزائر، مدينتك الجديدة', heroAlt: 'منظر بانورامي توضيحي للجزائر العاصمة وخليجها', looking: 'أبحث عن…', qRoom: 'قاعتي', qFood: 'أين آكل', qBus: 'تنقّلي', qHelp: 'يد العون',
    daily: 'يومك، بشكل أبسط', need: 'ماذا تحتاج؟', needSub: 'المعلومة الصحيحة في المكان الصحيح. الاختيار لك.', count: '10 أقسام للاستكشاف', filterAria: 'تصفية الأقسام', all: 'استكشف الكل',
    firstTitle: 'أيامك الأولى؟ نحن معك.', firstA: 'القاعات، الإجراءات، الوجوه الجديدة…', firstB: 'تعرّف على المكان خطوة بخطوة.', firstLink: 'الأساسيات لبداية جيدة',
    beyond: 'ما وراء الحرم', algerTitle: 'ماذا لو اكتشفنا الجزائر؟', algerA: 'القصبة، حديقة التجارب، نزهة على البحر…', algerB: 'ذكراك القادمة ليست بعيدة.', algerLink: 'اعثر على نزهتي القادمة',
    onMap: 'على الخريطة', keepExploring: 'واصل الاستكشاف', statusA: 'دليل طلابي مستقل.', statusB: 'المعلومات العملية غير المؤكدة مُشار إليها. للإجراءات الرسمية، راجع المصلحة المعنية في المدرسة.', schoolSite: 'الموقع الرسمي للمدرسة', language: 'اللغة',
    groups: { Campus: 'الحرم', Quotidien: 'اليومي', 'Vie étudiante': 'الحياة الطلابية', 'Découvertes': 'اكتشافات' } as Record<string, string>,
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: 'fr', setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr');
  useEffect(() => {
    const saved = localStorage.getItem('enstp-go-lang');
    if (saved === 'fr' || saved === 'en' || saved === 'ar') setLangState(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem('enstp-go-lang', l); };
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const { lang, setLang } = useContext(LangContext);
  return { lang, setLang, t: ui[lang] };
}

export function localizeGuide(g: Guide, lang: Lang): Guide {
  if (lang === 'fr') return g;
  const tr = guideTranslations[lang][g.slug];
  if (!tr) return g;
  return {
    ...g,
    title: tr.title, short: tr.short, description: tr.description, sections: tr.sections,
    ...(g.searches ? { searches: g.searches.map((s, i) => ({ ...s, label: tr.searches?.[i] ?? s.label })) } : {}),
  };
}

export function useGuides() {
  const { lang } = useLang();
  return guides.map(g => localizeGuide(g, lang));
}
