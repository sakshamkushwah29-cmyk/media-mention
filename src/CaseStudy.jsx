import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import caseStudiesData from './case_studies.json';
import mediamansionLogo from './assets/mediamansion_header_logo.png';

export default function CaseStudy() {
  const { id } = useParams();
  const caseStudy = caseStudiesData[id];

  // Scroll to top on page load/change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!caseStudy) {
    return (
      <div style={{ padding: '100px 24px', textAlign: 'center', fontFamily: 'sans-serif' }}>
        <h2>Case Study Not Found</h2>
        <Link to="/" style={{ color: '#9762fd', textDecoration: 'underline' }}>Go back home</Link>
      </div>
    );
  }

  // Dynamic class mapping for background colors of different pages to keep brand parity
  const getThemeClass = (id) => {
    switch(id) {
      case 'royal-empire': return 'green'; // Royal Empire theme
      case 'shabana-bakery': return 'peach'; // Shabana theme
      case 'diet': return 'blue'; // Diet theme
      case 'double-decker': return 'yellow'; // Double Decker Diner theme
      case 'ohno': return 'pink'; // OhNo theme
      case 'jagsons': return 'purple'; // Jagsons theme
      default: return '';
    }
  };

  return (
    <div className="case-study-page body">
      {/* Navbar */}
      <section className="navbar">
        <div className="navlink-holder hide">
          <Link to="/" className="navlink-holder hide w-inline-block">
            <div className="nav-link first">GO to home</div>
          </Link>
        </div>
        <div className="walsh-nav-logo">
          <Link to="/" className="logolink w-inline-block">
            <img 
              src={mediamansionLogo} 
              loading="lazy" 
              alt="Media Mansion Logo" 
              className="nav-logo" 
              style={{ height: '36px', width: 'auto', objectFit: 'contain' }}
            />
          </Link>
        </div>
        <div className="navlink-holder hide">
          <a href="#" className="navlink-holder hide w-inline-block">
            <div className="nav-link first zero">GO to home</div>
          </a>
        </div>
      </section>

      {/* Case Study Header Section */}
      <section className="ourworkspage-herosection first">
        <div className="div-container color">
          <div className="div-block-3">
            <div className="headholder">
              <h1 className="text-span-3">{caseStudy.title}</h1>
              {caseStudy.badgeImage && (
                <img 
                  src={caseStudy.badgeImage} 
                  loading="lazy" 
                  alt={caseStudy.title} 
                  className="image-11" 
                />
              )}
            </div>
          </div>
        </div>

        <div className={`div-container color ${getThemeClass(id)}`}>
          <div className="div-block-3">
            <h1 className="waves---mega-heading-1">{caseStudy.subtitle}</h1>
          </div>
          <div className="waves-bottom-hero-3">
            <div className="tags-holder">
              {caseStudy.tags.map((tag, idx) => (
                <div key={idx} className="box">{tag}</div>
              ))}
            </div>
            <div className="waves---subtitle" style={{ whiteSpace: 'pre-line' }}>
              {caseStudy.description}
            </div>
            <div className="waves-bottom-right-hero-3"></div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <div className="gallery-section">
        {caseStudy.images.map((src, idx) => {
          // Keep structure alternating or regular grids matching original
          const isEven = idx % 2 === 0;
          return (
            <div key={idx} className={`waves---section-medium ${isEven ? '_1' : ''}`}>
              <div className="waves---main-container w-container">
                <div className="waves-master-gallery-1">
                  <div className="w-layout-grid grid">
                    <div className="waves-column-gallery-1">
                      <a href="#" className="w-inline-block w-lightbox" onClick={(e) => e.preventDefault()}>
                        <img 
                          src={src} 
                          loading="lazy" 
                          alt={`${caseStudy.title} Gallery ${idx + 1}`} 
                          className="waves-image-gallery-1" 
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Re-engagement CTA */}
      <div className="waves---section-medium someee boxhold">
        <div className="box-holder below-membership ourworkspages">
          <p className="text-3 below-memebrship">
            <strong>We can hatch it for you too</strong>
          </p>
          <a href="https://calendly.com/workmediamansion/30min" target="_blank" rel="noopener noreferrer" className="button big in-membership w-inline-block">
            <div className="button-inner p3_small herowhite redbg memebership">BOOK A CALL</div>
            <div className="button-bg disabled"></div>
          </a>
        </div>
      </div>

      {/* Footer */}
      <section className="footer">
        <div className="walsh-nav-logo infooter">
          <img 
            src={mediamansionLogo} 
            loading="lazy" 
            alt="Media Mansion Logo" 
            className="nav-logo" 
            style={{ height: '40px', width: 'auto', objectFit: 'contain' }}
          />
        </div>
        <div className="footer-content-holder">
          <Link to="/" className="navlink-holder w-inline-block">
            <div className="nav-link">PRIVACY POLICY</div>
          </Link>
          <Link to="/" className="navlink-holder w-inline-block">
            <div className="nav-link">TERMS OF SERVICE</div>
          </Link>
          <Link to="/" className="navlink-holder w-inline-block">
            <div className="nav-link">CONTACT US</div>
          </Link>
          <div className="copyright-statement">
            © 2025 . All rights reserved
          </div>
        </div>
      </section>
    </div>
  );
}
