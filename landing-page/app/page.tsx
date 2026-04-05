// app/page.tsx
import Navbar from "./components/navbar";
import Header from "./components/header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import BatchDetails from "./components/BatchDetails";
import GetinTouch from "./components/GetInTouch";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans overflow-x-hidden w-full">
      <Header />
      <Navbar />
      
      {/* Content - padding top for header (108px) */}
      <main className="flex-1 w-full overflow-x-hidden">
        <section id="home" className="w-full">
          <HeroSection />
        </section>
        
        <section id="about" className="w-full">
          <AboutSection />
        </section>
        
        <section id="why-us" className="w-full">
            <BatchDetails />
        </section>
        
        <section id="contact" className="w-full">
          <GetinTouch />
        </section>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
}