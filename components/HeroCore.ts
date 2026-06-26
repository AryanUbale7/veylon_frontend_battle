import * as THREE from "three";

export class HeroCore {
  public group: THREE.Group;
  
  // Node parameters
  private nodeCount = 52; // ASSUMPTION: 52 nodes is within the 40-60 target range
  private nodesData: Array<{
    position: THREE.Vector3;
    originalPosition: THREE.Vector3;
    isActive: boolean;
    pulsePhase: number;
    pulseSpeed: number;
    highlightVal: number; // For scan plane brief flash
  }> = [];
  
  // Meshes
  private nodeMesh: THREE.InstancedMesh;
  private connectionLines: THREE.LineSegments;
  private activeLines: THREE.Line[] = [];
  private activeMaterials: THREE.ShaderMaterial[] = [];
  private scanPlane: THREE.Mesh;
  
  // Scan plane parameters
  private scanZ = 2.0;
  private scanSpeed = 0.035; // Slow sweep speed
  private maxScanZ = 3.0;
  private minScanZ = -9.0;

  // Dummies for instancing
  private dummyNode = new THREE.Object3D();
  private colorPrimary = new THREE.Color(0xffc801); // Forsythia (#FFC801)
  private colorSecondary = new THREE.Color(0xff9932); // Deep Saffron (#FF9932)

