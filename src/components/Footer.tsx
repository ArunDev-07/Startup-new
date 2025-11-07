// File: src/components/Footer.tsx
import React, { useState } from 'react';
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [openSection, setOpenSection] = useState<string | null>(null);

  const footerSections = [
    {
      id: 'solutions',
      title: 'Solutions',
      links: [
        { name: 'Biology AI Websites', href: '/services/biology' },
        { name: 'Chemistry AI Websites', href: '/services/chemistry' },
        { name: 'Physics AI Websites', href: '/services/physics' },
        { name: 'Data Visualization', href: '/services/visualization' },
      ]
    },
    {
      id: 'resources',
      title: 'Resources',
      links: [
        { name: 'Case Studies', href: '/portfolio' },
        { name: 'Blog', href: '/blog' },
        { name: 'Documentation', href: '/docs' },
        { name: 'API Reference', href: '/api' },
      ]
    },
    {
      id: 'company',
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
        { name: 'Partners', href: '/partners' },
      ]
    },
    {
      id: 'legal',
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Security', href: '/security' },
        { name: 'Compliance', href: '/compliance' },
      ]
    }
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // demo: replace with your actual subscribe API
    console.log('subscribe:', email);
    setEmail('');
    // simple success feedback could be added
  };

  return (
    <footer className="bg-sage-deep border-t border-sage-border">
      {/* Newsletter */}
      <div className="container-custom py-8 sm:py-12">
        <div className="bg-gradient-to-r from-sage-card to-sage-bg border border-sage-border rounded-2xl p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-sage-text-light mb-2">Stay updated with AI advances in science</h3>
              <p className="text-sage-text text-sm sm:text-base">Get insights, case studies, and updates delivered to your inbox.</p>
            </div>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full sm:flex-1 px-4 py-3 bg-sage-bg border border-sage-border rounded-lg text-sage-text placeholder-sage-text/60 focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent"
                aria-label="Enter your email"
              />
              <button type="submit" className="btn-primary inline-flex items-center justify-center whitespace-nowrap" aria-label="Subscribe to newsletter">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-custom py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-sage-accent to-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-sage-bg font-bold text-lg">S</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-sage-text-light">Sagittarius</span>
            </div>

            <p className="text-sage-text text-sm sm:text-base mb-4 leading-relaxed">Building the future of scientific research through AI-powered websites that help researchers share discoveries more effectively.</p>

            <div className="space-y-2 mb-4 text-sage-text text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@sagittarius.ai" className="hover:text-sage-accent transition-colors">info@sagittarius.ai</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" />
                <a href="tel:+15551234567" className="hover:text-sage-accent transition-colors">+1 (555) 123-4567</a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 bg-sage-card border border-sage-border rounded-lg flex items-center justify-center text-sage-text hover:text-sage-accent hover:border-sage-accent transition-all duration-200">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 bg-sage-card border border-sage-border rounded-lg flex items-center justify-center text-sage-text hover:text-sage-accent hover:border-sage-accent transition-all duration-200">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="GitHub" className="w-10 h-10 bg-sage-card border border-sage-border rounded-lg flex items-center justify-center text-sage-text hover:text-sage-accent hover:border-sage-accent transition-all duration-200">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Footer link sections */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {footerSections.map((section) => (
              <div key={section.id} className="text-sage-text">
                {/* JS-controlled accordion for small screens for consistent styling */}
                <div className="md:hidden">
                  <button
                    onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                    aria-expanded={openSection === section.id}
                    aria-controls={`sect-${section.id}`}
                    className="w-full text-left flex items-center justify-between py-2 font-semibold"
                  >
                    <span>{section.title}</span>
                    <span className="text-sage-text/70">{openSection === section.id ? '-' : '+'}</span>
                  </button>

                  <div id={`sect-${section.id}`} className={`mt-2 overflow-hidden transition-[max-height,opacity] duration-300 ${openSection === section.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <ul className="space-y-2 pl-2 pb-3">
                      {section.links.map((link) => (
                        <li key={link.name}>
                          <Link to={link.href} className="text-sage-text hover:text-sage-accent transition-colors duration-200">{link.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Desktop layout */}
                <div className="hidden md:block">
                  <h4 className="text-sage-text-light font-semibold mb-3">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link to={link.href} className="text-sage-text hover:text-sage-accent transition-colors duration-200">{link.name}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-sage-border">
        <div className="container-custom py-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-3">
            <div className="text-sage-text text-sm text-center lg:text-left">© {currentYear} Sagittarius. All rights reserved.<span className="ml-2 hidden sm:inline">Building better scientific websites.</span></div>

            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 text-sm">
              <Link to="/privacy" className="hover:text-sage-accent transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-sage-accent transition-colors">Terms of Service</Link>
              <Link to="/sitemap" className="hover:text-sage-accent transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;