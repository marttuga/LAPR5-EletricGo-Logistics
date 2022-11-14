import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import { ActivatedRoute, Router } from "@angular/router";
//import TextSprite from "@seregpie/three.text-sprite";
import { Camera, Object3D, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {WarehousesService} from "../../services/dotnet/warehouses.service";

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

  private warehouses:any[]=[];

  private warehouseBaseMesh:THREE.Mesh[]=[];
  private warehouseBaseGeometry = new THREE.CylinderGeometry(2, 2, 0.1, 64);
  private warehouseBaseMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });

  private  warehouseCubeGeometry = new THREE.BoxGeometry( 0.70, 0.90, 0.70 );
  private  warehouseCubeMaterial = new THREE.MeshLambertMaterial( {color: 0xffffff} );

  constructor(private route: ActivatedRoute,private  warehousesService:WarehousesService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.warehousesService.getWarehouses().subscribe(async data=>{
      this.warehouses=data;
      await this.createScene();
      await this.startRenderingLoop();
    })
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


    //for(let i=0;i<this.warehouses.length;i++) {
    const baseMesh = new THREE.Mesh(this.warehouseBaseGeometry, this.warehouseBaseMaterial);
    baseMesh.position.set(0, 0, 0);

    const loader = new GLTFLoader();
    loader.load('/assets/network/warehouse.glb', (gltf) => {
      gltf.scene.name = "Warehouse";
      gltf.scene.position.set(baseMesh.position.x, baseMesh.position.y, baseMesh.position.z);
      gltf.scene.scale.set(0.1, 0.2, 0.1);
      this.scene.add(gltf.scene);
    }, undefined, function (error) {

      console.error(error);

    });
    //const  cube = new THREE.Mesh(this.warehouseCubeGeometry, this.warehouseCubeMaterial);
    //cube.position.set(baseMesh.position.x,baseMesh.position.y+0.50,baseMesh.position.z);
  //}

    this.scene.add(baseMesh);


    //* Camera
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      NetworkComponent.getAspectRatio(),
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = this.cameraZ;

    //*Light
      const light1 = new THREE.PointLight( 0xFFFFFF , 1, 10000 );
      light1.position.set( -window.innerWidth, 0, 0 );
      this.scene.add( light1 );
      const light2 = new THREE.PointLight( 0xFFFFFF , 1, 10000 );
      light2.position.set( window.innerWidth, 0, 0 );
      this.scene.add( light2);
      const light3 = new THREE.PointLight( 0xFFFFFF , 1, 10000 );
      light3.position.set( 0, -window.innerHeight, 0 );
      this.scene.add( light3 );
      const light4 = new THREE.PointLight( 0xFFFFFF , 1, 10000 );
      light4.position.set( 0, window.innerHeight, 0 );
      this.scene.add( light4);
      const light_amb = new THREE.AmbientLight(0x8080ff, 0.01);
      this.scene.add(light_amb);

    const focusLight = new THREE.SpotLight(0xffffff, 1);
    this.camera.add(focusLight);
    this.scene.add(this.camera);

  }

  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    //definir janela
    this.renderer.setSize(window.innerWidth,window.innerHeight);

    //Orbit Controls
    let controls = new OrbitControls(this.camera, this.renderer.domElement);

    controls.maxDistance = 900;
    controls.minDistance = 100;
    controls.minAzimuthAngle = -Math.PI ;
    controls.maxAzimuthAngle = Math.PI ;

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
