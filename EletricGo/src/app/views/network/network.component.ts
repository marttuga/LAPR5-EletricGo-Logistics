import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import { ActivatedRoute, Router } from "@angular/router";
import TextSprite from "@seregpie/three.text-sprite";
import {
  CatmullRomCurve3,
  Group,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Object3D,
  TextureLoader,
  Vector3
} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {WarehousesService} from "../../services/dotnet/warehouses.service";
import {RoutesService} from "../../services/node/routes.service";
import {TrucksService} from "../../services/node/truck.service";
import {ListTruckComponent} from "../list-truck/list-truck.component";

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit, AfterViewInit {

  public choiceTruck:string;
  public checker:number=1

   //tipo do canvas
  @ViewChild('canvas')
  private canvasRef: ElementRef;

  //* Stage Properties;
  @Input() public cameraZ: number = 400; //* Aproximação da câmara || Coordenada Z
  @Input() public fieldOfView: number = 5;  //* Distância da câmara
  @Input('nearClipping') public nearClippingPlane: number = 1;//* Proximidade do plano
  @Input('farClipping') public farClippingPlane: number = 30000;//* Afastamento do plano


  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;

  private warehouses:any[]=[];
  private routes:Route[]=[];
  private trucks:Truck[]=[];

  private skyBoxTexture:THREE.Texture;

  private warehouseBaseGeometry = new THREE.CylinderGeometry(5, 5, 0.22, 64);
  private warehouseBaseMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  private warehouse3D: Group;
  private roundaboutTexture: THREE.Texture ;
  private elemLigTexture: THREE.Texture ;
  private roadTexture:THREE.Texture;
  private truck3D:Group;

  private activateMotion=0;

  private roadsData = new Map<string, number[]>([]);
  private static TETA_0=0;private static TETA_1=1;
  private static EL0_X=2;private static EL0_Y=3;private static EL0_Z=4;
  private static EL1_X=5;private static EL1_Y=6;private static EL1_Z=7;
  private static ROAD_X=8;private static ROAD_Y=9;private static ROAD_Z=10;
  private static BETA=11;private static OMEGA=12;

  constructor(private route: ActivatedRoute,private  warehousesService:WarehousesService, private routesService:RoutesService,private trucksService:TrucksService) { }

  ngOnInit(): void {
    this.importLoaders();

    this.warehousesService.getWarehouses().subscribe(async data=>{
      this.warehouses=data;
      console.log(this.warehouses)

      this.routesService.getRoutes().subscribe(async data=>{
        this.routes=data;
        console.log(this.routes)

        this.trucksService.getTrucks().subscribe(async data=>{
          this.trucks=data;
          console.log(this.trucks)
          await this.createScene();
          await this.startRenderingLoop();
        })
      })
    })
  }

  ngAfterViewInit(): void {
  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  //tamanho da janela
  private static getAspectRatio() {
    return window.innerWidth/ window.innerHeight;
  }

  private createScene() {

    //* Scene
    this.scene = new THREE.Scene();

    //* Camera
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      NetworkComponent.getAspectRatio(),
      this.nearClippingPlane,
      this.farClippingPlane
    );
    //fog
   // this.scene.fog = new THREE.Fog(0xFFFFFF, 10,5000);

    this.camera.position.z = this.cameraZ;
    this.scene.add(this.camera);

    //this.addSkybox();
    this.addWarehouses()
    this.addLights()
  }


  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    //definir janela
    this.renderer.setSize(window.innerWidth,window.innerHeight);

    //ShadowMap para permitir Sombras
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //Orbit Controls
    let controls = new OrbitControls(this.camera, this.renderer.domElement);

    controls.maxDistance = 1000;//900 zoom out
    controls.minDistance = 50;//100 zoom in
    controls.minAzimuthAngle = -Math.PI/2 ;//Rotação D 90º
    controls.maxAzimuthAngle = Math.PI/2 ;//Rotação E 90º
    controls.maxPolarAngle=Math.PI/2 //Rotação Eixo Y 90º

    let component: NetworkComponent = this;
    (function render() {
      requestAnimationFrame(render);

      let truck=component.scene.getObjectByName(component.choiceTruck);


      //Render truck Movement animation
      component.manualMovement(truck);

      component.automaticMovement(truck);


      //janelade visualização
      component.renderer.setViewport(-200, 0, window.innerWidth+200, window.innerHeight);
      component.renderer.setClearColor(0xCADFED, 1);
      component.renderer.render(component.scene, component.camera);

    }());
  }

  private addWarehouses(){
    for (let i = 0; i < this.warehouses.length; i++)
    {


      const base = new THREE.Mesh(this.warehouseBaseGeometry, this.warehouseBaseMaterial);//*Base da Warehouse
      //this.roundabouts[i]=base;

      base.position.set(
        NetworkComponent.getCoordinates(this.warehouses[i].latitude, this.warehouses[i].longitude, this.warehouses[i].warehouseAltitude)[0],
        NetworkComponent.getCoordinates(this.warehouses[i].latitude, this.warehouses[i].longitude, this.warehouses[i].warehouseAltitude)[1],
        NetworkComponent.getCoordinates(this.warehouses[i].latitude, this.warehouses[i].longitude, this.warehouses[i].warehouseAltitude)[2]);

      base.name=this.warehouses[i].warehouseIdentifier;
      base.castShadow=true;
      base.receiveShadow=true;
      //Nomes cidades
      let sprite=new TextSprite({ text: this.warehouses[i].designation,alignment: 'left',
        color: '#000000',
        fontFamily: '"Arial", Times, serif',
        fontStyle: 'italic',});
      sprite.position.set(base.position.x,base.position.y+3.2,base.position.z);
      this.scene.add(sprite)

      let warehouse3D=this.warehouse3D.clone();
      warehouse3D.name = this.warehouses[i].designation;
      warehouse3D.position.set(base.position.x, base.position.y, base.position.z);
      this.scene.add(warehouse3D);

      this.scene.add(base);
      this.warehouseBaseMaterial.map = this.roundaboutTexture;
    }
    this.addRoads();
  }

  private addRoads() {

    for (let i = 0; i < this.routes.length; i++) {
      let ware0 = <Object3D>this.scene.getObjectByName((this.routes[i].departureId));
      let ware1 = <Object3D>this.scene.getObjectByName((this.routes[i].arrivalId));

      if(ware0!=null&&ware1!=null){
        let teta0=Math.atan2(-(ware1.position.z-ware0.position.z),ware1.position.x-ware0.position.x);
        let teta1=Math.PI+teta0;

        let elemLigMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        elemLigMaterial.map= this.elemLigTexture;
        let elemLigGeometry =new THREE.BoxGeometry(0.3, 0.20, 2);

        let elemLig0Mesh=new THREE.Mesh(elemLigGeometry,elemLigMaterial);
        elemLig0Mesh.position.set(ware0.position.x+ this.warehouseBaseGeometry.parameters.radiusTop*Math.cos(teta0),ware0.position.y,ware0.position.z-this.warehouseBaseGeometry.parameters.radiusTop*Math.sin(teta0));
        elemLig0Mesh.rotateY(teta0)
        elemLig0Mesh.castShadow=true;
        elemLig0Mesh.receiveShadow=true;
        this.scene.add(elemLig0Mesh)


        let elemLig1Mesh=new THREE.Mesh(elemLigGeometry,elemLigMaterial);
        elemLig1Mesh.position.set(ware1.position.x+ this.warehouseBaseGeometry.parameters.radiusTop*Math.cos(teta1),ware1.position.y,ware1.position.z-this.warehouseBaseGeometry.parameters.radiusTop*Math.sin(teta1));
        elemLig1Mesh.rotateY(teta1)
        elemLig1Mesh.castShadow=true;
        elemLig1Mesh.receiveShadow=true;
        this.scene.add(elemLig1Mesh)

        let roadMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        roadMaterial.map= this.roadTexture;

        //formula da distancia entre dois pontos
        let roadGeometry =new THREE.BoxGeometry(2, 0.20,  Math.sqrt(Math.pow(elemLig0Mesh.position.x-elemLig1Mesh.position.x,2)+Math.pow(elemLig0Mesh.position.y-elemLig1Mesh.position.y,2)+Math.pow(elemLig0Mesh.position.z-elemLig1Mesh.position.z,2)));      let roadMesh=new THREE.Mesh(roadGeometry,roadMaterial);
        //posiçao conforme o ponto medio entre os elementos de ligaçao
        roadMesh.position.set((elemLig0Mesh.position.x+elemLig1Mesh.position.x)/2,(elemLig0Mesh.position.y+elemLig1Mesh.position.y)/2,(elemLig0Mesh.position.z+elemLig1Mesh.position.z)/2);
        roadMesh.castShadow=true;
        roadMesh.receiveShadow=true;
        this.scene.add(roadMesh)

        let beta =Math.asin((elemLig0Mesh.position.y-elemLig1Mesh.position.y)/roadGeometry.parameters.depth);

        let omega=teta0+Math.PI/2;
        roadMesh.rotation.set(beta,omega,0, "ZYX")

        this.roadsData.set(this.routes[i].routeId,[teta0,teta1,elemLig0Mesh.position.x,elemLig0Mesh.position.y,elemLig0Mesh.position.z,elemLig1Mesh.position.x,elemLig1Mesh.position.y,elemLig1Mesh.position.z,roadMesh.position.x,roadMesh.position.y,roadMesh.position.z,beta,(teta0+Math.PI/2)])
      }
    }
  }


  private addTruck(){

    const ware0 = this.scene.getObjectByName(this.routes[0].departureId);
    const ware1 = this.scene.getObjectByName(this.routes[0].arrivalId);

    if(ware0!=null&&ware1!=null){
      const truck3D = this.truck3D.clone();
      truck3D.name = this.choiceTruck;
      truck3D.position.set(ware0?.position.x+0.3, ware0.position.y, ware0.position.z);

      let roadData=this.roadsData.get(<string>this.getRouteByWarehouses(ware0.name, ware1.name)?.routeId);
      if(roadData!=null) {
        truck3D.rotation.set(roadData[NetworkComponent.BETA],roadData[NetworkComponent.OMEGA] , 0, "ZYX")
        this.scene.add(truck3D);
      }
    }
  }


  private automaticMovement(truck:any) {
    //Automatic truck movement
    if (this.activateMotion == 1 && truck!=undefined ) {

      const departure = this.scene.getObjectByName(this.routes[0].departureId);
      const arrival = this.scene.getObjectByName(this.routes[0].arrivalId);

      if(departure!=null&&arrival!=null){
        let roadData = this.roadsData.get(this.routes[0].routeId);
        if (roadData!=null) {
          let path = new CatmullRomCurve3(
            [
              new Vector3(departure?.position.x, departure?.position.y+0.1, departure?.position.z),//inicio
              new Vector3(roadData[NetworkComponent.EL0_X],roadData[NetworkComponent.EL0_Y]+0.1,roadData[NetworkComponent.EL0_Z]),//EL0
              new Vector3(roadData[NetworkComponent.ROAD_X],roadData[NetworkComponent.ROAD_Y]+0.1,roadData[NetworkComponent.ROAD_Z]),//PM
              new Vector3(roadData[NetworkComponent.EL1_X],roadData[NetworkComponent.EL1_Y]+0.1,roadData[NetworkComponent.EL1_Z]),//EL1
              new Vector3(arrival?.position.x, arrival?.position.y+0.1, arrival?.position.z),//fim
            ]);


          const time = .0002 * performance.now();
          const points = path.getPoint(time);


          if (arrival?.position.x != undefined && departure?.position.x != undefined) {

            truck?.position?.set(points.x, points.y, points.z);

            console.log("Departure  : " + departure?.position.x + " " + departure?.position.y + " " + departure?.position.z)
            console.log("Arrival  : " + arrival?.position.x + " " + arrival?.position.y + " " + arrival?.position.z)
            console.log("=========================")
            console.log("Truck :" + truck.position.x + " " + truck.position.y + " " + truck.position.z)
            console.log("\n")

            if (parseInt(Math.abs(arrival?.position.x).toFixed(2)) == parseInt(Math.abs(truck?.position.x).toFixed(2)) && parseInt(Math.abs(arrival?.position.y).toFixed(2)) == parseInt(Math.abs(truck?.position.y).toFixed(2)) && parseInt(Math.abs(arrival?.position.z).toFixed(2)) == parseInt(Math.abs(truck?.position.z).toFixed(2))) {
              this.activateMotion = 0;
              this.scene.remove(truck);
            }
          }
        }
      }
    }
  }
  private manualMovement(truck:any){
    if(truck!=undefined) {
      document.onkeydown = function (e) {
        switch (e.key) {
          case "a":
            //rodar a camara para a esquerda
            truck?.position.set(truck?.position.x- 0.1,truck?.position.y,truck?.position.z) ;
            break;

          case "d":
            //rodar a camara para a direita
            truck?.position.set(truck?.position.x+ 0.1,truck?.position.y,truck?.position.z) ;
            break;

          case "w":
            //avançar - incrementar a posição da camara no eixo dos zz
            truck?.position.set(truck?.position.x,truck?.position.y,truck?.position.z- 0.1) ;
            break;

          case "s":
            //recuar - decrementar a posição da camara no eixo dos zz
            truck?.position.set(truck?.position.x,truck?.position.y,truck?.position.z+ 0.1) ;
            break;

          case "p":
            //subir - incrementar a posição da camara no eixo dos yy
            truck?.position.set(truck?.position.x,truck?.position.y+ 0.1,truck?.position.z) ;
            break;

          case "l":
            //descer - decrementar a posição da camara no eixo dos yy
            truck?.position.set(truck?.position.x,truck?.position.y- 0.1,truck?.position.z) ;
            break;

          default:break;
        }

        switch (e.keyCode){
          case 39://right key
            truck?.rotateY(5 * Math.PI / 180);
            break;

          case 37://lef key
            truck?.rotateY(-5 * Math.PI / 180);
            break;

          case 38://up key
            truck?.rotateX(-5 * Math.PI / 180);
            break;

          case 40://down key
            truck?.rotateX(5 * Math.PI / 180);
            break;

          default:break;
        }
      }
    }
  }



  private addLights(){
    //*Light
    /*const light1 = new THREE.PointLight(0xFFFFFF, 1, 10000);
    light1.position.set(-window.innerWidth, 0, 0);
    light1.castShadow=true;
    this.scene.add(light1);

    const light2 = new THREE.PointLight(0xFFFFFF, 1, 10000);
    light2.position.set(window.innerWidth, 0, 0);
    light2.castShadow=true;
    this.scene.add(light2);

    const light3 = new THREE.PointLight(0xFFFFFF, 1, 10000);
    light3.position.set(0, -window.innerHeight, 0);
    light3.castShadow=true;
    this.scene.add(light3);

    const light4 = new THREE.PointLight(0xFFFFFF, 1, 10000);
    light4.position.set(0, window.innerHeight, 0);
    light4.castShadow=true;
    this.scene.add(light4);*/

    const light_amb = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(light_amb);

    /*const focusLight = new THREE.SpotLight(0xffffff, 1);
    this.camera.add(focusLight);*/
  }

  private static getCoordinates(lat:number, lon:number, alt: number):any {
    let coordinatesArr: number[]=[];
    coordinatesArr[0]=-(((50-(-50))/(8.7613-8.2451))*(lon-8.2451)+(-50));
    coordinatesArr[1]=((((50-(-50))/(42.1115-40.8387))*(lat-40.8387)+(-50)));
    coordinatesArr[2]=((((50 / 800) * alt)));
    parseInt( coordinatesArr[0].toFixed(4));
    parseInt( coordinatesArr[1].toFixed(4));
    parseInt( coordinatesArr[2].toFixed(4));
    return coordinatesArr;
  }


  onClick() {
    this.addTruck();

    this.activateMotion=1;


  }

  onMouseMove(event: MouseEvent) {

  }


  public makeDelivery() {
    let x1 = document.getElementById("Option1");
    let x2 = document.getElementById("Option2");

    let y=document.getElementById("navbar")
    let z=document.getElementById("delivery");

    if (x1!=null && x2!=null && y!=null&&z!=null) {
      if (x1.style.display === "none" &&x2.style.display === "none") {
        x1.style.display = "block";
        x2.style.display = "block";
        //   y.style.height ="80px";
        z.style.display="none"
      }
    }
  }

  //Auxiliar Methods
  public importLoaders(){
    this.skyBoxTexture=new THREE.TextureLoader().load('assets/network/sky.jpg');

    const loaderWare = new GLTFLoader();
    loaderWare.load('/assets/network/warehouse.glb', (gltf) => {
      gltf.scene.scale.set(0.25, 0.25, 0.25);
      gltf.scene.castShadow=true;
      gltf.scene.receiveShadow=true;
      this.warehouse3D=gltf.scene;
    }, undefined, function (error) {

      console.error(error);
    });
    const loaderTruck = new GLTFLoader();
    loaderTruck.load('/assets/network/Truck.glb', (gltf) => {
      gltf.scene.scale.set(0.4, 0.4, 0.4);
      gltf.scene.castShadow=true;
      gltf.scene.receiveShadow=true;
      this.truck3D=gltf.scene;
    }, undefined, function (error) {

      console.error(error);
    });
    this.roundaboutTexture=new THREE.TextureLoader().load('assets/network/rotunda.jpg')

    this.elemLigTexture=new THREE.TextureLoader().load('assets/network/road.jpg')
    this.elemLigTexture.anisotropy = 16;
    this.elemLigTexture.wrapS = this.elemLigTexture.wrapT = THREE.MirroredRepeatWrapping;
    this.elemLigTexture.minFilter = THREE.LinearFilter;
    this.elemLigTexture.magFilter = THREE.LinearFilter;
    this.elemLigTexture.generateMipmaps = false;
    this.elemLigTexture.needsUpdate = true;

    this.roadTexture=new THREE.TextureLoader().load('assets/network/road1.jpg')
    this.roadTexture.anisotropy = 16;
    this.roadTexture.wrapS = this.roadTexture.wrapT = THREE.MirroredRepeatWrapping;
    this.roadTexture.minFilter = THREE.LinearFilter;
    this.roadTexture.magFilter = THREE.LinearFilter;
    this.roadTexture.generateMipmaps = false;
    this.roadTexture.needsUpdate = true;
  }


  public getRouteByWarehouses(ware1Identifier:any,ware2Identifier:any):Route | null{
    for(let i=0;i<this.routes.length;i++){
      if(ware1Identifier==this.routes[i].arrivalId  && ware2Identifier==this.routes[i].departureId){
        return this.routes[i];
      }else if(ware1Identifier==this.routes[i].departureId && ware2Identifier==this.routes[i].arrivalId){
        return this.routes[i];
      }
    }
    return null;
  }

  public scrollAutomaticDelivery(el: HTMLElement) {


    el.scrollIntoView({behavior: 'smooth'});

  }

  public scrollManualDelivery(el: HTMLElement) {

    el.scrollIntoView({behavior: 'smooth'});

  }
}



