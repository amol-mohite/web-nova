import { useModal } from '@/context/ModalContext';
import { Reveal } from '@/components/Reveal';
import { ArrowRight, Phone } from 'lucide-react';

export function CTASection() {
  const { openContact, openCallback } = useModal();

  return (
    <section id="contact" className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative bg-gradient-to-br from-slate-bg via-pale-blue/40 to-teal-soft rounded-3xl px-6 py-14 sm:px-12 lg:py-20 overflow-hidden border border-slate-soft/30">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-pale-blue/30 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-48 h-48 rounded-full bg-aqua/20 blur-3xl pointer-events-none" />

            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
                Have a project in mind?
              </h2>
              <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
                Tell us what you&rsquo;re looking to build. We&rsquo;ll get back to you
                with the next steps.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button
                  onClick={openContact}
                  className="group px-6 py-3.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 active:scale-95 inline-flex items-center justify-center gap-2 glow-primary"
                >
                  Connect Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={openCallback}
                  className="px-6 py-3.5 bg-surface text-ink font-semibold rounded-xl border border-primary/30 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 active:scale-95 inline-flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  Arrange a Callback
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
