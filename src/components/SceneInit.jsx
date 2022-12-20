import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from 'three/examples/jsm/libs/stats.module';

class SceneInit {
  constructor(parentRef) {
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;

    this.parentRef = parentRef;

    this.canvasSize = new THREE.Vector2(window.innerWidth, window.innerHeight);
    this.mousePos = new THREE.Vector2();

    this.clock = 0.0;
    this.stats = undefined;
    this.controls = undefined;

    this.ambientLight = undefined;
    this.directionalLight = undefined;

    this.defines = {
      MAX_STEPS: 100,
      MAX_DIST: 100.,
      SURF_DIST: .001,
      TAU: 6.283185,
      PI: 3.141592
    };

    this.uniforms = {
      u_time: { value: this.clock },
      u_resolution: { value: this.canvasSize },
      u_mouse: { value: this.mousePos }
    };
  }

  initialize() {

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.canvasSize.x / this.canvasSize.y,
      1,
      1000
    );
    this.camera.position.z = 48;

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(this.canvasSize.x, this.canvasSize.y);
    this.parentRef.appendChild(this.renderer.domElement);
    // this.renderer.shadowMap.enabled = true;

    this.clock = new THREE.Clock();
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.stats = Stats();
    document.body.appendChild(this.stats.dom);

    // ambient light which is for the whole scene
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.ambientLight.castShadow = true;
    this.scene.add(this.ambientLight);

    // directional light - parallel sun rays
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // this.directionalLight.castShadow = true;
    this.directionalLight.position.set(0, 32, 64);
    this.scene.add(this.directionalLight);

    window.addEventListener('resize', () => this.onWindowResize(), false);    
    this.parentRef.addEventListener( 'pointermove', (e) => this.onPointerMove(e));
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats.update();
    this.controls.update();
    this.uniforms.u_time.value = this.clock.getElapsedTime();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }


  onPointerMove(e) {
    const bounds = e.target.getBoundingClientRect();
    const x = Math.round(e.clientX - bounds.left);
    const y = Math.round(e.clientY - bounds.top);
    this.mousePos.set(x, y);
    // console.log('mousePos: ', this.mousePos);
    this.uniforms.u_mouse.value = this.mousePos;
  }


  onWindowResize() {
    this.canvasSize.set(
      this.parentRef.clientWidth,
      this.parentRef.clientHeight
    );
    this.camera.aspect = this.canvasSize.x / this.canvasSize.y;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvasSize.x, this.canvasSize.y);
    // console.log('canvasSize: ', this.canvasSize);
    this.uniforms.u_resolution.value = this.canvasSize;
  }
}

export default SceneInit;