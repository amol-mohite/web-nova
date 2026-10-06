import { useModal } from '@/context/ModalContext';
import { Reveal } from '@/components/Reveal';
import { Check, ArrowRight } from 'lucide-react';

const accentMap: Record<string, { dot: string; text: string; ring: string; glow: string }> = {
  primary: { dot: 'bg-primary', text: 'text-primary', ring: 'ring-primary/20', glow: 'glow-primary' },
  primary: { dot: 'bg-primary', text: 'text-primary', ring: 'ring-primary/20', glow: 'glow-primary' },
  orange: { dot: 'bg-orange', text: 'text-orange', ring: 'ring-orange/20', glow: 'glow-orange' },
};

export function PricingSection() {
  const { openContact } = useModal();

  return (
    <section className="py-20 lg:py-28 bg-slate-bg/50 border-y border-slate-soft/30">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Clear scope. Clear pricing.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            No confusing packages or unnecessary features. We discuss what you need,
            define the scope, and build accordingly.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {[
            { name: 'Starter', description: 'Small business websites, personal brands, simple service websites.', best: ['Small business websites', 'Personal brands', 'Simple service websites'], accent: 'primary' },
            { name: 'Business', description: 'Corporate websites, lead generation, business websites.', best: ['Corporate websites', 'Lead generation', 'Business websites', 'Advanced integrations'], accent: 'primary' },
            { name: 'Custom', description: 'Web applications, dashboards, e-commerce, custom workflows.', best: ['Web applications', 'Dashboards', 'E-commerce', 'Custom workflows'], accent: 'orange' },
          ].map((tier, i) => {
            const a = accentMap[tier.accent] ?? accentMap.primary;
            return (
              <Reveal key={tier.name} delay={i * 100}>
                <div
                  className={`group h-full bg-surface rounded-2xl p-7 border border-slate-soft/40 hover:-translate-y-1.5 transition-all duration-300 ${a.glow} ${
                    i === 1 ? 'ring-2 ' + a.ring : ''
                  }`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`w-2.5 h-2.5 rounded-full ${a.dot}`} />
                    <span className="text-sm font-bold uppercase tracking-wider text-ink-soft">
                      {tier.name}
                    </span>
                  </div>

                  <p className="text-sm text-ink-soft leading-relaxed mb-5">
                    {tier.description}
                  </p>

                  <p className="text-xs font-semibold text-ink-soft uppercase tracking-wider mb-3">
                    Best for
                  </p>
                  <ul className="space-y-2.5">
                    {tier.best.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                        <Check className={`w-4 h-4 ${a.text} mt-0.5 shrink-0`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={openContact}
                    className={`mt-6 w-full px-4 py-2.5 text-sm font-semibold rounded-xl border transition-all duration-300 group-hover:bg-transparent ${
                      i === 1
                        ? `${a.text} border-current/30 hover:bg-current/5`
                        : 'text-ink-soft border-slate-soft/40 hover:bg-slate-soft/10'
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      Get a Quote
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
