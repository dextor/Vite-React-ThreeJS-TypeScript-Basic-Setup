import {useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from 'three/examples/jsm/libs/stats.module';

import SceneInit from './SceneInit';

import fragmentShaderCode from '../assets/glsl/glsl.frag';
import vertexShaderCode from '../assets/glsl/glsl.vert';


function Scene() {

  const myRef = useRef();

  useEffect(() => {
    const myScene = new SceneInit(myRef.current);
    myScene.initialize();
    myScene.animate();

    const geometry = new THREE.BoxGeometry(20, 20, 20);    
    // const material = new THREE.MeshNormalMaterial();
    // /*
    const material = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: myScene.clock },
        u_resolution: { value: myScene.canvasSize },
        u_mouse: { value: myScene.mousePos }
      },
      defines: {
        MAX_STEPS: 100,
        MAX_DIST: 100.,
        SURF_DIST: .001,
        TAU: 6.283185,
        PI: 3.141592
      },
      vertexShader: vertexShaderCode,
      fragmentShader: fragmentShaderCode
    });
    //*/
    const cube = new THREE.Mesh(geometry, material);
    myScene.scene.add(cube);
  }, []);



  return(
    <>
      <h1>Vite + React + ThreeJS + TypeScript</h1>
      <div id="three-canvas-container" ref={myRef}></div>
    </>
  );
}

export default Scene;