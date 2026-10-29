"use client";

import { useRef } from "react";
import { Environment, View } from "@react-three/drei";
import * as THREE from "three";
import clsx from "clsx";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Bounded } from "@/components/Bounded";
import FloatingCan from "@/components/FloatingCan";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { content } from "@/lib/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Scene() {
  const canRef = useRef<THREE.Group>(null);

  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  const bgColors = ["#FFA6B5", "#E9CFF6", "#CBEF9A"];

  useGSAP(
    () => {
      if (!canRef.current) return;

      const sections = gsap.utils.toArray(".alternating-section");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".alternating-text-view",
          endTrigger: ".alternating-text-container",
          pin: true,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      sections.forEach((_, index) => {
        if (!canRef.current) return;

        if (index === 0) return;

        const isOdd = index % 2 !== 0;

        scrollTl
          .to(canRef.current.position, {
            x: isDesktop ? (isOdd ? "-1" : "1") : 0,
            ease: "circ.inOut",
            delay: 0.5,
          })
          .to(
            canRef.current.rotation,
            {
              y: isDesktop ? (isOdd ? ".4" : "-.4") : 0,
              ease: "back.inOut",
            },
            "<",
          )
          .to(".alternating-text-container", {
            backgroundColor: gsap.utils.wrap(bgColors, index),
          });
      });
    },
    { dependencies: [isDesktop] },
  );

  return (
    <group ref={canRef} position-x={isDesktop ? 1 : 0} rotation-y={isDesktop ? -0.3 : 0}>
      <FloatingCan flavor="strawberryLemonade" />
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
}

export default function AlternatingText() {
  return (
    <Bounded
      data-slice-type="alternating_text"
      data-slice-variation="default"
      className="alternating-text-container relative bg-yellow-300 text-sky-950"
    >
      <div>
        <div className="relative z-[100] grid">
          <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
            <Scene />
          </View>

          {content.alternatingText.map((item, index) => (
            <div
              key={item.heading}
              className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
            >
              <div
                className={clsx(
                  index % 2 === 0 ? "col-start-1" : "md:col-start-2",
                  "rounded-lg p-4 backdrop-blur-lg max-md:bg-white/30",
                )}
              >
                <h2 className="text-balance text-6xl font-bold">{item.heading}</h2>
                <div className="mt-4 text-xl">
                  <p>{item.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
}
