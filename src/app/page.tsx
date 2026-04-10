import Loader from "@/components/layout/Loader";
import Hero from "@/components/sections/Hero";
import UniverseEcosystem from "@/components/sections/UniverseEcosystem";
import Vision from "@/components/sections/Vision";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Loader />
      <Hero />
      <UniverseEcosystem />
      <Vision />
      <Contact />
    </>
  );
}
