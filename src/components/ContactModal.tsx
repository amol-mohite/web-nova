import { useEffect, useState, type FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { X, Check, Mail, Loader2 } from 'lucide-react';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setStatus('idle');
      setErrors({});
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const validate = (data: { name: string; email: string; message: string }) => {
    const e: Record<string, string> = {};
    if (!data.name.trim()) e.name = 'Name is required';
    if (!data.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Enter a valid email';
    if (!data.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const formData = new FormData(form);
    const data = {
      name: (formData.get('name') as string).trim(),
      email: (formData.get('email') as string).trim(),
      phone: (formData.get('phone') as string)?.trim() || null,
      message: (formData.get('message') as string).trim(),
    };

    const e = validate(data);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }

    setStatus('submitting');
    setErrors({});

    const { error } = await supabase.from('contact_enquiries').insert({
      name: data.name,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });

    if (error) {
      setStatus('error');
      return;
    }

    setStatus('success');
  };

  const fieldClass = (field: string) =>
    `w-full px-4 py-3 text-sm bg-background border rounded-xl outline-none transition-all duration-200 ${
      errors[field]
        ? 'border-primary/50 focus:border-primary'
        : 'border-slate-soft/40 focus:border-primary focus:ring-2 focus:ring-primary/10'
    }`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-surface rounded-2xl shadow-2xl border border-slate-soft/30 animate-scale-in max-h-[90vh] overflow-y-auto">
        {status === 'success' ? (
          <div className="p-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-mint/20 mx-auto mb-5">
              <Check className="w-8 h-8 text-mint" strokeWidth={2.5} />
            </div>
            <h3 className="font-display text-xl font-bold text-ink mb-2">
              Thanks for reaching out!
            </h3>
            <p className="text-sm text-ink-soft leading-relaxed">
              Your message has been received. Our executive will contact you shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-6 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-5 border-b border-slate-soft/20">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink">Connect Now</h3>
                  <p className="text-xs text-ink-soft">Send us a message</p>
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 text-ink-soft hover:text-ink hover:bg-slate-soft/15 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
                  Name <span className="text-primary">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={fieldClass('name')}
                  placeholder="Your name"
                  disabled={status === 'submitting'}
                />
                {errors.name && <p className="mt-1 text-xs text-primary">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={fieldClass('email')}
                  placeholder="you@example.com"
                  disabled={status === 'submitting'}
                />
                {errors.email && <p className="mt-1 text-xs text-primary">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-ink mb-1.5">
                  Phone Number <span className="text-ink-soft font-normal">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className={fieldClass('phone')}
                  placeholder="+91 98765 43210"
                  disabled={status === 'submitting'}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
                  Short Message <span className="text-primary">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  className={`${fieldClass('message')} resize-none`}
                  placeholder="Tell us about your project..."
                  disabled={status === 'submitting'}
                />
                {errors.message && <p className="mt-1 text-xs text-primary">{errors.message}</p>}
              </div>

              {status === 'error' && (
                <p className="text-sm text-primary">
                  Something went wrong. Please try again or email us directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full px-5 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
