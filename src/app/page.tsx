import Hero from '@/components/Hero'
import ToolGrid from '@/components/ToolGrid'
import Features from '@/components/Features'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <ToolGrid />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
