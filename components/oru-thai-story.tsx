'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  Navigation,
  ShieldCheck,
  Sprout,
} from 'lucide-react'

const partnerMarks = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nrpf%20logo-lDyYLmIJpgMmc1KiYGTl5P34lU02rL.png',
    alt: 'NRPF logo with green and yellow leaves',
    className: 'partner-logo partner-logo--nrpf',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Certificate%20%282%29-3X4mBD9ln1uTkM820BuiNhaDqWm4XQ.png',
    alt: 'National Service Scheme emblem',
    className: 'partner-logo partner-logo--nss',
  },
]

const chapters = [
  {
    id: 'ground',
    number: '01',
    eyebrow: 'FIND THE SOIL',
    title: 'Every green story starts with a place.',
    description:
      'Before a sapling takes root, a volunteer finds the right ground. We map open spaces, mark coordinates, and listen to what the land needs.',
    note: 'Scout · Map · Make room',
    Icon: MapPin,
  },
  {
    id: 'growth',
    number: '02',
    eyebrow: 'NURTURE GROWTH',
    title: 'Plant with care. Keep showing up.',
    description:
      'Planting is a promise, not a finish line. Each tree is recorded with its species, a geotagged photograph, and a care plan for the months ahead.',
    note: 'Plant · Document · Tend',
    Icon: Sprout,
  },
  {
    id: 'impact',
    number: '03',
    eyebrow: 'STAND TALL',
    title: 'Small acts become a living canopy.',
    description:
      'Verified contributions become part of a transparent record of change—so every volunteer can see the roots they have helped put down.',
    note: 'Verify · Share · Grow',
    Icon: ShieldCheck,
  },
]

function PartnerLogos({ footer = false }: { footer?: boolean }) {
  return (
    <div className={`partner-logos${footer ? ' partner-logos--footer' : ''}`} aria-label="Project partners">
      {partnerMarks.map((mark) => (
        <img key={mark.alt} className={mark.className} src={mark.src} alt={mark.alt} />
      ))}
    </div>
  )
}

