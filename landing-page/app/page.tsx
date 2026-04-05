// app/page.tsx
import Navbar from "./components/navbar";
import Header from "./components/header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import BatchDetails from "./components/BatchDetails";
import GetinTouch from "./components/GetInTouch";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans overflow-x-hidden w-full">
      <Header />
      <Navbar />
      
      {/* Content - padding top for header (60px) */}
      <main className="flex-1 w-full overflow-x-hidden pt-[60px] md:pt-[116px]">
        <section id="home" className="w-full">
          <HeroSection />
        </section>
        
        <section id="about" className="w-full">
          <AboutSection />
        </section>
        
        <section id="programs" className="w-full">
          <BatchDetails />
        </section>
        
        <section id="why-us" className="w-full">
          <GetinTouch />
        </section>
        
        
      </main>
      
      <Footer />
    </div>
  );
}