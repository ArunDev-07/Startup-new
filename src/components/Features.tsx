// File: src/components/Features.tsx
import React, { useMemo, useState } from 'react';
import {
  Microscope,
  FlaskConical,
  Brain,
  Atom,
  Zap,
  Target,
  Search as SearchIcon,
  X as XIcon
} from 'lucide-react';

type Feature = {
  id: string;
  icon: any; // lucide icon component
  title: string;
  short: string;
  long: string;
  cta?: string;
};

const FEATURES: Feature[] = [
  {
    id: 'built-by-science',
    icon: Microscope,
    title: 'Built by Science Experts',
    short:
      'We understand the unique challenges of scientific data presentation and designed Sagittarius for researchers.',
    long:
      'Our team spent years working with leading research institutions. Sagittarius solves real-world problems — cleanly, securely and with research workflows in mind. We prioritize reproducibility, provenance, and clear visual narratives so your work is ready for collaboration and publication.',
    cta: 'Meet the leadership'
  },
  {
    id: 'platform',
    icon: FlaskConical,
    title: 'More than a Website Builder',
    short:
      'Data visualization, collaboration and publication tools in one platform — built for researchers.',
    long:
      'From interactive dashboards to data portals and publication-ready outputs, Sagittarius lets your team control the entire web ecosystem for research. Integrations, versioning, and fine-grained access controls are built in so you can focus on science.',
    cta: 'Explore the platform'
  },
  {
    id: 'simple-ux',
    icon: Brain,
    title: 'Simple and Intuitive',
    short: "No PhD required — researchers can get started quickly without specialized IT support.",
    long:
      "Sagittarius is built for non-technical users while keeping power features for engineers. Templates, guided flows, and sensible defaults get teams running fast — while advanced APIs and CI/CD hooks support production deployments.",
    cta: 'Learn about us'
  },
  {
    id: 'speed',
    icon: Zap,
    title: 'Rapid Time to Value',
    short: 'Turn months of work into days — get insights faster.',
    long:
      "We accelerate data pipelines and visualization, enabling teams to iterate faster and act on findings immediately. Templates and pre-built integrations reduce setup time dramatically.",
    cta: 'Calculate your ROI'
  },
  {
    id: 'impact',
    icon: Target,
    title: 'Research-first Outcomes',
    short: 'Built to help researchers measure and demonstrate impact.',
    long:
      'Every feature is designed to increase reproducibility, lower friction for collaborators, and make your research outputs easier to share with peers, funders, and the public.',
    cta: 'See case studies'
  }
];

const Features: React.FC = () => {
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [ctaOpen, setCtaOpen] = useState<Feature | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FEATURES;
    return FEATURES.filter(f => (f.title + ' ' + f.short + ' ' + f.long).toLowerCase().includes(q));
  }, [query]);

  const toggleExpand = (id: string) => {
    setExpanded(prev => (prev === id ? null : id));
  };

  return (
    <section className="section-padding bg-gradient-to-b from-sage-bg to-sage-deep" aria-labelledby="features-heading">
      <div className="container-custom">
        {/* Header + search */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sage-accent/10 text-sage-accent border border-sage-accent/20 mb-4">
              WHY SAGITTARIUS
            </div>
            <h2 id="features-heading" className="text-3xl lg:text-5xl font-bold mb-2">
              What sets <span className="gradient-text">Sagittarius</span> apart
            </h2>
            <p className="text-sage-text max-w-2xl">
              A professional, research-first platform that combines data, collaboration and publication capabilities so teams can move faster.
            </p>
          </div>

          <div className="w-full lg:w-96">
            <label htmlFor="feature-search" className="sr-only">Search features</label>
            <div className="relative">
              <input
                id="feature-search"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search features, e.g. 'ML', 'visualization'..."
                className="w-full pl-12 pr-10 py-3 rounded-lg bg-sage-card border border-transparent focus:outline-none focus:ring-2 focus:ring-sage-accent/40"
                aria-label="Search features"
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <SearchIcon className="w-5 h-5 text-sage-accent" />
              </div>
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md hover:bg-sage-accent/10"
                  aria-label="Clear search"
                >
                  <XIcon className="w-4 h-4 text-sage-accent" />
                </button>
              )}
            </div>
            <p className="text-sm text-sage-text/80 mt-2">Showing {filtered.length} of {FEATURES.length} features</p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filtered.map((feature) => {
            const Icon = feature.icon;
            const isOpen = expanded === feature.id;

            return (
              <article
                key={feature.id}
                className={`card p-6 transition-all duration-300 hover:shadow-xl focus-within:shadow-xl rounded-xl ${isOpen ? 'ring-2 ring-sage-accent/30' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-sage-card flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6 text-sage-accent" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-semibold text-sage-text-light">{feature.title}</h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleExpand(feature.id)}
                          aria-expanded={isOpen}
                          aria-controls={`feat-${feature.id}`}
                          className="text-sm text-sage-accent hover:underline focus:outline-none"
                        >
                          {isOpen ? 'Hide' : 'Details'}
                        </button>

                        <button
                          onClick={() => setCtaOpen(feature)}
                          className="btn-secondary text-sm"
                          aria-label={`Open CTA for ${feature.title}`}
                        >
                          {feature.cta}
                        </button>
                      </div>
                    </div>

                    <p className="text-sage-text mt-2">{feature.short}</p>

                    <div
                      id={`feat-${feature.id}`}
                      className={`mt-4 text-sage-text transition-[max-height,opacity] duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                      aria-hidden={!isOpen}
                    >
                      <p>{feature.long}</p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold text-sage-text-light mb-4">Ready to accelerate your research?</h3>
          <p className="text-sage-text mb-6 max-w-2xl mx-auto">Join leading institutions using AI-powered websites to transform scientific communication and data sharing.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">Start Free Trial</button>
            <button className="btn-secondary" onClick={() => setCtaOpen(FEATURES[0])}>Schedule Demo</button>
          </div>
        </div>

        {/* CTA Modal (simple) */}
        {ctaOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="bg-sage-bg rounded-lg shadow-xl max-w-xl w-full p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-xl font-bold">{ctaOpen.title}</h4>
                  <p className="text-sage-text mt-2">{ctaOpen.long}</p>
                </div>
                <button onClick={() => setCtaOpen(null)} className="p-2 rounded-md hover:bg-sage-card">
                  <XIcon className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex gap-3 justify-end">
                <button className="btn-secondary" onClick={() => setCtaOpen(null)}>Close</button>
                <a href="#contact" className="btn-primary">Contact Sales</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Features;