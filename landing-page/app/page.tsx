// app/page.tsx - Correct section mapping
import Navbar from "./components/navbar";
import Header from "./components/header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import BatchDetails from "./components/BatchDetails";
import GetinTouch from "./components/GetInTouch";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Header />
      
      <div>
        <Navbar />
        
        {/* Home Section */}
        <section id="home">
          <HeroSection />
        </section>
        
        {/* About Section */}
        <section id="about">
          <AboutSection />
        </section>
        
        {/* Programs Section - Batch Details */}
        <section id="about">
          <BatchDetails />
        </section>
        
        {/* Why Us Section - Also Batch Details (as requested) */}
        <section id="why-us">
          <BatchDetails />
        </section>
        
        {/* Contact Section - Get in Touch */}
        <section id="contact">
          <GetinTouch />
        </section>
      </div>
      
      <Footer />
    </div>
  );
}