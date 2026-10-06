import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSiteData } from '@/context/SiteDataContext';
import { useModal } from '@/context/ModalContext';
import { navLinks } from '@/lib/config';
import { Instagram, Linkedin, Facebook, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';

export function Footer() {
  const { config, services } = useSiteData();
  const { openContact } = useModal();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (href: string) => {
    if (href.startsWith('/#')) {
      const anchor = href.slice(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(anchor);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  const brandName = config?.brand_name ?? 'Lumen Studio';
  const tagline = config?.tagline ?? 'Fast websites. Clear scope. Better digital experiences.';
  const email = config?.email ?? '';
  const phone = config?.phone ?? '';
  const locationText = config?.location ?? '';
  const brandInitial = brandName.charAt(0);

  const socials = [
    { icon: Instagram, href: config?.instagram ?? '#', label: 'Instagram', hoverClass: 'hover:bg-blue-accent hover:text-white' },
    { icon: Linkedin, href: config?.linkedin ?? '#', label: 'LinkedIn', hoverClass: 'hover:bg-primary hover:text-white' },
    { icon: Facebook, href: config?.facebook ?? '#', label: 'Facebook', hoverClass: 'hover:bg-primary hover:text-white' },
  ];

  return (
    <footer className="bg-surface border-t border-slate-soft/40 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              {config?.logo_url ? (
                <img src={config.logo_url} alt={brandName} className="h-8 w-auto object-contain" />
              ) : (
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold">
                  {brandInitial}
                </span>
              )}
              <span className="font-display font-bold text-lg text-ink">{brandName}</span>
            </div>
            <p className="text-sm text-ink-soft leading-relaxed max-w-xs">{tagline}</p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-sm text-ink-soft hover:text-primary transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/services/${s.slug}`}
                    className="text-sm text-ink-soft hover:text-primary transition-colors duration-200"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-ink uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3 mb-4">
              <li className="flex items-center gap-2.5 text-sm text-ink-soft">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-primary transition-colors break-all">
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-ink-soft">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-primary transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-ink-soft">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                {locationText}
              </li>
            </ul>

            <div className="flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`w-9 h-9 rounded-lg bg-slate-soft/15 flex items-center justify-center text-ink-soft transition-all duration-300 ${social.hoverClass}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
              <a
                href={config?.whatsapp ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-lg bg-slate-soft/15 flex items-center justify-center text-ink-soft hover:bg-mint hover:text-white transition-all duration-300"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-soft/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-ink-soft">
            &copy; 2026 {brandName}. All rights reserved.
          </p>
          <p className="text-sm text-ink-soft">
            Built with ❤️ by <span className="font-semibold text-ink">AmolMohite</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
