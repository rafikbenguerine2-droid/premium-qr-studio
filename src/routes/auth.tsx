import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Header, Footer } from '@/components/guide-shell';
import { Button } from '@/components/ui/button';
import { useLang } from '@/lib/i18n';
import { ACADEMIC_YEARS, SPECIALTIES, needsSpecialty } from '@/lib/academic';

export const Route = createFileRoute('/auth')({
  head: () => ({
    meta: [
      { title: 'Compte étudiant · ENSTP Go' },
      { name: 'description', content: 'Créez votre compte ENSTP Go avec votre email d’école ou personnel.' },
      { property: 'og:title', content: 'Compte étudiant · ENSTP Go' },
      { property: 'og:description', content: 'Inscription et connexion des étudiants ENSTP Go.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary' },
    ],
  }),
  component: AuthPage,
});

const txt = {
  fr: { title: 'Mon compte étudiant', sub: 'Email d’école ou personnel accepté.', up: 'S’inscrire', in: 'Se connecter', first: 'Prénom', last: 'Nom', year: 'Année d’étude', spec: 'Spécialité', pick: 'Choisir…', email: 'Email', pass: 'Mot de passe (8 caractères min.)', bad: 'Adresse email invalide.', vTitle: 'Vérifiez votre email', vSub: 'Entrez le code à 6 chiffres envoyé à', code: 'Code de vérification', verify: 'Vérifier', resend: 'Renvoyer le code', resent: 'Nouveau code envoyé.', badCode: 'Code incorrect ou expiré.', back: 'Retour', unconf: 'Email pas encore vérifié : entrez le code reçu.', hi: 'Bonjour', out: 'Se déconnecter', home: 'Aller au guide', wait: '…', fail: 'Email ou mot de passe incorrect.', failUp: 'Inscription impossible. Cet email est peut-être déjà utilisé.', short: 'Mot de passe trop court.', rate: 'Trop de demandes, réessayez dans une minute.' },
  en: { title: 'My student account', sub: 'School or personal email accepted.', up: 'Sign up', in: 'Log in', first: 'First name', last: 'Last name', year: 'Academic year', spec: 'Specialty', pick: 'Choose…', email: 'Email', pass: 'Password (8+ characters)', bad: 'Invalid email address.', vTitle: 'Check your email', vSub: 'Enter the 6-digit code sent to', code: 'Verification code', verify: 'Verify', resend: 'Resend code', resent: 'New code sent.', badCode: 'Wrong or expired code.', back: 'Back', unconf: 'Email not verified yet: enter the code you received.', hi: 'Hello', out: 'Log out', home: 'Go to the guide', wait: '…', fail: 'Wrong email or password.', failUp: 'Sign-up failed. This email may already be in use.', short: 'Password too short.', rate: 'Too many requests, try again in a minute.' },
  ar: { title: 'حسابي الطلابي', sub: 'يُقبل بريد المدرسة أو البريد الشخصي.', up: 'إنشاء حساب', in: 'تسجيل الدخول', first: 'الاسم', last: 'اللقب', year: 'السنة الدراسية', spec: 'التخصص', pick: 'اختر…', email: 'البريد الإلكتروني', pass: 'كلمة المرور (8 أحرف على الأقل)', bad: 'بريد إلكتروني غير صالح.', vTitle: 'تحقق من بريدك', vSub: 'أدخل الرمز المكوّن من 6 أرقام المرسل إلى', code: 'رمز التحقق', verify: 'تحقق', resend: 'إعادة إرسال الرمز', resent: 'تم إرسال رمز جديد.', badCode: 'رمز خاطئ أو منتهي الصلاحية.', back: 'رجوع', unconf: 'البريد غير مؤكد بعد: أدخل الرمز الذي وصلك.', hi: 'مرحبًا', out: 'تسجيل الخروج', home: 'الذهاب إلى الدليل', wait: '…', fail: 'البريد أو كلمة المرور غير صحيحة.', failUp: 'تعذّر التسجيل. ربما هذا البريد مستعمل.', short: 'كلمة المرور قصيرة جدًا.', rate: 'طلبات كثيرة، أعد المحاولة بعد دقيقة.' },
};

