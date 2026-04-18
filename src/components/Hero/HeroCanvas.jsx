import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ShaderMaterial } from 'three';
import { heroVertex, heroFragment } from './heroShaders';

function GlowPlane({ revealRef, mouseRef }) {
  const matRef = useRef(null);
  const { viewport } = useThree();

  const material = useMemo(() => new ShaderMaterial({
    vertexShader: heroVertex,
    fragmentShader: heroFragment,
    uniforms: {
      uTime:   { value: 0 },
      uMouse:  { value: [0, 0] },
      uReveal: { value: 0 },
      uAspect: { value: 1 },
    },
    transparent: true,
    depthWrite: false,
  }), []);

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    matRef.current.uniforms.uReveal.value = revealRef.current;
    matRef.current.uniforms.uMouse.value = [mouseRef.current.x, mouseRef.current.y];
    matRef.current.uniforms.uAspect.value = viewport.width / viewport.height;
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <primitive ref={matRef} object={material} attach="material" />
    </mesh>
  );
}

export function HeroCanvas({ revealRef, mouseRef }) {
  return (
    <Canvas
      className="!absolute inset-0"
      orthographic
      camera={{ zoom: 1, position: [0, 0, 1] }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <GlowPlane revealRef={revealRef} mouseRef={mouseRef} />
    </Canvas>
  );
}
