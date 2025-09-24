import React from 'react';
import { ArrowRight, Mail, Phone, MapPin, Linkedin, Twitter, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Solutions',
      links: [
        { name: 'Biology AI Websites', href: '/services/biology' },
        { name: 'Chemistry AI Websites', href: '/services/chemistry' },
        { name: 'Physics AI Websites', href: '/services/physics' },
        { name: 'Data Visualization', href: '/services/visualization' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Case Studies', href: '/portfolio' },
        { name: 'Blog', href: '/blog' },
        { name: 'Documentation', href: '/docs' },
        { name: 'API Reference', href: '/api' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
        { name: 'Partners', href: '/partners' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Security', href: '/security' },
        { name: 'Compliance', href: '/compliance' },
      ]
    }
  ];

  return (
    <footer className="bg-sage-deep border-t border-sage-border">
      {/* Newsletter Section */}
      <div className="container-custom py-12">
        <div className="bg-gradient-to-r from-sage-card to-sage-bg border border-sage-border rounded-2xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-sage-text-light mb-4">
                Stay updated with AI advances in science
              </h3>
              <p className="text-sage-text">
                Get the latest insights, case studies, and product updates delivered to your inbox.
              </p>
            </div>
            
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-sage-bg border border-sage-border rounded-lg text-sage-text placeholder-sage-text/60 focus:outline-none focus:ring-2 focus:ring-sage-accent focus:border-transparent"
                />
                <button
                  type="submit"
                  className="btn-primary whitespace-nowrap"
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-sage-accent to-blue-400 rounded-lg flex items-center justify-center">
                <span className="text-sage-bg font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-sage-text-light">
                Sagittarius
              </span>
            </div>
            
            <p className="text-sage-text mb-6 leading-relaxed">
              [REPLACE WITH COMPANY_TEXT] Building the future of scientific research 
              through AI-powered websites that help researchers in biology, chemistry, 
              and physics share their discoveries more effectively.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-sage-text">
                <Mail className="w-4 h-4" />
                <span>[REPLACE WITH COMPANY_TEXT] info@sagittarius.ai</span>
              </div>
              <div className="flex items-center space-x-3 text-sage-text">
                <Phone className="w-4 h-4" />
                <span>[REPLACE WITH COMPANY_TEXT] +1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sage-text">
                <MapPin className="w-4 h-4" />
                <span>[REPLACE WITH COMPANY_TEXT] San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-sage-card border border-sage-border rounded-lg flex items-center justify-center text-sage-text hover:text-sage-accent hover:border-sage-accent transition-all duration-200">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-sage-card border border-sage-border rounded-lg flex items-center justify-center text-sage-text hover:text-sage-accent hover:border-sage-accent transition-all duration-200">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-sage-card border border-sage-border rounded-lg flex items-center justify-center text-sage-text hover:text-sage-accent hover:border-sage-accent transition-all duration-200">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sage-text-light font-semibold mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sage-text hover:text-sage-accent transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sage-border">
        <div className="container-custom py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-sage-text text-sm">
              © {currentYear} Sagittarius. All rights reserved. 
              <span className="ml-2">[REPLACE WITH COMPANY_TEXT]</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-sage-text">
              <Link to="/privacy" className="hover:text-sage-accent transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-sage-accent transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/sitemap" className="hover:text-sage-accent transition-colors duration-200">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;