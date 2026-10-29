import Hero from "@/slices/Hero";
import SkyDive from "@/slices/SkyDive";
import Carousel from "@/slices/Carousel";
import AlternatingText from "@/slices/AlternatingText";
import BigText from "@/slices/BigText";
import ViewCanvas from "@/components/ViewCanvas";

export default function Page() {
  return (
    <main>
      <Hero />
      <SkyDive />
      <Carousel />
      <AlternatingText />
      <BigText />
      <ViewCanvas />
    </main>
  );
}
