'use client';

import { useEffect } from 'react';

const phoneIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/></svg>';

const shieldCheckSvg = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>';

const mapPinSvg = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>';

/* Roofing-specific Heroicons v2 SVGs */
const serviceIcons = [
  /* Roof / Home Modern - Roof Repair */
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M15.75 21H8.25m6.75-18.545a24.507 24.507 0 0 0-6.313 0C6.96 3.755 6 5.622 6 7.63V21m12.75-18.455C18.96 2.755 20.01 4.622 20.01 6.63L20.25 21M3.75 21h16.5"/></svg>',
  /* Bolt / Lightning - Storm Damage */
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"/></svg>',
  /* Wrench / Screwdriver - Installation */
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.049.58.025 1.193-.14 1.743"/></svg>',
  /* Home - Residential */
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>',
  /* Eye / Magnifying Glass - Inspections */
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>',
  /* Shield Check - Warranty */
  '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>',
];

const services = [
  { title: 'Roof Replacement', desc: 'From aging shingle roofs in Hillbrook Forest to storm-battered homes near Duncan Park, we deliver full roof replacements built to handle Spartanburg\'s hot summers and unpredictable storms.', icon: serviceIcons[0] },
  { title: 'Storm Damage Repair', desc: 'Spartanburg sees its share of severe weather. Arnold\'s Roofing responds fast with expert storm damage assessment and repairs that restore your roof\'s integrity before the next front rolls through.', icon: serviceIcons[1] },
  { title: 'Roof Inspections', desc: 'Buying a home in Westside or selling in Converse Heights? Our thorough roof inspections give you a clear, honest picture of what\'s up there so you can negotiate with confidence.', icon: serviceIcons[2] },
  { title: 'Leak Detection & Repair', desc: 'A small leak today becomes a big problem tomorrow. We track down the source fast and fix it right the first time, protecting your home from costly water damage.', icon: serviceIcons[3] },
  { title: 'Gutter Installation', desc: 'Spartanburg\'s clay-heavy soil and heavy spring rains make proper drainage essential. We install seamless gutters that channel water away from your foundation and protect your landscaping.', icon: serviceIcons[4] },
  { title: 'Commercial Roofing', desc: 'From storefronts on East Main to warehouses along the I-85 corridor, Arnold\'s Roofing delivers reliable commercial roofing solutions that minimize downtime for your business.', icon: serviceIcons[5] },
];

