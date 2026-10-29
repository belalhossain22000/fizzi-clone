"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import { Environment, View } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { create } from "zustand";

import { Bounded } from "@/components/Bounded";
import { Button } from "@/components/Button";
import { SplitText } from "@/components/SplitText";
import FloatingCan from "@/components/FloatingCan";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { content } from "@/lib/content";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const useReady = create<{ ready: boolean; isReady: () => void }>((set) => ({
  ready: false,
  isReady: () => set({ ready: true }),
}));

function Scene() {
  const isReady = useReady((state) => state.isReady);

  const can1Ref = useRef<THREE.Group>(null);
  const can2Ref = useRef<THREE.Group>(null);
  const can3Ref = useRef<THREE.Group>(null);
  const can4Ref = useRef<THREE.Group>(null);
  const can5Ref = useRef<THREE.Group>(null);

  const can1GroupRef = useRef<THREE.Group>(null);
  const can2GroupRef = useRef<THREE.Group>(null);

  const groupRef = useRef<THREE.Group>(null);

  useGSAP(() => {
    if (
      !can1Ref.current ||
      !can2Ref.current ||
      !can3Ref.current ||
      !can4Ref.current ||
      !can5Ref.current ||
      !can1GroupRef.current ||
      !can2GroupRef.current ||
      !groupRef.current
    )
      return;

    isReady();

    gsap.set(can1Ref.current.position, { x: -1.5 });
    gsap.set(can1Ref.current.rotation, { z: -0.5 });

    gsap.set(can2Ref.current.position, { x: 1.5 });
    gsap.set(can2Ref.current.rotation, { z: 0.5 });

    gsap.set(can3Ref.current.position, { y: 5, z: 2 });
    gsap.set(can4Ref.current.position, { x: 2, y: 4, z: 2 });
    gsap.set(can5Ref.current.position, { y: -5 });

    const introTl = gsap.timeline({
      defaults: { duration: 3, ease: "back.out(1.4)" },
    });

    if (window.scrollY < 20) {
      introTl
        .from(can1GroupRef.current.position, { y: -5, x: 1 }, 0)
        .from(can1GroupRef.current.rotation, { z: 3 }, 0)
        .from(can2GroupRef.current.position, { y: 5, x: 1 }, 0)
        .from(can2GroupRef.current.rotation, { z: 3 }, 0);
    }

    const scrollTl = gsap.timeline({
      defaults: { duration: 2 },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scrollTl
      .to(groupRef.current.rotation, { y: Math.PI * 2 })
      .to(can1Ref.current.position, { x: -0.2, y: -0.7, z: -2 }, 0)
      .to(can1Ref.current.rotation, { z: 0.3 }, 0)
      .to(can2Ref.current.position, { x: 1, y: -0.2, z: -1 }, 0)
      .to(can2Ref.current.rotation, { z: 0 }, 0)
      .to(can3Ref.current.position, { x: -0.3, y: 0.5, z: -1 }, 0)
      .to(can3Ref.current.rotation, { z: -0.1 }, 0)
      .to(can4Ref.current.position, { x: 0, y: -0.3, z: 0.5 }, 0)
      .to(can4Ref.current.rotation, { z: 0.3 }, 0)
      .to(can5Ref.current.position, { x: 0.3, y: 0.5, z: -0.5 }, 0)
      .to(can5Ref.current.rotation, { z: -0.25 }, 0)
      .to(groupRef.current.position, { x: 1, duration: 3, ease: "sine.inOut" }, 1.3);
  });

  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan ref={can1Ref} flavor="blackCherry" floatSpeed={1.5} />
      </group>
      <group ref={can2GroupRef}>
        <FloatingCan ref={can2Ref} flavor="lemonLime" floatSpeed={1.5} />
      </group>
      <FloatingCan ref={can3Ref} flavor="grape" floatSpeed={1.5} />
      <FloatingCan ref={can4Ref} flavor="strawberryLemonade" floatSpeed={1.5} />
      <FloatingCan ref={can5Ref} flavor="watermelon" floatSpeed={1.5} />

      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
}

const dummy = new THREE.Object3D();

type BubblesProps = {
  count?: number;
  speed?: number;
  bubbleSize?: number;
  opacity?: number;
  repeat?: boolean;
};

function Bubbles({ count = 300, speed = 5, bubbleSize = 0.05, opacity = 0.5, repeat = true }: BubblesProps) {
  const bubbleRef = useRef<THREE.InstancedMesh>(null);
  const bubbleSpeed = useRef(new Float32Array(count));
  const minSpeed = speed * 0.001;
  const maxSpeed = speed * 0.005;

  const geometry = useMemo(() => new THREE.SphereGeometry(bubbleSize, 16, 16), [bubbleSize]);
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ transparent: true, opacity }),
    [opacity],
  );

  useEffect(() => {
    const bubbles = bubbleRef.current;
    if (!bubbles) return;

    for (let i = 0; i < count; i++) {
      dummy.position.set(
        gsap.utils.random(-4, 4),
        gsap.utils.random(-4, 4),
        gsap.utils.random(-4, 4),
      );
      dummy.updateMatrix();
      bubbles.setMatrixAt(i, dummy.matrix);

      bubbleSpeed.current[i] = gsap.utils.random(minSpeed, maxSpeed);
    }

    bubbles.instanceMatrix.needsUpdate = true;

    return () => {
      bubbles.geometry.dispose();
      (bubbles.material as THREE.Material).dispose();
    };
  }, [count, minSpeed, maxSpeed]);

  useFrame(() => {
    if (!bubbleRef.current) return;

    // Keep the bubbles the same colour as the page background
    material.color = new THREE.Color(document.body.style.backgroundColor);

    for (let i = 0; i < count; i++) {
      bubbleRef.current.getMatrixAt(i, dummy.matrix);
      dummy.position.setFromMatrixPosition(dummy.matrix);

      dummy.position.y += bubbleSpeed.current[i];

      if (dummy.position.y > 4 && repeat) {
        dummy.position.y = -2;
        dummy.position.x = gsap.utils.random(-4, 4);
        dummy.position.z = gsap.utils.random(0, 8);
      }

      dummy.updateMatrix();
      bubbleRef.current.setMatrixAt(i, dummy.matrix);
    }

    bubbleRef.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={bubbleRef} args={[undefined, undefined, count]} position={[0, 0, 0]} material={material} geometry={geometry} />;
}

export default function Hero() {
  const ready = useReady((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);
  const hero = content.hero;

  useGSAP(
    () => {
      if (!ready && isDesktop) return;

      const introTl = gsap.timeline();

      introTl
        .set(".hero", { opacity: 1 })
        .from(".hero-header-word", {
          scale: 3,
          opacity: 0,
          ease: "power4.in",
          delay: 0.3,
          stagger: 1,
        })
        .from(".hero-subheading", { opacity: 0, y: 30 }, "+=.8")
        .from(".hero-body", { opacity: 0, y: 10 })
        .from(".hero-button", { opacity: 0, y: 10, duration: 0.6 });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      scrollTl
        .fromTo("body", { backgroundColor: "#FDE047" }, { backgroundColor: "#D9F99D", overwrite: "auto" }, 1)
        .from(".text-side-heading .split-char", {
          scale: 1.3,
          y: 40,
          rotate: -25,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(3)",
          duration: 0.5,
        })
        .from(".text-side-body", { y: 20, opacity: 0 });
    },
    { dependencies: [ready, isDesktop] },
  );

  return (
    <Bounded data-slice-type="hero" data-slice-variation="default" className="hero opacity-0">
      {isDesktop && (
        <View className="hero-scene pointer-events-none sticky top-0 z-50 -mt-[100vh] hidden h-screen w-screen md:block">
          <Scene />
          <Bubbles count={300} speed={2} repeat={true} />
        </View>
      )}

      <div className="grid">
        <div className="grid h-screen place-items-center">
          <div className="grid auto-rows-min place-items-center text-center">
            <h1 className="hero-header text-7xl font-black uppercase leading-[.8] text-orange-500 md:text-[9rem] lg:text-[13rem]">
              <SplitText text={hero.heading} wordDisplayStyle="block" className="hero-header-word" />
            </h1>
            <div className="hero-subheading mt-12 text-5xl font-semibold text-sky-950 lg:text-6xl">
              <p>{hero.subheading}</p>
            </div>
            <div className="hero-body text-2xl font-normal text-sky-950">
              <p>{hero.body}</p>
            </div>
            <Button buttonLink={hero.buttonHref} buttonText={hero.buttonText} className="hero-button mt-12" />
          </div>
        </div>

        <div className="text-side relative z-[80] grid h-screen items-center gap-4 md:grid-cols-2">
          <Image
            className="w-full md:hidden"
            src={hero.cansImage.src}
            alt={hero.cansImage.alt}
            width={hero.cansImage.width}
            height={hero.cansImage.height}
          />
          <div>
            <h2 className="text-side-heading text-balance text-6xl font-black uppercase text-sky-950 lg:text-8xl">
              <SplitText text={hero.secondHeading} />
            </h2>
            <div className="text-side-body mt-4 max-w-xl text-balance text-xl font-normal text-sky-950">
              <p>{hero.secondBody}</p>
            </div>
          </div>
        </div>
      </div>
    </Bounded>
  );
}
