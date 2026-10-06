import { whyChooseUs } from '@/lib/config';
import { Reveal } from '@/components/Reveal';

export function WhyChooseUsSection() {
  return (
    <section id="why-us" className="py-20 lg:py-28 bg-teal-soft/40 border-y border-primary/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Built with clarity, not complexity.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {whyChooseUs.map((item, i) => (
            <Reveal key={item.number} delay={i * 90}>
              <div className="group flex gap-5 p-6 bg-surface rounded-2xl border border-slate-soft/40 hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/8 transition-all duration-300 h-full glow-primary">
                <span className="font-display text-3xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors duration-300 shrink-0">
                  {item.number}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-ink mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-ink-soft leading-relaxed">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