const trustItems = [
  'Serving Spartanburg Families for Over 15 Years',
  'Licensed, Bonded & Fully Insured in South Carolina',
  'Hundreds of 5-Star Reviews from Upstate SC Homeowners',
  'Free Estimates with Same-Week Scheduling',
];

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ===== NAV ===== */}
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <span className="nav-logo">{'Arnold\'s Roofing LLC'}</span>
          <a
            href="#contact"
            className="nav-phone-btn"
            aria-label="Call Arnold\'s Roofing LLC at Call Us"
          >
            <span
              className="nav-phone-icon"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: phoneIconSvg }}
            />
            <span className="nav-phone-text">{'Call Us'}</span>
          </a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero" aria-label="Hero">
        <div className="hero-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1400&q=80"
            alt=""
            loading="eager"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="hero-content">
          <div className="hero-glass-card">
            <span className="hero-badge">Licensed &amp; Insured Roofing Pros</span>
            <h1 className="hero-title">
              Expert Roofing Contractor in {'Spartanburg'}, {'SC'}
            </h1>
            <p className="hero-subtitle">
              From storm damage repairs to complete roof replacements,{' '}
              {'Arnold\'s Roofing LLC'} delivers durable, code-compliant roofing
              solutions that protect your home and family across {'Spartanburg'}.
            </p>
            <a
              href="#contact"
              className="hero-cta"
              aria-label="Call now at Call Us"
            >
              <span
                className="hero-cta-icon"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: phoneIconSvg }}
              />
              Call {'Call Us'}
            </a>
          </div>
        </div>
      </section>

      {/* ===== TRUST BAR ===== */}
      <section className="trust-bar" aria-label="Why trust us">
        <div className="trust-bar-inner">
          {trustItems.map((item, i) => (
            <div className="trust-item" key={i} data-animate data-delay={i + 1}>
              <span
                className="trust-icon"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: shieldCheckSvg }}
              />
              <span className="trust-text">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="services" id="services" aria-label="Our roofing services">
        <div className="services-inner">
          <span className="section-label" data-animate>Our Services</span>
          <h2 className="section-title" data-animate data-delay="1">
            Professional Roofing Solutions
          </h2>
          <p className="section-desc" data-animate data-delay="2">
            Whether you need emergency storm damage repair or a full shingle
            tear-off and replacement, our certified roofers deliver work that
            stands up to the elements.
          </p>
          <div className="services-grid">
            {services.map((service, i) => (
              <div
                className="service-card"
                key={i}
                data-animate
                data-delay={i + 1}
              >
                <div
                  className="service-icon-wrap"
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: service.icon }}
                />
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section className="about" id="about" aria-label="About us">
        <div className="about-inner">
          <div className="about-image-wrap" data-animate>
            <img
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80"
              alt=""
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                position: 'absolute',
                inset: 0,
              }}
            />
          </div>
          <div className="about-content">
            <span className="section-label" data-animate>About Us</span>
            <h2 className="about-title" data-animate data-delay="1">
              Why {'Spartanburg'} Trusts {'Arnold\'s Roofing LLC'}
            </h2>
            <p className="about-text" data-animate data-delay="2">
              {'Arnold\'s Roofing LLC was built on a simple idea: Spartanburg homeowners deserve a roofer who treats every house like their own. From quiet neighborhoods off Fernwood Drive to the historic streets near Morgan Square, we\'ve earned our reputation one roof at a time. When you call Arnold\'s, you get straight talk, fair pricing, and craftsmanship that holds up long after we\'ve packed up the truck.'}
            </p>
            <div className="about-stats" data-animate data-delay="3">
              <div className="about-stat">
                <div className="about-stat-number">24/7</div>
                <div className="about-stat-label">Emergency Response</div>
              </div>
              <div className="about-stat">
                <div className="about-stat-number">100%</div>
                <div className="about-stat-label">Warranty Backed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="cta-section" aria-label="Contact us">
        <div className="cta-section-inner" data-animate>
          <div className="cta-glass-card">
            <h2 className="cta-section-title">
              Contact {'Arnold\'s Roofing LLC'}
            </h2>
            <p className="cta-section-desc">
              Missing shingles? Leak in your attic? Hail damage after the last
              storm? Don&apos;t wait for water to reach your walls — call our
              licensed roofers now for a free roof inspection.
            </p>
            <a
              href="#contact"
              className="cta-section-btn"
              aria-label="Call Arnold\'s Roofing LLC at Call Us"
            >
              <span
                className="cta-section-btn-icon"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: phoneIconSvg }}
              />
              Call {'Call Us'}
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          <span className="footer-brand">{'Arnold\'s Roofing LLC'}</span>
          <div className="footer-info">
            <div className="footer-info-item">
              <span
                className="footer-info-icon"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: mapPinSvg }}
              />
              <span>
                {'237 Donavon Dr, Spartanburg, SC 29302, USA'}, {'Spartanburg'}, {'SC'}
              </span>
            </div>
            <div className="footer-info-item">
              <span
                className="footer-info-icon"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: phoneIconSvg }}
              />
              <a
                href="#contact"
                className="footer-phone-link"
                aria-label="Call Arnold\'s Roofing LLC at Call Us"
              >
                {'Call Us'}
              </a>
            </div>
          </div>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} {'Arnold\'s Roofing LLC'}. All rights
            reserved. Licensed &amp; insured roofing professionals.
          </div>
        </div>
      </footer>
    </>
  );
}