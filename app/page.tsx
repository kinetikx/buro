import Hero from '@/components/home/hero'
import Services from '@/components/home/services'
import WhyUs from '@/components/home/why-us'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import LatestBlog from '@/components/home/latest-blog'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Services />
      <WhyUs />
      <LatestBlog />
      <Footer />
    </main>
  )
}
