import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import { ActivatedRoute, Router } from "@angular/router";
//import TextSprite from "@seregpie/three.text-sprite";
import { Camera, Object3D, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  private canvasRef: ElementRef | undefined;

  //* Stage Properties;
  @Input() public cameraZ: number = 500; //* Aproximação da câmara || Coordenada Z
  @Input() public fieldOfView: number = 1;  //* Distância da câmara
  @Input('nearClipping') public nearClippingPlane: number = 1;//* Proximidade do plano
  @Input('farClipping') public farClippingPlane: number = 2000;//* Afastamento do plano



  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  //*Light
  private focusLight = new THREE.SpotLight(0xffffff, 1);



  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
  }

  private get canvas(): HTMLCanvasElement {
    if(this.canvasRef != undefined) {
      return this.canvasRef.nativeElement;
    }
    return new HTMLCanvasElement();
  }

  private static getAspectRatio() {
    return window.innerWidth/ window.innerHeight;
  }

  private createScene() {

    //* Scene
    this.scene = new THREE.Scene();

    //*Ambient Light

    //* Camera
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      NetworkComponent.getAspectRatio(),
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = this.cameraZ;
    this.camera.add(this.focusLight);

    const loader = new GLTFLoader();
    loader.load('/assets/network/Parrot.glb', (gltf) => {
      gltf.scene.name = "Parrot";
      gltf.scene.position.set(1.2,0,0);
      gltf.scene.scale.set(0.02, 0.02, 0.02);

      this.scene.add(gltf.scene);
      console.log(this.scene.getObjectByName("Parrot")?.position)
    }, undefined, function (error) {

      console.error(error);

    });

  }

  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    //definir janela
    this.renderer.setSize(window.innerWidth,window.innerHeight);
    //document.body.appendChild(this.renderer.domElement);


    let controls = new OrbitControls(this.camera, this.renderer.domElement);

    controls.maxDistance = 900;
    controls.minDistance = 100;
    controls.minAzimuthAngle = -Math.PI / 2;
    controls.maxAzimuthAngle = Math.PI / 2;

    let component: NetworkComponent = this;
    (function render() {
      requestAnimationFrame(render);
      //render perspective camera/graph
      component.renderer.setViewport(-200, 0, window.innerWidth, window.innerHeight);
      component.renderer.setClearColor(0xCADFED, 1);
      component.renderer.render(component.scene, component.camera);

    }());
  }

  onClick() {

  }

  onMouseMove(event: MouseEvent) {

  }


}
