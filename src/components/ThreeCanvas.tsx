import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { CameraPreset } from '../types/index.ts';

// Pre-allocated math objects to avoid Garbage Collection in tick loop
const _targetPos = new THREE.Vector3();
const _targetLook = new THREE.Vector3();

interface ThreeCanvasProps {
  candlesBlown: boolean;
  cameraPreset: CameraPreset;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ candlesBlown, cameraPreset }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const candlesBlownRef = useRef(candlesBlown);
  const cameraPresetRef = useRef(cameraPreset);

  // Sync refs so animate loop always has the latest state without tearing down WebGL
  useEffect(() => {
    candlesBlownRef.current = candlesBlown;
  }, [candlesBlown]);

  useEffect(() => {
    cameraPresetRef.current = cameraPreset;
  }, [cameraPreset]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL per Three.js skill
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 2. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0510, 0.028);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = width < 640;

    const camera = new THREE.PerspectiveCamera(isMobile ? 52 : 45, width / height, 0.1, 100);
    camera.position.set(0, isMobile ? 3.5 : 3.2, isMobile ? 7.0 : 6.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Environment Reflection (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfff1f2, 0.8);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffd1dc, 0x1f0b24, 1.2);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffedd5, 2.4);
    keyLight.position.set(5, 10, 6);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xf43f5e, 3.5, 15);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    const warmUnderlight = new THREE.PointLight(0xf59e0b, 2.0, 10);
    warmUnderlight.position.set(0, 0.2, 0);
    scene.add(warmUnderlight);

    // 5. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05;
    controls.minDistance = 2.5;
    controls.maxDistance = 14;
    controls.target.set(0, 1.7, 0);

    // 6. Ground contact shadow
    const shadowGeo = new THREE.PlaneGeometry(8, 8);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.3)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.85,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.02;
    scene.add(shadowPlane);

    // 7. Procedural Grand Birthday Cake Group
    const cakeGroup = new THREE.Group();
    scene.add(cakeGroup);

    // Materials with PBR qualities
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
    });

    const cakePinkMat = new THREE.MeshStandardMaterial({
      color: 0xbe185d,
      roughness: 0.5,
      metalness: 0.05,
    });

    const cakeCreamMat = new THREE.MeshStandardMaterial({
      color: 0xfff1f2,
      roughness: 0.35,
      metalness: 0.02,
    });

    const cakeBurgundyMat = new THREE.MeshStandardMaterial({
      color: 0x831843,
      roughness: 0.45,
      metalness: 0.08,
    });

    // Tier 1: Base Tier
    const tier1Geo = new THREE.CylinderGeometry(1.9, 1.9, 0.8, 36);
    const tier1 = new THREE.Mesh(tier1Geo, cakeBurgundyMat);
    tier1.position.y = 0.4;
    tier1.castShadow = !isSoftwareGl;
    tier1.receiveShadow = !isSoftwareGl;
    cakeGroup.add(tier1);

    // Tier 1 Golden Trim Ring
    const trim1Geo = new THREE.TorusGeometry(1.92, 0.045, 12, 48);
    const trim1 = new THREE.Mesh(trim1Geo, goldMat);
    trim1.rotation.x = Math.PI / 2;
    trim1.position.y = 0.8;
    cakeGroup.add(trim1);

    // Tier 2: Middle Tier
    const tier2Geo = new THREE.CylinderGeometry(1.35, 1.35, 0.7, 36);
    const tier2 = new THREE.Mesh(tier2Geo, cakePinkMat);
    tier2.position.y = 1.15;
    tier2.castShadow = !isSoftwareGl;
    tier2.receiveShadow = !isSoftwareGl;
    cakeGroup.add(tier2);

    // Tier 2 Cream Trim Ring
    const trim2Geo = new THREE.TorusGeometry(1.37, 0.04, 12, 48);
    const trim2 = new THREE.Mesh(trim2Geo, cakeCreamMat);
    trim2.rotation.x = Math.PI / 2;
    trim2.position.y = 1.5;
    cakeGroup.add(trim2);

    // Tier 3: Top Tier
    const tier3Geo = new THREE.CylinderGeometry(0.85, 0.85, 0.6, 32);
    const tier3 = new THREE.Mesh(tier3Geo, cakeCreamMat);
    tier3.position.y = 1.8;
    tier3.castShadow = !isSoftwareGl;
    tier3.receiveShadow = !isSoftwareGl;
    cakeGroup.add(tier3);

    // Golden Topper Plaque: "BB ♥ TALHA"
    const plaqueGeo = new THREE.BoxGeometry(0.9, 0.28, 0.06);
    const plaque = new THREE.Mesh(plaqueGeo, goldMat);
    plaque.position.set(0, 2.25, 0);
    cakeGroup.add(plaque);

    // Plaque Texture with "BB ♥ TALHA"
    const plaqueCanvas = document.createElement('canvas');
    plaqueCanvas.width = 512;
    plaqueCanvas.height = 160;
    const pCtx = plaqueCanvas.getContext('2d')!;
    pCtx.fillStyle = '#b45309';
    pCtx.fillRect(0, 0, 512, 160);
    pCtx.fillStyle = '#fef08a';
    pCtx.font = 'bold 44px "Playfair Display", Georgia, serif';
    pCtx.textAlign = 'center';
    pCtx.textBaseline = 'middle';
    pCtx.fillText('BB ♥ TALHA', 256, 80);

    const plaqueTex = new THREE.CanvasTexture(plaqueCanvas);
    plaqueTex.colorSpace = THREE.SRGBColorSpace;
    const plaqueFrontMat = new THREE.MeshBasicMaterial({ map: plaqueTex });
    const plaqueFrontGeo = new THREE.PlaneGeometry(0.88, 0.26);
    const plaqueFront = new THREE.Mesh(plaqueFrontGeo, plaqueFrontMat);
    plaqueFront.position.set(0, 2.25, 0.035);
    cakeGroup.add(plaqueFront);

    // 8. 13 Candles on the Cake with Glowing Flickering Flames
    const candleCount = 13;
    const candleRadius = 0.65;
    const candleMeshes: THREE.Group[] = [];
    const flameMeshes: THREE.Mesh[] = [];
    const candleLights: THREE.PointLight[] = [];

    const candleWaxMat = new THREE.MeshStandardMaterial({
      color: 0xfdf2f8,
      roughness: 0.2,
      metalness: 0.1,
    });

    const flameMat = new THREE.MeshBasicMaterial({
      color: 0xffaa22,
    });

    const flameGeo = new THREE.ConeGeometry(0.035, 0.12, 8);
    flameGeo.translate(0, 0.06, 0);

    for (let i = 0; i < candleCount; i++) {
      const angle = (i / candleCount) * Math.PI * 2;
      const cx = Math.cos(angle) * candleRadius;
      const cz = Math.sin(angle) * candleRadius;

      const candleHolder = new THREE.Group();
      candleHolder.position.set(cx, 2.1, cz);

      // Wax stick
      const waxGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.28, 12);
      const wax = new THREE.Mesh(waxGeo, candleWaxMat);
      wax.position.y = 0.14;
      candleHolder.add(wax);

      // Wick
      const wickGeo = new THREE.CylinderGeometry(0.005, 0.005, 0.05, 6);
      const wickMat = new THREE.MeshBasicMaterial({ color: 0x333333 });
      const wick = new THREE.Mesh(wickGeo, wickMat);
      wick.position.y = 0.29;
      candleHolder.add(wick);

      // Flame
      const flame = new THREE.Mesh(flameGeo, flameMat);
      flame.position.y = 0.31;
      candleHolder.add(flame);
      flameMeshes.push(flame);

      // Only add 3 pointlights to avoid shader budget overload
      if (i % 4 === 0) {
        const cLight = new THREE.PointLight(0xff9900, 1.2, 2.5);
        cLight.position.set(cx, 2.45, cz);
        cakeGroup.add(cLight);
        candleLights.push(cLight);
      }

      cakeGroup.add(candleHolder);
      candleMeshes.push(candleHolder);
    }

    // 9. Floating 3D Balloons (Metallic Ruby, Rose Gold, Ivory)
    const balloonGroup = new THREE.Group();
    scene.add(balloonGroup);

    const balloonMaterials = [
      new THREE.MeshStandardMaterial({ color: 0xbe123c, metalness: 0.7, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0xf43f5e, metalness: 0.6, roughness: 0.25 }),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0xfbcfe8, metalness: 0.4, roughness: 0.3 }),
      new THREE.MeshStandardMaterial({ color: 0xe11d48, metalness: 0.7, roughness: 0.2 }),
    ];

    const balloonData: Array<{ mesh: THREE.Group; baseY: number; speed: number; phase: number; radius: number; angle: number }> = [];
    const balloonSphereGeo = new THREE.SphereGeometry(0.42, 20, 20);
    balloonSphereGeo.scale(1, 1.25, 1); // Elongated balloon shape
    const knotGeo = new THREE.ConeGeometry(0.06, 0.08, 8);
    const stringGeo = new THREE.CylinderGeometry(0.003, 0.003, 1.6, 4);
    const stringMat = new THREE.MeshBasicMaterial({ color: 0xd97706 });

    for (let i = 0; i < 9; i++) {
      const bGrp = new THREE.Group();
      const bMat = balloonMaterials[i % balloonMaterials.length];
      const balloonBody = new THREE.Mesh(balloonSphereGeo, bMat);
      bGrp.add(balloonBody);

      const knot = new THREE.Mesh(knotGeo, bMat);
      knot.rotation.x = Math.PI;
      knot.position.y = -0.52;
      bGrp.add(knot);

      const str = new THREE.Mesh(stringGeo, stringMat);
      str.position.y = -1.35;
      bGrp.add(str);

      const angle = (i / 9) * Math.PI * 2;
      const rad = 3.2 + (i % 3) * 0.6;
      const bx = Math.cos(angle) * rad;
      const bz = Math.sin(angle) * rad;
      const by = 2.4 + (i % 4) * 0.5;

      bGrp.position.set(bx, by, bz);
      balloonGroup.add(bGrp);

      balloonData.push({
        mesh: bGrp,
        baseY: by,
        speed: 1.2 + (i % 5) * 0.3,
        phase: i * 0.8,
        radius: rad,
        angle: angle,
      });
    }

    // 10. Swirling 3D Floating Hearts & Rose Petals
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.25, y + 0.25);
    heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    heartShape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    heartShape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
    heartShape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    heartShape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = {
      depth: 0.08,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };
    const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeo.center();
    heartGeo.scale(0.35, 0.35, 0.35);

    const floatingHearts: Array<{ mesh: THREE.Mesh; speed: number; angle: number; radius: number; rotSpeed: number }> = [];
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      roughness: 0.2,
      metalness: 0.8,
    });

    for (let i = 0; i < 6; i++) {
      const hMesh = new THREE.Mesh(heartGeo, heartMat);
      const angle = (i / 6) * Math.PI * 2;
      const rad = 2.2 + (i % 2) * 0.7;
      hMesh.position.set(Math.cos(angle) * rad, 1.8 + (i % 3) * 0.6, Math.sin(angle) * rad);
      scene.add(hMesh);
      floatingHearts.push({
        mesh: hMesh,
        speed: 0.4 + (i % 3) * 0.15,
        angle: angle,
        radius: rad,
        rotSpeed: 0.8 + i * 0.2,
      });
    }

    // 11. Stardust Particles System
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 14;
      particlePos[i + 1] = Math.random() * 8;
      particlePos[i + 2] = (Math.random() - 0.5) * 14;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xfef08a,
      size: 0.04,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 12. Animation Tick & Pacing Loop
    let frameId = 0;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Rotate Cake slowly
      cakeGroup.rotation.y = elapsed * 0.12;

      // Candle Flame Flickering & Extinguish Animation
      const isBlown = candlesBlownRef.current;
      for (let i = 0; i < flameMeshes.length; i++) {
        const flame = flameMeshes[i];
        if (isBlown) {
          flame.scale.lerp(_targetPos.set(0, 0, 0), delta * 5);
        } else {
          // Natural lively flame flicker
          const flicker = 1.0 + Math.sin(elapsed * 12 + i * 1.5) * 0.2;
          flame.scale.set(flicker, flicker * (1 + Math.cos(elapsed * 16 + i) * 0.15), flicker);
          flame.rotation.z = Math.sin(elapsed * 8 + i) * 0.12;
        }
      }

      // Dim candle lights when blown
      for (const light of candleLights) {
        if (isBlown) {
          light.intensity = THREE.MathUtils.damp(light.intensity, 0, 4, delta);
        } else {
          light.intensity = 1.2 + Math.sin(elapsed * 10) * 0.3;
        }
      }

      // Gentle Balloon Floating
      for (const b of balloonData) {
        b.mesh.position.y = b.baseY + Math.sin(elapsed * b.speed + b.phase) * 0.25;
        b.mesh.rotation.z = Math.sin(elapsed * 0.8 + b.phase) * 0.08;
        b.mesh.rotation.x = Math.cos(elapsed * 0.6 + b.phase) * 0.06;
      }

      // Orbiting floating hearts
      for (const h of floatingHearts) {
        h.angle += h.speed * delta;
        h.mesh.position.x = Math.cos(h.angle) * h.radius;
        h.mesh.position.z = Math.sin(h.angle) * h.radius;
        h.mesh.position.y += Math.sin(elapsed * 2 + h.angle) * 0.003;
        h.mesh.rotation.y += h.rotSpeed * delta;
        h.mesh.rotation.x += (h.rotSpeed * 0.5) * delta;
      }

      // Star particles slow drift
      particles.rotation.y = elapsed * 0.02;

      // Camera preset transitions
      const preset = cameraPresetRef.current;
      if (preset === 'cake') {
        _targetPos.set(0, 2.6, 4.4);
        _targetLook.set(0, 1.6, 0);
      } else if (preset === 'cinematic') {
        _targetPos.set(Math.sin(elapsed * 0.2) * 6.5, 3.2, Math.cos(elapsed * 0.2) * 6.5);
        _targetLook.set(0, 1.3, 0);
      } else {
        // 'overview'
        _targetPos.set(0, 4.2, 8.2);
        _targetLook.set(0, 1.4, 0);
      }

      camera.position.lerp(_targetPos, delta * 2.2);
      controls.target.lerp(_targetLook, delta * 2.2);
      controls.update();

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameId) {
        cancelAnimationFrame(frameId);
        clearTimeout(frameId);
      }
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      // Dispose geometries & materials
      scene.clear();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ touchAction: 'none' }}
      aria-label="Interactive 3D Birthday Scene"
      data-testid="three-canvas-container"
    />
  );
};
