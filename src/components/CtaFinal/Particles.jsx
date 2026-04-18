import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField({ count = 40 }) {
  const meshRef = useRef(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = Math.random() * 6 - 3;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return arr;
  }, [count]);

  const speeds = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) arr[i] = 0.1 + Math.random() * 0.3;
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const y = pos.array[i * 3 + 1] + speeds[i] * delta;
      pos.array[i * 3 + 1] = y > 3 ? -3 : y;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#2CCE1C"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export function Particles() {
  return (
    <Canvas
      className="!absolute inset-0 pointer-events-none"
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      dpr={[1, 1.5]}
    >
      <ParticleField />
    </Canvas>
  );
}
