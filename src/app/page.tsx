import Navigation from "@/components/Navigation";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import BigTextReveal from "@/components/BigTextReveal";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#121212] selection:bg-white selection:text-black">
      <Navigation />
      <div id="home">
        <ScrollyCanvas>
          <Overlay />
        </ScrollyCanvas>
      </div>
      <BigTextReveal />
      <About />
      <div id="work">
        <Projects />
      </div>
      <Footer />
    </main>
  );
}
