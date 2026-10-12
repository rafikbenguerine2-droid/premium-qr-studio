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

const YEARS = [
  '1ère année (Classe Préparatoire)',
  '2ème année (Classe Préparatoire)',
  '3ème année (Spécialité DIB ou DMS)',
  '4ème année (Spécialité DIB ou DMS)',
  '5ème année (Spécialité DIB ou DMS)',
];
const txt = {
  fr: { title: 'Mon compte étudiant', sub: 'Email d’école ou personnel accepté.', up: 'S’inscrire', in: 'Se connecter', first: 'Prénom', last: 'Nom', year: 'Année d’étude', pick: 'Choisir…', email: 'Email', pass: 'Mot de passe (8 caractères min.)', bad: 'Adresse email invalide.', check: 'Compte créé ! Cliquez sur le lien de confirmation reçu par email, puis connectez-vous.', resend: 'Renvoyer l’email de confirmation', resent: 'Email de confirmation renvoyé.', unconf: 'Votre email n’est pas encore confirmé. Cliquez sur le lien reçu ou renvoyez l’email.', hi: 'Bonjour', out: 'Se déconnecter', home: 'Retour au guide', wait: '…', fail: 'Email ou mot de passe incorrect.', failUp: 'Inscription impossible. Cet email est peut-être déjà utilisé.', short: 'Mot de passe trop court.', rate: 'Trop de tentatives, réessayez dans une minute.' },
  en: { title: 'My student account', sub: 'School or personal email accepted.', up: 'Sign up', in: 'Log in', first: 'First name', last: 'Last name', year: 'Academic year', pick: 'Choose…', email: 'Email', pass: 'Password (8+ characters)', bad: 'Invalid email address.', check: 'Account created! Click the confirmation link in your email, then log in.', resend: 'Resend confirmation email', resent: 'Confirmation email sent again.', unconf: 'Your email is not confirmed yet. Click the link you received or resend it.', hi: 'Hello', out: 'Log out', home: 'Back to the guide', wait: '…', fail: 'Wrong email or password.', failUp: 'Sign-up failed. This email may already be in use.', short: 'Password too short.', rate: 'Too many attempts, try again in a minute.' },
  ar: { title: 'حسابي الطلابي', sub: 'يُقبل بريد المدرسة أو البريد الشخصي.', up: 'إنشاء حساب', in: 'تسجيل الدخول', first: 'الاسم', last: 'اللقب', year: 'السنة الدراسية', pick: 'اختر…', email: 'البريد الإلكتروني', pass: 'كلمة المرور (8 أحرف على الأقل)', bad: 'بريد إلكتروني غير صالح.', check: 'تم إنشاء الحساب! اضغط على رابط التأكيد في بريدك ثم سجّل الدخول.', resend: 'إعادة إرسال بريد التأكيد', resent: 'تمت إعادة إرسال بريد التأكيد.', unconf: 'بريدك غير مؤكد بعد. اضغط على الرابط أو أعد إرساله.', hi: 'مرحبًا', out: 'تسجيل الخروج', home: 'العودة إلى الدليل', wait: '…', fail: 'البريد أو كلمة المرور غير صحيحة.', failUp: 'تعذّر التسجيل. ربما هذا البريد مستعمل.', short: 'كلمة المرور قصيرة جدًا.', rate: 'محاولات كثيرة، أعد المحاولة بعد دقيقة.' },
};

