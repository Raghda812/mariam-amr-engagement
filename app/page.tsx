"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

function Monogram({ small = false, first = "R", second = "C" }: { small?: boolean; first?: string; second?: string }) {
  return <div className={`monogram ${small ? "small" : ""}`}><span>{first}</span><i>&</i><span>{second}</span></div>;
}

function WaxSeal({ children = "RC" }: { children?: string }) {
  return <span className="wax"><span>{children}</span></span>;
}

function Opening() {
  return <motion.div
    className="opening"
  >
    <input className="opening-toggle" id="open-invitation" type="checkbox" autoComplete="off" defaultChecked={false} aria-label="Open wedding invitation" />
    <label className="opening-trigger" htmlFor="open-invitation" />
    <div className="envelope-wrap">
      <div className="invitation-card">
        <div className="invitation-card-heading">
          <p>Save the date</p>
          <h1>Our Engagement</h1>
          <span>Amr <i>&amp;</i> Mariam</span>
        </div>
        <InvitationStationery compact />
      </div>
      <div className="envelope">
        <div className="envelope-back" />
        <div className="pocket-base" />
        <div className="pocket-fold pocket-fold-left" />
        <div className="pocket-fold pocket-fold-right" />
        <div className="pocket-fold pocket-fold-front" />
        <div className="pocket-mouth" />
        <div className="seal-button" aria-hidden="true"><WaxSeal /></div>
      </div>
    </div>
    <div className="open-hint">OPEN INVITATION <span>↓</span></div>
  </motion.div>
}

function Portrait({ className = "" }: { className?: string }) {
  return <div className={`portrait ${className}`}><Image src={`${BASE_PATH}/images/couple.png`} alt="Rachel and Carter" fill priority sizes="(max-width: 700px) 72vw, 390px" /></div>;
}

function Calendar({ month = "June", year = "2027", selected = "12", offset = 2, adorned = false }: { month?: string; year?: string; selected?: string; offset?: number; adorned?: boolean }) {
  const days = ["S","M","T","W","T","F","S"];
  const nums = Array.from({ length: 35 }, (_, i) => i < offset ? "" : String(i - offset + 1));
  return <div className={`calendar ${adorned ? "ornate-calendar" : ""}`}><h3>{month} <span>{year}</span></h3><div className="calendar-grid">{days.map((d,i)=><b key={`d${i}`}>{d}</b>)}{nums.map((n,i)=><span key={i} className={n === selected ? "chosen" : ""}>{n}</span>)}</div></div>;
}

function InvitationStationery({ compact = false }: { compact?: boolean }) {
  return <div className={`stationery-composition ${compact ? "stationery-compact" : ""}`}>
    <div className="calendar-side reveal-card reveal-calendar"><p className="eyebrow">MARK YOUR CALENDAR</p><Calendar month="October" year="2026" selected="3" offset={4} adorned /></div>
    <div className="date-photo stationery-photo reveal-card reveal-photo">
      <div className="stationery-rings-photo"><Image src={`${BASE_PATH}/images/engagement-rings.png`} alt="Engagement and wedding rings with ivory flowers" fill priority sizes="(max-width: 800px) 90vw, 620px" /></div>
      <div className="date-stamp">SATURDAY<br/><b>3</b><br/>OCTOBER</div>
      <div className="venue-ticket reveal-card reveal-ticket"><span>CELEBRATE WITH US</span><b>AMR &amp; MARIAM</b><small>3 OCTOBER 2026</small></div>
    </div>
  </div>;
}

function Detail({ icon, title, children, index }: { icon: React.ReactNode; title: string; children: React.ReactNode; index: number }) {
  return <div className={`detail reveal-card reveal-detail-${index}`}><span className="detail-icon">{icon}</span><h3>{title}</h3><p>{children}</p></div>;
}

const ENGAGEMENT_DATE = new Date("2026-10-03T00:00:00+03:00").getTime();

function getCountdown() {
  const distance = Math.max(0, ENGAGEMENT_DATE - Date.now());
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance % 86400000) / 3600000),
    minutes: Math.floor((distance % 3600000) / 60000),
    seconds: Math.floor((distance % 60000) / 1000),
  };
}

function Countdown() {
  const [remaining, setRemaining] = useState(getCountdown);

  useEffect(() => {
    setRemaining(getCountdown());
    const timer = window.setInterval(() => setRemaining(getCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return <div className="countdown reveal-card" role="timer" aria-live="off" aria-label="Countdown to October 3, 2026">
    {Object.entries(remaining).map(([label, value]) => <div className="countdown-unit" key={label}><b suppressHydrationWarning>{String(value).padStart(2, "0")}</b><span>{label}</span></div>)}
  </div>;
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("preview")) setEntered(true);
  }, []);
  return <main style={{ "--floral-overlay": `url("${BASE_PATH}/images/page2-floral-overlay.png")` } as React.CSSProperties}>
    <AnimatePresence>{!entered && <Opening />}</AnimatePresence>
    <motion.div
      className="site-content is-entered"
      initial={false}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
    <section className="date-section section-paper">
      <div className="engagement-heading"><p className="eyebrow">SAVE THE DATE</p><h1>Our Engagement</h1><p>Amr <span>&amp;</span> Mariam</p></div>
      <InvitationStationery />
    </section>

    <section className="details section-paper">
      <div className="details-title reveal-card reveal-details-title"><p className="eyebrow">THE ENGAGEMENT DAY</p><h2>Counting Down</h2><p>Until we celebrate together</p></div>
      <Countdown />
      <div className="countdown-location reveal-card"><span><MapPin /></span><div><small>THE LOCATION</small><b>Louvre Heights</b><p>New Cairo</p></div></div>
      <div className="map-embed reveal-card reveal-map">
        <iframe title="Louvre Heights location map" src="https://www.google.com/maps?q=30.016664,31.490468&z=17&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        <a href="https://www.google.com/maps/place/Louvre+Heights/@30.016664,31.4878931,17z/data=!3m1!4b1!4m6!3m5!1s0x145822f86d24af37:0xa09375d53b76ee1b!8m2!3d30.016664!4d31.490468!16s%2Fg%2F11g8w1z1w4?hl=en&entry=ttu" target="_blank" rel="noreferrer">Louvre Heights <span>↗</span></a>
      </div>
    </section>

    <footer><Monogram small first="A" second="M"/><div className="footer-script">Amr &amp; Mariam</div><p>OCTOBER 3, 2026</p></footer>
    </motion.div>
  </main>;
}
