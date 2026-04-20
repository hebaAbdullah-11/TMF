import Link from 'next/link'
import { LanguageToggle } from '@/components/LanguageToggle'
import { LandingHero } from '@/components/LandingHero'

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="absolute top-0 end-0 p-5 z-10">
        <LanguageToggle />
      </nav>

      {/* Hero */}
      <LandingHero />
    </main>
  )
}
