import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Tag, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      id: '1',
      title: 'How to Optimize Sensitive Data Discovery in telemetry and pipelines',
      excerpt:
        'Sensitive data discovery at the pipeline level reinforces security and compliance, preventing leaks of clear-text PII and credentials that make...',
      content: '[REPLACE WITH COMPANY_TEXT] Full blog post content would go here...',
      author: 'Abishek Ganesan',
      date: '2025-09-23',
      readTime: '5 min read',
      category: 'Telemetry & Pipelines',
      tags: ['Security', 'Telemetry'],
      image:
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
      featured: true
    },
    {
      id: '2',
      title: 'How Does Automated Data Parsing Benefit Your Business?',
      excerpt:
        'Automated parsers reduce manual effort and increase accuracy when classifying and routing telemetry data for downstream analytics and security.',
      content: '...',
      author: 'Analytics Team',
      date: '2025-08-19',
      readTime: '5 min read',
      category: 'Security Data Pipeline Platforms',
      tags: ['Parsing', 'Automation'],
      image:
        'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
      featured: false
    },
    {
      id: '3',
      title: 'Black Hat 2025 Recap: Telemetry, AI, and Databahn’s Smart Agents Launch',
      excerpt:
        'A recap of Black Hat 2025 announcements and how AI is changing security telemetry.',
      content: '...',
      author: 'Security Desk',
      date: '2025-08-12',
      readTime: '5 min read',
      category: 'Security',
      tags: ['Recap', 'Conference'],
      image:
        'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
      featured: false
    },
    {
      id: '4',
      title: 'AI-powered breaches: AI is turning Telemetry into an attack surface',
      excerpt:
        'The recent Salesforce breach and research show AI-powered attacks on telemetry have started—learn mitigation strategies.',
      content: '...',
      author: 'Research Team',
      date: '2025-09-19',
      readTime: '6 min read',
      category: 'Security',
      tags: ['AI', 'Breaches'],
      image:
        'https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
      featured: false
    },
    {
      id: '5',
      title: 'The Case for Flexible Data Routing in Modern Data Management',
      excerpt:
        'Modern routing and observability tools help keep pipelines efficient while supporting multiple destinations.',
      content: '...',
      author: 'Platform Team',
      date: '2025-09-17',
      readTime: '8 min read',
      category: 'Data Management',
      tags: ['Routing', 'Observability'],
      image:
        'https://images.pexels.com/photos/373888/pexels-photo-373888.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
      featured: false
    },
    {
      id: '6',
      title: 'SIEM Evaluation Checklist for Modern Enterprises',
      excerpt:
        'A practical checklist to evaluate SIEM vendors and features that matter for modern telemetry-driven security.',
      content: '...',
      author: 'Security Architect',
      date: '2025-09-11',
      readTime: '6 min read',
      category: 'SIEM',
      tags: ['SIEM', 'Checklist'],
      image:
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
      featured: false
    },
    {
      id: '7',
      title: 'Modernizing Legacy Data Infrastructure for the AI Era',
      excerpt:
        'How to move away from dashboards to real-time AI-ready infrastructure for better governance and control.',
      content: '...',
      author: 'Data Eng Team',
      date: '2025-09-02',
      readTime: '10 min read',
      category: 'Infrastructure',
      tags: ['Modernization', 'AI'],
      image:
        'https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
      featured: false
    },
    {
      id: '8',
      title: 'How Modern Data Pipeline Tools Slash SIEM Costs and Storage Bills',
      excerpt:
        'Practical strategies and tools to reduce the cost of SIEM operations while retaining valuable telemetry.',
      content: '...',
      author: 'Cost Ops',
      date: '2025-09-01',
      readTime: '9 min read',
      category: 'Cost Optimization',
      tags: ['Costs', 'Pipelines'],
      image:
        'https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
      featured: false
    },
    {
      id: '9',
      title: 'The GenAI Enterprise Transformation',
      excerpt:
        'AI adoption is stalling for many organizations—learn the steps to make GenAI practical for enterprise telemetry.',
      content: '...',
      author: 'AI Practice',
      date: '2025-08-25',
      readTime: '6 min read',
      category: 'AI',
      tags: ['GenAI', 'Transformation'],
      image:
        'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
      featured: false
    },
    {
      id: '10',
      title: 'Hybrid Data Pipeline Security: Best Practices for Telemetry in 2025',
      excerpt:
        'How enterprises can secure telemetry across cloud, on-prem, and IoT systems while cutting SIEM costs.',
      content: '...',
      author: 'Security Measures',
      date: '2025-08-20',
      readTime: '8 min read',
      category: 'Security',
      tags: ['Hybrid', 'IoT'],
      image:
        'https://images.pexels.com/photos/5473952/pexels-photo-5473952.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
      featured: false
    },
    {
      id: '11',
      title: 'Hybrid Data Pipelines: Best practices for security in 2025',
      excerpt: 'Best practices to design secure hybrid pipelines that balance latency, cost, and observability.',
      content: '...',
      author: 'Network Team',
      date: '2025-08-18',
      readTime: '7 min read',
      category: 'Pipelines',
      tags: ['Hybrid', 'Security'],
      image:
        'https://images.pexels.com/photos/3861953/pexels-photo-3861953.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
      featured: false
    },
    {
      id: '12',
      title: 'Collaborative Research Platforms: The New Standard',
      excerpt:
        'Why collaborative web platforms are becoming essential for modern scientific research and how they improve research outcomes.',
      content: '...',
      author: 'Dr. Rachel Kim',
      date: '2025-01-15',
      readTime: '5 min read',
      category: 'Research Collaboration',
      tags: ['Collaboration', 'Platforms'],
      image:
        'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900',
      featured: false
    }
  ];

  const categories = [
    'All',
    'SIEM Cost Reduction',
    'Security Data Pipeline Platforms',
    'Data Lifecycle',
    'Telemetry',
    'Research'
  ];

  const featuredPosts = blogPosts.filter((p) => p.featured);
  const mainFeatured = featuredPosts.length ? featuredPosts[0] : blogPosts[0];
  const popularPosts = blogPosts.filter((p) => p.id !== mainFeatured.id).slice(0, 3);
  const recentPosts = blogPosts.filter((p) => p.id !== mainFeatured.id);

  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');

  const filtered = recentPosts.filter((p) => {
    if (activeCategory !== 'All' && !p.category.includes(activeCategory)) return false;
    if (query && !p.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="pt-16 lg:pt-20">
      {/* HERO */}
      <section className="section-padding bg-transparent">
        <div className="container-custom">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sage-accent/10 text-sage-accent border border-sage-accent/20 mb-6">
            SAGITTARIUS BLOG
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Insights & Updates from
            <br />
            <span className="gradient-text">Scientific Web Development</span>
          </h1>

          <p className="text-lg text-sage-text max-w-3xl mb-8">
            Stay up to date with the latest trends, best practices, and innovations in AI-powered websites for scientific research.
          </p>
        </div>
      </section>

      {/* Featured + Popular */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left: Large Featured */}
            <div className="rounded-lg border border-sage-border overflow-hidden bg-white/2 shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={mainFeatured.image}
                    alt={mainFeatured.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-sage-accent/10 text-sage-accent rounded-full text-sm font-medium">
                      {mainFeatured.category}
                    </span>

                    <div className="text-sm text-sage-text">
                      <div className="text-xs text-sage-text/70">{mainFeatured.readTime}</div>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold mt-4 mb-2 text-sage-text-light">
                    <Link to={`/blog/${mainFeatured.id}`}>{mainFeatured.title}</Link>
                  </h2>

                  <p className="text-sage-text leading-relaxed mb-4">{mainFeatured.excerpt}</p>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-sage-border">
                    <div className="text-sm text-sage-text">{formatDate(mainFeatured.date)}</div>
                    <Link to={`/blog/${mainFeatured.id}`} className="inline-flex items-center text-sage-accent font-medium">
                      Read article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Popular Posts list */}
            <aside>
              <h3 className="text-xl font-semibold mb-6">Popular Posts</h3>
              <div className="space-y-4">
                {popularPosts.map((p) => (
                  <div key={p.id} className="flex items-start gap-4 p-4 rounded-lg border border-sage-border bg-white/3">
                    <div className="w-20 h-14 flex-shrink-0 rounded-md overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs px-2 py-1 bg-sage-bg rounded-full text-sage-text">{p.category}</span>
                        <span className="text-xs text-sage-text/60">{p.readTime}</span>
                      </div>
                      <h4 className="font-semibold text-sage-text-light text-sm mb-1">
                        <Link to={`/blog/${p.id}`}>{p.title}</Link>
                      </h4>
                      <div className="text-xs text-sage-text/60">{formatDate(p.date)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Filters + Search row */}
      <section className="section-padding pt-6 pb-2">
        <div className="container-custom flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  activeCategory === c
                    ? 'bg-sage-accent/100 text-white shadow-sm'
                    : 'bg-sage-card text-sage-text'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full lg:w-72">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Articles"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-sage-border bg-sage-bg text-sage-text"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-text/60" />
            </div>
            <div className="ml-auto lg:ml-0">
              <button className="px-4 py-2 rounded-lg bg-sage-accent text-white">Filter</button>
            </div>
          </div>
        </div>
      </section>

      {/* Grid of posts */}
      <section className="section-padding pb-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <article key={post.id} className="card rounded-lg border border-sage-border overflow-hidden bg-white/3 hover:shadow-lg transition">
                <div className="aspect-video overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-sage-accent/10 text-sage-accent rounded-full text-xs font-medium">{post.category}</span>
                    <div className="text-xs text-sage-text/60 flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-sage-text-light">
                    <Link to={`/blog/${post.id}`}>{post.title}</Link>
                  </h4>

                  <p className="text-sm text-sage-text leading-relaxed">{post.excerpt}</p>

                  <div className="flex items-center justify-between pt-3 border-t border-sage-border">
                    <div className="text-xs text-sage-text">{post.author}</div>
                    <Link to={`/blog/${post.id}`} className="text-sage-accent text-sm inline-flex items-center">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load more */}
          <div className="text-center mt-12">
            <button className="px-6 py-3 rounded-lg border border-sage-border bg-transparent text-sage-text">Load More Articles</button>
          </div>
        </div>
      </section>

      {/* Subscribe Banner */}
      <section className="py-16">
        <div className="container-custom">
          <div className="rounded-xl overflow-hidden bg-gradient-to-r from-[#081022] via-[#061327] to-[#041826] text-white shadow-lg p-12">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-2">Subscribe to DataBahn blog!</h3>
                <p className="text-sage-text/80 mb-6 max-w-xl">
                  Get expert updates on AI-powered data management, security, and automation — straight to your inbox.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-slate-900"
                />
                <button className="px-5 py-3 rounded-lg bg-sage-accent text-white inline-flex items-center gap-2">
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two large tiles like image */}
      <section className="section-padding pb-20">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-lg overflow-hidden border border-sage-border">
              <div className="aspect-[3/1] relative overflow-hidden">
                <img src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900" alt="tile-1" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 flex items-end p-6">
                  <h4 className="text-2xl font-bold text-white">The GenAI Enterprise Transformation</h4>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-sage-border">
              <div className="aspect-[3/1] relative overflow-hidden">
                <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900" alt="tile-2" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 flex items-end p-6">
                  <h4 className="text-2xl font-bold text-white">Hybrid Data Pipelines</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* small footer post strip (two columns) */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="rounded-lg border border-sage-border p-4 flex items-center gap-4">
              <div className="w-28 h-16 rounded-md overflow-hidden">
                <img src="https://images.pexels.com/photos/207983/pexels-photo-207983.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900" alt="f1" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-xs text-sage-text/60">6 min read</div>
                <h5 className="font-semibold text-sage-text-light">The GenAI Enterprise Transformation</h5>
              </div>
            </div>

            <div className="rounded-lg border border-sage-border p-4 flex items-center gap-4">
              <div className="w-28 h-16 rounded-md overflow-hidden">
                <img src="https://images.pexels.com/photos/5473952/pexels-photo-5473952.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900" alt="f2" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-xs text-sage-text/60">8 min read</div>
                <h5 className="font-semibold text-sage-text-light">Hybrid Data Pipeline Security</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
