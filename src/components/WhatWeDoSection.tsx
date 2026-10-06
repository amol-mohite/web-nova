import { Reveal } from '@/components/Reveal';
import { Palette, Globe, Cloud, ShieldCheck, BarChart2, Headphones } from 'lucide-react';

const items = [
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'Wireframes, modern interfaces, and conversion-focused journeys tailored to your business goals.',
    bg: 'bg-blue-50',   hover: 'hover:bg-blue-100',   iconBg: 'bg-blue-100',   iconText: 'text-blue-600',   iconHoverBg: 'group-hover:bg-blue-600',
  },
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Fast, responsive websites with SEO-ready structure and clean code for long-term growth.',
    bg: 'bg-green-50',  hover: 'hover:bg-green-100',  iconBg: 'bg-green-100',  iconText: 'text-green-600',  iconHoverBg: 'group-hover:bg-green-600',
  },
  {
    icon: Cloud,
    title: 'Cloud Deployment',
    description: 'Domain, hosting, SSL, and production deployment with CI/CD-ready delivery process.',
    bg: 'bg-amber-50',  hover: 'hover:bg-amber-100',  iconBg: 'bg-amber-100',  iconText: 'text-amber-600',  iconHoverBg: 'group-hover:bg-amber-600',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Backups',
    description: 'Security hardening, periodic backups, and uptime monitoring to keep systems stable.',
    bg: 'bg-purple-50', hover: 'hover:bg-purple-100', iconBg: 'bg-purple-100', iconText: 'text-purple-600', iconHoverBg: 'group-hover:bg-purple-600',
  },
  {
    icon: BarChart2,
    title: 'Performance & SEO',
    description: 'Speed optimization, technical SEO setup, and analytics tracking for measurable results.',
    bg: 'bg-pink-50',   hover: 'hover:bg-pink-100',   iconBg: 'bg-pink-100',   iconText: 'text-pink-600',   iconHoverBg: 'group-hover:bg-pink-600',
  },
  {
    icon: Headphones,
    title: 'Post-Launch Support',
    description: 'Maintenance, feature updates, and dedicated support after go-live.',
    bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100', iconBg: 'bg-indigo-100', iconText: 'text-indigo-600', iconHoverBg: 'group-hover:bg-indigo-600',
  },
];

export function WhatWeDoSection() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink tracking-tight">
            Everything you need to go live
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-soft leading-relaxed">
            End-to-end services from design to deployment, built around what your business actually needs.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className={`group cursor-pointer rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] ${item.bg} ${item.hover}`}>
                <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 ${item.iconBg} ${item.iconText} ${item.iconHoverBg} group-hover:text-white`}>
                  <item.icon className="h-7 w-7" strokeWidth={2} />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold text-ink">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
