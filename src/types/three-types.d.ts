// Type declarations for React Three Fiber components
import * as THREE from 'three';
import { Object3DNode, BufferGeometryNode, MeshProps } from '@react-three/fiber';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: MeshProps;
      planeGeometry: BufferGeometryNode<THREE.PlaneGeometry, typeof THREE.PlaneGeometry>;
      primitive: { object: any; [key: string]: any };
      // Add any other Three.js elements you're using
    }
  }
} 