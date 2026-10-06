import { useState, type FormEvent } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { useSiteData } from '@/context/SiteDataContext';
import type { Service, Project, SiteConfig } from '@/lib/types';
import {
  LogOut,
  Building2,
  FolderKanban,
  Settings,
  Inbox,
  Plus,
  Trash2,
  Save,
  Check,
  Loader2,
  ArrowUp,
  Mail,
  Phone,
} from 'lucide-react';

type Tab = 'services' | 'projects' | 'settings' | 'enquiries';

export function AdminPage() {
  const { session, loading, signIn, signOut } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);
  const [tab, setTab] = useState<Tab>('services');

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    setError(null);
    const { error: err } = await signIn(email, password);
    if (err) setError(err);
    setSigningIn(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-5 bg-background">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-white mb-4">
              <Settings className="w-7 h-7" />
            </div>
            <h1 className="font-display text-2xl font-bold text-ink">Admin Panel</h1>
            <p className="text-sm text-ink-soft mt-2">Sign in to manage your site</p>
          </div>

          <form onSubmit={handleSignIn} className="bg-surface rounded-2xl p-6 border border-slate-soft/30 space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-ink mb-1.5">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-background border border-slate-soft/40 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="admin-pass" className="block text-sm font-medium text-ink mb-1.5">
                Password
              </label>
              <input
                id="admin-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-background border border-slate-soft/40 rounded-xl outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-sm text-primary">{error}</p>}
            <button
              type="submit"
              disabled={signingIn}
              className="w-full px-5 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {signingIn ? <><Loader2 className="w-4 h-4 animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: typeof Building2 }[] = [
    { key: 'services', label: 'Services', icon: Building2 },
    { key: 'projects', label: 'Projects', icon: FolderKanban },
    { key: 'settings', label: 'Site Settings', icon: Settings },
    { key: 'enquiries', label: 'Enquiries', icon: Inbox },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">Admin Panel</h1>
            <p className="text-sm text-ink-soft mt-1">Manage your site content</p>
          </div>
          <button
            onClick={signOut}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-ink-soft hover:text-primary rounded-lg hover:bg-primary/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-300 ${
                tab === t.key
                  ? 'bg-primary text-white'
                  : 'bg-surface text-ink-soft border border-slate-soft/30 hover:border-primary/30'
              }`}
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'services' && <ServicesManager />}
        {tab === 'projects' && <ProjectsManager />}
        {tab === 'settings' && <SiteSettingsManager />}
        {tab === 'enquiries' && <EnquiriesManager />}
      </div>
    </div>
  );
}

function SaveIndicator({ saving, saved }: { saving: boolean; saved: boolean }) {
  if (saving) return <Loader2 className="w-4 h-4 animate-spin text-primary" />;
  if (saved) return <Check className="w-4 h-4 text-mint" />;
  return null;
}

function ServicesManager() {
  const { services, refresh } = useSiteData();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Service>>({});
  const [featuresText, setFeaturesText] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const startEdit = (svc: Service) => {
    setEditing(svc.id);
    setForm(svc);
    setFeaturesText(svc.features.join('\n'));
  };

  const startNew = () => {
    setEditing('new');
    setForm({ slug: '', icon: 'Code2', name: '', short_description: '', long_description: '', price_label: '', features: [], sort_order: services.length + 1 });
    setFeaturesText('');
  };

  const save = async () => {
    setSaving(true);
    const features = featuresText.split('\n').map((f) => f.trim()).filter(Boolean);
    const payload = { ...form, features };

    if (editing === 'new') {
      await supabase.from('services').insert(payload);
    } else {
      await supabase.from('services').update(payload).eq('id', editing);
    }

    await refresh();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setEditing(null);
    setForm({});
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    await supabase.from('services').delete().eq('id', id);
    await refresh();
  };

  const fieldClass = 'w-full px-3 py-2 text-sm bg-background border border-slate-soft/40 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-ink">Services ({services.length})</h2>
        <div className="flex items-center gap-3">
          <SaveIndicator saving={saving} saved={saved} />
          <button onClick={startNew} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>
      </div>

      {editing && (
        <div className="bg-surface rounded-2xl p-5 border border-primary/30 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <input className={fieldClass} placeholder="Name" value={form.name ?? ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className={fieldClass} placeholder="Slug (e.g. corporate-websites)" value={form.slug ?? ''} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <input className={fieldClass} placeholder="Icon (lucide name)" value={form.icon ?? ''} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
            <input className={fieldClass} placeholder="Price label (optional)" value={form.price_label ?? ''} onChange={(e) => setForm({ ...form, price_label: e.target.value || null })} />
          </div>
          <textarea className={fieldClass} rows={2} placeholder="Short description" value={form.short_description ?? ''} onChange={(e) => setForm({ ...form, short_description: e.target.value })} />
          <textarea className={fieldClass} rows={4} placeholder="Long description" value={form.long_description ?? ''} onChange={(e) => setForm({ ...form, long_description: e.target.value })} />
          <textarea className={fieldClass} rows={6} placeholder="Features (one per line)" value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} />
          <input className={fieldClass} type="number" placeholder="Sort order" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
          <div className="flex gap-2">
            <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-60">
              <Save className="w-4 h-4" /> Save
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm font-medium text-ink-soft rounded-lg hover:bg-slate-soft/15">
              Cancel
            </button>
          </div>
        </div>
      )}

      {services.map((svc) => (
        <div key={svc.id} className="bg-surface rounded-xl p-4 border border-slate-soft/30 flex items-center gap-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary shrink-0">
            <span className="text-xs font-bold">{svc.icon.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-ink text-sm truncate">{svc.name}</p>
            <p className="text-xs text-ink-soft truncate">/{svc.slug} &middot; {svc.features.length} features</p>
          </div>
          <button onClick={() => startEdit(svc)} className="px-3 py-1.5 text-xs font-semibold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">Edit</button>
          <button onClick={() => remove(svc.id)} className="p-2 text-ink-soft hover:text-primary rounded-lg hover:bg-primary/5 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

function ProjectsManager() {
  const { projects, refresh } = useSiteData();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Project>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const startEdit = (p: Project) => {
    setEditing(p.id);
    setForm(p);
  };

  const startNew = () => {
    setEditing('new');
    setForm({ name: '', category: '', description: '', tech: '', image_url: '', link: '#', badge_color: 'primary', sort_order: projects.length + 1 });
  };

  const save = async () => {
    setSaving(true);
    if (editing === 'new') {
      await supabase.from('projects').insert(form);
    } else {
      await supabase.from('projects').update(form).eq('id', editing);
    }
    await refresh();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setEditing(null);
  };

  const remove = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    await supabase.from('projects').delete().eq('id', id);
    await refresh();
  };

  const fieldClass = 'w-full px-3 py-2 text-sm bg-background border border-slate-soft/40 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-ink">Projects ({projects.length})</h2>
        <div className="flex items-center gap-3">
          <SaveIndicator saving={saving} saved={saved} />
          <button onClick={startNew} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" /> Add Project
          </button>
        </div>
      </div>

      {editing && (
        <div className="bg-surface rounded-2xl p-5 border border-primary/30 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <input className={fieldClass} placeholder="Project name" value={form.name ?? ''} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className={fieldClass} placeholder="Category" value={form.category ?? ''} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          </div>
          <textarea className={fieldClass} rows={2} placeholder="Description" value={form.description ?? ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="grid sm:grid-cols-2 gap-3">
            <input className={fieldClass} placeholder="Tech / type label" value={form.tech ?? ''} onChange={(e) => setForm({ ...form, tech: e.target.value })} />
            <select className={fieldClass} value={form.badge_color ?? 'primary'} onChange={(e) => setForm({ ...form, badge_color: e.target.value })}>
              <option value="primary">Teal</option>
              <option value="orange">Orange</option>
              <option value="blue">Blue</option>
            </select>
          </div>
          <input className={fieldClass} placeholder="Image URL" value={form.image_url ?? ''} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
          <input className={fieldClass} placeholder="Project link URL" value={form.link ?? ''} onChange={(e) => setForm({ ...form, link: e.target.value })} />
          <input className={fieldClass} type="number" placeholder="Sort order" value={form.sort_order ?? 0} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
          <div className="flex gap-2">
            <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-60">
              <Save className="w-4 h-4" /> Save
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm font-medium text-ink-soft rounded-lg hover:bg-slate-soft/15">
              Cancel
            </button>
          </div>
        </div>
      )}

      {projects.map((p) => (
        <div key={p.id} className="bg-surface rounded-xl p-4 border border-slate-soft/30 flex items-center gap-4">
          <img src={p.image_url} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-ink text-sm truncate">{p.name}</p>
            <p className="text-xs text-ink-soft truncate">{p.category} &middot; {p.tech}</p>
          </div>
          <button onClick={() => startEdit(p)} className="px-3 py-1.5 text-xs font-semibold text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">Edit</button>
          <button onClick={() => remove(p.id)} className="p-2 text-ink-soft hover:text-primary rounded-lg hover:bg-primary/5 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

function SiteSettingsManager() {
  const { config, refresh } = useSiteData();
  const [form, setForm] = useState<Partial<SiteConfig>>(config ?? {});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const save = async () => {
    setSaving(true);
    if (config?.id) {
      await supabase.from('site_config').update(form).eq('id', config.id);
    } else {
      await supabase.from('site_config').insert(form);
    }
    await refresh();
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fieldClass = 'w-full px-3 py-2 text-sm bg-background border border-slate-soft/40 rounded-lg outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-bold text-ink">Site Settings</h2>
        <div className="flex items-center gap-3">
          <SaveIndicator saving={saving} saved={saved} />
          <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-60">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-2xl p-5 border border-slate-soft/30 space-y-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ink-soft mb-3">Logo</p>
          <div>
            <label className="text-xs text-ink-soft mb-1 block">Logo URL</label>
            <input className={fieldClass} placeholder="https://your-cdn.com/logo.png" value={form.logo_url ?? ''} onChange={(e) => setForm({ ...form, logo_url: e.target.value || null })} />
            <p className="text-xs text-ink-soft mt-1">Paste a direct image URL (PNG, SVG, WebP). Leave empty to use the default letter icon.</p>
            {form.logo_url && (
              <div className="mt-3 flex items-center gap-3">
                <img src={form.logo_url} alt="Logo preview" className="h-10 w-auto object-contain rounded border border-slate-soft/40 p-1 bg-slate-bg" />
                <button type="button" onClick={() => setForm({ ...form, logo_url: null })} className="text-xs text-red-500 hover:underline">Remove</button>
              </div>
            )}
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ink-soft mb-3">Brand</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-ink-soft mb-1 block">Brand Name</label>
              <input className={fieldClass} value={form.brand_name ?? ''} onChange={(e) => setForm({ ...form, brand_name: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-ink-soft mb-1 block">Tagline</label>
              <input className={fieldClass} value={form.tagline ?? ''} onChange={(e) => setForm({ ...form, tagline: e.target.value })} />
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ink-soft mb-3">Contact</p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-ink-soft mb-1 block">Email</label>
              <input className={fieldClass} value={form.email ?? ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-ink-soft mb-1 block">Phone</label>
              <input className={fieldClass} value={form.phone ?? ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-ink-soft mb-1 block">Location</label>
              <input className={fieldClass} value={form.location ?? ''} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ink-soft mb-3">Social Links</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-ink-soft mb-1 block">Instagram</label>
              <input className={fieldClass} value={form.instagram ?? ''} onChange={(e) => setForm({ ...form, instagram: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-ink-soft mb-1 block">LinkedIn</label>
              <input className={fieldClass} value={form.linkedin ?? ''} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-ink-soft mb-1 block">Facebook</label>
              <input className={fieldClass} value={form.facebook ?? ''} onChange={(e) => setForm({ ...form, facebook: e.target.value })} />
            </div>
            <div>
              <label className="text-xs text-ink-soft mb-1 block">WhatsApp</label>
              <input className={fieldClass} value={form.whatsapp ?? ''} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState<Array<{ id: string; name: string; email: string; phone: string | null; message: string; status: string; created_at: string }>>([]);
  const [callbacks, setCallbacks] = useState<Array<{ id: string; name: string; phone: string; status: string; created_at: string }>>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const [e, c] = await Promise.all([
      supabase.from('contact_enquiries').select('*').order('created_at', { ascending: false }),
      supabase.from('callback_requests').select('*').order('created_at', { ascending: false }),
    ]);
    setEnquiries(e.data ?? []);
    setCallbacks(c.data ?? []);
    setLoading(false);
  };

  useState(() => { load(); });

  const updateStatus = async (table: string, id: string, status: string) => {
    await supabase.from(table).update({ status }).eq('id', id);
    load();
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-lg font-bold text-ink mb-4">Contact Enquiries ({enquiries.length})</h2>
        {enquiries.length === 0 ? (
          <p className="text-sm text-ink-soft bg-surface rounded-xl p-4 border border-slate-soft/30">No enquiries yet.</p>
        ) : (
          <div className="space-y-3">
            {enquiries.map((e) => (
              <div key={e.id} className="bg-surface rounded-xl p-4 border border-slate-soft/30">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="font-semibold text-ink text-sm">{e.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-ink-soft">
                      <span className="inline-flex items-center gap-1"><Mail className="w-3 h-3" /> {e.email}</span>
                      {e.phone && <span className="inline-flex items-center gap-1"><Phone className="w-3 h-3" /> {e.phone}</span>}
                    </div>
                  </div>
                  <select
                    value={e.status}
                    onChange={(ev) => updateStatus('contact_enquiries', e.id, ev.target.value)}
                    className="text-xs px-2 py-1 rounded-lg border border-slate-soft/40 bg-background outline-none focus:border-primary"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <p className="text-sm text-ink-soft bg-slate-bg/50 rounded-lg p-3 mt-2">{e.message}</p>
                <p className="text-xs text-ink-soft mt-2">{new Date(e.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="font-display text-lg font-bold text-ink mb-4">Callback Requests ({callbacks.length})</h2>
        {callbacks.length === 0 ? (
          <p className="text-sm text-ink-soft bg-surface rounded-xl p-4 border border-slate-soft/30">No callback requests yet.</p>
        ) : (
          <div className="space-y-3">
            {callbacks.map((c) => (
              <div key={c.id} className="bg-surface rounded-xl p-4 border border-slate-soft/30 flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-ink text-sm">{c.name}</p>
                  <p className="text-xs text-ink-soft mt-1 inline-flex items-center gap-1"><Phone className="w-3 h-3" /> {c.phone}</p>
                  <p className="text-xs text-ink-soft mt-1">{new Date(c.created_at).toLocaleString()}</p>
                </div>
                <select
                  value={c.status}
                  onChange={(ev) => updateStatus('callback_requests', c.id, ev.target.value)}
                  className="text-xs px-2 py-1 rounded-lg border border-slate-soft/40 bg-background outline-none focus:border-primary"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
