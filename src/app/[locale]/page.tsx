import { Suspense } from "react";
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
      <Suspense fallback={<div className="py-32 text-center text-gray-500 tracking-widest uppercase text-xs">Loading Creations...</div>}>
        <UniverseEcosystem />
      </Suspense>
      <Vision />
      <Contact />
    </>
  );
}
