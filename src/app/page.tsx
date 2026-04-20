import { LanguageToggle } from '@/components/LanguageToggle'
import { LandingHero } from '@/components/LandingHero'

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* Fixed top-right language toggle */}
      <div className="fixed top-4 end-4 z-50">
        <LanguageToggle />
      </div>

      <LandingHero />
    </main>
  )
}
