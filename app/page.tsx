import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Products";
import Footer from "@/components/Footer";
import Products from "@/components/Products";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <About />
      <Products />
      <Footer />
    </main>
  );
}
