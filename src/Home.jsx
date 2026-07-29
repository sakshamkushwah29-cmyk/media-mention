import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import mediamansionLogo from './assets/mediamansion_header_logo.png';
import mediamansionHeroArtwork from './assets/mediamansion_hero_artwork.png';
import mediamansionWeirdIsGoodArtwork from './assets/mediamansion_weirdisgood_artwork.png';
import starPurple from './assets/star_purple.svg';
import polygonPurple from './assets/polygon_purple.svg';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // State for FAQ answers
  const [openFaq, setOpenFaq] = useState(null);
  
  // State for mobile nav
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    let ctx;
    const timer = setTimeout(() => {
      ctx = gsap.context(() => {
        const safeFrom = (targetSelector, triggerSelector, vars) => {
          const targets = document.querySelectorAll(targetSelector);
          if (targets.length === 0) return;
          const config = { ...vars };
          if (triggerSelector) {
            const triggerEl = document.querySelector(triggerSelector);
            if (triggerEl) {
              config.scrollTrigger = {
                trigger: triggerEl,
                start: 'top 85%',
                ...vars.scrollTrigger,
              };
            }
          }
          gsap.from(targets, config);
        };

        // 1. Hero Entrance Animation
        safeFrom('.hero-section .mainusp', null, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
        });

        // 2. Continuous Floating Ambient Motion on Illustrations
        const imgs = document.querySelectorAll('.illustrationholder img');
        if (imgs.length > 0) {
          gsap.to(imgs, {
            y: -14,
            duration: 2.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }

        // 3. 3 Easy Steps Staggered Reveal
        safeFrom('.get-started-in-info', '#3-easy-steps', {
          opacity: 0,
          y: 45,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
        });

        // 4. Services Header & Accordions Stagger
        safeFrom('#services .what-we-offer-box', '#services', {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power2.out',
        });

        safeFrom('#services .uui-faq01_accordion', '#services .what-we-do-items', {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });

        // 5. Membership Benefits Stagger
        safeFrom('#membership-benefits .membership-content-holder', '#membership-benefits', {
          opacity: 0,
          y: 35,
          scale: 0.97,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
        });

        // 6. FAQ Section Stagger
        safeFrom('#faq-section .uui-faq01_accordion', '#faq-section', {
          opacity: 0,
          y: 30,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });

        // 7. Media Mentions & Feedback GSAP Carousel Marquee & Navigation
        const carouselTrack = document.querySelector('.uui-testimonial16_component-2');
        if (carouselTrack) {
          carouselTrack.style.overflow = 'hidden';
          carouselTrack.style.width = '100%';

          const loopTriggers = carouselTrack.querySelectorAll('.uui-testimonial16_loop-trigger-2');
          
          let currentX = 0;
          const stepSize = 400; // pixels to scroll on click

          const loopTween = gsap.to(loopTriggers, {
            xPercent: -50,
            duration: 35,
            ease: 'none',
            repeat: -1,
          });

          carouselTrack.addEventListener('mouseenter', () => loopTween.pause());
          carouselTrack.addEventListener('mouseleave', () => loopTween.play());

          const prevBtn = document.querySelector('.carousel-prev-btn');
          const nextBtn = document.querySelector('.carousel-next-btn');

          if (nextBtn) {
            nextBtn.onclick = () => {
              loopTween.pause();
              currentX -= stepSize;
              gsap.to(loopTriggers, { x: currentX, duration: 0.6, ease: 'power2.out' });
            };
          }

          if (prevBtn) {
            prevBtn.onclick = () => {
              loopTween.pause();
              currentX += stepSize;
              if (currentX > 0) currentX = 0;
              gsap.to(loopTriggers, { x: currentX, duration: 0.6, ease: 'power2.out' });
            };
          }
        }
      });
    }, 50);

    // FAQ / Services accordion functionality
    const accordions = document.querySelectorAll('.uui-faq01_accordion');
    accordions.forEach((acc) => {
      const question = acc.querySelector('.uui-faq01_question');
      const answer = acc.querySelector('.uui-faq01_answer');
      const icon = acc.querySelector('.accordion-icon_component, .uui-faq01_icon-wrapper img');
      
      if (question && answer) {
        // Initial style resets
        answer.style.height = '0px';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        
        question.style.cursor = 'pointer';
        
        const clickHandler = () => {
          const isOpen = answer.style.height !== '0px';
          
          if (!isOpen) {
            // Close any other open accordion in the section so only one service is open at a time
            const parentSection = acc.closest('.what-we-do-items, .faq-holder, .uui-faq01_component') || document;
            parentSection.querySelectorAll('.uui-faq01_accordion').forEach((otherAcc) => {
              const otherAns = otherAcc.querySelector('.uui-faq01_answer');
              const otherIcon = otherAcc.querySelector('.accordion-icon_component, .uui-faq01_icon-wrapper img');
              if (otherAns) {
                otherAns.style.height = '0px';
              }
              if (otherIcon) {
                otherIcon.style.transform = 'none';
              }
            });

            answer.style.height = answer.scrollHeight + 'px';
            if (icon) {
              icon.style.transform = 'rotate(180deg)';
              icon.style.transition = 'transform 0.3s ease';
            }
          } else {
            answer.style.height = '0px';
            if (icon) {
              icon.style.transform = 'none';
              icon.style.transition = 'transform 0.3s ease';
            }
          }
        };
        
        question.addEventListener('click', clickHandler);
        question.__clickHandler = clickHandler;
      }
    });

    // Mobile navigation drawer toggle
    const menuBtn = document.querySelector('.uui-navbar01_menu-button');
    const menu = document.querySelector('.uui-navbar01_menu');
    if (menuBtn && menu) {
      menuBtn.style.cursor = 'pointer';
      const menuToggleHandler = () => {
        const isOpen = menu.classList.contains('w--open') || menu.style.display === 'block';
        if (!isOpen) {
          menu.style.display = 'block';
          menu.classList.add('w--open');
        } else {
          menu.style.display = 'none';
          menu.classList.remove('w--open');
        }
      };
      menuBtn.addEventListener('click', menuToggleHandler);
      menuBtn.__toggleHandler = menuToggleHandler;
    }

    return () => {
      clearTimeout(timer);
      if (ctx) ctx.revert();
      accordions.forEach((acc) => {
        const question = acc.querySelector('.uui-faq01_question');
        if (question && question.__clickHandler) {
          question.removeEventListener('click', question.__clickHandler);
        }
      });
      if (menuBtn && menuBtn.__toggleHandler) {
        menuBtn.removeEventListener('click', menuBtn.__toggleHandler);
      }
    };
  }, []);

  return (
    <div className="thinkinbirds-page">
      
    <div data-w-id="8c078d67-69f6-1de2-bd67-63f7d0a9aefb" data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="uui-navbar01_component w-nav">
      <div className="uui-navbar01_container">
        <a href="#" className="uui-navbar01_logo-link w-nav-brand">        <div className="uui-logo_component">
          <img src={mediamansionLogo} loading="lazy" alt="Media Mansion Logo" className="uui-logo_logotype" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
        </div>
</a>
        <nav role="navigation" className="uui-navbar01_menu w-nav-menu">
          <div className="toptext">
            <h1 className="mainusp in-top-text">
              Menu
            </h1>
          </div>
          <div className="uui-navbar01_menu-left">
            <div className="holder-in-nav">
              <h1 className="mainusp insidenav">
                01
              </h1>
              <a href="#3-easy-steps" className="nav-link in-menu w-nav-link">              How it works
</a>
            </div>
            <div className="holder-in-nav">
              <a href="#portfolio" className="nav-link in-menu left w-nav-link">              Portfolio
</a>
              <h1 className="mainusp insidenav">
                02
              </h1>
            </div>
            <div className="holder-in-nav">
              <h1 className="mainusp insidenav">
                03
              </h1>
              <a href="#services" className="nav-link in-menu w-nav-link">              Services
</a>
            </div>
            <div className="holder-in-nav">
              <h1 className="mainusp insidenav">
                04
              </h1>
              <a href="#faq-section" className="nav-link in-menu w-nav-link">              FAQ
</a>
            </div>
            <div className="holder-in-nav">
              <h1 className="mainusp insidenav">
                05
              </h1>
              <a href="#membership-benefits" className="nav-link in-menu w-nav-link">              Benefits
</a>
            </div>
          </div>
          <div className="uui-navbar01_menu-right blackbox">
            <div className="uui-navbar01_button-wrapper">
              <a href="#" className="uui-button-tertiary-gray hide-tablet w-inline-block">              <div>
                Log in
              </div>
</a>
            </div>
            <div className="button big">
              <div className="button-inner p3_small herowhite redbg white">
                Book free demo
              </div>
              <div className="button-bg red">
              </div>
            </div>
          </div>
        </nav>
        <div className="uui-navbar01_menu-button w-nav-button">
          <div className="menu-icon_component">
            <div className="menu-icon_line-top">
            </div>
            <div className="menu-icon_line-middle">
              <div className="menu-icon_line-middle-inner">
              </div>
            </div>
            <div className="menu-icon_line-bottom">
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="navbar">
      <div className="navlink-holder hide">
        <a href="#3-easy-steps" className="navlink-holder hide w-inline-block">        <div className="nav-link first">
          How it works
        </div>
</a>
        <a href="#membership-benefits" className="navlink-holder w-inline-block">        <div className="nav-link">
          Benefits
        </div>
</a>
        <a href="#services" className="navlink-holder w-inline-block">        <div className="nav-link">
          Services
        </div>
</a>
      </div>
      <div className="walsh-nav-logo">
        <a href="#hero-section" className="logolink w-inline-block">        <img src={mediamansionLogo} loading="lazy" alt="Media Mansion Logo" className="nav-logo" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
</a>
      </div>
      <div className="navlink-holder right hide">
        <a href="#faq-section" className="navlink-holder w-inline-block">        <div className="nav-link">
          FAQ
        </div>
</a>
        <a href="#portfolio" className="navlink-holder w-inline-block">        <div className="nav-link">
          Portfolio
        </div>
</a>
        <a href="https://calendly.com/iambkmehta/ready-to-fly" className="button big inside-nav w-inline-block">        <div className="button-inner p3_small herowhite red inside-nav">
          book free dem0
        </div>
        <div className="button-bg white grey">
        </div>
</a>
      </div>
    </section>
    <section id="hero-section" className="hero-section">
      <div className="container1440 hero-inside">
        <div className="mainusp-holder">
          <h1 words-slide-up="" text-split="" className="mainusp">
            Team of Brand &amp; Product Design Magicians Who Make Your Brand Fly High
          </h1>
        </div>
        <div className="subheading-cta-holder">
          <div className="subheading-holder">
            <h5 className="heading inherosection">
              Fast &amp; Scalable design membership for your biz without breaking the bank
            </h5>
          </div>
          <div className="buttonholder">
            <a href="https://calendly.com/iambkmehta/ready-to-fly" className="button big w-inline-block">            <div className="button-inner p3_small herowhite">
              Book Exploration Call
            </div>
            <div className="button-bg disabled">
            </div>
</a>
          </div>
        </div>
      </div>
    </section>
    <section className="portfolio-carousel">
      <div className="image-strip-wrapper">
        <div className="image-strip">
          <div className="image-item">
            <img src={mediamansionHeroArtwork} loading="lazy" alt="Media Mansion Artwork" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930b120cc2d7da7bc48f8_NUM%202.png" loading="lazy" sizes="(max-width: 1098px) 100vw, 1098px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930b120cc2d7da7bc48f8_NUM%202-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930b120cc2d7da7bc48f8_NUM%202-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930b120cc2d7da7bc48f8_NUM%202-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930b120cc2d7da7bc48f8_NUM%202.png 1098w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930fc06f6bdfff253b004_27.png" loading="lazy" sizes="(max-width: 1440px) 100vw, 1440px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930fc06f6bdfff253b004_27-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930fc06f6bdfff253b004_27-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930fc06f6bdfff253b004_27-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930fc06f6bdfff253b004_27.png 1440w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b3af5b9c0884f1cdc72f8_3.jpg" loading="lazy" sizes="(max-width: 1577px) 100vw, 1577px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b3af5b9c0884f1cdc72f8_3-p-500.jpg 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b3af5b9c0884f1cdc72f8_3-p-800.jpg 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b3af5b9c0884f1cdc72f8_3-p-1080.jpg 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b3af5b9c0884f1cdc72f8_3.jpg 1577w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035.png" loading="lazy" sizes="(max-width: 1919px) 100vw, 1919px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035.png 1919w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4.jpg" loading="lazy" sizes="(max-width: 2767px) 100vw, 2767px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-500.jpg 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-800.jpg 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-1080.jpg 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-1600.jpg 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-2000.jpg 2000w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-2600.jpg 2600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4.jpg 2767w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036.png" loading="lazy" sizes="(max-width: 1620px) 100vw, 1620px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036.png 1620w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999dca2dd5862e9c8b08c_7.png" loading="lazy" sizes="(max-width: 1398px) 100vw, 1398px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999dca2dd5862e9c8b08c_7-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999dca2dd5862e9c8b08c_7-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999dca2dd5862e9c8b08c_7-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999dca2dd5862e9c8b08c_7.png 1398w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a03279225fd4b1abc44_edit%2037.png" loading="lazy" sizes="(max-width: 1260px) 100vw, 1260px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a03279225fd4b1abc44_edit%2037-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a03279225fd4b1abc44_edit%2037-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a03279225fd4b1abc44_edit%2037-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a03279225fd4b1abc44_edit%2037.png 1260w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal.png" loading="lazy" sizes="(max-width: 1680px) 100vw, 1680px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal.png 1680w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17.jpg" loading="lazy" sizes="(max-width: 2213px) 100vw, 2213px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17-p-500.jpg 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17-p-800.jpg 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17-p-1080.jpg 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17-p-1600.jpg 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17-p-2000.jpg 2000w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17.jpg 2213w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a94f7379e04b2595ae6_26.png" loading="lazy" sizes="(max-width: 1440px) 100vw, 1440px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a94f7379e04b2595ae6_26-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a94f7379e04b2595ae6_26-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a94f7379e04b2595ae6_26-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a94f7379e04b2595ae6_26.png 1440w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013.png" loading="lazy" sizes="(max-width: 2461px) 100vw, 2461px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013-p-2000.png 2000w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013.png 2461w" alt="" className="carousel-image-2" />
          </div>
        </div>
        <div className="image-strip">
          <div className="image-item">
            <img src={mediamansionHeroArtwork} loading="lazy" alt="Media Mansion Artwork" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930b120cc2d7da7bc48f8_NUM%202.png" loading="lazy" sizes="(max-width: 1098px) 100vw, 1098px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930b120cc2d7da7bc48f8_NUM%202-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930b120cc2d7da7bc48f8_NUM%202-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930b120cc2d7da7bc48f8_NUM%202-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930b120cc2d7da7bc48f8_NUM%202.png 1098w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930fc06f6bdfff253b004_27.png" loading="lazy" sizes="(max-width: 1440px) 100vw, 1440px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930fc06f6bdfff253b004_27-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930fc06f6bdfff253b004_27-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930fc06f6bdfff253b004_27-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930fc06f6bdfff253b004_27.png 1440w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b3af5b9c0884f1cdc72f8_3.jpg" loading="lazy" sizes="(max-width: 1577px) 100vw, 1577px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b3af5b9c0884f1cdc72f8_3-p-500.jpg 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b3af5b9c0884f1cdc72f8_3-p-800.jpg 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b3af5b9c0884f1cdc72f8_3-p-1080.jpg 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b3af5b9c0884f1cdc72f8_3.jpg 1577w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035.png" loading="lazy" sizes="(max-width: 1919px) 100vw, 1919px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035.png 1919w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4.jpg" loading="lazy" sizes="(max-width: 2767px) 100vw, 2767px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-500.jpg 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-800.jpg 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-1080.jpg 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-1600.jpg 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-2000.jpg 2000w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-2600.jpg 2600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4.jpg 2767w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036.png" loading="lazy" sizes="(max-width: 1620px) 100vw, 1620px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036.png 1620w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999dca2dd5862e9c8b08c_7.png" loading="lazy" sizes="(max-width: 1398px) 100vw, 1398px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999dca2dd5862e9c8b08c_7-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999dca2dd5862e9c8b08c_7-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999dca2dd5862e9c8b08c_7-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999dca2dd5862e9c8b08c_7.png 1398w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a03279225fd4b1abc44_edit%2037.png" loading="lazy" sizes="(max-width: 1260px) 100vw, 1260px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a03279225fd4b1abc44_edit%2037-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a03279225fd4b1abc44_edit%2037-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a03279225fd4b1abc44_edit%2037-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a03279225fd4b1abc44_edit%2037.png 1260w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal.png" loading="lazy" sizes="(max-width: 1680px) 100vw, 1680px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal.png 1680w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17.jpg" loading="lazy" sizes="(max-width: 2213px) 100vw, 2213px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17-p-500.jpg 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17-p-800.jpg 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17-p-1080.jpg 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17-p-1600.jpg 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17-p-2000.jpg 2000w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17.jpg 2213w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a94f7379e04b2595ae6_26.png" loading="lazy" sizes="(max-width: 1440px) 100vw, 1440px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a94f7379e04b2595ae6_26-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a94f7379e04b2595ae6_26-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a94f7379e04b2595ae6_26-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a94f7379e04b2595ae6_26.png 1440w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013.png" loading="lazy" sizes="(max-width: 2461px) 100vw, 2461px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013-p-2000.png 2000w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013.png 2461w" alt="" className="carousel-image-2" />
          </div>
        </div>
        <div className="image-strip">
          <div className="image-item">
            <img src={mediamansionHeroArtwork} loading="lazy" alt="Media Mansion Artwork" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930b120cc2d7da7bc48f8_NUM%202.png" loading="lazy" sizes="(max-width: 1098px) 100vw, 1098px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930b120cc2d7da7bc48f8_NUM%202-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930b120cc2d7da7bc48f8_NUM%202-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930b120cc2d7da7bc48f8_NUM%202-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930b120cc2d7da7bc48f8_NUM%202.png 1098w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930fc06f6bdfff253b004_27.png" loading="lazy" sizes="(max-width: 1440px) 100vw, 1440px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930fc06f6bdfff253b004_27-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930fc06f6bdfff253b004_27-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930fc06f6bdfff253b004_27-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660930fc06f6bdfff253b004_27.png 1440w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b3af5b9c0884f1cdc72f8_3.jpg" loading="lazy" sizes="(max-width: 1577px) 100vw, 1577px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b3af5b9c0884f1cdc72f8_3-p-500.jpg 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b3af5b9c0884f1cdc72f8_3-p-800.jpg 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b3af5b9c0884f1cdc72f8_3-p-1080.jpg 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b3af5b9c0884f1cdc72f8_3.jpg 1577w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035.png" loading="lazy" sizes="(max-width: 1919px) 100vw, 1919px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660933c2cf26397ad6eef9eb_edit%2035.png 1919w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4.jpg" loading="lazy" sizes="(max-width: 2767px) 100vw, 2767px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-500.jpg 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-800.jpg 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-1080.jpg 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-1600.jpg 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-2000.jpg 2000w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4-p-2600.jpg 2600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b41873e8dcbf00a99145c_4.jpg 2767w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036.png" loading="lazy" sizes="(max-width: 1620px) 100vw, 1620px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999885e9084457b0bc2bf_edit%2036.png 1620w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999dca2dd5862e9c8b08c_7.png" loading="lazy" sizes="(max-width: 1398px) 100vw, 1398px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999dca2dd5862e9c8b08c_7-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999dca2dd5862e9c8b08c_7-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999dca2dd5862e9c8b08c_7-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/660999dca2dd5862e9c8b08c_7.png 1398w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a03279225fd4b1abc44_edit%2037.png" loading="lazy" sizes="(max-width: 1260px) 100vw, 1260px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a03279225fd4b1abc44_edit%2037-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a03279225fd4b1abc44_edit%2037-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a03279225fd4b1abc44_edit%2037-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a03279225fd4b1abc44_edit%2037.png 1260w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal.png" loading="lazy" sizes="(max-width: 1680px) 100vw, 1680px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6579ac01ba54ee05a0824047_royal.png 1680w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17.jpg" loading="lazy" sizes="(max-width: 2213px) 100vw, 2213px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17-p-500.jpg 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17-p-800.jpg 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17-p-1080.jpg 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17-p-1600.jpg 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17-p-2000.jpg 2000w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657c6a3a8086da4a2e923d0c_17.jpg 2213w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a94f7379e04b2595ae6_26.png" loading="lazy" sizes="(max-width: 1440px) 100vw, 1440px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a94f7379e04b2595ae6_26-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a94f7379e04b2595ae6_26-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a94f7379e04b2595ae6_26-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/66099a94f7379e04b2595ae6_26.png 1440w" alt="" className="carousel-image-2" />
          </div>
          <div className="image-item">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013.png" loading="lazy" sizes="(max-width: 2461px) 100vw, 2461px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013-p-2000.png 2000w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/657b2d0bed26c5c9e4fa1136_JAGSONS%2013.png 2461w" alt="" className="carousel-image-2" />
          </div>
        </div>
      </div>
    </section>
    <section className="portfolio-carousel autoscroll hide">
      <section data-w-id="5dd21e0d-3ad0-d4f4-eba7-5bc53e498792" className="uui-section_testimonial16">
        <div className="uui-padding-vertical-xhuge">
          <div className="uui-text-align-center">
            <div className="uui-max-width-large align-center">
            </div>
          </div>
          <div className="uui-testimonial16_component">
            <div className="uui-testimonial16_loop-trigger">
              <div className="uui-testimonial16_content">
                <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102b511d47b8d74428d_Simulator%20Screenshot%20-%20iPhone%2014%20Pro%20-%202023-05-22%20at%2000.52.png" loading="lazy" width="873" sizes="(max-width: 991px) 100vw, 873px" alt="" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102b511d47b8d74428d_Simulator%20Screenshot%20-%20iPhone%2014%20Pro%20-%202023-05-22%20at%2000.52-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102b511d47b8d74428d_Simulator%20Screenshot%20-%20iPhone%2014%20Pro%20-%202023-05-22%20at%2000.52-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102b511d47b8d74428d_Simulator%20Screenshot%20-%20iPhone%2014%20Pro%20-%202023-05-22%20at%2000.52-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102b511d47b8d74428d_Simulator%20Screenshot%20-%20iPhone%2014%20Pro%20-%202023-05-22%20at%2000.52-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102b511d47b8d74428d_Simulator%20Screenshot%20-%20iPhone%2014%20Pro%20-%202023-05-22%20at%2000.52.png 2358w" className="image-8" />
              </div>
              <div className="uui-testimonial16_content">
                <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44.png" loading="lazy" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44-p-2000.png 2000w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44-p-2600.png 2600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44-p-3200.png 3200w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44.png 7668w" alt="Main Menu Thinkin Birds Website" sizes="(max-width: 7668px) 100vw, 7668px" className="image-8 desktop" />
              </div>
              <div className="uui-testimonial16_content">
                <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774101b511d47b8d7441f0_simulator_screenshot_348A976F-787D-4A01-8004-05E722A6DBB5.png" loading="lazy" width="873" sizes="(max-width: 991px) 100vw, 873px" alt="" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774101b511d47b8d7441f0_simulator_screenshot_348A976F-787D-4A01-8004-05E722A6DBB5-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774101b511d47b8d7441f0_simulator_screenshot_348A976F-787D-4A01-8004-05E722A6DBB5-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774101b511d47b8d7441f0_simulator_screenshot_348A976F-787D-4A01-8004-05E722A6DBB5-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774101b511d47b8d7441f0_simulator_screenshot_348A976F-787D-4A01-8004-05E722A6DBB5-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774101b511d47b8d7441f0_simulator_screenshot_348A976F-787D-4A01-8004-05E722A6DBB5.png 2340w" className="image-8" />
              </div>
              <div className="uui-testimonial16_content">
                <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102d22bb9ddb6a389e2_simulator_screenshot_B2151C46-A644-4220-878D-185B441749A3.png" loading="lazy" width="873" sizes="(max-width: 991px) 100vw, 873px" alt="" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102d22bb9ddb6a389e2_simulator_screenshot_B2151C46-A644-4220-878D-185B441749A3-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102d22bb9ddb6a389e2_simulator_screenshot_B2151C46-A644-4220-878D-185B441749A3-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102d22bb9ddb6a389e2_simulator_screenshot_B2151C46-A644-4220-878D-185B441749A3-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102d22bb9ddb6a389e2_simulator_screenshot_B2151C46-A644-4220-878D-185B441749A3-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102d22bb9ddb6a389e2_simulator_screenshot_B2151C46-A644-4220-878D-185B441749A3.png 2340w" className="image-8" />
              </div>
              <div className="uui-testimonial16_content">
                <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103004b210f0ce5685e_image%2051.png" loading="lazy" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103004b210f0ce5685e_image%2051-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103004b210f0ce5685e_image%2051-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103004b210f0ce5685e_image%2051-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103004b210f0ce5685e_image%2051-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103004b210f0ce5685e_image%2051-p-2000.png 2000w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103004b210f0ce5685e_image%2051-p-2600.png 2600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103004b210f0ce5685e_image%2051-p-3200.png 3200w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103004b210f0ce5685e_image%2051.png 7468w" alt="" sizes="(max-width: 7468px) 100vw, 7468px" className="image-8 desktop" />
              </div>
              <div className="uui-testimonial16_content">
                <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102b655c5e3a4048b88_Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202022-04-27%20at%2010.42.png" loading="lazy" width="873" sizes="(max-width: 991px) 100vw, 873px" alt="" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102b655c5e3a4048b88_Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202022-04-27%20at%2010.42-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102b655c5e3a4048b88_Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202022-04-27%20at%2010.42-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102b655c5e3a4048b88_Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202022-04-27%20at%2010.42-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102b655c5e3a4048b88_Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202022-04-27%20at%2010.42-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774102b655c5e3a4048b88_Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202022-04-27%20at%2010.42.png 2340w" className="image-8" />
              </div>
              <div className="uui-testimonial16_content">
                <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103fcb684b18bccf6b4_Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202022-04-27%20at%2010.42-1.png" loading="lazy" width="873" sizes="(max-width: 991px) 100vw, 873px" alt="" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103fcb684b18bccf6b4_Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202022-04-27%20at%2010.42-1-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103fcb684b18bccf6b4_Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202022-04-27%20at%2010.42-1-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103fcb684b18bccf6b4_Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202022-04-27%20at%2010.42-1-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103fcb684b18bccf6b4_Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202022-04-27%20at%2010.42-1-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103fcb684b18bccf6b4_Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202022-04-27%20at%2010.42-1-p-2000.png 2000w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103fcb684b18bccf6b4_Simulator%20Screen%20Shot%20-%20iPhone%2012%20-%202022-04-27%20at%2010.42-1.png 2340w" className="image-8" />
              </div>
              <div className="uui-testimonial16_content">
                <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44.png" loading="lazy" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44-p-2000.png 2000w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44-p-2600.png 2600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44-p-3200.png 3200w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65774103b0ebcc8f17ac44a9_Screenshot%202023-11-19%20at%2011.44.png 7668w" alt="Main Menu Thinkin Birds Website" sizes="(max-width: 7668px) 100vw, 7668px" className="image-8 desktop" />
              </div>
            </div>
            <div className="uui-testimonial16_loop-trigger">
              <div className="uui-testimonial16_content">
              </div>
              <div className="uui-testimonial16_content">
              </div>
              <div className="uui-testimonial16_content">
              </div>
              <div className="uui-testimonial16_content">
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
    <section className="trusted-by">
      <div className="container1440 trustedby">
        <div className="mainusp-holder trustedbytxt">
          <h1 words-slide-from-right="" text-split="" className="mainusp trusted-by-text red">
            TRUSTED BY MORE THAN 100 CLIENTS INCLUDIN&#39; MARKETING AGENCIES, STARTUPS AND CREATORS
          </h1>
        </div>
        <div className="subheading-cta-holder">
          <div className="subheading-holder">
            <h3 className="subtext-youarenext">
              You Are next
            </h3>
          </div>
        </div>
      </div>
    </section>
    <section className="greyholder">
      <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/658299a390c952810719c9d3_ourclients.png" loading="lazy" sizes="(max-width: 2167px) 100vw, 2167px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/658299a390c952810719c9d3_ourclients-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/658299a390c952810719c9d3_ourclients-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/658299a390c952810719c9d3_ourclients-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/658299a390c952810719c9d3_ourclients-p-1600.png 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/658299a390c952810719c9d3_ourclients-p-2000.png 2000w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/658299a390c952810719c9d3_ourclients.png 2167w" alt="" className="image-12" />
    </section>
    <section id="3-easy-steps" className="_3-easy-steps">
      <div className="container1440 _3-easy-steps">
        <div className="red-stroke-box">
          <div className="visual-interface-vrtl">
            <div className="visual">
              <div className="text-inside-vrtl">
                Content Marketing
              </div>
            </div>
            <div className="visual">
              <div className="text-inside-vrtl">
                Website Development
              </div>
            </div>
            <div className="visual">
              <div className="text-inside-vrtl">
                Branding
              </div>
            </div>
          </div>
          <div className="get-statred-in">
            <div className="get-started-in">
              GET STARTED IN
            </div>
          </div>
          <div className="visual-interface-vrtl right">
            <div className="visual right">
              <div className="text-inside-vrtl">
                Product Shoot
              </div>
            </div>
            <div className="visual">
              <div className="text-inside-vrtl">
                Ad Films
              </div>
            </div>
            <div className="visual">
              <div className="text-inside-vrtl">
                Consultancy
              </div>
            </div>
          </div>
        </div>
        <div className="red-stroke-box _3easy">
          <div words-slide-up="" className="_3easysteps">
            3 Easy Steps
          </div>
        </div>
        <div className="red-stroke-box _3rdrow">
          <div className="get-started-in _3rdrowtext">
            How it works
          </div>
          <div className="get-started-in _3rdrowtext right">
            How it works
          </div>
        </div>
        <div className="red-stroke-box info-points">
          <div className="get-started-in-info">
            <div className="numberholder">
              <div className="text-2">
                1
              </div>
            </div>
            <div className="autobox">
              <div words-slide-up="" text-split="" className="subheading-info">
                Exploration call
              </div>
              <div words-slide-up="" text-split="" className="text-info">
                We start with a quick call to understand your brand, your goals, and what you actually need. No generic templates, no guesswork. This is where we learn what makes your business tick and figure out the right direction.
              </div>
            </div>
          </div>
          <div className="get-started-in-info middle">
            <div className="numberholder">
              <div className="text-2">
                2
              </div>
            </div>
            <div className="autobox">
              <div words-slide-up="" text-split="" className="subheading-info">
                Locking Requirements
              </div>
              <div words-slide-up="" text-split="" className="text-info">
                Once we know your vision, we map out exactly what needs to happen. Deliverables, timelines, scope, all locked in. You know exactly what you're getting and when. No confusion, no surprises down the line.
              </div>
            </div>
          </div>
          <div className="get-started-in-info right">
            <div className="numberholder">
              <div className="text-2">
                3
              </div>
            </div>
            <div className="autobox">
              <div words-slide-up="" text-split="" className="subheading-info">
                Execution
              </div>
              <div words-slide-up="" text-split="" className="text-info">
                This is where the magic happens. Our team gets to work turning the plan into reality. You get consistent updates and finished work delivered on schedule. Clean process. Real results.
              </div>
            </div>
          </div>
        </div>
        <div className="subheading-cta-holder getstartedin">
          <div className="subheading-holder boook-a-call">
            <h5 className="heading how-it-works">
              Got questions already? Reach out to us
            </h5>
          </div>
          <div className="buttonholder">
            <a href="https://calendly.com/iambkmehta/ready-to-fly" className="button big w-inline-block">            <div className="button-inner p3_small herowhite getstartedin">
              Book a call
            </div>
            <div className="button-bg red">
            </div>
</a>
          </div>
        </div>
      </div>
    </section>
    <section className="illustrationholder">
      <img src={mediamansionHeroArtwork} loading="lazy" alt="Media Mansion Artwork" className="image-5" />
    </section>
    <section id="membership-benefits" className="membership-benefits">
      <div className="container1440 membership-benefits">
        <div className="box-holder">
          <h2 words-slide-from-right="" text-split="" className="heading-2-you-re-in-good-company memebershipbenefits">
            Partnership Benefits
          </h2>
          <p letters-slide-down="" text-split="" className="text-3 benefits">
            Brand is Everything, We help you build one.
          </p>
        </div>
        <div className="box-holder contentholder">
          <div className="membership-content-holder">
            <div className="_640ac8dd69d0331684e65e89_7-svg-fill">
              <img src="https://cdn.prod.website-files.com/5fb6d8b8754777e14ddca278/65619dc25367b4bf91620d61_Vectors-Wrapper.svg" loading="lazy" width="32.798824310302734" height="32.80002975463867" alt="" className="vectors-wrapper-3" />
            </div>
            <div className="redbox">
              <h5 className="text-4 heading">
                <strong>Fresh &gt; Forced</strong>
              </h5>
            </div>
            <p className="text-5 membershipbenefits">
              Ideas that feel original, not like they came from a trend template.
            </p>
          </div>
          <div className="membership-content-holder">
            <div className="_640ac8dd69d0331684e65e89_7-svg-fill">
              <img src="https://cdn.prod.website-files.com/5fb6d8b8754777e14ddca278/65619dc25367b4bf91620d61_Vectors-Wrapper.svg" loading="lazy" width="32.798824310302734" height="32.80002975463867" alt="" className="vectors-wrapper-3" />
            </div>
            <div className="redbox">
              <h5 className="text-4 heading">
                <strong>Quick, Never Rushed</strong>
              </h5>
            </div>
            <p className="text-5 membershipbenefits">
              Fast timelines without cutting corners.
            </p>
          </div>
          <div className="membership-content-holder">
            <div className="_640ac8dd69d0331684e65e89_7-svg-fill">
              <img src="https://cdn.prod.website-files.com/5fb6d8b8754777e14ddca278/65619dc25367b4bf91620d61_Vectors-Wrapper.svg" loading="lazy" width="32.798824310302734" height="32.80002975463867" alt="" className="vectors-wrapper-3" />
            </div>
            <div className="redbox">
              <h5 className="text-4 heading">
                <strong>Made to Stick</strong>
              </h5>
            </div>
            <p className="text-5 membershipbenefits">
              Creative people remember, not just scroll past.
            </p>
          </div>
        </div>
        <div className="box-holder contentholder">
          <div className="membership-content-holder">
            <div className="_640ac8dd69d0331684e65e89_7-svg-fill">
              <img src="https://cdn.prod.website-files.com/5fb6d8b8754777e14ddca278/65619dc25367b4bf91620d61_Vectors-Wrapper.svg" loading="lazy" width="32.798824310302734" height="32.80002975463867" alt="" className="vectors-wrapper-3" />
            </div>
            <div className="redbox">
              <h5 className="text-4 heading">
                <strong>Less Back &amp; Forth</strong>
              </h5>
            </div>
            <p className="text-5 membershipbenefits">
              Clear communication, smoother approvals, better momentum.
            </p>
          </div>
          <div className="membership-content-holder">
            <div className="_640ac8dd69d0331684e65e89_7-svg-fill">
              <img src="https://cdn.prod.website-files.com/5fb6d8b8754777e14ddca278/65619dc25367b4bf91620d61_Vectors-Wrapper.svg" loading="lazy" width="32.798824310302734" height="32.80002975463867" alt="" className="vectors-wrapper-3" />
            </div>
            <div className="redbox">
              <h5 className="text-4 heading">
                <strong>In Sync, Always</strong>
              </h5>
            </div>
            <p className="text-5 membershipbenefits">
              Like working with your own team, just without the extra chairs.
            </p>
          </div>
          <div className="membership-content-holder">
            <div className="_640ac8dd69d0331684e65e89_7-svg-fill">
              <img src="https://cdn.prod.website-files.com/5fb6d8b8754777e14ddca278/65619dc25367b4bf91620d61_Vectors-Wrapper.svg" loading="lazy" width="32.798824310302734" height="32.80002975463867" alt="" className="vectors-wrapper-3" />
            </div>
            <div className="redbox">
              <h5 className="text-4 heading">
                <strong>Built for What’s Next</strong>
              </h5>
            </div>
            <p className="text-5 membershipbenefits">
              Content that keeps up with your brand as it evolves.
            </p>
          </div>
        </div>
        <div className="box-holder below-membership">
          <p letters-slide-down="" text-split="" className="text-3 below-memebrship">
            It’s Easy to Schedule A Demo.
          </p>
          <a href="https://calendly.com/vivek-sirwani/vivek-1-1" className="button big in-membership w-inline-block">          <div className="button-inner p3_small herowhite redbg memebership">
            Book Your FREE Call Now
          </div>
          <div className="button-bg disabled">
          </div>
</a>
        </div>
      </div>
    </section>
    <section className="illustrationholder hide">
      <img src={mediamansionHeroArtwork} loading="lazy" alt="Media Mansion Artwork" className="image-4" />
    </section>
    <section id="services" className="what-we-offer">
      <div className="container1440 membership-benefits nobg">
        <div className="topsection-holder what-we-do">
          <div className="what-we-offer-box">
            <div className="_1strow">
              <h2 letters-slide-down="" text-split="" className="text-6">
                From
              </h2>
            </div>
            <div className="_1strow">
              <p letters-slide-down="" text-split="" className="heading-2-you-re-in-good-company-2">
                MARKETING
              </p>
            </div>
            <div className="_1strow">
              <h2 letters-slide-down="" text-split="" className="text-6">
                To
              </h2>
            </div>
            <div className="_4throw">
              <p letters-slide-down="" text-split="" className="heading-2-you-re-in-good-company-2">
                Brand Identity &amp; Web Design
              </p>
            </div>
          </div>
          <h2 className="heading-2-you-re-in-good-company-3">
            our artists cover everythin&#39; under the sun
          </h2>
        </div>
        <div className="what-we-do-items">
          <div className="uui-faq01_accordion">
            <div className="uui-faq01_question">
              <div className="text-7">
                <strong>Content Marketing</strong>
              </div>
              <div className="uui-faq01_icon-wrapper">
                <div className="accordion-icon_component">
                  <div className="accordion-icon_horizontal-line"></div>
                  <div className="accordion-icon_vertical-line"></div>
                </div>
              </div>
            </div>
            <div style={{ height: "0px" }} className="uui-faq01_answer">
              <div className="text-5 in-what-we-do">
                Content that stops the scroll and doesn't let go. We're talking reels people send to their group chat. Clips that live rent free in someone's head. Stories that actually make people care. Zero cringe. Full send energy. Your algorithm's about to fall in love.
              </div>
            </div>
          </div>

          <div className="uui-faq01_accordion">
            <div className="uui-faq01_question">
              <div className="text-7">
                <strong>Website Development</strong>
              </div>
              <div className="uui-faq01_icon-wrapper">
                <div className="accordion-icon_component">
                  <div className="accordion-icon_horizontal-line"></div>
                  <div className="accordion-icon_vertical-line"></div>
                </div>
              </div>
            </div>
            <div style={{ height: "0px" }} className="uui-faq01_answer">
              <div className="text-5 in-what-we-do">
                Your website either slaps or it's giving 2015. We build sites that load fast, look clean, and turn visitors into customers on sight. Mobile first. SEO maxxed. No notes.
              </div>
            </div>
          </div>

          <div className="uui-faq01_accordion">
            <div className="uui-faq01_question">
              <div className="text-7">
                <strong>Branding</strong>
              </div>
              <div className="uui-faq01_icon-wrapper">
                <div className="accordion-icon_component">
                  <div className="accordion-icon_horizontal-line"></div>
                  <div className="accordion-icon_vertical-line"></div>
                </div>
              </div>
            </div>
            <div style={{ height: "0px" }} className="uui-faq01_answer">
              <div className="text-5 in-what-we-do">
                We give your brand its whole aura. Logo, colors, voice, vibe. All locked in so people clock you instantly. This isn't basic, cookie cutter stuff. This is &quot;wait who did your branding&quot; energy.
              </div>
            </div>
          </div>

          <div className="uui-faq01_accordion">
            <div className="uui-faq01_question">
              <div className="text-7">
                <strong>Product Shoot</strong>
              </div>
              <div className="uui-faq01_icon-wrapper">
                <div className="accordion-icon_component">
                  <div className="accordion-icon_horizontal-line"></div>
                  <div className="accordion-icon_vertical-line"></div>
                </div>
              </div>
            </div>
            <div style={{ height: "0px" }} className="uui-faq01_answer">
              <div className="text-5 in-what-we-do">
                Your product's about to have its main character moment. Clean shots. Cinematic videos. Whatever makes people stop and go &quot;I need that.&quot; We shoot it so good it sells itself.
              </div>
            </div>
          </div>

          <div className="uui-faq01_accordion">
            <div className="uui-faq01_question">
              <div className="text-7">
                <strong>Ad Films</strong>
              </div>
              <div className="uui-faq01_icon-wrapper">
                <div className="accordion-icon_component">
                  <div className="accordion-icon_horizontal-line"></div>
                  <div className="accordion-icon_vertical-line"></div>
                </div>
              </div>
            </div>
            <div style={{ height: "0px" }} className="uui-faq01_answer">
              <div className="text-5 in-what-we-do">
                Ads people actually watch till the end. No skip, no cap. We build commercials that hit hard, stick in your head, and turn views into sales. Boring ads are canceled. We don't do those here.
              </div>
            </div>
          </div>

          <div className="uui-faq01_accordion">
            <div className="uui-faq01_question">
              <div className="text-7">
                <strong>Consultancy</strong>
              </div>
              <div className="uui-faq01_icon-wrapper">
                <div className="accordion-icon_component">
                  <div className="accordion-icon_horizontal-line"></div>
                  <div className="accordion-icon_vertical-line"></div>
                </div>
              </div>
            </div>
            <div style={{ height: "0px" }} className="uui-faq01_answer">
              <div className="text-5 in-what-we-do">
                Think of us as your unfair advantage. We audit your whole business. Ops, sales, marketing. And hand you the exact blueprint to scale. No fluff, no theory, just the moves that actually work.
              </div>
            </div>
          </div>
        </div>
        <div className="work-card view-all-button pricing black">
          <p className="work-description white-text">
            Need A Service That&#39;s Missing On The List? Reach Out To Us, Chances Are We Do It Too.
            <a href="https://calendly.com/vivek-sirwani/vivek-1-1">            <br />
</a>
          </p>
          <img src={starPurple} loading="lazy" width="48" height="48" alt="" className="vectors-wrapper-4" />
          <div className="line horizontal white">
          </div>
          <a href="https://calendly.com/iambkmehta/ready-to-fly" className="button big w-inline-block">          <div className="button-inner p3_small herowhite redbg memebership">
            REACH OUT NOW
          </div>
          <div className="button-bg white">
          </div>
</a>
        </div>
      </div>
    </section>
    <section id="portfolio" className="our-work">
      <div className="container1440 membership-benefits nobg">
        <div className="box-holder our-works">
          <h1 words-slide-up="" text-split="" className="top-section-heading ourwork">
            OUR WORK
          </h1>
          <p words-slide-up="" text-split="" className="works-description">
            Only world class design, nothin&#39; less
          </p>
        </div>
        <div className="works-holder">
          <Link to="/royal-empire" className="work-card w-inline-block">          <h5 className="work-heading">
            Royal empire
          </h5>
          <div className="work-image-holder">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/658e937ee53b9847b5b15d63_ROYAL%20EMPIRE_COVER%20IMAGE%20FOR%20WORKS%20(1)%201.png" loading="lazy" width="480" sizes="(max-width: 479px) 100vw, 480px" alt="" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/658e937ee53b9847b5b15d63_ROYAL%20EMPIRE_COVER%20IMAGE%20FOR%20WORKS%20(1)%201-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/658e937ee53b9847b5b15d63_ROYAL%20EMPIRE_COVER%20IMAGE%20FOR%20WORKS%20(1)%201-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/658e937ee53b9847b5b15d63_ROYAL%20EMPIRE_COVER%20IMAGE%20FOR%20WORKS%20(1)%201.png 960w" className="image-3" />
          </div>
          <p className="work-description">
            Branding &amp; Advertisement
          </p>
</Link>
          <Link to="/shabana-bakery" className="work-card w-inline-block">          <h5 className="work-heading">
            Shabana bakery
          </h5>
          <div className="work-image-holder">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fd8928091ed17b6875e_SHABANA_COVER%20IMAGE%20FOR%20WORKS.png" loading="lazy" width="720" sizes="(max-width: 767px) 100vw, 720px" alt="" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fd8928091ed17b6875e_SHABANA_COVER%20IMAGE%20FOR%20WORKS-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fd8928091ed17b6875e_SHABANA_COVER%20IMAGE%20FOR%20WORKS-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fd8928091ed17b6875e_SHABANA_COVER%20IMAGE%20FOR%20WORKS-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fd8928091ed17b6875e_SHABANA_COVER%20IMAGE%20FOR%20WORKS.png 1440w" className="image-3" />
          </div>
          <p className="work-description">
            Rebranding &amp; Social Media
          </p>
</Link>
          <Link to="/diet" className="work-card w-inline-block">          <h5 className="work-heading">
            Diet
          </h5>
          <div className="work-image-holder">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fda3c540b89cbe90b91_COVER%20(1).png" loading="lazy" width="720" sizes="(max-width: 767px) 100vw, 720px" alt="" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fda3c540b89cbe90b91_COVER%20(1)-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fda3c540b89cbe90b91_COVER%20(1)-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fda3c540b89cbe90b91_COVER%20(1)-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fda3c540b89cbe90b91_COVER%20(1).png 1440w" className="image-3" />
          </div>
          <p className="work-description">
            Branding &amp; Design
          </p>
</Link>
          <Link to="/double-decker" className="work-card w-inline-block">          <h5 className="work-heading">
            Double decker DINER
          </h5>
          <div className="work-image-holder">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fd9e8d0e45898092e61_COVER%20(2).png" loading="lazy" width="720" sizes="(max-width: 767px) 100vw, 720px" alt="" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fd9e8d0e45898092e61_COVER%20(2)-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fd9e8d0e45898092e61_COVER%20(2)-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fd9e8d0e45898092e61_COVER%20(2)-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fd9e8d0e45898092e61_COVER%20(2).png 1440w" className="image-3" />
          </div>
          <p className="work-description">
            Branding &amp; Social Media
          </p>
</Link>
          <Link to="/ohno" className="work-card w-inline-block">          <h5 className="work-heading">
            OhNO
          </h5>
          <div className="work-image-holder">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fda4ad6601ebde7473a_COVER.png" loading="lazy" width="720.5" sizes="(max-width: 767px) 100vw, 720.5px" alt="" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fda4ad6601ebde7473a_COVER-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fda4ad6601ebde7473a_COVER-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fda4ad6601ebde7473a_COVER-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/65895fda4ad6601ebde7473a_COVER.png 1441w" className="image-3" />
          </div>
          <p className="work-description">
            Branding &amp; Social Media
          </p>
</Link>
          <Link to="/jagsons" className="work-card w-inline-block">          <h5 className="work-heading">
            Jagsons
          </h5>
          <div className="work-image-holder">
            <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6589606dd73e09aac463b5e5_JAGSONS_COVER%20IMAGE%20FOR%20WORKS.png" loading="lazy" width="720" sizes="(max-width: 767px) 100vw, 720px" alt="" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6589606dd73e09aac463b5e5_JAGSONS_COVER%20IMAGE%20FOR%20WORKS-p-500.png 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6589606dd73e09aac463b5e5_JAGSONS_COVER%20IMAGE%20FOR%20WORKS-p-800.png 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6589606dd73e09aac463b5e5_JAGSONS_COVER%20IMAGE%20FOR%20WORKS-p-1080.png 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6589606dd73e09aac463b5e5_JAGSONS_COVER%20IMAGE%20FOR%20WORKS.png 1440w" className="image-3" />
          </div>
          <p className="work-description">
            Branding &amp; Advertisement
          </p>
</Link>
        </div>
        <div className="view-all-work-button-holder">
          <div id="w-node-e916856a-f7ae-0e85-2606-b3f8461f2571-e5c27bca" className="work-card view-all-button hide-it-now">
            <img src={starPurple} loading="lazy" width="48" height="48" alt="" className="vectors-wrapper-4" />
            <div className="line horizontal contract">
            </div>
            <a href="https://calendly.com/iambkmehta/ready-to-fly" className="button big w-inline-block">            <div className="button-inner p3_small herowhite redbg memebership">
              Book free Call
            </div>
            <div className="button-bg disabled">
            </div>
</a>
          </div>
        </div>
      </div>
    </section>
    <section className="illustrationholder wierdisgood">
      <img src={mediamansionWeirdIsGoodArtwork} loading="lazy" alt="Weird is Good" className="image-6" />
    </section>
    <section id="faq-section" className="faq-section">
      <div className="faq-holder">
        <div className="box-holder our-works faq">
          <h1 words-slide-up="" text-split="" className="top-section-heading">
            FAQ
          </h1>
        </div>
        <div className="uui-faq01_accordion black">
          <div className="uui-faq01_question faq">
            <div className="text-7 faq">
              <strong className="bold-text faq">What happens before content creation begins?</strong>
            </div>
            <div className="uui-faq01_icon-wrapper">
              <div className="accordion-icon_component faq">
                <img src={polygonPurple} loading="lazy" alt="" className="image-7" />
              </div>
            </div>
          </div>
          <div style={{ height: "0px" }} className="uui-faq01_answer">
            <div className="text-5 in-what-we-do faq">
              Every partnership starts with a two-week onboarding phase. We deep dive into your brand, audience, competitors, positioning, communication style, and business goals. This is where we define your brand’s vibe, tone, and creative direction—so every piece of content feels intentional from day one.
            </div>
          </div>
        </div>

        <div className="uui-faq01_accordion black">
          <div className="uui-faq01_question faq">
            <div className="text-7 faq">
              <strong className="bold-text faq">How involved do I need to be?</strong>
            </div>
            <div className="uui-faq01_icon-wrapper">
              <div className="accordion-icon_component faq">
                <img src={polygonPurple} loading="lazy" alt="" className="image-7" />
              </div>
            </div>
          </div>
          <div style={{ height: "0px" }} className="uui-faq01_answer">
            <div className="text-5 in-what-we-do faq">
              Mainly during the important decisions. Once the partnership begins, we spend the first two weeks understanding your brand in depth through our onboarding process. After that, the strategy, planning, and execution are handled by us, while you stay involved through approvals and key checkpoints—not everyday management.
            </div>
          </div>
        </div>

        <div className="uui-faq01_accordion black">
          <div className="uui-faq01_question faq">
            <div className="text-7 faq">
              <strong className="bold-text faq">How do you make sure the content actually feels like our brand?</strong>
            </div>
            <div className="uui-faq01_icon-wrapper">
              <div className="accordion-icon_component faq">
                <img src={polygonPurple} loading="lazy" alt="" className="image-7" />
              </div>
            </div>
          </div>
          <div style={{ height: "0px" }} className="uui-faq01_answer">
            <div className="text-5 in-what-we-do faq">
              We don’t start by creating—we start by understanding. Your brand voice, audience, goals, and personality become the foundation of everything we produce. The aim isn’t just good-looking content; it’s content that genuinely feels like your brand.
            </div>
          </div>
        </div>

        <div className="uui-faq01_accordion black">
          <div className="uui-faq01_question faq">
            <div className="text-7 faq">
              <strong className="bold-text faq">How do you decide what content to create?</strong>
            </div>
            <div className="uui-faq01_icon-wrapper">
              <div className="accordion-icon_component faq">
                <img src={polygonPurple} loading="lazy" alt="" className="image-7" />
              </div>
            </div>
          </div>
          <div style={{ height: "0px" }} className="uui-faq01_answer">
            <div className="text-5 in-what-we-do faq">
              Nothing is created randomly. Every idea is backed by your business goals, audience behavior, platform trends, and content strategy. We focus on creating content that not only looks great but also serves a purpose.
            </div>
          </div>
        </div>

        <div className="uui-faq01_accordion black">
          <div className="uui-faq01_question faq">
            <div className="text-7 faq">
              <strong className="bold-text faq">How do revisions work?</strong>
            </div>
            <div className="uui-faq01_icon-wrapper">
              <div className="accordion-icon_component faq">
                <img src={polygonPurple} loading="lazy" alt="" className="image-7" />
              </div>
            </div>
          </div>
          <div style={{ height: "0px" }} className="uui-faq01_answer">
            <div className="text-5 in-what-we-do faq">
              Before we begin, we mutually decide the number of revision rounds and include them in the agreement. Feedback is collected in a structured way, and revisions are carried out within the agreed scope to keep the creative process smooth, efficient, and transparent.
            </div>
          </div>
        </div>

        <div className="uui-faq01_accordion black">
          <div className="uui-faq01_question faq">
            <div className="text-7 faq">
              <strong className="bold-text faq">How do you ensure consistency across all our content?</strong>
            </div>
            <div className="uui-faq01_icon-wrapper">
              <div className="accordion-icon_component faq">
                <img src={polygonPurple} loading="lazy" alt="" className="image-7" />
              </div>
            </div>
          </div>
          <div style={{ height: "0px" }} className="uui-faq01_answer">
            <div className="text-5 in-what-we-do faq">
              Consistency comes from systems, not luck. We establish clear creative guidelines during onboarding and follow a structured content workflow throughout the partnership. This ensures every reel, design, campaign, and piece of communication feels like it comes from the same brand.
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="testimonials">
      <div className="container1440 testimonails">
        <div className="box-holder our-works testimonial-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'inline-block', backgroundColor: 'rgba(235, 126, 61, 0.15)', color: '#eb7e3d', padding: '6px 14px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              ★ Media Mention & Feedback
            </div>
            <h1 words-slide-up="" text-split="" className="top-section-heading testimonail-head" style={{ margin: 0 }}>
              Media Mention &amp;<br />
              Client Feedback
            </h1>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button className="carousel-prev-btn" aria-label="Previous Testimonial" style={{ cursor: 'pointer', padding: '12px 18px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(255,255,255,0.08)', color: '#ffffff', fontWeight: 'bold', fontSize: '18px', transition: 'all 0.3s ease' }}>
              &larr;
            </button>
            <button className="carousel-next-btn" aria-label="Next Testimonial" style={{ cursor: 'pointer', padding: '12px 18px', borderRadius: '30px', border: 'none', backgroundColor: '#eb7e3d', color: '#ffffff', fontWeight: 'bold', fontSize: '18px', transition: 'all 0.3s ease' }}>
              &rarr;
            </button>
          </div>
        </div>
        <section data-w-id="ed10074a-0885-42d0-b0cb-be396d9b432c" className="uui-section_testimonial16-2">
          <div className="uui-padding-vertical-xhuge-2">
            <div className="uui-testimonial16_component-2">
              <div className="uui-testimonial16_loop-trigger-2">
                <div className="uui-testimonial16_content-2 black">
                  <div className="uui-testimonial16_rating-wrapper-2">
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="uui-heading-xxsmall-2 text-weight-medium white">
                    <strong>                    <em>                    Media Mansion
</em>
</strong>
                    goes above and beyond by taking true ownership of every project. Their commitment to reading our brand&#39;s essence was evident throughout our collaboration. They did not just work for us- they worked with us. We obtained design outcomes reflecting a deep understanding of our brand and its goals.
                  </div>
                  <div className="uui-testimonial16_client-2">
                    <div className="uui-testimonial16_client-image-wrapper-2">
                      <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay.jpg" loading="lazy" sizes="(max-width: 3703px) 100vw, 3703px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay-p-500.jpg 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay-p-800.jpg 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay-p-1080.jpg 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay-p-1600.jpg 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay-p-2000.jpg 2000w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay-p-2600.jpg 2600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay-p-3200.jpg 3200w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay.jpg 3703w" alt="" className="uui-testimonial16_customer-image-2" />
                    </div>
                    <div className="uui-testimonial16_client-info-2">
                      <div className="uui-testimonial16_client-heading-2 white">
                        Vijay Rathod
                      </div>
                      <div className="uui-text-size-small-2 white">
                        Founder
                      </div>
                      <div className="uui-text-size-small-2 white">
                        at OhNo Xperience
                      </div>
                    </div>
                    <div className="uui-testimonial16_client-image-wrapper-2">
                      <img src={starPurple} loading="lazy" alt="" className="uui-testimonial16_customer-image-2 star" />
                    </div>
                  </div>
                </div>
                <div className="uui-testimonial16_content-2">
                  <div className="uui-testimonial16_rating-wrapper-2">
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="uui-heading-xxsmall-2 text-weight-medium">
                    <strong>                    <em>                    Media Mansion
</em>
                    feels like a family without which nothing is the same. The creativity, effort, dedication, and, most importantly, love that they bear for us and our brands is the best thing about them. From the quality of our photographic and video content to copywriting, everybody on the team always brings their A Game.
</strong>
                  </div>
                  <div className="uui-testimonial16_client-2">
                    <div className="uui-testimonial16_client-image-wrapper-2">
                      <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b4fb93c4c6592d439ec9_WhatsApp%20Image%202023-12-19%20at%209.17.04%20PM.jpeg" loading="lazy" sizes="(max-width: 767px) 100vw, 768px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b4fb93c4c6592d439ec9_WhatsApp%20Image%202023-12-19%20at%209.17.04%20PM-p-500.jpeg 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b4fb93c4c6592d439ec9_WhatsApp%20Image%202023-12-19%20at%209.17.04%20PM.jpeg 768w" alt="" className="uui-testimonial16_customer-image-2" />
                    </div>
                    <div className="uui-testimonial16_client-info-2">
                      <div className="uui-testimonial16_client-heading-2">
                        Kanha Jaiswal
                      </div>
                      <div className="uui-text-size-small-2">
                        Founder
                      </div>
                      <div className="uui-text-size-small-2">
                        at Pours N Plate
                      </div>
                    </div>
                    <div className="uui-testimonial16_client-image-wrapper-2">
                      <img src={starPurple} loading="lazy" alt="" className="uui-testimonial16_customer-image-2 star" />
                    </div>
                  </div>
                </div>
                <div className="uui-testimonial16_content-2 black">
                  <div className="uui-testimonial16_rating-wrapper-2">
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="uui-heading-xxsmall-2 text-weight-medium white">
                    They worked effortlessly to deliver every expectation that I had of my place within the stipulated time, with beautiful ideas that could connect to every patient visiting for treatment. The team was always available for any doubts, confusion, or changes. They were very proactive and prompt. I can’t thank them enough.
                  </div>
                  <div className="uui-testimonial16_client-2">
                    <div className="uui-testimonial16_client-image-wrapper-2">
                      <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b822a3ad832602bb43b5_WhatsApp%20Image%202023-12-20%20at%207.55.04%20PM.jpeg" loading="lazy" sizes="(max-width: 1324px) 100vw, 1324px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b822a3ad832602bb43b5_WhatsApp%20Image%202023-12-20%20at%207.55.04%20PM-p-500.jpeg 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b822a3ad832602bb43b5_WhatsApp%20Image%202023-12-20%20at%207.55.04%20PM-p-800.jpeg 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b822a3ad832602bb43b5_WhatsApp%20Image%202023-12-20%20at%207.55.04%20PM-p-1080.jpeg 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b822a3ad832602bb43b5_WhatsApp%20Image%202023-12-20%20at%207.55.04%20PM.jpeg 1324w" alt="" className="uui-testimonial16_customer-image-2" />
                    </div>
                    <div className="uui-testimonial16_client-info-2">
                      <div className="uui-testimonial16_client-heading-2 white">
                        Dr. Soumya Rathi
                      </div>
                      <div className="uui-text-size-small-2 white">
                        Founder
                        <br />
                        at Ace Fertility Centre
                      </div>
                    </div>
                    <div className="uui-testimonial16_client-image-wrapper-2">
                      <img src={starPurple} loading="lazy" alt="" className="uui-testimonial16_customer-image-2" />
                    </div>
                  </div>
                </div>
                <div className="uui-testimonial16_content-2">
                  <div className="uui-testimonial16_rating-wrapper-2">
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="uui-heading-xxsmall-2 text-weight-medium">
                    Media Mansion is an exceptional agency that handled all my branding and product design with expertise. Their understanding of UI/UX science and a team of senior product designers set them apart. Bhavik, a veteran, showcases brilliant branding and design acumen. Highly recommended for their superb speed, reliability, and prompt communication
                  </div>
                  <div className="uui-testimonial16_client-2">
                    <div className="uui-testimonial16_client-image-wrapper-2">
                      <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b9d117ff14a338064047_aksha.jpeg" loading="lazy" alt="" className="uui-testimonial16_customer-image-2" />
                    </div>
                    <div className="uui-testimonial16_client-info-2">
                      <div className="uui-testimonial16_client-heading-2">
                        Akshit Banta
                      </div>
                      <div className="uui-text-size-small-2">
                        Founder
                        <br />
                        at Clences
                      </div>
                    </div>
                    <div className="uui-testimonial16_client-image-wrapper-2">
                      <img src={starPurple} loading="lazy" alt="" className="uui-testimonial16_customer-image-2" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="uui-testimonial16_loop-trigger-2">
                <div className="uui-testimonial16_content-2 black">
                  <div className="uui-testimonial16_rating-wrapper-2">
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="uui-heading-xxsmall-2 text-weight-medium white">
                    "Media Mansion turns branding into brilliance! Their unwavering support, exceeding tight deadlines, and seamless communication set them apart. With dedication, innovation, and a proactive approach, they transform collaboration into a rewarding experience. I wholeheartedly recommend Media Mansion for top-tier branding and marketing services!"
                  </div>
                  <div className="uui-testimonial16_client-2">
                    <div className="uui-testimonial16_client-image-wrapper-2">
                      <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay.jpg" loading="lazy" sizes="(max-width: 3703px) 100vw, 3703px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay-p-500.jpg 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay-p-800.jpg 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay-p-1080.jpg 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay-p-1600.jpg 1600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay-p-2000.jpg 2000w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay-p-2600.jpg 2600w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay-p-3200.jpg 3200w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b3b51390246f60bdb2b4_Vijay.jpg 3703w" alt="" className="uui-testimonial16_customer-image-2" />
                    </div>
                    <div className="uui-testimonial16_client-info-2">
                      <div className="uui-testimonial16_client-heading-2 white">
                        Vijay Rathod
                      </div>
                      <div className="uui-text-size-small-2 white">
                        Founder
                      </div>
                      <div className="uui-text-size-small-2 white">
                        at OhNo Xperience
                      </div>
                    </div>
                    <div className="uui-testimonial16_client-image-wrapper-2">
                      <img src={starPurple} loading="lazy" alt="" className="uui-testimonial16_customer-image-2 star" />
                    </div>
                  </div>
                </div>
                <div className="uui-testimonial16_content-2">
                  <div className="uui-testimonial16_rating-wrapper-2">
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="uui-heading-xxsmall-2 text-weight-medium">
                    Media Mansion, a creative family, ensures our brand's magic with unmatched dedication and clear communication. Mr. Bhavik and Ankita prioritize our needs, delivering top-notch, timely content—effortless collaboration that keeps social media updated and clients engaged with relatable, aesthetic material.
                  </div>
                  <div className="uui-testimonial16_client-2">
                    <div className="uui-testimonial16_client-image-wrapper-2">
                      <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b4fb93c4c6592d439ec9_WhatsApp%20Image%202023-12-19%20at%209.17.04%20PM.jpeg" loading="lazy" sizes="(max-width: 767px) 100vw, 768px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b4fb93c4c6592d439ec9_WhatsApp%20Image%202023-12-19%20at%209.17.04%20PM-p-500.jpeg 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b4fb93c4c6592d439ec9_WhatsApp%20Image%202023-12-19%20at%209.17.04%20PM.jpeg 768w" alt="" className="uui-testimonial16_customer-image-2" />
                    </div>
                    <div className="uui-testimonial16_client-info-2">
                      <div className="uui-testimonial16_client-heading-2">
                        Kanha Jaiswal
                      </div>
                      <div className="uui-text-size-small-2">
                        Founder
                      </div>
                      <div className="uui-text-size-small-2">
                        at Pours N Plate
                      </div>
                    </div>
                    <div className="uui-testimonial16_client-image-wrapper-2">
                      <img src={starPurple} loading="lazy" alt="" className="uui-testimonial16_customer-image-2 star" />
                    </div>
                  </div>
                </div>
                <div className="uui-testimonial16_content-2 black">
                  <div className="uui-testimonial16_rating-wrapper-2">
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="uui-heading-xxsmall-2 text-weight-medium white">
                    In 2022, I turned my dream IVF center into reality with Media Mansion. Led by Mr. Bhavik Mehta, the team surpassed expectations, delivering timely, beautiful ideas. Their dedication and proactive approach earned my trust for future projects. Grateful for their commitment and perfection.
                  </div>
                  <div className="uui-testimonial16_client-2">
                    <div className="uui-testimonial16_client-image-wrapper-2">
                      <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b822a3ad832602bb43b5_WhatsApp%20Image%202023-12-20%20at%207.55.04%20PM.jpeg" loading="lazy" sizes="(max-width: 1324px) 100vw, 1324px" srcSet="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b822a3ad832602bb43b5_WhatsApp%20Image%202023-12-20%20at%207.55.04%20PM-p-500.jpeg 500w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b822a3ad832602bb43b5_WhatsApp%20Image%202023-12-20%20at%207.55.04%20PM-p-800.jpeg 800w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b822a3ad832602bb43b5_WhatsApp%20Image%202023-12-20%20at%207.55.04%20PM-p-1080.jpeg 1080w, https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b822a3ad832602bb43b5_WhatsApp%20Image%202023-12-20%20at%207.55.04%20PM.jpeg 1324w" alt="" className="uui-testimonial16_customer-image-2" />
                    </div>
                    <div className="uui-testimonial16_client-info-2">
                      <div className="uui-testimonial16_client-heading-2 white">
                        Dr. Soumya Rathi
                      </div>
                      <div className="uui-text-size-small-2 white">
                        Founder
                        <br />
                        at Ace Fertility Centre
                      </div>
                    </div>
                    <div className="uui-testimonial16_client-image-wrapper-2">
                      <img src={starPurple} loading="lazy" alt="" className="uui-testimonial16_customer-image-2" />
                    </div>
                  </div>
                </div>
                <div className="uui-testimonial16_content-2">
                  <div className="uui-testimonial16_rating-wrapper-2">
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                    <div className="uui-testimonial16_rating-icon-2 w-embed">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_28_8746)">
                          <path d="M9.53834 1.60996C9.70914 1.19932 10.2909 1.19932 10.4617 1.60996L12.5278 6.57744C12.5998 6.75056 12.7626 6.86885 12.9495 6.88383L18.3123 7.31376C18.7556 7.3493 18.9354 7.90256 18.5976 8.19189L14.5117 11.6919C14.3693 11.8139 14.3071 12.0053 14.3506 12.1876L15.5989 17.4208C15.7021 17.8534 15.2315 18.1954 14.8519 17.9635L10.2606 15.1592C10.1006 15.0615 9.89938 15.0615 9.73937 15.1592L5.14806 17.9635C4.76851 18.1954 4.29788 17.8534 4.40108 17.4208L5.64939 12.1876C5.69289 12.0053 5.6307 11.8139 5.48831 11.6919L1.40241 8.19189C1.06464 7.90256 1.24441 7.3493 1.68773 7.31376L7.05054 6.88383C7.23744 6.86885 7.40024 6.75056 7.47225 6.57744L9.53834 1.60996Z" fill="currentColor">
                          </path>
                        </g>
                      </svg>
                    </div>
                  </div>
                  <div className="uui-heading-xxsmall-2 text-weight-medium">
                    Media Mansion is an exceptional agency that handled all my branding and product design with expertise. Their understanding of UI/UX science and a team of senior product designers set them apart. Bhavik, a veteran, showcases brilliant branding and design acumen. Highly recommended for their superb speed, reliability, and prompt communication
                  </div>
                  <div className="uui-testimonial16_client-2">
                    <div className="uui-testimonial16_client-image-wrapper-2">
                      <img src="https://cdn.prod.website-files.com/65608907c44a511de5c27bc6/6585b9d117ff14a338064047_aksha.jpeg" loading="lazy" alt="" className="uui-testimonial16_customer-image-2" />
                    </div>
                    <div className="uui-testimonial16_client-info-2">
                      <div className="uui-testimonial16_client-heading-2">
                        Akshit Banta
                      </div>
                      <div className="uui-text-size-small-2">
                        Founder
                        <br />
                        at Clences
                      </div>
                    </div>
                    <div className="uui-testimonial16_client-image-wrapper-2">
                      <img src={starPurple} loading="lazy" alt="" className="uui-testimonial16_customer-image-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <section className="still-have-doubts">
      <div className="container1440 testimonails">
        <div className="box-holder our-works still-have-dbts">
          <h1 className="still-have-dbts-head">
          </h1>
          <h1 className="still-have-dbts-head">
            <span className="type-play-pan-1">            Still
