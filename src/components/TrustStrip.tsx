import { trustItems } from '@/lib/config';
import { Icon } from '@/components/Icon';

export function TrustStrip() {
  return (
    <section className="py-6 border-y border-slate-soft/30 bg-surface/50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="group flex items-center gap-3 justify-center sm:justify-start"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                <Icon name={item.icon} className="w-4.5 h-4.5" />
              </span>
              <span className="text-sm font-semibold text-ink-soft whitespace-nowrap">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