  constructor() {
    this.group = new THREE.Group();
    // Position lattice to occupy middle-right and extend left
    // Group sits slightly behind (Z = -6) and right of center (X = 2)
    this.group.position.set(2, 0.5, -6);
    
    const colorSecondaryHex = 0xff9932;

    // ==========================================
    // 1. NODE FIELD CONFIGURATION
    // ==========================================
    const activeIndices = new Set([7, 18, 29, 41]); // 4 active nodes pulsing

    for (let i = 0; i < this.nodeCount; i++) {
      // Generate organic positions denser on the right and stretching leftward
      const x = (Math.random() - 0.4) * 13.0; 
      const y = (Math.random() - 0.5) * 8.0;
      const z = (Math.random() - 0.6) * 10.0;

      const pos = new THREE.Vector3(x, y, z);
      const isActive = activeIndices.has(i);

      this.nodesData.push({
        position: pos.clone(),
        originalPosition: pos.clone(),
        isActive,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 1.2 + Math.random() * 0.8, // 3-5s cycle
        highlightVal: 0,
      });
    }

    // Geometry: very low-poly sphere to fit within budget (icosahedron detail 0 is 20 tris)
    const nodeGeo = new THREE.IcosahedronGeometry(0.1, 0); 
    const nodeMat = new THREE.MeshStandardMaterial({
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.35, // ASSUMPTION: low opacity node field for background layer
    });
    this.nodeMesh = new THREE.InstancedMesh(nodeGeo, nodeMat, this.nodeCount);
    this.group.add(this.nodeMesh);

    // ==========================================
    // 2. CONNECTION EDGES (Nearest Neighbor Graph)
    // ==========================================
    const maxConnectionsPerNode = 2; // keeps graph clean and sparse
    const connections: [number, number][] = [];

    for (let i = 0; i < this.nodeCount; i++) {
      const nodeA = this.nodesData[i].position;
      const distances: Array<{ index: number; dist: number }> = [];

      for (let j = 0; j < this.nodeCount; j++) {
        if (i === j) continue;
        const dist = nodeA.distanceTo(this.nodesData[j].position);
        if (dist < 3.2) { // proximity threshold
          distances.push({ index: j, dist });
        }
      }

      // Sort and grab nearest neighbors
      distances.sort((a, b) => a.dist - b.dist);
      const connects = distances.slice(0, maxConnectionsPerNode);

      connects.forEach((c) => {
        const alreadyConnected = connections.some(
          (conn) => (conn[0] === i && conn[1] === c.index) || (conn[0] === c.index && conn[1] === i)
        );
        if (!alreadyConnected) {
          connections.push([i, c.index]);
        }
      });
    }

    // Render static connection lines
    const linePoints: THREE.Vector3[] = [];
    connections.forEach(([i, j]) => {
      linePoints.push(this.nodesData[i].position);
      linePoints.push(this.nodesData[j].position);
    });

    const connectionGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const connectionMat = new THREE.LineBasicMaterial({
      color: colorSecondaryHex,
      transparent: true,
      opacity: 0.12, // ASSUMPTION: secondary accent at low opacity for connection edges
    });
    this.connectionLines = new THREE.LineSegments(connectionGeo, connectionMat);
    this.group.add(this.connectionLines);

    // Selected active connection edges that sweep dashOffset via ShaderMaterial
    const activeConnectionCount = Math.min(3, connections.length);
    for (let idx = 0; idx < activeConnectionCount; idx++) {
      const [i, j] = connections[idx + 5]; // grab offset connections
      const edgePoints = [this.nodesData[i].position, this.nodesData[j].position];
      const edgeGeo = new THREE.BufferGeometry().setFromPoints(edgePoints);
      
      // Add custom attribute to interpolate dash along the line segment
      const progressAttr = new Float32Array([0.0, 1.0]);
      edgeGeo.setAttribute("progress", new THREE.BufferAttribute(progressAttr, 1));

      const activeLineMat = new THREE.ShaderMaterial({
        uniforms: {
          color: { value: this.colorSecondary },
          time: { value: 0 },
        },
        vertexShader: `
          attribute float progress;
          varying float vProgress;
          void main() {
            vProgress = progress;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          uniform float time;
          varying float vProgress;
          void main() {
            float dash = sin(vProgress * 30.0 - time * 12.0);
            if (dash < 0.0) discard;
            gl_FragColor = vec4(color, 0.8);
          }
        `,
        transparent: true,
      });

      const line = new THREE.Line(edgeGeo, activeLineMat);
      this.group.add(line);
      this.activeLines.push(line);
      this.activeMaterials.push(activeLineMat);
    }

    // ==========================================
    // 3. SCAN PLANE (Visual Radar Sweep)
    // ==========================================
    const scanGeo = new THREE.PlaneGeometry(16, 12);
    const scanMat = new THREE.MeshBasicMaterial({
      color: colorSecondaryHex,
      transparent: true,
      opacity: 0.04, // ASSUMPTION: very low opacity scan plane with additive blending
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    this.scanPlane = new THREE.Mesh(scanGeo, scanMat);
    this.scanPlane.rotation.y = 0.08;
    this.scanPlane.position.z = this.scanZ;
    this.group.add(this.scanPlane);
  }

  private theme: string = "dark";

  public setTheme(theme: string) {
    this.theme = theme;
    
    // Safety check for WebGL materials
    const nodeMat = this.nodeMesh.material as THREE.MeshStandardMaterial;
    const connMat = this.connectionLines.material as THREE.LineBasicMaterial;
    const scanMat = this.scanPlane.material as THREE.MeshBasicMaterial;
    
    if (theme === "light") {
      // ASSUMPTION: increase node opacity slightly so nodes remain visible on light background
      nodeMat.opacity = 0.65;
      nodeMat.needsUpdate = true;
      
      // Connection-line color: switch to Nocturnal Expedition
      connMat.color.setHex(0x114c5a);
      connMat.opacity = 0.18; // ASSUMPTION: slightly higher opacity for visibility
      connMat.needsUpdate = true;
      
      // Scan plane: use subtle shadow/dimming sweep with NormalBlending
      scanMat.color.setHex(0x114c5a);
      scanMat.opacity = 0.035; // ASSUMPTION: very subtle sweep opacity
      scanMat.blending = THREE.NormalBlending;
      scanMat.needsUpdate = true;
    } else {
      // Restore dark mode defaults
      nodeMat.opacity = 0.35;
      nodeMat.needsUpdate = true;
      
      connMat.color.setHex(0xff9932); // Deep Saffron
      connMat.opacity = 0.12;
      connMat.needsUpdate = true;
      
      scanMat.color.setHex(0xff9932); // Deep Saffron
      scanMat.opacity = 0.04;
      scanMat.blending = THREE.AdditiveBlending;
      scanMat.needsUpdate = true;
    }
  }

  public update(elapsed: number) {
    // Add a tiny, organic ambient sway to the centerpiece group.
    this.group.rotation.y = Math.sin(elapsed * 0.15) * 0.02;

    // 1. Animate Scan Plane sweep front-to-back (positive to negative Z)
    this.scanZ -= this.scanSpeed;
    if (this.scanZ < this.minScanZ) {
      this.scanZ = this.maxScanZ; // Loop back
    }
    this.scanPlane.position.z = this.scanZ;

    // 2. Update nodes positions and color states
    for (let i = 0; i < this.nodeCount; i++) {
      const data = this.nodesData[i];

      // Subtle organic sway
      const swayX = Math.sin(elapsed * 0.3 + i) * 0.03;
      const swayY = Math.cos(elapsed * 0.4 + i) * 0.03;
      data.position.x = data.originalPosition.x + swayX;
      data.position.y = data.originalPosition.y + swayY;

      // Scan plane detection: flash node brighter if plane passes through Z coord
      const distToPlane = Math.abs(data.position.z - this.scanZ);
      if (distToPlane < 0.5) {
        data.highlightVal = 1.0 - (distToPlane / 0.5);
      } else {
        data.highlightVal += (0 - data.highlightVal) * 0.15;
      }

      // Base properties
      let scale = 1.0;
      let emissiveIntensity = 0.2;
      const color = this.colorPrimary.clone();

      if (data.isActive) {
        // Pulsing active node: staggered phase
        const pulse = 0.5 + 0.5 * Math.sin(elapsed * data.pulseSpeed + data.pulsePhase);
        scale = 1.1 + pulse * 0.5;
        emissiveIntensity = 0.6 + pulse * 1.2;
        color.lerp(this.colorSecondary, pulse * 0.5);
      }

      // Add scan plane flash highlight effect
      if (data.highlightVal > 0.01) {
        scale += data.highlightVal * 0.5;
        emissiveIntensity += data.highlightVal * 2.5;
        if (this.theme === "light") {
          color.lerp(new THREE.Color(0x114c5a), data.highlightVal * 0.6); // ASSUMPTION: Soft Nocturnal Expedition flash in light mode
        } else {
          color.lerp(new THREE.Color(0xffffff), data.highlightVal * 0.8); // Blend to white flash
        }
      }

      // ASSUMPTION: roughly halve emissive intensity in light mode to reduce glare
      if (this.theme === "light") {
        emissiveIntensity *= 0.5;
      }

      this.dummyNode.position.copy(data.position);
      this.dummyNode.scale.set(scale, scale, scale);
      this.dummyNode.updateMatrix();
      this.nodeMesh.setMatrixAt(i, this.dummyNode.matrix);

      const finalColor = color.clone().multiplyScalar(emissiveIntensity + 0.5);
      this.nodeMesh.setColorAt(i, finalColor);
    }
    
    this.nodeMesh.instanceMatrix.needsUpdate = true;
    if (this.nodeMesh.instanceColor) {
      this.nodeMesh.instanceColor.needsUpdate = true;
    }

    // 3. Animate connection dashes sweep
    this.activeMaterials.forEach((mat) => {
      mat.uniforms.time.value = elapsed;
    });
  }
}
