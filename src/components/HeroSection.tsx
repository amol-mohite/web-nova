import { useNavigate } from 'react-router-dom';
import { useModal } from '@/context/ModalContext';
import { ArrowRight, Globe, Smartphone } from 'lucide-react';

export function HeroSection() {
  const { openContact } = useModal();
  const navigate = useNavigate();

  return (
    <section id="home" className="relative pt-32 pb-16 sm:pt-36 lg:pt-44 lg:pb-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-10 w-72 h-72 rounded-full bg-pale-blue/40 blur-3xl" />
        <div className="absolute top-40 right-0 w-96 h-96 rounded-full bg-aqua/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-pale-blue/40 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full mb-6">
              WEB DEVELOPMENT &bull; DESIGN &bull; DIGITAL PRODUCTS
            </span>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink leading-[1.15] tracking-tight">
              Websites that <span className="text-primary">look good</span>.
              <br />
              And work <span className="text-primary">even better</span>.
            </h1>

            <p className="mt-6 text-base sm:text-lg text-ink-soft leading-relaxed max-w-xl mx-auto lg:mx-0">
              Fast, responsive websites and web apps with clear scope, transparent
              pricing, and a focus on real business needs.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <button
                onClick={openContact}
                className="group px-6 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 active:scale-95 inline-flex items-center justify-center gap-2 glow-primary"
              >
                Connect Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="px-6 py-3.5 bg-surface text-ink font-semibold rounded-xl border border-slate-soft/60 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 active:scale-95"
              >
                View Our Work
              </button>
            </div>
          </div>

          <div className="relative hidden lg:block h-[440px]">
            <div className="absolute top-8 left-0 w-[420px] bg-surface rounded-2xl shadow-xl shadow-slate-soft/30 border border-slate-soft/40 overflow-hidden animate-float-slow">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-soft/20 bg-slate-bg/50">
                <span className="w-3 h-3 rounded-full bg-primary/60" />
                <span className="w-3 h-3 rounded-full bg-orange/60" />
                <span className="w-3 h-3 rounded-full bg-mint/60" />
                <span className="ml-3 text-xs text-ink-soft font-medium">lumenstudio.dev</span>
              </div>
              <div className="p-5">
                <div className="h-3 w-2/3 bg-slate-soft/50 rounded-full mb-3" />
                <div className="h-3 w-1/2 bg-aqua/40 rounded-full mb-5" />
                <div className="grid grid-cols-3 gap-3">
                  <div className="h-16 bg-pale-blue/60 rounded-lg" />
                  <div className="h-16 bg-pale-blue/40 rounded-lg" />
                  <div className="h-16 bg-mint/25 rounded-lg" />
                </div>
                <div className="mt-4 h-8 w-24 bg-primary/80 rounded-lg" />
              </div>
            </div>

            <div
              className="absolute top-0 right-0 w-56 bg-surface rounded-2xl shadow-lg shadow-aqua/15 border border-aqua/20 p-4 animate-float-slower"
              style={{ animationDelay: '1s' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="h-2.5 w-20 bg-ink/15 rounded-full mb-1.5" />
                  <div className="h-2 w-14 bg-primary/30 rounded-full" />
                </div>
              </div>
            </div>

            <div
              className="absolute bottom-4 right-8 w-36 bg-surface rounded-2xl shadow-lg shadow-pale-blue/30 border border-pale-blue/30 p-3 animate-float-slow"
              style={{ animationDelay: '2s' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="w-4 h-4 text-primary" />
                <div className="h-2 w-12 bg-primary/25 rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-2 w-full bg-pale-blue/60 rounded-full" />
                <div className="h-2 w-3/4 bg-slate-soft/50 rounded-full" />
                <div className="h-10 bg-pale-blue/25 rounded-lg mt-2" />
                <div className="h-6 w-16 bg-primary/70 rounded-lg" />
              </div>
            </div>

            <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-orange/50 animate-float-slower" />
            <div
              className="absolute bottom-20 left-8 w-2.5 h-2.5 rounded-full bg-mint/60 animate-float-slow"
              style={{ animationDelay: '1.5s' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
