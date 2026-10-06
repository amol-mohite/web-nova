import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSiteData } from '@/context/SiteDataContext';
import { useModal } from '@/context/ModalContext';
import { navLinks } from '@/lib/config';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const { config } = useSiteData();
  const { openContact } = useModal();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
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

  const brandInitial = (config?.brand_name ?? 'L').charAt(0);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/85 backdrop-blur-md border-b border-slate-soft/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex items-center gap-2 font-display font-bold text-lg text-ink"
        >
          {config?.logo_url ? (
            <img src={config.logo_url} alt={config.brand_name} className="h-8 w-auto object-contain" />
          ) : (
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-white text-sm font-bold">
              {brandInitial}
            </span>
          )}
          <span className="tracking-tight">{config?.brand_name ?? 'Lumen Studio'}</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="px-4 py-2 text-sm font-medium text-ink-soft hover:text-primary transition-colors duration-200 rounded-lg hover:bg-primary/8"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:block">
          <button
            onClick={openContact}
            className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 active:scale-95"
          >
            Connect Now
          </button>
        </div>

        <button
          className="lg:hidden p-2 text-ink"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-ink/20 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 bottom-0 w-[75%] max-w-xs bg-surface shadow-2xl flex flex-col p-6 transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="font-display font-bold text-lg text-ink">
              {config?.brand_name ?? 'Lumen Studio'}
            </span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu" className="p-2">
              <X className="w-6 h-6 text-ink" />
            </button>
          </div>

          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-3 text-left text-base font-medium text-ink-soft hover:text-primary hover:bg-primary/8 rounded-xl transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setMenuOpen(false);
              openContact();
            }}
            className="mt-6 w-full px-5 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors duration-300"
          >
            Connect Now
          </button>
        </div>
      </div>
    </header>
  );
}
