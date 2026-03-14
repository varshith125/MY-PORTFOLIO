import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls, Stars, Text } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { BookOpen, Bot, Laptop, Square, Table2, X } from "lucide-react";

const sectionMap = {
  laptop: { id: "projects", title: "Laptop", subtitle: "Projects", icon: Laptop, color: "#60a5fa" },
  whiteboard: { id: "skills", title: "Whiteboard", subtitle: "Skills", icon: Square, color: "#a78bfa" },
  desk: { id: "about", title: "Desk", subtitle: "About Me", icon: Table2, color: "#93c5fd" },
  robot: { id: "chatbot", title: "Robot Assistant", subtitle: "AI Chatbot", icon: Bot, color: "#67e8f9" },
  bookshelf: { id: "education", title: "Bookshelf", subtitle: "Education", icon: BookOpen, color: "#c4b5fd" },
};

function Marker({ active, title, subtitle }) {
  return (
    <Html center distanceFactor={14}>
      <div className={`workspace-marker ${active ? "workspace-marker-active" : ""}`}>
        <span>{title}</span>
        <small>{subtitle}</small>
      </div>
    </Html>
  );
}

function Station({ stationKey, position, activeObject, onSelect, children }) {
  const item = sectionMap[stationKey];
  const active = activeObject === stationKey;

  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(stationKey);
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      {children}
      <mesh position={[0, 1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.66, 0.82, 48]} />
        <meshBasicMaterial color={item.color} transparent opacity={active ? 0.9 : 0.38} />
      </mesh>
      <Marker active={active} title={item.title} subtitle={item.subtitle} />
    </group>
  );
}

function LaptopStation(props) {
  return (
    <Station {...props}>
      <mesh position={[0, 0.92, 0]} castShadow>
        <boxGeometry args={[1.4, 0.84, 0.08]} />
        <meshStandardMaterial color="#111827" emissive="#2563eb" emissiveIntensity={0.35} />
      </mesh>
      <mesh position={[0, 0.92, 0.05]}>
        <planeGeometry args={[1.12, 0.64]} />
        <meshBasicMaterial color="#93c5fd" transparent opacity={0.82} />
      </mesh>
      <mesh position={[0, 0.5, 0.35]} rotation={[-0.2, 0, 0]} castShadow>
        <boxGeometry args={[1.45, 0.06, 1.02]} />
        <meshStandardMaterial color="#1f2937" emissive="#334155" emissiveIntensity={0.2} />
      </mesh>
    </Station>
  );
}

function WhiteboardStation(props) {
  return (
    <Station {...props}>
      <mesh position={[0, 1.28, 0]} castShadow>
        <boxGeometry args={[1.9, 1.1, 0.08]} />
        <meshStandardMaterial color="#f8fafc" emissive="#8b5cf6" emissiveIntensity={0.08} />
      </mesh>
      <mesh position={[-0.86, 0.6, 0]} castShadow>
        <boxGeometry args={[0.08, 1.25, 0.08]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[0.86, 0.6, 0]} castShadow>
        <boxGeometry args={[0.08, 1.25, 0.08]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
    </Station>
  );
}

function DeskStation(props) {
  return (
    <Station {...props}>
      <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 0.12, 1.45]} />
        <meshStandardMaterial color="#1e293b" emissive="#1d4ed8" emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[0.8, 0.74, 0.14]} castShadow>
        <boxGeometry args={[0.42, 0.06, 0.3]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[-0.74, 0.72, 0.16]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.24, 18]} />
        <meshStandardMaterial color="#475569" />
      </mesh>
    </Station>
  );
}

function RobotStation(props) {
  return (
    <Station {...props}>
      <mesh position={[0, 1.42, 0]} castShadow>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color="#111827" emissive="#06b6d4" emissiveIntensity={0.38} />
      </mesh>
      <mesh position={[0, 1.42, 0.28]}>
        <planeGeometry args={[0.28, 0.1]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0.88, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.72, 24]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>
    </Station>
  );
}

