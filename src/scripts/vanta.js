// src/scripts/vanta.js
import * as THREE from 'three';
import GLOBE from 'vanta/dist/vanta.globe.min';

export function initVantaGlobe() {
  if (typeof window !== 'undefined' && typeof GLOBE === 'function') {
    try {
      GLOBE({
        el: ".background",
        THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        size: 0.5,
        color: 0xff3f81,
        backgroundColor: 0x1e1434
      });
    } catch (error) {
      console.log('VANTA initialization error:', error);
    }
  }
}