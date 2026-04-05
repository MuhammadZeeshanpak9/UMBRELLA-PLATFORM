import Loader from "@/components/layout/Loader";
import Hero from "@/components/sections/Hero";
import Featured from "@/components/sections/Featured";
import CreationsGrid from "@/components/sections/CreationsGrid";
import Vision from "@/components/sections/Vision";

export default function Home() {
  return (
    <>
      <Loader />
      <Hero />
      <Featured />
      <CreationsGrid />
      <Vision />
    </>
  );
}
