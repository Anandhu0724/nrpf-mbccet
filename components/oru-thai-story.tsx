'use client'

import { useEffect, useState } from 'react'
import TaggingGuidelines from '@/components/tagging-guidelines'
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
    eyebrow: 'SITE & PERMISSION',
    title: 'Confirm the site before planting.',
    description:
      'Confirm that the site is approved for planting. Use the TreeTag map and the current-location control to place the record at the actual planting point—not a nearby road or an approximate address.',
    note: 'Confirm permission · Pin the site',
    Icon: MapPin,
  },
  {
    id: 'growth',
    number: '02',
    eyebrow: 'PLANT & DOCUMENT',
    title: 'Record the tree you actually planted.',
    description:
      'Record the species that was planted, the actual planting date, and a concise note for follow-up. Add clear site photos so the record can be reviewed later.',
    note: 'Select species · Date · Document',
    Icon: Sprout,
  },
  {
    id: 'impact',
    number: '03',
    eyebrow: 'REVIEW & AFTERCARE',
    title: 'Submit for review. Continue care.',
    description:
      'Submit the complete entry for review and keep it pending until your NSS unit confirms it. Continue to care for the sapling and keep future updates factual.',
    note: 'Submit · Await review · Care',
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
          <span className="brand-subtitle">NSS MBCCET<br />TREE PLANTATION PROGRAMME</span>
        </a>
        <nav className="header-nav" aria-label="Main navigation">
          <a href="#story">Programme</a>
          <a href="#tagging">How to tag</a>
          <a href="#movement">TreeTag</a>
        </nav>
        <div className="header-partners">
          <span className="partner-caption">A youth-led initiative</span>
          <PartnerLogos />
        </div>
      </header>

      <main>
        <section className="hero" id="top" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20260605-WA0054-75kxcjJA1vvswED6b4GcscWnrngy69.jpg"
            alt="NSS volunteers and staff planting a sapling together on a green campus"
            fetchPriority="high"
          />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow hero-eyebrow"><span className="eyebrow-dot" /> NSS MBCCET · TREE PLANTATION &amp; RECORDING</p>
            <h1 id="hero-title" lang="ml">ഒരു തൈ</h1>
            <p className="hero-title-english">Plant with purpose.<br /><em>Document with care.</em></p>
            <p className="hero-description">An NSS MBCCET initiative with NRPF. Every planting is mapped, identified, photographed, and submitted for verification through TreeTag.</p>
            <div className="hero-actions">
              <a className="button button--lime" href="#tagging">How to tag a tree <ArrowDown aria-hidden="true" /></a>
              <a className="text-link text-link--light" href="https://treetag.in" target="_blank" rel="noreferrer">Open TreeTag <ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>
          <div className="hero-side-note" aria-hidden="true"><span>NSS MBCCET</span><span className="side-note-line" /><span>NRPF · TREE CARE</span></div>
          <a className="scroll-cue" href="#story"><span>SCROLL FOR THE PROGRAMME</span><ArrowDown aria-hidden="true" /></a>
          <div className="hero-index" aria-hidden="true"><span>01</span><span className="hero-index-line" /><span>03</span></div>
        </section>

        <section className="intro-band" aria-label="Our purpose">
          <p className="intro-kicker reveal">OUR COMMITMENT</p>
          <p className="intro-copy reveal">Accurate records today.<br /><span>Living trees for tomorrow.</span></p>
          <Sprout className="intro-sprout reveal" aria-hidden="true" />
        </section>

        <section className="story-section" id="story" aria-labelledby="story-title">
          <div className="story-heading reveal">
            <p className="eyebrow"><span className="eyebrow-dot" /> PROGRAMME FRAMEWORK</p>
            <h2 id="story-title">A clear process from<br />planting to <em>verification.</em></h2>
            <p>Three stages keep every record accurate, reviewable, and useful for long-term care.</p>
          </div>

          <div className="chapter-layout">
            <div className="chapter-visual-column">
              <div className={`chapter-visual chapter-visual--${current.id}`} aria-live="polite" aria-label={`Chapter ${current.number}: ${current.eyebrow}`}>
                <div className="visual-grain" aria-hidden="true" />
                <div className="visual-topline"><span>PROGRAMME RECORD</span><span>{current.number} / 03</span></div>
                <div className="visual-art" aria-hidden="true">
                  <div className="visual-orbit visual-orbit--one" />
                  <div className="visual-orbit visual-orbit--two" />
                  <div className="visual-ground" />
                  <div className="visual-mark">
                    <CurrentIcon strokeWidth={1.35} />
                  </div>
                  {current.id === 'ground' && <div className="map-coordinate"><Navigation aria-hidden="true" /><span>PLANTING SITE<br />LOCATION PIN</span></div>}
                  {current.id === 'growth' && <div className="growth-stem"><span /><span /><span /></div>}
                  {current.id === 'impact' && <div className="canopy-dots"><i /><i /><i /><i /><i /><i /></div>}
                </div>
                <div className="visual-caption"><span className="caption-number">{current.number}</span><div><span>PROGRAMME STAGE</span><strong>{current.eyebrow}</strong></div><ArrowRight aria-hidden="true" /></div>
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

        <TaggingGuidelines />

        <section className="impact-strip" aria-label="Our promise">
          <div className="impact-mark reveal"><Sprout aria-hidden="true" /></div>
          <p className="impact-quote reveal">A reliable record supports<br /><em>long-term care.</em></p>
          <span className="impact-attribution reveal">THE ORU THAI STANDARD</span>
        </section>

        <section className="cta-section" id="movement" aria-labelledby="cta-title">
          <div className="cta-backdrop" aria-hidden="true"><span /><span /><span /></div>
          <div className="cta-content reveal">
            <p className="eyebrow eyebrow--light"><span className="eyebrow-dot" /> READY TO RECORD A PLANTING?</p>
            <h2 id="cta-title">Plant it.<br /><em>Tag it.</em></h2>
            <p>Open TreeTag to add the planting location, verified tree details, and the required site photos.</p>
            <a className="button button--lime button--cta" href="https://treetag.in" target="_blank" rel="noreferrer">Open TreeTag <ArrowUpRight aria-hidden="true" /></a>
            <span className="cta-footnote">SUBMIT EACH RECORD FOR NSS VERIFICATION</span>
          </div>
          <div className="cta-stamp" aria-hidden="true"><span>GROW<br />TOGETHER</span><Sprout /></div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="footer-title" href="#top" lang="ml">ഒരു തൈ</a>
            <p>NSS MBCCET · Tree plantation and reporting</p>
          </div>
          <div className="footer-partners">
            <span className="footer-partner-label">PROGRAMME PARTNERS</span>
            <PartnerLogos footer />
          </div>
          <a className="instagram-link" href="https://www.instagram.com/nss_mbc?cplk=b2l0ZnJvaW5icHd4" target="_blank" rel="noreferrer" aria-label="Visit NSS MBCCET on Instagram">
            <span>Instagram · Follow the community</span><ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Oru Thai · NSS MBCCET</span><span>PLANTATION · DOCUMENTATION · VERIFICATION</span><a href="#top">Back to top ↑</a></div>
      </footer>
    </div>
  )
}
