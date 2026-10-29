"use client";

import { forwardRef, type ReactNode } from "react";
import { Float, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import type { Flavor } from "@/lib/content";

useGLTF.preload("/Soda-can.gltf");

const flavorTextures = {
  lemonLime: "/labels/lemon-lime.png",
  grape: "/labels/grape.png",
  blackCherry: "/labels/cherry.png",
  strawberryLemonade: "/labels/strawberry.png",
  watermelon: "/labels/watermelon.png",
};

const metalMaterial = new THREE.MeshStandardMaterial({
  roughness: 0.3,
  metalness: 1,
  color: "#bbbbbb",
});

type SodaCanProps = {
  flavor?: Flavor;
  scale?: number;
} & JSX.IntrinsicElements["group"];

export function SodaCan({ flavor = "blackCherry", scale = 2, ...props }: SodaCanProps) {
  const { nodes } = useGLTF("/Soda-can.gltf") as unknown as { nodes: Record<string, THREE.Mesh> };

  const labels = useTexture(flavorTextures);

  // Fixes upside down labels
  labels.strawberryLemonade.flipY = false;
  labels.blackCherry.flipY = false;
  labels.watermelon.flipY = false;
  labels.grape.flipY = false;
  labels.lemonLime.flipY = false;

  const label = labels[flavor];

  return (
    <group {...props} dispose={null} scale={scale} rotation={[0, -Math.PI, 0]}>
      <mesh castShadow receiveShadow geometry={nodes.cylinder.geometry} material={metalMaterial} />
      <mesh castShadow receiveShadow geometry={nodes.cylinder_1.geometry}>
        <meshStandardMaterial roughness={0.15} metalness={0.7} map={label} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.Tab.geometry} material={metalMaterial} />
    </group>
  );
}

type FloatingCanProps = {
  flavor?: Flavor;
  floatSpeed?: number;
  rotationIntensity?: number;
  floatIntensity?: number;
  floatingRange?: [number, number];
  children?: ReactNode;
} & JSX.IntrinsicElements["group"];

const FloatingCan = forwardRef<THREE.Group, FloatingCanProps>(
  (
    {
      flavor = "blackCherry",
      floatSpeed = 1.5,
      rotationIntensity = 1,
      floatIntensity = 1,
      floatingRange = [-0.1, 0.1],
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <group ref={ref} {...props}>
        <Float
          speed={floatSpeed}
          rotationIntensity={rotationIntensity}
          floatIntensity={floatIntensity}
          floatingRange={floatingRange}
        >
          {children}
          <SodaCan flavor={flavor} />
        </Float>
      </group>
    );
  },
);

FloatingCan.displayName = "FloatingCan";

export default FloatingCan;