export default function OruThaiStory() {
  const [activeChapter, setActiveChapter] = useState(0)
  const [motionReady, setMotionReady] = useState(false)

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('.reveal'))
    if (!('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      setMotionReady(true)
      return
    }

    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    revealItems.forEach((item) => revealObserver.observe(item))

    const chapterObserver = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (current) {
          const index = chapters.findIndex((chapter) => chapter.id === current.target.id)
          if (index >= 0) setActiveChapter(index)
        }
      },
      { threshold: [0.2, 0.45, 0.7], rootMargin: '-18% 0px -24% 0px' },
    )
    document.querySelectorAll<HTMLElement>('[data-story-chapter]').forEach((chapter) => chapterObserver.observe(chapter))
    setMotionReady(true)

    return () => {
      revealObserver.disconnect()
      chapterObserver.disconnect()
    }
  }, [])

  const current = chapters[activeChapter]
  const CurrentIcon = current.Icon

  return (
    <div className={`story-page${motionReady ? ' is-ready' : ''}`}>
      <header className="site-header">
        <a className="brand-lockup" href="#top" aria-label="Oru Thai home">
          <span className="brand-title" lang="ml">ഒരു തൈ</span>
          <span className="brand-divider" aria-hidden="true" />
          <span className="brand-subtitle">ORU THAI<br />A GREENER TOMORROW</span>
        </a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="#story">Our story</a>
          <a href="#movement">The movement</a>
        </nav>
        <div className="header-partners">
          <span className="partner-caption">A youth-led initiative</span>
          <PartnerLogos />
        </div>
      </header>

      <main>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <Image
            className="hero-image"
            src="/seedling-story-hero.png"
            alt="A young volunteer planting a sapling in rich soil, with green hills beyond"
            fill
            priority
            sizes="100vw"
          />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> NSS MBCCET · ROOTED IN ACTION</p>
            <h1 id="hero-title" lang="ml">ഒരു തൈ</h1>
            <p className="hero-title-english">One sapling.<br /><em>A thousand tomorrows.</em></p>
            <p className="hero-description">Plant a sapling, root for a greener tomorrow. A story of young hands, living soil, and change that keeps growing.</p>
            <div className="hero-actions">
              <a className="button button--lime" href="#story">Follow the journey <ArrowDown aria-hidden="true" /></a>
              <a className="text-link text-link--light" href="https://treetag.in/student/TwmI2phg7ae6GKMDiSw0rgeIqwC2" target="_blank" rel="noreferrer">Meet a volunteer <ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
          <div className="hero-side-note" aria-hidden="true"><span>ROOTED IN THE PRESENT</span><span className="side-note-line" /><span>GROWING FOR THE FUTURE</span></div>
          <a className="scroll-cue" href="#story"><span>SCROLL TO BEGIN</span><ArrowDown aria-hidden="true" /></a>
          <div className="hero-index" aria-hidden="true"><span>01</span><span className="hero-index-line" /><span>03</span></div>
        </section>

        <section className="intro-band" aria-label="Our purpose">
          <p className="intro-kicker reveal">A SEED OF CHANGE</p>
          <p className="intro-copy reveal">The future doesn&apos;t grow by itself.<br /><span>It grows because we show up.</span></p>
          <Sprout className="intro-sprout reveal" aria-hidden="true" />
        </section>

        <section className="story-section" id="story" aria-labelledby="story-title">
          <div className="story-heading reveal">
            <p className="eyebrow"><span className="eyebrow-dot" /> THE JOURNEY</p>
            <h2 id="story-title">From a patch of earth<br />to a <em>forest of possibility.</em></h2>
            <p>Every tree tells a story. This is how we make sure it gets to grow.</p>
          </div>

          <div className="chapter-layout">
            <div className="chapter-visual-column">
              <div className={`chapter-visual chapter-visual--${current.id}`} aria-live="polite" aria-label={`Chapter ${current.number}: ${current.eyebrow}`}>
                <div className="visual-grain" aria-hidden="true" />
                <div className="visual-topline"><span>FIELD NOTES</span><span>{current.number} / 03</span></div>
                <div className="visual-art" aria-hidden="true">
                  <div className="visual-orbit visual-orbit--one" />
                  <div className="visual-orbit visual-orbit--two" />
                  <div className="visual-ground" />
                  <div className="visual-mark">
                    <CurrentIcon strokeWidth={1.35} />
                  </div>
                  {current.id === 'ground' && <div className="map-coordinate"><Navigation aria-hidden="true" /><span>10° 02&apos; N<br />76° 37&apos; E</span></div>}
                  {current.id === 'growth' && <div className="growth-stem"><span /><span /><span /></div>}
                  {current.id === 'impact' && <div className="canopy-dots"><i /><i /><i /><i /><i /><i /></div>}
                </div>
                <div className="visual-caption"><span className="caption-number">{current.number}</span><div><span>OUR NEXT CHAPTER</span><strong>{current.eyebrow}</strong></div><ArrowRight aria-hidden="true" /></div>
              </div>
              <div className="visual-progress" aria-label={`Showing chapter ${current.number} of 03`}>
                {chapters.map((chapter, index) => <span key={chapter.id} className={index <= activeChapter ? 'is-active' : ''} />)}
              </div>
            </div>

            <div className="chapter-list">
              {chapters.map((chapter) => {
                const Icon = chapter.Icon
                return (
                  <article className="chapter-copy reveal" id={chapter.id} data-story-chapter key={chapter.id}>
                    <div className="chapter-meta"><span>{chapter.number}</span><span className="chapter-meta-line" /><span>{chapter.eyebrow}</span></div>
                    <div className="chapter-icon"><Icon aria-hidden="true" strokeWidth={1.6} /></div>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.description}</p>
                    <div className="chapter-note"><Check aria-hidden="true" /><span>{chapter.note}</span></div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        <section className="impact-strip" aria-label="Our promise">
          <div className="impact-mark reveal"><Sprout aria-hidden="true" /></div>
          <p className="impact-quote reveal">“A tree is never just a tree.<br /><em>It&apos;s a promise we keep together.”</em></p>
          <span className="impact-attribution reveal">THE ORU THAI PROMISE</span>
        </section>

        <section className="cta-section" id="movement" aria-labelledby="cta-title">
          <div className="cta-backdrop" aria-hidden="true"><span /><span /><span /></div>
          <div className="cta-content reveal">
            <p className="eyebrow eyebrow--light"><span className="eyebrow-dot" /> YOUR TURN TO GROW</p>
            <h2 id="cta-title">Ready to root<br />for <em>change?</em></h2>
            <p>One small act can become a place for life to thrive. Find your place in the story.</p>
            <a className="button button--lime button--cta" href="https://treetag.in/student/TwmI2phg7ae6GKMDiSw0rgeIqwC2" target="_blank" rel="noreferrer">View volunteer profile <ArrowUpRight aria-hidden="true" /></a>
            <span className="cta-footnote">YOUR NEXT CHAPTER STARTS HERE</span>
          </div>
          <div className="cta-stamp" aria-hidden="true"><span>GROW<br />TOGETHER</span><Sprout /></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="footer-title" href="#top" lang="ml">ഒരു തൈ</a>
            <p>Little roots. Lasting change.</p>
          </div>
          <div className="footer-partners">
            <span className="footer-partner-label">GROWING TOGETHER WITH</span>
            <PartnerLogos footer />
          </div>
          <a className="instagram-link" href="https://www.instagram.com/nss_mbc?cplk=b2l0ZnJvaW5icHd4" target="_blank" rel="noreferrer" aria-label="Visit NSS MBCCET on Instagram">
            <span>Instagram · Follow the community</span><ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} ഒരു തൈ | Oru Thai</span><span>PLANTED WITH PURPOSE · GROWN TOGETHER</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </div>
  )
}
