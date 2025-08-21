import Hero from "@/components/modules/HomePage/Hero";
import Features from "./Features";
import Pricing from "./Pricing";
import About from "./About";
import Contact from "@/components/modules/HomePage/Contact";
import Faq from "@/components/modules/HomePage/Faq";


export default function HomePage() {
  return (
    <div>
      <Hero></Hero>
      <Features></Features>
      <Pricing></Pricing>
      <About></About>
      <Contact></Contact>
      <Faq></Faq>
    </div>
  )
}