</span>
            <span words-slide-up="" text-split="" className="type-play-span2">            HONESTLY
</span>
            <span className="type-play-pan-1">            have
</span>
            <span words-slide-up="" text-split="" className="type-play-span2">            WE
</span>
            <span className="type-play-pan-1">            doubts?
</span>
            <span words-slide-up="" text-split="" className="type-play-span2">            ARE
            <br />
            ‍
</span>
            <span className="type-play-pan-1">            We
</span>
            <span words-slide-up="" text-split="" className="type-play-span2">            THE
</span>
            <span className="type-play-pan-1">            can
</span>
            <span words-slide-up="" text-split="" className="type-play-span2">            ONLY
</span>
            <span className="type-play-pan-1">            understand!
</span>
            <span words-slide-up="" text-split="" className="type-play-span2">            SOLUTION
</span>
          </h1>
        </div>
        <div className="subheading-cta-holder getstartedin stillhavedoubts">
          <div className="subheading-holder still-have-dbts">
            <h5 className="heading still-have-dbts">
              That’s why we offer a 14-day trial period where you can get a feel for our services with a real project.
              <br />
            </h5>
          </div>
          <div className="buttonholder below">
            <a href="https://calendly.com/iambkmehta/ready-to-fly" className="button big w-inline-block">            <div className="button-inner p3_small herowhite redbg">
              Book Exploration Call
            </div>
            <div className="button-bg disabled">
            </div>
</a>
          </div>
        </div>
      </div>
    </section>
    <section className="footer">
      <div className="walsh-nav-logo infooter">
        <img src={mediamansionLogo} loading="lazy" alt="Media Mansion Logo" className="nav-logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
      </div>
      <div className="footer-content-holder">
        <a href="#3-easy-steps" className="navlink-holder do-not-show w-inline-block">        <div className="nav-link">
          PRIVACY POLICY
        </div>
</a>
        <a href="#3-easy-steps" className="navlink-holder do-not-show w-inline-block">        <div className="nav-link">
          TERMS OF SERVICE
        </div>
</a>
        <a href="#3-easy-steps" className="navlink-holder do-not-show w-inline-block">        <div className="nav-link">
          CONTACT US
        </div>
</a>
        <div href="#3-easy-steps" className="copyright-statement">
          <div className="copyright-statement">
            © 2025 . All rights reserved
          </div>
        </div>
      </div>
    </section>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
  
    </div>
  );
}
