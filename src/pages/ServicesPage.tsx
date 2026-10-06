import { Link } from 'react-router-dom';
import { useSiteData } from '@/context/SiteDataContext';
import { useModal } from '@/context/ModalContext';
import { Icon } from '@/components/Icon';
import { Reveal } from '@/components/Reveal';
import { ArrowRight, Check } from 'lucide-react';

const pageCardStyles = [
  { bg: 'bg-blue-50',   iconBg: 'bg-blue-100',   iconText: 'text-blue-600',   iconHoverBg: 'group-hover:bg-blue-600',   accent: 'text-blue-600',   border: 'hover:border-blue-200',   checkText: 'text-blue-500',   btnBg: 'bg-blue-600 hover:bg-blue-700',   featureLink: 'text-blue-600' },
  { bg: 'bg-green-50',  iconBg: 'bg-green-100',  iconText: 'text-green-600',  iconHoverBg: 'group-hover:bg-green-600',  accent: 'text-green-600',  border: 'hover:border-green-200',  checkText: 'text-green-500',  btnBg: 'bg-green-600 hover:bg-green-700',  featureLink: 'text-green-600' },
  { bg: 'bg-amber-50',  iconBg: 'bg-amber-100',  iconText: 'text-amber-600',  iconHoverBg: 'group-hover:bg-amber-600',  accent: 'text-amber-600',  border: 'hover:border-amber-200',  checkText: 'text-amber-500',  btnBg: 'bg-amber-600 hover:bg-amber-700',  featureLink: 'text-amber-600' },
  { bg: 'bg-purple-50', iconBg: 'bg-purple-100', iconText: 'text-purple-600', iconHoverBg: 'group-hover:bg-purple-600', accent: 'text-purple-600', border: 'hover:border-purple-200', checkText: 'text-purple-500', btnBg: 'bg-purple-600 hover:bg-purple-700', featureLink: 'text-purple-600' },
  { bg: 'bg-pink-50',   iconBg: 'bg-pink-100',   iconText: 'text-pink-600',   iconHoverBg: 'group-hover:bg-pink-600',   accent: 'text-pink-600',   border: 'hover:border-pink-200',   checkText: 'text-pink-500',   btnBg: 'bg-pink-600 hover:bg-pink-700',   featureLink: 'text-pink-600' },
  { bg: 'bg-indigo-50', iconBg: 'bg-indigo-100', iconText: 'text-indigo-600', iconHoverBg: 'group-hover:bg-indigo-600', accent: 'text-indigo-600', border: 'hover:border-indigo-200', checkText: 'text-indigo-500', btnBg: 'bg-indigo-600 hover:bg-indigo-700', featureLink: 'text-indigo-600' },
  { bg: 'bg-teal-50',   iconBg: 'bg-teal-100',   iconText: 'text-teal-600',   iconHoverBg: 'group-hover:bg-teal-600',   accent: 'text-teal-600',   border: 'hover:border-teal-200',   checkText: 'text-teal-500',   btnBg: 'bg-teal-600 hover:bg-teal-700',   featureLink: 'text-teal-600' },
];

export function ServicesPage() {
  const { services, loading } = useSiteData();
  const { openContact } = useModal();

  return (
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full mb-5">
            OUR SERVICES
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink tracking-tight">
            What can we build for you?
          </h1>
          <p className="mt-5 text-base sm:text-lg text-ink-soft leading-relaxed">
            From a simple business website to a complete web application, we build
            around what your business actually needs.
          </p>
        </Reveal>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-8">
            {services.map((service, i) => {
              const s = pageCardStyles[i % pageCardStyles.length];
              return (
              <Reveal key={service.slug} delay={i * 60}>
                <div
                  className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${s.bg} rounded-3xl p-6 sm:p-8 lg:p-10 border border-transparent ${s.border} transition-all duration-300 ${
                    i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div>
                    <div className={`group flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${s.iconBg} ${s.iconText} ${s.iconHoverBg} group-hover:text-white mb-5`}>
                      <Icon name={service.icon} className="w-7 h-7" />
                    </div>

                    <h2 className="font-display text-2xl font-bold text-ink mb-3">
                      {service.name}
                    </h2>
                    <p className="text-sm sm:text-base text-ink-soft leading-relaxed mb-5">
                      {service.short_description}
                    </p>

                    {service.price_label && (
                      <p className={`text-lg font-bold mb-5 ${s.accent}`}>{service.price_label}</p>
                    )}

                    <div className="flex flex-wrap gap-3">
                      <Link
                        to={`/services/${service.slug}`}
                        className={`group inline-flex items-center gap-2 px-5 py-2.5 ${s.btnBg} text-white text-sm font-semibold rounded-xl transition-all duration-300 active:scale-95`}
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                      <button
                        onClick={openContact}
                        className="px-5 py-2.5 bg-white text-ink text-sm font-semibold rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-300"
                      >
                        Get a Quote
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/60 rounded-2xl p-6 border border-white/80">
                    <p className="text-xs font-bold uppercase tracking-wider text-ink-soft mb-4">
                      What&rsquo;s included
                    </p>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {service.features.slice(0, 6).map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm text-ink">
                          <Check className={`w-4 h-4 mt-0.5 shrink-0 ${s.checkText}`} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {service.features.length > 6 && (
                      <Link
                        to={`/services/${service.slug}`}
                        className={`mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:underline ${s.featureLink}`}
                      >
                        See all {service.features.length} features
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
