import { useSiteData } from '@/context/SiteDataContext';
import { useModal } from '@/context/ModalContext';
import { Reveal } from '@/components/Reveal';
import { ArrowUpRight } from 'lucide-react';

const cardStyles = [
  { bg: 'bg-blue-50',   hoverBg: 'hover:bg-blue-100',   badge: 'bg-blue-100 text-blue-700',   tech: 'text-blue-600',   btnBg: 'bg-blue-100 text-blue-700',   btnHover: 'group-hover:bg-blue-700 group-hover:text-white' },
  { bg: 'bg-green-50',  hoverBg: 'hover:bg-green-100',  badge: 'bg-green-100 text-green-700',  tech: 'text-green-600',  btnBg: 'bg-green-100 text-green-700',  btnHover: 'group-hover:bg-green-700 group-hover:text-white' },
  { bg: 'bg-amber-50',  hoverBg: 'hover:bg-amber-100',  badge: 'bg-amber-100 text-amber-700',  tech: 'text-amber-600',  btnBg: 'bg-amber-100 text-amber-700',  btnHover: 'group-hover:bg-amber-700 group-hover:text-white' },
  { bg: 'bg-purple-50', hoverBg: 'hover:bg-purple-100', badge: 'bg-purple-100 text-purple-700', tech: 'text-purple-600', btnBg: 'bg-purple-100 text-purple-700', btnHover: 'group-hover:bg-purple-700 group-hover:text-white' },
  { bg: 'bg-pink-50',   hoverBg: 'hover:bg-pink-100',   badge: 'bg-pink-100 text-pink-700',   tech: 'text-pink-600',   btnBg: 'bg-pink-100 text-pink-700',   btnHover: 'group-hover:bg-pink-700 group-hover:text-white' },
  { bg: 'bg-indigo-50', hoverBg: 'hover:bg-indigo-100', badge: 'bg-indigo-100 text-indigo-700', tech: 'text-indigo-600', btnBg: 'bg-indigo-100 text-indigo-700', btnHover: 'group-hover:bg-indigo-700 group-hover:text-white' },
  { bg: 'bg-cyan-50', hoverBg: 'hover:bg-cyan-100', badge: 'bg-cyan-100 text-cyan-700', tech: 'text-cyan-600', btnBg: 'bg-cyan-100 text-cyan-700', btnHover: 'group-hover:bg-cyan-700 group-hover:text-white' },
];

export function WorkPage() {
  const { projects } = useSiteData();
  const { openContact } = useModal();

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Work we&rsquo;ve built
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            Real websites and digital experiences built for different business needs.
          </p>
        </Reveal>

        <Reveal className="flex justify-center mb-14" delay={100}>
          <button
            onClick={openContact}
            className="px-6 py-3 bg-gradient-to-r from-primary to-teal text-white font-semibold rounded-xl hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 active:scale-95"
          >
            Get a Free Demo
          </button>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const style = cardStyles[i % cardStyles.length];
            return (
              <Reveal key={project.id} delay={i * 80}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group block rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] ${style.bg} ${style.hoverBg}`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {project.category && (
                      <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full ${style.badge}`}>
                        {project.category}
                      </span>
                    )}
                    <span className={`absolute bottom-4 right-4 w-10 h-10 rounded-full ${style.btnBg} ${style.btnHover} flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500`}>
                      <ArrowUpRight className="w-5 h-5" />
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-display text-lg font-bold text-ink mb-1.5">
                      {project.name}
                    </h3>
                    <p className="text-sm text-ink-soft leading-relaxed mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    <span className={`text-xs font-semibold uppercase tracking-wider ${style.tech}`}>
                      {project.tech}
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="text-center mt-12" delay={150}>
          <button
            onClick={openContact}
            className="px-6 py-3 bg-surface text-ink font-semibold rounded-xl border border-slate-soft/60 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 active:scale-95"
          >
            Start Your Project
          </button>
        </Reveal>
      </div>
    </section>
  );
}
