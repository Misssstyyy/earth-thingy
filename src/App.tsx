import { useRef, Suspense } from 'react';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { TextureLoader } from 'three';
import type { Mesh  } from 'three';
import { OrbitControls } from '@react-three/drei';
import './App.css';

function Earth() {
  const colorMap = useLoader(TextureLoader, '/earth.jpg');
  const meshRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2; // radians per second
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial map={colorMap} />
    </mesh>
  );
}
function Spacetrash(){
    const meshRef = useRef<Mesh>(null);
    const angle = useRef(0);
  useFrame((_state, delta) => {
    angle.current += delta * 0.1;
    if (meshRef.current) {
      const radius = 1.2;
      meshRef.current.position.x = Math.cos(angle.current) * radius;
      meshRef.current.position.z = Math.sin(angle.current) * radius;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.01 , 32, 32]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

function App() {
  return (
    <div className="container-canvas">
      <Canvas className="convo" camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Earth />
          <Spacetrash/>
            <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
