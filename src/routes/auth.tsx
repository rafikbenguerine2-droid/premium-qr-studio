import { createFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Header, Footer } from '@/components/guide-shell';
import { Button } from '@/components/ui/button';
import { useLang } from '@/lib/i18n';

export const Route = createFileRoute('/auth')({
  head: () => ({
    meta: [
      { title: 'Compte étudiant · ENSTP Go' },
      { name: 'description', content: 'Créez votre compte ENSTP Go avec votre email d’école @enstp.edu.dz.' },
      { property: 'og:title', content: 'Compte étudiant · ENSTP Go' },
      { property: 'og:description', content: 'Inscription réservée aux étudiants avec un email @enstp.edu.dz.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: AuthPage,
});

const DOMAIN = '@enstp.edu.dz';
const txt = {
  fr: { title: 'Mon compte étudiant', sub: 'Réservé aux étudiants : utilisez votre email d’école.', up: 'Créer un compte', in: 'Me connecter', name: 'Nom complet', year: 'Année / filière', email: 'Email d’école', ph: `prenom.nom${DOMAIN}`, pass: 'Mot de passe (8 caractères min.)', bad: `Utilisez votre email d’école (${DOMAIN}).`, check: 'Vérifiez votre boîte mail : cliquez sur le lien de confirmation pour activer votre compte.', hi: 'Bonjour', out: 'Me déconnecter', home: 'Retour au guide', wait: '…', fail: 'Une erreur est survenue. Vérifiez vos informations.', short: 'Mot de passe trop court.' },
  en: { title: 'My student account', sub: 'Students only: use your school email.', up: 'Create account', in: 'Sign in', name: 'Full name', year: 'Year / major', email: 'School email', ph: `first.last${DOMAIN}`, pass: 'Password (8+ characters)', bad: `Use your school email (${DOMAIN}).`, check: 'Check your inbox: click the confirmation link to activate your account.', hi: 'Hello', out: 'Sign out', home: 'Back to the guide', wait: '…', fail: 'Something went wrong. Check your details.', short: 'Password too short.' },
  ar: { title: 'حسابي الطلابي', sub: 'للطلبة فقط: استعمل بريد المدرسة الإلكتروني.', up: 'إنشاء حساب', in: 'تسجيل الدخول', name: 'الاسم الكامل', year: 'السنة / التخصص', email: 'بريد المدرسة', ph: `name${DOMAIN}`, pass: 'كلمة المرور (8 أحرف على الأقل)', bad: `استعمل بريد المدرسة (${DOMAIN}).`, check: 'تحقق من بريدك: اضغط على رابط التأكيد لتفعيل حسابك.', hi: 'مرحبًا', out: 'تسجيل الخروج', home: 'العودة إلى الدليل', wait: '…', fail: 'حدث خطأ. تحقق من معلوماتك.', short: 'كلمة المرور قصيرة جدًا.' },
};

function AuthPage() {
  const { lang } = useLang();
  const s = txt[lang];
  const [mode, setMode] = useState<'up' | 'in'>('up');
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserEmail(data.user?.email ?? null));
    const { data } = supabase.auth.onAuthStateChange((_e, session) => setUserEmail(session?.user?.email ?? null));
    return () => data.subscription.unsubscribe();
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    const mail = email.trim().toLowerCase();
    if (!mail.endsWith(DOMAIN) || mail.length <= DOMAIN.length) return setMsg({ ok: false, text: s.bad });
    if (pass.length < 8) return setMsg({ ok: false, text: s.short });
    setBusy(true);
    if (mode === 'up') {
      const { error } = await supabase.auth.signUp({ email: mail, password: pass, options: { emailRedirectTo: window.location.origin, data: { full_name: name.trim(), study_year: year.trim() } } });
      setMsg(error ? { ok: false, text: s.fail } : { ok: true, text: s.check });
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: mail, password: pass });
      if (error) setMsg({ ok: false, text: s.fail });
    }
    setBusy(false);
  }

  return (
    <>
      <Header />
      <main className="auth-page">
        <section className="auth-card">
          <h1>{s.title}</h1>
          {userEmail ? (
            <>
              <p>{s.hi}, <strong dir="ltr">{userEmail}</strong></p>
              <div className="auth-actions">
                <Button asChild><Link to="/">{s.home}</Link></Button>
                <Button variant="outline" onClick={() => supabase.auth.signOut()}>{s.out}</Button>
              </div>
            </>
          ) : (
            <>
              <p>{s.sub}</p>
              <div className="lang-switch auth-tabs" role="tablist">
                <button type="button" className={mode === 'up' ? 'lang-active' : ''} onClick={() => setMode('up')}>{s.up}</button>
                <button type="button" className={mode === 'in' ? 'lang-active' : ''} onClick={() => setMode('in')}>{s.in}</button>
              </div>
              <form onSubmit={submit} className="auth-form">
                {mode === 'up' && (
                  <>
                    <label>{s.name}<input required maxLength={120} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
                    <label>{s.year}<input required maxLength={120} value={year} onChange={(e) => setYear(e.target.value)} /></label>
                  </>
                )}
                <label>{s.email}<input required type="email" dir="ltr" placeholder={s.ph} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
                <label>{s.pass}<input required type="password" dir="ltr" value={pass} onChange={(e) => setPass(e.target.value)} autoComplete={mode === 'up' ? 'new-password' : 'current-password'} /></label>
                <Button type="submit" disabled={busy}>{busy ? s.wait : mode === 'up' ? s.up : s.in}</Button>
                {msg && <p role="status" className={msg.ok ? 'auth-ok' : 'auth-err'}>{msg.text}</p>}
              </form>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
