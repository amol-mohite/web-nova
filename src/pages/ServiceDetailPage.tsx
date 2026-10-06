import { Link, useParams } from 'react-router-dom';
import { useSiteData } from '@/context/SiteDataContext';
import { useModal } from '@/context/ModalContext';
import { Icon } from '@/components/Icon';
import { Reveal } from '@/components/Reveal';
import { ArrowRight, ArrowLeft, Check, Phone } from 'lucide-react';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { services, loading } = useSiteData();
  const { openContact, openCallback } = useModal();

  const service = services.find((s) => s.slug === slug);
  const otherServices = services.filter((s) => s.slug !== slug).slice(0, 3);

  if (loading) {
    return (
      <div className="pt-32 pb-20 flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="font-display text-2xl font-bold text-ink mb-4">Service not found</h1>
        <Link
          to="/services"
          className="px-5 py-2.5 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors"
        >
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal>
          <Link
            to="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Services
          </Link>
        </Reveal>

        <Reveal className="mb-12">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
            <Icon name={service.icon} className="w-8 h-8" />
          </div>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight mb-4">
            {service.name}
          </h1>

          <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-3xl">
            {service.long_description}
          </p>

          {service.price_label && (
            <p className="mt-5 text-xl font-bold text-primary">{service.price_label}</p>
          )}
        </Reveal>

        <Reveal className="mb-12" delay={100}>
          <div className="bg-surface rounded-3xl p-6 sm:p-8 border border-slate-soft/40">
            <h2 className="font-display text-xl font-bold text-ink mb-6">
              What&rsquo;s included
            </h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {service.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 p-4 bg-slate-bg/50 rounded-xl border border-slate-soft/20 hover:border-primary/20 transition-colors duration-300"
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary/15 text-primary shrink-0">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-sm text-ink font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mb-16" delay={150}>
          <div className="bg-gradient-to-br from-slate-bg via-pale-blue/40 to-teal-soft rounded-3xl p-8 sm:p-10 text-center border border-slate-soft/30 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-pale-blue/30 blur-3xl pointer-events-none" />
            <div className="relative">
              <h2 className="font-display text-2xl font-bold text-ink mb-3">
                Interested in {service.name}?
              </h2>
              <p className="text-sm text-ink-soft mb-6 max-w-md mx-auto">
                Let&rsquo;s discuss your project and get you a custom quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={openContact}
                  className="group px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300 active:scale-95 inline-flex items-center justify-center gap-2 glow-primary"
                >
                  Connect Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  onClick={openCallback}
                  className="px-6 py-3 bg-surface text-ink font-semibold rounded-xl border border-primary/30 hover:bg-primary/5 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  Arrange a Callback
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        {otherServices.length > 0 && (
          <Reveal>
            <h2 className="font-display text-lg font-bold text-ink mb-5">Other Services</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {otherServices.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="group flex items-center gap-3 p-4 bg-surface rounded-xl border border-slate-soft/40 hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 glow-primary"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                    <Icon name={s.icon} className="w-5 h-5" />
                  </span>
                  <span className="text-sm font-semibold text-ink group-hover:text-primary transition-colors">
                    {s.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-ink-soft group-hover:text-primary group-hover:translate-x-0.5 transition-all ml-auto" />
                </Link>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
