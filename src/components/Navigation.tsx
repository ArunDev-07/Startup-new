// File: Navigation.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

type NavItem = {
  name: string;
  path: string;
  dropdown?: { name: string; path: string }[];
};

const NAV_ITEMS: NavItem[] = [
  { name: 'Home', path: '/' },
  {
    name: 'Services',
    path: '/services',
    dropdown: [
      { name: 'Biology AI', path: '/services/biology' },
      { name: 'Chemistry AI', path: '/services/chemistry' },
      { name: 'Physics AI', path: '/services/physics' }
    ]
  },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' }
];

const Navigation: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // track which mobile submenu is expanded
  const [expandedMobile, setExpandedMobile] = useState<Record<string, boolean>>({});
  // track which desktop dropdown is open (for keyboard/focus)
  const [openDesktop, setOpenDesktop] = useState<string | null>(null);

  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  // close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setExpandedMobile({});
    setOpenDesktop(null);
  }, [location.pathname]);

  // manage scroll state for sticky background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // keyboard: close menus on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setOpenDesktop(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const isActivePath = (path: string) => {
    // active if path is exact or current route starts with path (for sections)
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  function toggleMobileSubmenu(key: string) {
    setExpandedMobile((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <nav
      ref={navRef}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-sage-bg/95 backdrop-blur-md border-b border-sage-border' : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20 px-2 sm:px-0">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r from-sage-accent to-blue-400">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="hidden sm:inline-block text-lg font-bold text-sage-text-light">Sagittarix</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-2" role="menubar" aria-label="Primary">
              {NAV_ITEMS.map((item) => {
                const hasDropdown = !!item.dropdown?.length;
                const active = isActivePath(item.path);

                return (
                  <li
                    key={item.name}
                    className="relative"
                    role="none"
                    onMouseEnter={() => hasDropdown && setOpenDesktop(item.name)}
                    onMouseLeave={() => hasDropdown && setOpenDesktop(null)}
                  >
                    {/* Link + dropdown toggle */}
                    <div className="flex items-center gap-2">
                      <Link
                        to={item.path}
                        role="menuitem"
                        tabIndex={0}
                        onFocus={() => hasDropdown && setOpenDesktop(item.name)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-sage-accent/30 ${
                          active ? 'text-sage-accent' : 'text-sage-text hover:text-sage-text-light'
                        }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>

                      {hasDropdown && (
                        <button
                          aria-haspopup="true"
                          aria-expanded={openDesktop === item.name}
                          onClick={() => setOpenDesktop((prev) => (prev === item.name ? null : item.name))}
                          className="p-1 rounded-md hover:bg-sage-bg focus:outline-none focus:ring-2 focus:ring-sage-accent/30"
                          aria-label={`${item.name} submenu`}
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${openDesktop === item.name ? 'rotate-180' : 'rotate-0'}`} />
                        </button>
                      )}
                    </div>

                    {/* Dropdown (desktop) - centered under the nav item */}
                    {hasDropdown && (
                      <div
                        role="menu"
                        aria-label={`${item.name} links`}
                        className={`absolute top-full left-1/2 mt-2 w-48 -translate-x-1/2 rounded-lg border border-sage-border bg-sage-card shadow-lg transform transition-all duration-200 origin-top ${
                          openDesktop === item.name ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                        }`}
                        style={{ zIndex: 60 }}
                      >
                        <div className="py-2">
                          {item.dropdown!.map((d) => (
                            <Link
                              key={d.name}
                              to={d.path}
                              role="menuitem"
                              onFocus={() => setOpenDesktop(item.name)}
                              className={`block px-4 py-2 text-sm text-sage-text hover:bg-sage-bg hover:text-sage-accent transition-colors duration-150 ${
                                isActivePath(d.path) ? 'text-sage-accent font-medium' : ''
                              }`}
                            >
                              {d.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <Link to="/contact" className="ml-4 btn-primary">
              Get Started
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-2">
            <Link to="/contact" className="hidden sm:inline-block px-3 py-2 rounded-md text-sm font-medium bg-sage-accent text-white hover:opacity-95">Get Started</Link>

            <button
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((s) => !s)}
              className="p-2 rounded-md hover:bg-sage-bg focus:outline-none focus:ring-2 focus:ring-sage-accent/30"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          } overflow-hidden`}
        >
          <div className="px-4 pb-6 pt-2 border-t border-sage-border bg-sage-bg/95 backdrop-blur-md">
            <nav aria-label="Mobile" role="menu">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => {
                  const hasDropdown = !!item.dropdown?.length;
                  const expanded = !!expandedMobile[item.name];
                  return (
                    <li key={item.name} className="border-b last:border-b-0 border-sage-border/40">
                      <div className="flex items-center justify-between">
                        <Link
                          to={item.path}
                          onClick={() => setMobileOpen(false)}
                          role="menuitem"
                          className={`block w-full text-left px-3 py-4 text-base font-medium ${isActivePath(item.path) ? 'text-sage-accent' : 'text-sage-text'}`}
                        >
                          {item.name}
                        </Link>

                        {hasDropdown && (
                          <button
                            aria-expanded={expanded}
                            aria-controls={`mobile-sub-${item.name}`}
                            onClick={() => toggleMobileSubmenu(item.name)}
                            className="p-3 focus:outline-none"
                          >
                            <ChevronDown className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>

                      {hasDropdown && (
                        <div
                          id={`mobile-sub-${item.name}`}
                          className={`px-4 overflow-hidden transition-[max-height,opacity] duration-200 ${expanded ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <ul className="pl-2">
                            {item.dropdown!.map((d) => (
                              <li key={d.path}>
                                <Link
                                  to={d.path}
                                  onClick={() => setMobileOpen(false)}
                                  role="menuitem"
                                  className={`block px-3 py-3 text-sm ${isActivePath(d.path) ? 'text-sage-accent font-medium' : 'text-sage-text hover:text-sage-accent'}`}
                                >
                                  {d.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Mobile CTA at bottom */}
              <div className="mt-4 px-3">
                <Link to="/contact" onClick={() => setMobileOpen(false)} className="block w-full text-center btn-primary py-3">
                  Get Started
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;