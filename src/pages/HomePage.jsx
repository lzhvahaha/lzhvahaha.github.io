import React from 'react';
import Navbar from '../components/Navbar';
import AboutSection from '../components/AboutSection';
import CVSection from '../components/CVSection';
import ResearchSection from '../components/ResearchSection';
import PublicationsSection from '../components/PublicationsSection';
import Footer from '../components/Footer';

/**
 * Home Page — matches node "Academic Personal Homepage" (3:2)
 *
 * Structure (top to bottom):
 *   Navbar  (About | CV | Research | Publications | 文章)
 *   About Section       — avatar + name + title + bio
 *   CV Section          — Education & Experience timeline
 *   Research Section    — 4 research direction cards (2×2 grid)
 *   Publications Section — papers grouped by year
 *   Footer
 *
 * Nav items About/CV/Research/Publications scroll to anchor sections;
 * "文章" navigates to /articles (ArticlesPage).
 */
export default function HomePage() {
  return (
    <div className="page-container bg-page-bg">
      <Navbar />
      <main style={{ width: 1440 }}>
        <AboutSection />
        <CVSection />
        <ResearchSection />
        <PublicationsSection />
      </main>
      <Footer />
    </div>
  );
}
