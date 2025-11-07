import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';


interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl?: string;
  featured: boolean;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image?: string;
}

const Portfolio: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [maxProjects, setMaxProjects] = useState<number>(4);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // modal/team
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'biology', name: 'Biology' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'physics', name: 'Physics' }
  ];

  const placeholder = '/Images/placeholder.png';

  const getImgSrc = (src?: string) => {
    if (!src) return placeholder;
    if (/^https?:\/\//i.test(src)) return src;
    if (src.startsWith('/')) return src;
    return `/Images/${src}`;
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const img = e.currentTarget;
    img.onerror = null;
    img.src = placeholder;
  };

  const fallbackPortfolioData: PortfolioItem[] = [
    {
      id: '1',
      title: 'GenomeViz Pro',
      category: 'biology',
      description:
        "Interactive genome browser for Stanford's genomics research team with real-time data visualization and collaborative annotation tools.",
      image: '/Images/project1.png',
      technologies: ['React', 'D3.js', 'WebGL', 'Node.js', 'MongoDB'],
      liveUrl: 'https://genomeviz-demo.sagittarius.ai',
      githubUrl: 'https://github.com/sagittarius/genomeviz',
      featured: true
    },
    {
      id: '2',
      title: 'ChemLab Analytics',
      category: 'chemistry',
      description:
        "Comprehensive chemical analysis platform for MIT's chemistry department with molecular modeling and reaction pathway visualization.",
      image: '/Images/project1.png',
      technologies: ['Vue.js', 'Three.js', 'RDKit', 'Python', 'PostgreSQL'],
      liveUrl: 'https://chemlab-demo.sagittarius.ai',
      featured: true
    },
    {
      id: '3',
      title: 'Quantum Simulator Hub',
      category: 'physics',
      description:
        'Advanced quantum physics simulation platform for CERN with real-time particle interaction modeling and collaborative research tools.',
      image:
        'https://images.pexels.com/photos/8674530/pexels-photo-8674530.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      technologies: ['Next.js', 'WebAssembly', 'TensorFlow.js', 'WebGL', 'Redis'],
      liveUrl: 'https://quantum-demo.sagittarius.ai',
      githubUrl: 'https://github.com/sagittarius/quantum-sim',
      featured: true
    }
  ];

  // FETCH (accept array or { projects: [] })
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('/api/portfolio.json');
        if (response.ok) {
          const data = await response.json();
          const items: PortfolioItem[] = Array.isArray(data) ? data : data.projects || [];
          setPortfolioItems(items);
        } else {
          setPortfolioItems(fallbackPortfolioData);
        }
      } catch (err) {
        console.error('Portfolio fetch error:', err);
        setPortfolioItems(fallbackPortfolioData);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  // autoplay video when allowed
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const tryPlay = async () => {
      try {
        await v.play();
      } catch {
        /* ignore autoplay block */
      }
    };
    tryPlay();
  }, []);

  // smooth scroll globally
  useEffect(() => {
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = prev || '';
    };
  }, []);

  // responsive featured count
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      if (w < 640) setMaxProjects(1);
      else if (w >= 640 && w < 1024) setMaxProjects(3);
      else setMaxProjects(4);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  // modal: close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedMember(null);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // lock body scroll when modal open
  useEffect(() => {
    if (selectedMember) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => {
        document.body.style.overflow = prev || '';
      };
    }
  }, [selectedMember]);

  const teamMembers: TeamMember[] = [
    {
      id: 'anbu',
      name: 'Anbu Malligarjun sri',
      role: 'Founder & CEO',
      bio: 'Leads company vision, partnerships, growth strategy, and product direction across all domains in STEM.',
      image: getImgSrc('/Images/anbu.png')
    },
    {
      id: 'arun',
      name: 'Arun G',
      role: 'Co-Founder & CTO',
      bio: 'Expert in full-stack development. Oversees all technology decisions, architecture, and product execution.',
      image: getImgSrc('/Images/arun.png')
    },
    {
      id: 'brajin',
      name: 'Brajin SJ',
      role: 'Co-Founder & COO',
      bio: 'Responsible for operational efficiency, architecture integration, and smooth workflow across scientific and technical projects.',
      image: getImgSrc('/Images/brajin.png')
    }
  ];

  const filteredItems = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter((it) => it.category === selectedCategory);

  // All projects: show all filtered; Featured limited by viewport count
  const displayedFiltered = filteredItems;
  const featuredItems = portfolioItems.filter((it) => it.featured);
  const displayedFeatured = featuredItems.slice(0, maxProjects);

  if (loading) {
    return (
      <div className="pt-16 lg:pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-sage-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sage-text">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-10 lg:pt-10">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-b from-sage-bg to-sage-deep">
        <div className="container-custom text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sage-accent/10 text-sage-accent border border-sage-accent/20 mb-6">
            OUR PORTFOLIO
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6 font-nb-arch">
            Transforming Science Through
            <br />
            <span className="gradient-text">Intelligent Web Solutions</span>
          </h1>

          <p className="text-lg sm:text-xl text-sage-text max-w-3xl mx-auto mb-8">
            Explore our collection of AI-powered websites and platforms that are revolutionizing how researchers in biology, chemistry, and physics share their discoveries.
          </p>

          <section className="section-padding">
            <div className="container-custom flex flex-col items-center">
              <div className="w-full max-w-5xl">
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg bg-black">
                  <video
                    ref={videoRef}
                    poster={getImgSrc('/Images/video-poster.png')}
                    preload="auto"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="primary-video w-full h-full object-cover"
                  >
                    <source src="/Videos/profile.webm" type="video/webm" />
                    <source src="/Videos/profile.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              <div className="mt-6 text-center max-w-2xl">
                <p className="text-sage-text leading-relaxed mb-4">
                  Since 2016, we have been helping research teams and product-first companies design production-ready platforms and data-driven tools.
                </p>
                <button className="px-6 py-2 border border-sage-accent text-sage-accent rounded-full hover:bg-sage-accent/10 transition">
                  What we do
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Tech + video */}
      <section className="section-padding">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-sage-text-light font-nb-arch">Tech Stacks We Use</h2>
            <p className="text-sage-text text-base sm:text-lg leading-relaxed max-w-2xl">
              We build modern, scalable platforms using a combination of frontend, backend and machine learning technologies. Our core stacks include:
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">
              <li className="px-4 py-2 bg-sage-card rounded-lg">React</li>
              <li className="px-4 py-2 bg-sage-card rounded-lg">FastAPI</li>
              <li className="px-4 py-2 bg-sage-card rounded-lg">Django</li>
              <li className="px-4 py-2 bg-sage-card rounded-lg">Machine Learning (Python / TF / PyTorch)</li>
              <li className="px-4 py-2 bg-sage-card rounded-lg">Spring Boot</li>
              <li className="px-4 py-2 bg-sage-card rounded-lg">Docker / Kubernetes</li>
            </ul>
          </div>

          {/* IMPORTANT: hide this secondary video on small screens so it doesn't stack below the hero video */}
          <div className="aspect-video rounded-lg overflow-hidden bg-black shadow-lg hidden sm:block">
            <video
              src="/Videos/video-main.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* About + Team */}
      <section className="section-padding bg-sage-deep">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-12 items-start py-24">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight text-sage-text-light font-nb-arch">About Us</h2>
            <p className="text-lg lg:text-xl text-sage-text leading-relaxed max-w-4xl">
              Sagittarix Technologies is a deep-tech innovation company dedicated to transforming the future of Science, Technology, Engineering, and Mathematics (STEM) using advanced Artificial Intelligence.
            </p>
            <p className="text-lg text-sage-text max-w-3xl">
              We build multi-domain AI systems from life sciences to quantum physics not limited to a single product or platform, our mission is to create intelligent technologies that revolutionize industries and elevate human knowledge.
            </p>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-sage-text-light mb-3">Core Capabilities</h3>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl">
                <li className="px-4 py-2 bg-sage-card rounded-lg">Scalable Backends</li>
                <li className="px-4 py-2 bg-sage-card rounded-lg">Realtime Visualizations</li>
                <li className="px-4 py-2 bg-sage-card rounded-lg">Machine Learning Pipelines</li>
                <li className="px-4 py-2 bg-sage-card rounded-lg">Data Engineering</li>
                <li className="px-4 py-2 bg-sage-card rounded-lg">Deployment & DevOps</li>
                <li className="px-4 py-2 bg-sage-card rounded-lg">Research-focused UX</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-sage-text-light text-center lg:text-left">The Team</h3>
            <div className="grid grid-cols-1 gap-6">
              {teamMembers.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMember(m)}
                  className="flex flex-col sm:flex-row items-center gap-4 bg-sage-card p-4 rounded-lg text-left hover:shadow-md transition"
                  aria-label={`Open profile for ${m.name}`}
                >
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover flex-shrink-0"
                    onError={handleImgError}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="mt-3 sm:mt-0">
                    <div className="text-sage-text font-semibold text-lg">{m.name}</div>
                    <div className="text-sage-accent">🔹 {m.role}</div>
                    <p className="text-sage-text mt-2 text-sm line-clamp-3">{m.bio}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal (dark themed by default) */}
      {selectedMember && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedMember.name} profile`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSelectedMember(null)}
            aria-hidden="true"
          />

          <div className="relative bg-sage-deep text-sage-text rounded-lg max-w-3xl w-full p-6 z-10 shadow-2xl ring-1 ring-sage-accent/10">
            <button
              ref={closeButtonRef}
              onClick={() => setSelectedMember(null)}
              aria-label="Close profile"
              className="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 rounded-md bg-sage-card hover:bg-sage-accent/10 focus:outline-none focus:ring-2 focus:ring-sage-accent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-sage-text" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <img
                src={selectedMember.image}
                alt={selectedMember.name}
                className="w-32 h-32 rounded-lg object-cover flex-shrink-0 border border-sage-accent/5"
                onError={handleImgError}
              />
              <div>
                <h3 className="text-2xl font-bold font-nb-arch">{selectedMember.name}</h3>
                <div className="text-sage-accent mt-1">{selectedMember.role}</div>
                <p className="mt-4 text-sage-text leading-relaxed">{selectedMember.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Projects */}
      {displayedFeatured.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-12 text-sage-text-light font-nb-arch">Featured Projects</h2>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displayedFeatured.map((item) => (
                <div key={item.id} className="card group hover:scale-[1.02] transition-all duration-300">
                  <div className="aspect-video bg-sage-deep rounded-lg mb-6 overflow-hidden">
                    <img
                      src={getImgSrc(item.image)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={handleImgError}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-sage-accent/10 text-sage-accent rounded-full text-sm font-medium">
                        {categories.find((cat) => cat.id === item.category)?.name}
                      </span>
                      <div className="flex space-x-2">
                        <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-sage-deep hover:bg-sage-accent text-sage-text hover:text-sage-bg rounded-lg transition-all duration-200" aria-label={`Open ${item.title} live site`}>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        {item.githubUrl && (
                          <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-sage-deep hover:bg-sage-accent text-sage-text hover:text-sage-bg rounded-lg transition-all duration-200" aria-label={`Open ${item.title} GitHub`}>
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-sage-text-light">{item.title}</h3>

                    <p className="text-sage-text leading-relaxed text-sm sm:text-base">{item.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-sage-deep text-sage-text rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="section-padding bg-sage-deep">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-sage-text-light font-nb-arch">All Projects</h2>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  aria-pressed={selectedCategory === category.id}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-sage-accent text-sage-bg'
                      : 'bg-sage-card text-sage-text hover:bg-sage-accent/10 hover:text-sage-accent'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedFiltered.map((item) => (
              <div key={item.id} className="card group hover:scale-[1.02] transition-all duration-300">
                <div className="aspect-video bg-sage-bg rounded-lg mb-6 overflow-hidden">
                  <img
                    src={getImgSrc(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={handleImgError}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-sage-accent/10 text-sage-accent rounded-full text-sm font-medium">
                      {categories.find((cat) => cat.id === item.category)?.name}
                    </span>
                    <div className="flex space-x-2">
                      <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-sage-bg hover:bg-sage-accent text-sage-text hover:text-sage-bg rounded-lg transition-all duration-200" aria-label={`Open ${item.title} live site`}>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      {item.githubUrl && (
                        <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 bg-sage-bg hover:bg-sage-accent text-sage-text hover:text-sage-bg rounded-lg transition-all duration-200" aria-label={`Open ${item.title} GitHub`}>
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-sage-text-light">{item.title}</h3>

                  <p className="text-sage-text leading-relaxed text-sm sm:text-base">{item.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-sage-bg text-sage-text rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {displayedFiltered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-sage-text text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="card text-center max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-sage-text-light font-nb-arch">Ready to Start Your Project?</h2>
            <p className="text-lg text-sage-text mb-8 max-w-2xl mx-auto">
              [REPLACE WITH COMPANY_TEXT] Let's create an AI-powered website that showcases your research and helps you connect with the scientific community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary inline-flex items-center justify-center">
                Start Your Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button className="btn-secondary">Schedule Consultation</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
