"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const photos = {
  hero: "https://images.unsplash.com/photo-1675154134154-160ed169522e?auto=format&fit=crop&w=2400&q=90",
  maldives: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1400&q=85",
  bali: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1400&q=85",
  amalfi: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1400&q=85",
  feature: "https://images.unsplash.com/photo-1713502174761-415d3d9719d9?auto=format&fit=crop&w=2200&q=90",
  island: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1400&q=85",
  culture: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1400&q=85",
  wild: "https://images.unsplash.com/photo-1656691408381-abd98e368f80?auto=format&fit=crop&w=1400&q=85",
  collage1: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=85",
  collage2: "https://images.unsplash.com/photo-1613153262491-c1a4acb9795e?auto=format&fit=crop&w=900&q=85",
  collage3: "https://images.unsplash.com/photo-1687170635819-61eb8b40840d?auto=format&fit=crop&w=900&q=85",
  footer: "https://images.unsplash.com/photo-1643539515100-f55ad1e51ab8?auto=format&fit=crop&w=2200&q=90",
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className="arrow">{diagonal ? "↗" : "→"}</span>;
}

export default function Home() {
  const root = useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = useState("discover");

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const sections = element.querySelectorAll<HTMLElement>("section[id], footer[id]");
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      const active = visible[0]?.target;
      if (active instanceof HTMLElement) setActiveSection(active.id);
    }, { rootMargin: "-24% 0px -56% 0px", threshold: [0, 0.08, 0.2, 0.4] });
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const element = root.current;
    if (!element) return;
    const cleanups: Array<() => void> = [];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Keep teardown owned by one GSAP context; self-reverting matchMedia cleanups caused the prior recursion.
    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
        intro.from(element.querySelector(".hero-photo"), { clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "power3.inOut" })
          .from(element.querySelector(".nav-shell"), { y: -18, opacity: 0, duration: .7 }, "-=.62")
          .from(element.querySelectorAll(".hero-line"), { yPercent: 105, opacity: 0, stagger: .12, duration: .82, ease: "power3.out" }, "-=.24")
          .from(element.querySelector(".hero-note"), { y: 14, opacity: 0, duration: .55 }, "-=.28")
          .from(element.querySelector(".demo-badge"), { y: 10, opacity: 0, duration: .45 }, "-=.38")
          .from(element.querySelector(".nav-cta"), { scale: .96, opacity: 0, duration: .45 }, "-=.34")
          .from(element.querySelector(".scroll-cue"), { y: 12, opacity: 0, duration: .5 }, "-=.18");

        const heroImage = element.querySelector(".hero-photo img");
        gsap.to(heroImage, { yPercent: 8, ease: "none", scrollTrigger: { trigger: element.querySelector(".hero"), start: "top top", end: "bottom top", scrub: .7 } });
        for (const image of element.querySelectorAll<HTMLElement>(".reveal-image")) {
          gsap.fromTo(image, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.05, ease: "power3.inOut", scrollTrigger: { trigger: image, start: "top 82%", once: true } });
          if (image.parentElement?.classList.contains("photo-frame")) {
            gsap.to(image.parentElement, { y: 12, ease: "none", scrollTrigger: { trigger: image.parentElement, start: "top bottom", end: "bottom top", scrub: .6 } });
          }
        }
        for (const item of element.querySelectorAll<HTMLElement>(".rise")) {
          gsap.from(item, { y: 30, opacity: 0, duration: .75, ease: "power2.out", scrollTrigger: { trigger: item, start: "top 88%", once: true } });
        }
        for (const photo of element.querySelectorAll<HTMLElement>(".parallax-photo")) {
          gsap.to(photo, { yPercent: 8, ease: "none", scrollTrigger: { trigger: photo.parentElement, start: "top bottom", end: "bottom top", scrub: .7 } });
        }
        gsap.from(element.querySelectorAll(".manifesto-words"), { y: 42, opacity: 0, stagger: .1, duration: .8, scrollTrigger: { trigger: element.querySelector(".manifesto"), start: "top 70%", once: true } });
        for (const row of element.querySelectorAll<HTMLElement>(".experience-row")) {
          const image = row.querySelector(".experience-image");
          const copy = row.querySelector(".experience-name");
          gsap.from(image, { clipPath: "inset(0 100% 0 0 round 16px)", scale: .96, duration: .85, ease: "power3.inOut", scrollTrigger: { trigger: row, start: "top 82%", once: true } });
          gsap.from(copy, { x: 28, opacity: 0, duration: .7, ease: "power2.out", scrollTrigger: { trigger: row, start: "top 82%", once: true } });
        }
        for (const shot of element.querySelectorAll<HTMLElement>(".collage-shot")) {
          gsap.from(shot, { y: 32, rotate: 0, scale: .96, opacity: 0, duration: .85, ease: "power3.out", scrollTrigger: { trigger: shot, start: "top 86%", once: true } });
        }
        gsap.from(element.querySelector(".featured-location"), { x: -18, opacity: 0, duration: .65, ease: "power2.out", scrollTrigger: { trigger: element.querySelector(".featured"), start: "top 68%", once: true } });
        gsap.from(element.querySelector(".featured-content h2"), { y: 38, opacity: 0, duration: .9, delay: .1, ease: "power3.out", scrollTrigger: { trigger: element.querySelector(".featured"), start: "top 68%", once: true } });
        gsap.from(element.querySelector(".footer-photo"), { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "power3.inOut", scrollTrigger: { trigger: element.querySelector(".footer"), start: "top 75%", once: true } });
        gsap.from(element.querySelector(".footer-heading h2"), { y: 42, opacity: 0, duration: .85, ease: "power3.out", scrollTrigger: { trigger: element.querySelector(".footer"), start: "top 62%", once: true } });
        gsap.from(element.querySelector(".footer-cta"), { y: 18, scale: .94, opacity: 0, duration: .65, delay: .18, ease: "power2.out", scrollTrigger: { trigger: element.querySelector(".footer"), start: "top 62%", once: true } });
        for (const button of element.querySelectorAll<HTMLElement>(".magnetic")) {
          const onMove = (event: PointerEvent) => {
            const rect = button.getBoundingClientRect();
            gsap.to(button, { x: (event.clientX - rect.left - rect.width / 2) * .08, y: (event.clientY - rect.top - rect.height / 2) * .12, duration: .3, overwrite: true });
          };
          const onLeave = () => gsap.to(button, { x: 0, y: 0, duration: .5, ease: "power2.out" });
          button.addEventListener("pointermove", onMove);
          button.addEventListener("pointerleave", onLeave);
          cleanups.push(() => {
            button.removeEventListener("pointermove", onMove);
            button.removeEventListener("pointerleave", onLeave);
          });
        }
      }
    }, root);
    return () => {
      for (const cleanup of cleanups) cleanup();
      ctx.revert();
    };
  }, []);

  return (
    <main ref={root} data-active-section={activeSection}>
      <section className="hero" id="discover" aria-label="Discover the world">
        <div className="hero-photo"><img src={photos.hero} alt="Aerial view of a tropical island surrounded by turquoise lagoon and deep blue ocean" /></div>
        <div className="hero-shade" />
        <header className="nav-shell">
          <a className="wordmark" href="#discover" aria-label="Voyare home">V<span>O</span>YARE<span className="wordmark-dot">.</span></a>
          <nav className="main-nav" aria-label="Main navigation">{[["discover", "Discover"], ["destinations", "Destinations"], ["experiences", "Experiences"], ["manifesto", "Journal"]].map(([id, label]) => <a key={id} href={`#${id}`} className={activeSection === id ? "is-active" : undefined} aria-current={activeSection === id ? "location" : undefined} onClick={() => setActiveSection(id)}>{label}</a>)}</nav>
          <a className="nav-cta magnetic" href="https://shohan-portfolio-tau.vercel.app/" target="_blank" rel="noopener noreferrer">BUY THIS WEBSITE <Arrow diagonal /></a>
          <a className="mobile-menu" href="#destinations" aria-label="Explore destinations">Explore <span>↓</span></a>
        </header>
        <div className="hero-content">
          <p className="eyebrow hero-kicker"><span className="live-dot" /> A different kind of elsewhere <span className="eyebrow-line" /></p>
          <h1><span className="line-mask"><span className="hero-line">Unforgettable</span></span><span className="line-mask"><span className="hero-line serif-word">Travel Moments</span></span><span className="line-mask"><span className="hero-line">by Voyare</span></span></h1>
          <p className="hero-note">Thoughtful escapes to faraway shores,<br />made for the moments that stay with you.</p>
        </div>
        <a className="scroll-cue" href="#destinations"><span>Scroll to wander</span><i /></a>
        <div className="demo-badge"><span aria-hidden="true" />DEMO / DESIGN ONLY</div>
        <div className="hero-index">01 <span>/</span> 06</div>
      </section>

      <section className="destinations section-pad" id="destinations">
        <div className="section-heading rise"><div><p className="eyebrow dark-eyebrow">A world of its own</p><h2>Somewhere<br /><em>Beyond Ordinary</em></h2></div><p className="heading-aside">The best journeys don’t just take you somewhere.<br />They bring you a little closer to yourself.</p></div>
        <div className="destination-grid">
          <article className="destination-card destination-main"><div className="photo-frame reveal-image"><img src={photos.maldives} alt="Overwater villas surrounded by the Maldives lagoon" /></div><div className="destination-caption rise"><div><p className="eyebrow dark-eyebrow">01 — Indian Ocean</p><h3>Maldives<span className="caption-country"> / Atolls of wonder</span></h3><p className="destination-copy">Barefoot mornings, blue in every direction, and nowhere else you need to be.</p></div><a href="#contact" className="round-arrow" aria-label="Explore Maldives"><Arrow diagonal /></a></div><span className="image-stamp">3° 12′ N<br />73° 13′ E</span></article>
          <article className="destination-card destination-secondary"><div className="photo-frame reveal-image"><img src={photos.bali} alt="Lush Balinese temple and tropical greenery" /></div><div className="destination-caption rise"><div><p className="eyebrow dark-eyebrow">02 — Indonesia</p><h3>Bali</h3><p className="destination-copy">A slower rhythm, a deeper breath, a thousand small wonders.</p></div><a href="#contact" className="round-arrow" aria-label="Explore Bali"><Arrow diagonal /></a></div></article>
          <article className="destination-card destination-tertiary"><div className="photo-frame reveal-image"><img src={photos.amalfi} alt="Colorful villages along the Amalfi Coast" /></div><div className="destination-caption rise"><div><p className="eyebrow dark-eyebrow">03 — Southern Italy</p><h3>Amalfi Coast</h3><p className="destination-copy">Salt air, long lunches, and the art of taking the scenic route.</p></div><a href="#contact" className="round-arrow" aria-label="Explore the Amalfi Coast"><Arrow diagonal /></a></div></article>
        </div>
        <a className="text-link rise" href="#contact">Explore every possibility <Arrow /></a>
      </section>

      <section className="experiences section-pad" id="experiences">
        <div className="experience-top rise"><p className="eyebrow light-eyebrow"><span className="coral-dash" /> The art of getting away</p><p className="experience-count">MADE FOR THE<br />WAY YOU FEEL</p></div>
        <h2 className="experience-title rise">Not Just Places.<br /><em>Stories You’ll Keep.</em></h2>
        <div className="experience-list">
          <a className="experience-row" href="#contact"><span className="experience-num">01</span><div className="experience-image"><img src={photos.island} alt="Secluded island retreat set among palms" /></div><div className="experience-name"><h3>Private Island<br /><em>Escapes</em></h3><span>For your own little world</span></div><span className="experience-arrow"><Arrow diagonal /></span></a>
          <a className="experience-row" href="#contact"><span className="experience-num">02</span><div className="experience-image"><img src={photos.culture} alt="Traditional architecture nestled in a tropical landscape" /></div><div className="experience-name"><h3>Hidden Cultural<br /><em>Gems</em></h3><span>For the curious at heart</span></div><span className="experience-arrow"><Arrow diagonal /></span></a>
          <a className="experience-row" href="#contact"><span className="experience-num">03</span><div className="experience-image"><img src={photos.wild} alt="Aerial view of a vibrant tropical coral reef beneath clear blue water" /></div><div className="experience-name"><h3>Wild & Untamed<br /><em>Journeys</em></h3><span>For the beautifully bold</span></div><span className="experience-arrow"><Arrow diagonal /></span></a>
        </div>
        <div className="experience-foot"><span>TAKE THE LONG WAY</span><span>✳</span><span>STAY A LITTLE LONGER</span></div>
      </section>

      <section className="featured" aria-labelledby="featured-title">
        <div className="featured-photo"><img className="parallax-photo" src={photos.feature} alt="Aerial view of a turquoise Bali shoreline with pale sand and clear blue water" /></div><div className="featured-overlay" />
        <div className="featured-top"><span className="eyebrow light-eyebrow">A place to begin again</span><span className="featured-number">NO. 004</span></div>
        <div className="featured-content rise"><p className="featured-location"><span>✳</span> BALI · SOUTH COAST</p><h2 id="featured-title">Find Your<br /><em>Kind of Paradise.</em></h2><p className="featured-copy">Where the island meets the sea, days soften at the edges. Follow the coast until you find your own kind of nowhere.</p><a className="outline-button magnetic" href="#contact">Explore the south coast <Arrow diagonal /></a></div>
        <span className="featured-side-note">A slower kind of blue <i>—</i> 05° 56′ N</span>
      </section>

      <section className="manifesto section-pad" id="manifesto">
        <div className="manifesto-top rise"><p className="eyebrow dark-eyebrow">A note from the elsewhere</p><span className="manifesto-star">✳</span><span className="manifesto-edition">THE VOYARE<br />TRAVEL NOTES · 01</span></div>
        <div className="manifesto-layout"><div className="manifesto-copy"><h2><span className="manifesto-words">Collect</span> <span className="manifesto-words serif-word">Moments.</span><br /><span className="manifesto-words">Not</span> <span className="manifesto-words coral-type">Miles.</span></h2><p className="manifesto-body rise">Leave the familiar at the door. Take the winding road, say yes to the long lunch, learn the name of the person who made your coffee. The world opens up in the little things — and we’re here to help you find them.</p><a className="text-link rise" href="#contact">A little more about us <Arrow /></a><span className="hand-note">go where you feel most alive <b>↗</b></span></div>
          <div className="manifesto-collage"><figure className="collage-shot collage-one"><img className="reveal-image" src={photos.collage1} alt="Cinque Terre village overlooking the Italian coastline" /><figcaption>Somewhere along the coast, Italy</figcaption></figure><figure className="collage-shot collage-two"><img className="reveal-image" src={photos.collage2} alt="Sunlit coral reef patterns beneath clear turquoise water" /><figcaption>Blue beneath the surface</figcaption></figure><figure className="collage-shot collage-three"><img className="reveal-image" src={photos.collage3} alt="Aerial tropical beach with white sand and turquoise surf" /><span>Take a breath.</span></figure><span className="collage-scribble">the world<br />is waiting</span></div></div>
      </section>

      <footer className="footer" id="contact">
        <div className="footer-photo"><img src={photos.footer} alt="Aerial tropical shoreline with turquoise water breaking around a palm-lined beach" /></div><div className="footer-shade" />
        <div className="footer-main"><div className="footer-heading"><p className="eyebrow light-eyebrow"><span className="live-dot" /> Your next chapter</p><h2>Your Next Story<br /><em>Starts Somewhere.</em></h2><a className="footer-cta magnetic" href="mailto:hello@voyare.travel">Let’s Explore <Arrow diagonal /></a></div>
          <div className="footer-bottom"><div className="footer-brand"><a className="wordmark" href="#discover">V<span>O</span>YARE<span className="wordmark-dot">.</span></a><p>For the feeling of being<br />somewhere else entirely.</p></div><nav aria-label="Footer navigation" className="footer-links"><a href="#discover">Discover</a><a href="#destinations">Destinations</a><a href="#experiences">Experiences</a><a href="#manifesto">Journal</a></nav><div className="footer-social"><span>FIND US OUT THERE</span><div><a href="#contact" aria-label="Instagram">IG</a><a href="#contact" aria-label="Pinterest">PI</a><a href="#contact" aria-label="TikTok">TK</a></div></div><div className="footer-meta"><span>© VOYARE 2026</span><span>MADE FOR THE WAY YOU FEEL</span><a href="#discover" className="back-top">Back to top ↑</a></div></div>
        </div>
      </footer>
    </main>
  );
}
