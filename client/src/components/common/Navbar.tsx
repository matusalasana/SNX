// Navbar.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navItems: NavItem[] = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'About', path: '/about', icon: '👤' },
    { label: 'Projects', path: '/projects', icon: '💻' },
    { label: 'Blog', path: '/blog', icon: '📝' },
    { label: 'Contact', path: '/contact', icon: '✉️' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(31, 31, 39, 0.95)' : 'rgba(31, 31, 39, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${isScrolled ? '#464554' : 'rgba(70, 69, 84, 0.3)'}`,
        transition: 'all 0.3s ease'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#c0c1ff',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{ fontSize: '28px' }}>⚡</span>
            <span>SNX</span>
          </Link>

          {/* Desktop Navigation */}
          <div style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center'
          }}>
            <div style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'center'
            }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    color: isActive(item.path) ? '#c0c1ff' : '#c7c4d7',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: isActive(item.path) ? '600' : '400',
                    padding: '8px 4px',
                    borderBottom: isActive(item.path) ? '2px solid #c0c1ff' : '2px solid transparent',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.color = '#c0c1ff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.path)) {
                      e.currentTarget.style.color = '#c7c4d7';
                    }
                  }}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Hire Me Button */}
            <button style={{
              backgroundColor: '#c0c1ff',
              color: '#1000a9',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
              Hire Me
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#e4e1ed',
              cursor: 'pointer',
              fontSize: '24px',
              padding: '8px'
            }}
            className="mobile-menu-btn"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(19, 19, 27, 0.95)',
        zIndex: 999,
        transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        backdropFilter: 'blur(8px)'
      }}>
        <div style={{
          padding: '80px 24px 24px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: isActive(item.path) ? '#c0c1ff' : '#e4e1ed',
                textDecoration: 'none',
                fontSize: '18px',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: isActive(item.path) ? 'rgba(192, 193, 255, 0.1)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = 'rgba(192, 193, 255, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.path)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '24px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          
          <hr style={{ margin: '8px 0', borderColor: '#464554' }} />
          
          <button style={{
            backgroundColor: '#c0c1ff',
            color: '#1000a9',
            border: 'none',
            padding: '14px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            marginTop: '8px'
          }}>
            Hire Me
          </button>
        </div>
      </div>

      {/* Mobile Menu Styles */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex !important;
          }
          nav > div > div:first-of-type {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;