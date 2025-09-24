import React, { useState, useEffect } from 'react';
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

const Portfolio: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'biology', name: 'Biology' },
    { id: 'chemistry', name: 'Chemistry' },
    { id: 'physics', name: 'Physics' }
  ];

  // Limit number of visible projects
  const maxProjects = 4;

  // Fetch portfolio data from API endpoint
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('/api/portfolio.json');
        if (response.ok) {
          const data = await response.json();
          setPortfolioItems(data.projects || []);
        } else {
          // Fallback data if API is not available
          setPortfolioItems(fallbackPortfolioData);
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setPortfolioItems(fallbackPortfolioData);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const fallbackPortfolioData: PortfolioItem[] = [
    {
      id: '1',
      title: 'GenomeViz Pro',
      category: 'biology',
      description: "Interactive genome browser for Stanford's genomics research team with real-time data visualization and collaborative annotation tools.",
      image: 'https://images.pexels.com/photos/3825417/pexels-photo-3825417.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      technologies: ['React', 'D3.js', 'WebGL', 'Node.js', 'MongoDB'],
      liveUrl: 'https://genomeviz-demo.sagittarius.ai',
      githubUrl: 'https://github.com/sagittarius/genomeviz',
      featured: true
    },
    {
      id: '2',
      title: 'ChemLab Analytics',
      category: 'chemistry',
      description: "Comprehensive chemical analysis platform for MIT's chemistry department with molecular modeling and reaction pathway visualization.",
      image: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      technologies: ['Vue.js', 'Three.js', 'RDKit', 'Python', 'PostgreSQL'],
      liveUrl: 'https://chemlab-demo.sagittarius.ai',
      featured: true
    },
    {
      id: '3',
      title: 'Quantum Simulator Hub',
      category: 'physics',
      description: 'Advanced quantum physics simulation platform for CERN with real-time particle interaction modeling and collaborative research tools.',
      image: 'https://images.pexels.com/photos/8674530/pexels-photo-8674530.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      technologies: ['Next.js', 'WebAssembly', 'TensorFlow.js', 'WebGL', 'Redis'],
      liveUrl: 'https://quantum-demo.sagittarius.ai',
      githubUrl: 'https://github.com/sagittarius/quantum-sim',
      featured: true
    },
    {
      id: '4',
      title: 'BioData Portal',
      category: 'biology',
      description: 'Centralized research data management system for Harvard Medical School with automated data processing and visualization.',
      image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      technologies: ['React', 'GraphQL', 'Python', 'ElasticSearch', 'Docker'],
      liveUrl: 'https://biodata-demo.sagittarius.ai',
      featured: false
    },
    {
      id: '5',
      title: 'Molecular Designer',
      category: 'chemistry',
      description: 'AI-powered molecular design tool for pharmaceutical research with predictive modeling and drug discovery capabilities.',
      image: 'https://images.pexels.com/photos/3825328/pexels-photo-3825328.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      technologies: ['Angular', 'TensorFlow.js', 'WebGL', 'Flask', 'MongoDB'],
      liveUrl: 'https://molecular-demo.sagittarius.ai',
      featured: false
    },
    {
      id: '6',
      title: 'Particle Tracker',
      category: 'physics',
      description: 'Real-time particle physics data analysis platform with advanced visualization and collaborative research features.',
      image: 'https://images.pexels.com/photos/8674476/pexels-photo-8674476.jpeg?auto=compress&cs=tinysrgb&w=800&h=600',
      technologies: ['React', 'D3.js', 'WebSockets', 'Go', 'InfluxDB'],
      liveUrl: 'https://particle-demo.sagittarius.ai',
      featured: false
    }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  // Limit items shown
  const displayedFiltered = filteredItems.slice(0, maxProjects);
  const featuredItems = portfolioItems.filter(item => item.featured);
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
    <div className="pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-b from-sage-bg to-sage-deep">
        <div className="container-custom text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sage-accent/10 text-sage-accent border border-sage-accent/20 mb-6">
            OUR PORTFOLIO
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Transforming Science Through
            <br />
            <span className="gradient-text">Intelligent Web Solutions</span>
          </h1>
          <p className="text-xl text-sage-text max-w-3xl mx-auto mb-8">
            Explore our collection of AI-powered websites and platforms that are revolutionizing 
            how researchers in biology, chemistry, and physics share their discoveries.
          </p>
        </div>
      </section>

      {/* Tech Stacks + Video Section (moved to top) */}
      <section className="section-padding">
        <div className="container-custom grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Tech stacks text */}
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-sage-text-light">Tech Stacks We Use</h2>
            <p className="text-sage-text text-lg leading-relaxed max-w-2xl">
              We build modern, scalable platforms using a combination of frontend, backend and machine learning
              technologies. Our core stacks include:
            </p>

            <ul className="grid grid-cols-2 gap-3 max-w-md">
              <li className="px-4 py-2 bg-sage-card rounded-lg">React</li>
              <li className="px-4 py-2 bg-sage-card rounded-lg">FastAPI</li>
              <li className="px-4 py-2 bg-sage-card rounded-lg">Django</li>
              <li className="px-4 py-2 bg-sage-card rounded-lg">Machine Learning (Python / TF / PyTorch)</li>
              <li className="px-4 py-2 bg-sage-card rounded-lg">Spring Boot</li>
              <li className="px-4 py-2 bg-sage-card rounded-lg">Docker / Kubernetes</li>
            </ul>

            <p className="text-sage-text">
              This is the stack we rely on to deliver production-ready research platforms — fast, secure, and maintainable.
            </p>
          </div>

          {/* Right: Autoplaying video */}
          <div className="aspect-video rounded-lg overflow-hidden bg-black shadow-lg">
            {/* Replace src with your hosted mp4/webm. muted & playsInline are required for autoplay on most browsers */}
           <video
  src="/Videos/video-main.mp4"
  autoPlay
  loop
  muted
  playsInline
  preload="auto"
  className="w-full h-full object-cover"
>
  Your browser does not support the video tag.
</video>

          </div>
        </div>
      </section>

      {/* About + Team Section (moved to top) */}
      <section className="section-padding bg-sage-deep">
        <div className="container-custom grid grid-cols-1 lg:grid-cols-3 gap-12 items-start py-24">
          {/* Left: About Us text (larger, spans 2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-4xl lg:text-6xl font-extrabold leading-tight text-sage-text-light">About Us</h2>
            <p className="text-lg lg:text-xl text-sage-text leading-relaxed max-w-4xl">
              We are a small, focused team of engineers and researchers who love building tools that make
              scientific workflows faster and more reproducible. We combine product-minded engineering with
              deep technical expertise in ML, backend systems, and interactive visualizations.
            </p>

            <p className="text-lg text-sage-text max-w-3xl">
              Our mission is to empower research teams to move from data to insight with as little friction as possible.
              We ship production-grade platforms using battle-tested technologies and maintain a strong focus on
              performance, security, and developer experience.
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

          {/* Right: Team members (bigger visuals) */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-sage-text-light text-center lg:text-left">The Team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
              <div className="flex items-center gap-4 bg-sage-card p-4 rounded-lg">
                <img src={'/mnt/data/65eb62dc-9800-40a3-9618-19da12014703.png'} alt="Anbu Malligarjun sri" className="w-40 h-40 rounded-full object-cover flex-shrink-0" />
                <div>
                  <div className="text-sage-text font-semibold text-lg">Anbu Malligarjun sri</div>
                  <div className="text-sage-accent">ML Engineer</div>
                  <p className="text-sage-text mt-2 text-sm">Expert in building end-to-end machine learning systems and data pipelines for research teams.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-sage-card p-4 rounded-lg">
                <img src={'/mnt/data/65eb62dc-9800-40a3-9618-19da12014703.png'} alt="Arun G" className="w-40 h-40 rounded-full object-cover flex-shrink-0" />
                <div>
                  <div className="text-sage-text font-semibold text-lg">Arun G</div>
                  <div className="text-sage-accent">Java Full Stack Developer</div>
                  <p className="text-sage-text mt-2 text-sm">Focused on scalable backend architecture using Spring Boot and enterprise integrations.</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-sage-card p-4 rounded-lg">
                <img src={'/mnt/data/65eb62dc-9800-40a3-9618-19da12014703.png'} alt="Brajin SJ" className="w-40 h-40 rounded-full object-cover flex-shrink-0" />
                <div>
                  <div className="text-sage-text font-semibold text-lg">Brajin SJ</div>
                  <div className="text-sage-accent">Python Full Stack Developer</div>
                  <p className="text-sage-text mt-2 text-sm">Builds reliable Python backends, APIs (FastAPI/Django) and data processing services.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {displayedFeatured.length > 0 && (
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16 text-sage-text-light">
              Featured Projects
            </h2>
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              {displayedFeatured.map((item) => (
                <div key={item.id} className="card group hover:scale-[1.02] transition-all duration-300">
                  <div className="aspect-video bg-sage-deep rounded-lg mb-6 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-sage-accent/10 text-sage-accent rounded-full text-sm font-medium">
                        {categories.find(cat => cat.id === item.category)?.name}
                      </span>
                      <div className="flex space-x-2">
                        <a
                          href={item.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-sage-deep hover:bg-sage-accent text-sage-text hover:text-sage-bg rounded-lg transition-all duration-200"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        {item.githubUrl && (
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-sage-deep hover:bg-sage-accent text-sage-text hover:text-sage-bg rounded-lg transition-all duration-200"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-sage-text-light">
                      {item.title}
                    </h3>
                    
                    <p className="text-sage-text leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-sage-deep text-sage-text rounded text-xs"
                        >
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
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-sage-text-light">
              All Projects
            </h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
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

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedFiltered.map((item) => (
              <div key={item.id} className="card group hover:scale-[1.02] transition-all duration-300">
                <div className="aspect-video bg-sage-bg rounded-lg mb-6 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-sage-accent/10 text-sage-accent rounded-full text-sm font-medium">
                      {categories.find(cat => cat.id === item.category)?.name}
                    </span>
                    <div className="flex space-x-2">
                      <a
                        href={item.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-sage-bg hover:bg-sage-accent text-sage-text hover:text-sage-bg rounded-lg transition-all duration-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      {item.githubUrl && (
                        <a
                          href={item.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-sage-bg hover:bg-sage-accent text-sage-text hover:text-sage-bg rounded-lg transition-all duration-200"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-sage-text-light">
                    {item.title}
                  </h3>
                  
                  <p className="text-sage-text leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-sage-bg text-sage-text rounded text-xs"
                      >
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
              <p className="text-sage-text text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="card text-center max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-sage-text-light">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-sage-text mb-8 max-w-2xl mx-auto">
              [REPLACE WITH COMPANY_TEXT] Let's create an AI-powered website 
              that showcases your research and helps you connect with the scientific community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Start Your Project
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button className="btn-secondary">
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
