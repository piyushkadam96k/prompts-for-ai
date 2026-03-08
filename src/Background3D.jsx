import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import { motion as Motion, useScroll, useTransform } from 'framer-motion';
import { useMotionPreferences } from './motion/useMotionPreferences';
import { SPHERE_DISTORTION, SPHERE_DISTORTION_SPEED, SPHERE_SCALE, SPHERE_RESOLUTION } from './constants';

const PARTICLE_COUNT = 800;

// Deterministic particle positions (seeded by index) - avoids Math.random in render
function createParticleData() {
  const pos = new Float32Array(PARTICLE_COUNT * 3);
  const by = new Float32Array(PARTICLE_COUNT);
  const bx = new Float32Array(PARTICLE_COUNT);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const x = ((i * 0.6180339887) % 1 - 0.5) * 24;
    const y = ((i * 0.3819660113) % 1 - 0.5) * 24;
    const z = ((i * 0.7236067977) % 1 - 0.5) * 14 - 3;
    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
    bx[i] = x;
    by[i] = y;
  }
  return { positions: pos, baseX: bx, baseY: by };
}

const PARTICLE_DATA = createParticleData();

function ParticleField({ theme }) {
  const pointsRef = useRef(null);
  const { positions, baseY, baseX } = PARTICLE_DATA;

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] = baseX[i] + Math.sin(t * 0.25 + i * 0.01) * 1.2;
      pos[i * 3 + 1] = baseY[i] + Math.cos(t * 0.2 + i * 0.02) * 1.2;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const color = theme === 'light' ? '#c59027' : theme === 'dark' ? '#818cf8' : '#38bdf8';

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color={color}
        transparent
        opacity={theme === 'light' ? 0.2 : 0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function AnimatedSphere({ theme, scrollYProgress, motionEnabled }) {
  const meshRef = useRef(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const elapsed = state.clock.getElapsedTime();
    const progress = motionEnabled ? scrollYProgress.get() : 0;

    meshRef.current.rotation.x = elapsed * 0.2 + progress * 0.35;
    meshRef.current.rotation.y = elapsed * 0.3 + progress * 0.45;
    meshRef.current.position.y = -progress * 0.8;
  });

  const getThemeColor = () => {
    switch (theme) {
      case 'light':
        return '#ec4899';
      case 'dark':
        return '#6366f1';
      case 'neon':
      default:
        return '#818cf8';
    }
  };

  return (
    <Sphere ref={meshRef} args={[1.5, SPHERE_RESOLUTION, SPHERE_RESOLUTION]} scale={SPHERE_SCALE}>
      <MeshDistortMaterial
        color={getThemeColor()}
        attach="material"
        distort={SPHERE_DISTORTION}
        speed={SPHERE_DISTORTION_SPEED}
        roughness={0.2}
        metalness={0.8}
        wireframe={theme === 'dark'}
      />
    </Sphere>
  );
}

export default function Background3D({ theme }) {
  const { motionEnabled } = useMotionPreferences();
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Only render 3D on desktop/large tablets for performance and visibility
  const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1024;

  return (
    <Motion.div
      className="fixed inset-0 z-0 pointer-events-none opacity-30 transition-opacity duration-1000"
      style={{ y: motionEnabled ? parallaxY : 0 }}
    >
      {isDesktop && (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={theme === 'light' ? 1.5 : 0.5} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.5}
            color={theme === 'light' ? '#3b82f6' : theme === 'dark' ? '#6366f1' : '#38bdf8'}
          />
          <directionalLight
            position={[-10, -10, -5]}
            intensity={1}
            color={theme === 'light' ? '#ec4899' : theme === 'dark' ? '#f43f5e' : '#2dd4bf'}
          />
          <ParticleField theme={theme} />
          <AnimatedSphere theme={theme} scrollYProgress={scrollYProgress} motionEnabled={motionEnabled} />
        </Canvas>
      )}

      <div
        className={`absolute inset-0 bg-gradient-to-b from-transparent ${theme === 'light' ? 'to-[#f5f4f2]/90' : theme === 'dark' ? 'to-[#0c0f1a]/95' : 'to-[#030305]/95'}`}
      />
    </Motion.div>
  );
}