function AuthPage() {
  const { lang } = useLang();
  const s = txt[lang];
  const navigate = useNavigate();
  const [mode, setMode] = useState<'up' | 'in' | 'verify'>('in');
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [year, setYear] = useState('');
  const [spec, setSpec] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user?.email_confirmed_at ? data.user.email ?? '' : null));
  }, []);
  useEffect(() => {
    if (cooldown <= 0) return;
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [cooldown]);

  const mail = email.trim().toLowerCase();
  const errText = (e: { status?: number }, fallback: string) => (e.status === 429 ? s.rate : fallback);
  const goVerify = () => { setMode('verify'); setCode(''); setCooldown(60); };

  async function resend() {
    setBusy(true);
    const { error } = await supabase.auth.resend({ type: 'signup', email: mail, options: { emailRedirectTo: `${window.location.origin}/auth` } });
    setMsg(error ? { ok: false, text: errText(error, s.badCode) } : { ok: true, text: s.resent });
    if (!error) setCooldown(60);
    setBusy(false);
  }

  async function verify(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!/^\d{6}$/.test(code)) return setMsg({ ok: false, text: s.badCode });
    setBusy(true);
    const { error } = await supabase.auth.verifyOtp({ email: mail, token: code, type: 'signup' });
    setBusy(false);
    if (error) return setMsg({ ok: false, text: errText(error, s.badCode) });
    navigate({ to: '/' });
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail) || mail.length > 255) return setMsg({ ok: false, text: s.bad });
    if (pass.length < 8) return setMsg({ ok: false, text: s.short });
    setBusy(true);
    if (mode === 'up') {
      const { error } = await supabase.auth.signUp({
        email: mail, password: pass,
        options: { emailRedirectTo: `${window.location.origin}/auth`, data: { first_name: first.trim().slice(0, 80), last_name: last.trim().slice(0, 80), academic_year: year, specialty: needsSpecialty(year) ? spec : '' } },
      });
      if (error) setMsg({ ok: false, text: errText(error, s.failUp) });
      else goVerify();
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: mail, password: pass });
      if (error) {
        if (error.code === 'email_not_confirmed') { goVerify(); setMsg({ ok: false, text: s.unconf }); await supabase.auth.resend({ type: 'signup', email: mail }); }
        else setMsg({ ok: false, text: errText(error, s.fail) });
      } else navigate({ to: '/' });
    }
    setBusy(false);
  }

  const tabs = (
    <div className="lang-switch auth-tabs" role="tablist">
      <button type="button" className={mode === 'in' ? 'lang-active' : ''} onClick={() => { setMode('in'); setMsg(null); }}>{s.in}</button>
      <button type="button" className={mode === 'up' ? 'lang-active' : ''} onClick={() => { setMode('up'); setMsg(null); }}>{s.up}</button>
    </div>
  );
  const status = msg && <p role="status" className={msg.ok ? 'auth-ok' : 'auth-err'}>{msg.text}</p>;

  return (
    <>
      <Header />
      <main className="auth-page">
        <section className="auth-card">
          {user ? (
            <>
              <h1>{s.title}</h1>
              <p>{s.hi} — <strong dir="ltr">{user}</strong></p>
              <div className="auth-actions">
                <Button asChild><Link to="/">{s.home}</Link></Button>
                <Button variant="outline" onClick={async () => { await supabase.auth.signOut(); setUser(null); }}>{s.out}</Button>
              </div>
            </>
          ) : mode === 'verify' ? (
            <>
              <h1>{s.vTitle}</h1>
              <p>{s.vSub} <strong dir="ltr">{mail}</strong></p>
              <form onSubmit={verify} className="auth-form">
                <label>{s.code}
                  <input className="otp-input" required inputMode="numeric" autoComplete="one-time-code" dir="ltr" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="••••••" autoFocus />
                </label>
                <Button type="submit" disabled={busy || code.length !== 6}>{busy ? s.wait : s.verify}</Button>
                {status}
                <Button type="button" variant="outline" disabled={busy || cooldown > 0} onClick={resend}>{s.resend}{cooldown > 0 ? ` (${cooldown}s)` : ''}</Button>
                <Button type="button" variant="ghost" onClick={() => { setMode('in'); setMsg(null); }}>{s.back}</Button>
              </form>
            </>
          ) : (
            <>
              <h1>{s.title}</h1>
              <p>{s.sub}</p>
              {tabs}
              <form onSubmit={submit} className="auth-form">
                {mode === 'up' && (
                  <>
                    <label>{s.first}<input required maxLength={80} value={first} onChange={(e) => setFirst(e.target.value)} autoComplete="given-name" /></label>
                    <label>{s.last}<input required maxLength={80} value={last} onChange={(e) => setLast(e.target.value)} autoComplete="family-name" /></label>
                    <label>{s.year}
                      <select required value={year} onChange={(e) => { setYear(e.target.value); if (!needsSpecialty(e.target.value)) setSpec(''); }}>
                        <option value="" disabled>{s.pick}</option>
                        {ACADEMIC_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </label>
                    {needsSpecialty(year) && (
                      <label>{s.spec}
                        <select required value={spec} onChange={(e) => setSpec(e.target.value)}>
                          <option value="" disabled>{s.pick}</option>
                          {SPECIALTIES.map((x) => <option key={x} value={x}>{x}</option>)}
                        </select>
                      </label>
                    )}
                  </>
                )}
                <label>{s.email}<input required type="email" dir="ltr" maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
                <label>{s.pass}<input required type="password" dir="ltr" value={pass} onChange={(e) => setPass(e.target.value)} autoComplete={mode === 'up' ? 'new-password' : 'current-password'} /></label>
                <Button type="submit" disabled={busy}>{busy ? s.wait : mode === 'up' ? s.up : s.in}</Button>
                {status}
              </form>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