function AuthPage() {
  const { lang } = useLang();
  const s = txt[lang];
  const [mode, setMode] = useState<'up' | 'in'>('in');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [year, setYear] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  async function loadUser() {
    const { data } = await supabase.auth.getUser();
    const u = data.user;
    if (!u || !u.email_confirmed_at) return setUser(null);
    const { data: p } = await supabase.from('profiles').select('first_name,last_name').eq('id', u.id).maybeSingle();
    setUser({ email: u.email ?? '', name: p ? `${p.first_name} ${p.last_name}`.trim() : '' });
  }

  useEffect(() => {
    loadUser();
    const { data } = supabase.auth.onAuthStateChange((e) => {
      if (e === 'SIGNED_IN' || e === 'SIGNED_OUT' || e === 'USER_UPDATED') setTimeout(loadUser, 0);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const mail = email.trim().toLowerCase();

  async function resend() {
    setBusy(true);
    const { error } = await supabase.auth.resend({ type: 'signup', email: mail, options: { emailRedirectTo: `${window.location.origin}/auth` } });
    setMsg(error ? { ok: false, text: error.status === 429 ? s.rate : s.fail } : { ok: true, text: s.resent });
    setBusy(false);
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    setShowResend(false);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail) || mail.length > 255) return setMsg({ ok: false, text: s.bad });
    if (pass.length < 8) return setMsg({ ok: false, text: s.short });
    setBusy(true);
    if (mode === 'up') {
      const { error } = await supabase.auth.signUp({
        email: mail, password: pass,
        options: { emailRedirectTo: `${window.location.origin}/auth`, data: { first_name: first.trim().slice(0, 80), last_name: last.trim().slice(0, 80), academic_year: year } },
      });
      if (error) setMsg({ ok: false, text: error.status === 429 ? s.rate : s.failUp });
      else { setMsg({ ok: true, text: s.check }); setShowResend(true); setMode('in'); }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: mail, password: pass });
      if (error) {
        const unconf = error.code === 'email_not_confirmed' || /confirm/i.test(error.message);
        setMsg({ ok: false, text: unconf ? s.unconf : error.status === 429 ? s.rate : s.fail });
        setShowResend(unconf);
      }
    }
    setBusy(false);
  }

  return (
    <>
      <Header />
      <main className="auth-page">
        <section className="auth-card">
          <h1>{s.title}</h1>
          {user ? (
            <>
              <p>{s.hi}{user.name ? `, ${user.name}` : ''} — <strong dir="ltr">{user.email}</strong></p>
              <div className="auth-actions">
                <Button asChild><Link to="/">{s.home}</Link></Button>
                <Button variant="outline" onClick={() => supabase.auth.signOut()}>{s.out}</Button>
              </div>
            </>
          ) : (
            <>
              <p>{s.sub}</p>
              <div className="lang-switch auth-tabs" role="tablist">
                <button type="button" className={mode === 'in' ? 'lang-active' : ''} onClick={() => setMode('in')}>{s.in}</button>
                <button type="button" className={mode === 'up' ? 'lang-active' : ''} onClick={() => setMode('up')}>{s.up}</button>
              </div>
              <form onSubmit={submit} className="auth-form">
                {mode === 'up' && (
                  <>
                    <label>{s.first}<input required maxLength={80} value={first} onChange={(e) => setFirst(e.target.value)} autoComplete="given-name" /></label>
                    <label>{s.last}<input required maxLength={80} value={last} onChange={(e) => setLast(e.target.value)} autoComplete="family-name" /></label>
                    <label>{s.year}
                      <select required value={year} onChange={(e) => setYear(e.target.value)}>
                        <option value="" disabled>{s.pick}</option>
                        {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </label>
                  </>
                )}
                <label>{s.email}<input required type="email" dir="ltr" maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
                <label>{s.pass}<input required type="password" dir="ltr" value={pass} onChange={(e) => setPass(e.target.value)} autoComplete={mode === 'up' ? 'new-password' : 'current-password'} /></label>
                <Button type="submit" disabled={busy}>{busy ? s.wait : mode === 'up' ? s.up : s.in}</Button>
                {msg && <p role="status" className={msg.ok ? 'auth-ok' : 'auth-err'}>{msg.text}</p>}
                {showResend && mail && <Button type="button" variant="outline" disabled={busy} onClick={resend}>{s.resend}</Button>}
              </form>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