function BookshelfStation(props) {
  return (
    <Station {...props}>
      <mesh position={[0, 1.15, 0]} castShadow>
        <boxGeometry args={[1.45, 2.15, 0.42]} />
        <meshStandardMaterial color="#1e293b" emissive="#7c3aed" emissiveIntensity={0.12} />
      </mesh>
      {[-0.45, 0.02, 0.48].map((y) => (
        <mesh key={y} position={[0, 1.15 + y, 0.24]}>
          <boxGeometry args={[1.12, 0.08, 0.04]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
      ))}
      {[-0.4, -0.1, 0.2].map((x, idx) => (
        <mesh key={`${x}-${idx}`} position={[x, 1.68, 0.24]}>
          <boxGeometry args={[0.16, 0.34, 0.08]} />
          <meshStandardMaterial color={idx % 2 === 0 ? "#60a5fa" : "#c4b5fd"} />
        </mesh>
      ))}
    </Station>
  );
}

function Scene({ activeObject, onSelect }) {
  const gridColor = useMemo(() => new THREE.Color("#334155"), []);

  return (
    <>
      <color attach="background" args={["#09090f"]} />
      <fog attach="fog" args={["#09090f", 8, 24]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <pointLight position={[0, 3.4, 0]} intensity={1.1} color="#60a5fa" />
      <Stars radius={50} depth={22} count={1200} factor={2.2} saturation={0} fade speed={0.3} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[9.2, 64]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>
      <gridHelper args={[18, 18, gridColor, gridColor]} position={[0, 0.01, 0]} />

      <Text position={[0, 0.12, -6]} fontSize={0.42} color="#cbd5e1" anchorX="center" anchorY="middle">
        3D DEVELOPER WORKSPACE
      </Text>

      <DeskStation stationKey="desk" position={[-3.3, 0, 1.1]} activeObject={activeObject} onSelect={onSelect} />
      <LaptopStation stationKey="laptop" position={[0, 0, -1.1]} activeObject={activeObject} onSelect={onSelect} />
      <WhiteboardStation stationKey="whiteboard" position={[3.25, 0, 1.1]} activeObject={activeObject} onSelect={onSelect} />
      <RobotStation stationKey="robot" position={[1.65, 0, 4]} activeObject={activeObject} onSelect={onSelect} />
      <BookshelfStation stationKey="bookshelf" position={[-1.8, 0, 4]} activeObject={activeObject} onSelect={onSelect} />

      <OrbitControls enableDamping dampingFactor={0.08} minDistance={4.5} maxDistance={14} maxPolarAngle={Math.PI / 2.05} target={[0, 1.05, 0.8]} />
    </>
  );
}

export default function Workspace3D({ open, onClose, onNavigate }) {
  const [activeObject, setActiveObject] = useState("laptop");

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.code === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const handleOpenSection = (key = activeObject) => {
    const selected = sectionMap[key];
    if (!selected) return;
    setActiveObject(key);
    onNavigate(selected.id);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="workspace-overlay">
          <div className="workspace-backdrop" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            className="workspace-shell"
          >
            <div className="workspace-header">
              <div>
                <p className="section-label mb-2">Interactive 3D Scene</p>
                <h2 className="font-display text-3xl text-slate-100">Developer workspace</h2>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={handleOpenSection} className="modern-button modern-button-primary">
                  Open Section
                </button>
                <button onClick={onClose} className="workspace-close" aria-label="Close 3D workspace">
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="workspace-grid">
              <div className="workspace-canvas-wrap">
                <Canvas camera={{ position: [5.8, 4.8, 8.4], fov: 48 }} shadows>
                  <Scene activeObject={activeObject} onSelect={handleOpenSection} />
                </Canvas>
              </div>

              <div className="workspace-sidebar">
                <div className="panel-card p-5">
                  <p className="section-label mb-4">Controls</p>
                  <div className="space-y-3 text-slate-300">
                    <p>Rotate the camera with the mouse.</p>
                    <p>Zoom in and out with the wheel or touchpad.</p>
                    <p>Click a workspace object to open that portfolio section.</p>
                  </div>
                </div>

                <div className="panel-card p-5">
                  <p className="section-label mb-4">Workspace Objects</p>
                  <div className="space-y-3">
                    {Object.entries(sectionMap).map(([key, item]) => {
                      const Icon = item.icon;
                      const active = key === activeObject;
                      return (
                        <button
                          key={key}
                          onClick={() => handleOpenSection(key)}
                          className={`workspace-object-button ${active ? "workspace-object-button-active" : ""}`}
                        >
                          <Icon size={16} />
                          <div className="text-left">
                            <p className="font-mono text-[11px] uppercase tracking-[0.2em]">{item.title}</p>
                            <p className="text-sm text-slate-400">{item.subtitle}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
