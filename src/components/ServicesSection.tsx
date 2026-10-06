import { Link } from 'react-router-dom';
import { useSiteData } from '@/context/SiteDataContext';
import { Icon } from '@/components/Icon';
import { Reveal } from '@/components/Reveal';
import { ArrowRight } from 'lucide-react';

const cardStyles = [
  { bg: 'bg-blue-50',   hover: 'hover:bg-blue-100',   border: 'border-t-blue-500',   iconBg: 'bg-blue-100',   iconText: 'text-blue-600',   iconHoverBg: 'group-hover:bg-blue-600',   iconHoverText: 'group-hover:text-white',   badge: 'bg-blue-100 text-blue-700',   link: 'text-blue-600',   price: 'text-blue-600' },
  { bg: 'bg-green-50',  hover: 'hover:bg-green-100',  border: 'border-t-green-500',  iconBg: 'bg-green-100',  iconText: 'text-green-600',  iconHoverBg: 'group-hover:bg-green-600',  iconHoverText: 'group-hover:text-white',  badge: 'bg-green-100 text-green-700',  link: 'text-green-600',  price: 'text-green-600' },
  { bg: 'bg-amber-50',  hover: 'hover:bg-amber-100',  border: 'border-t-amber-500',  iconBg: 'bg-amber-100',  iconText: 'text-amber-600',  iconHoverBg: 'group-hover:bg-amber-600',  iconHoverText: 'group-hover:text-white',  badge: 'bg-amber-100 text-amber-700',  link: 'text-amber-600',  price: 'text-amber-600' },
  { bg: 'bg-purple-50', hover: 'hover:bg-purple-100', border: 'border-t-purple-500', iconBg: 'bg-purple-100', iconText: 'text-purple-600', iconHoverBg: 'group-hover:bg-purple-600', iconHoverText: 'group-hover:text-white', badge: 'bg-purple-100 text-purple-700', link: 'text-purple-600', price: 'text-purple-600' },
  { bg: 'bg-pink-50',   hover: 'hover:bg-pink-100',   border: 'border-t-pink-500',   iconBg: 'bg-pink-100',   iconText: 'text-pink-600',   iconHoverBg: 'group-hover:bg-pink-600',   iconHoverText: 'group-hover:text-white',   badge: 'bg-pink-100 text-pink-700',   link: 'text-pink-600',   price: 'text-pink-600' },
  { bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100', border: 'border-t-indigo-500', iconBg: 'bg-indigo-100', iconText: 'text-indigo-600', iconHoverBg: 'group-hover:bg-indigo-600', iconHoverText: 'group-hover:text-white', badge: 'bg-indigo-100 text-indigo-700', link: 'text-indigo-600', price: 'text-indigo-600' },
  { bg: 'bg-teal-50',   hover: 'hover:bg-teal-100',   border: 'border-t-teal-500',   iconBg: 'bg-teal-100',   iconText: 'text-teal-600',   iconHoverBg: 'group-hover:bg-teal-600',   iconHoverText: 'group-hover:text-white',   badge: 'bg-teal-100 text-teal-700',   link: 'text-teal-600',   price: 'text-teal-600' },
];

export function ServicesSection() {
  const { services } = useSiteData();

  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            What can we build for you?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            From a simple business website to a complete web application, we build
            around what your business actually needs.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const s = cardStyles[i % cardStyles.length];
            return (
              <Reveal key={service.slug} delay={i * 80}>
                <Link
                  to={`/services/${service.slug}`}
                  className={`group flex flex-col h-full rounded-2xl border-t-4 ${s.border} ${s.bg} ${s.hover} transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] overflow-hidden`}
                >
                  <div className="p-7 flex flex-col flex-1">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${s.iconBg} ${s.iconText} ${s.iconHoverBg} ${s.iconHoverText}`}>
                        <Icon name={service.icon} className="w-6 h-6" />
                      </div>
                      {service.features.length > 0 && (
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.badge}`}>
                          {service.features.length} features
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-lg font-bold text-ink mb-2">
                      {service.name}
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed flex-1">
                      {service.short_description}
                    </p>

                    {/* Footer row */}
                    <div className="mt-5 flex items-center justify-between">
                      {service.price_label ? (
                        <span className={`text-sm font-bold ${s.price}`}>{service.price_label}</span>
                      ) : (
                        <span />
                      )}
                      <span className={`inline-flex items-center gap-1 text-sm font-semibold ${s.link} opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300`}>
                        Learn more
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="text-center mt-12" delay={150}>
          <Link
            to="/services"
            className="inline-block px-6 py-3 bg-surface text-ink font-semibold rounded-xl border border-slate-soft/60 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 active:scale-95"
          >
            View All Services
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
