import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import { ActivatedRoute, Router } from "@angular/router";
import TextSprite from "@seregpie/three.text-sprite";
import {BoxGeometry, Camera, CatmullRomCurve3, Clock, Matrix4, Mesh, Object3D, PerspectiveCamera, Vector3} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {WarehousesService} from "../../services/dotnet/warehouses.service";
import {RoutesService} from "../../services/node/routes.service";
import {ListTruckComponent} from "../list-truck/list-truck.component";
import {TrucksService} from "../../services/node/truck.service";

//fator de escala para as altitudes
//rotacao nao deixar ver por baixo (rotacao na vertical, nao deixar baixar para debaixo do chao)
//textura das estradas, fazer um mosaico e depois ativar o wrap na textura, mapear consoante as unidades de 
//distancia, Ex: 50 unidades de distância - 50 tiles
//textsprite mudar para sprite
//carregas um GLTF no inicio e depois em vez de adicionar à cena, guardar num objeto
//fazer o clone da imagem para fazer sempre ao iniciar

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  //tipo do canvas
  private canvasRef: ElementRef;

  //* Stage Properties;
  @Input() public cameraZ: number = 400; //* Aproximação da câmara || Coordenada Z
  @Input() public fieldOfView: number = 5;  //* Distância da câmara
  @Input('nearClipping') public nearClippingPlane: number = 1;//* Proximidade do plano
  @Input('farClipping') public farClippingPlane: number = 2000;//* Afastamento do plano

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;



  //private roundabouts:THREE.Mesh[]=[];
  private warehouses:any[]=[];
  private routes:Route[]=[];
  private trucks:Truck[]=[];

  private warehouseBaseGeometry = new THREE.CylinderGeometry(5, 5, 0.22, 64);
  private warehouseBaseMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });

  private activateMotion=0;
  private truckChek=0;                    
  private roadsData = new Map<string, number[]>([]);
  private static TETA_0=0;private static TETA_1=1;
  private static EL0_X=2;private static EL0_Y=3;private static EL0_Z=4;
  private static EL1_X=5;private static EL1_Y=6;private static EL1_Z=7;
  private static ROAD_X=8;private static ROAD_Y=9;private static ROAD_Z=10;
  private static BETA=11;private static INCLINATION=12;


  constructor(private route: ActivatedRoute,private  warehousesService:WarehousesService, private routesService:RoutesService,private trucksService:TrucksService) { }

  ngOnInit(): void {

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

  //ligação ao HTML 
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
      //afastamento e proximidade da camara
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.z = this.cameraZ;
  //  this.camera.lookAt(new Vector3(0,-26.359,0));
    this.scene.add(this.camera);

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

    /*
    this.renderer.shadowMap.enabled=true;
    this.renderer.shadowMap.type=THREE.PCFSoftShadowMap;

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(2000, -100, 80, 80),
      new THREE.MeshStandardMaterial({
          color: 0x808080,
        }));
    ground.castShadow = false;
    ground.receiveShadow = true;
    ground.rotation.x = -Math.PI / 2;
    this.scene.add (ground);*/


    //Orbit Controls
    let controls = new OrbitControls(this.camera, this.renderer.domElement);
    //zoom e zoom out
    controls.maxDistance = 1000;//900;
    controls.minDistance = 50;//100;
    controls.minAzimuthAngle = -Math.PI/2 ;//Rotação
    controls.maxAzimuthAngle = Math.PI/2 ;


    let component: NetworkComponent = this;
    (function render() {
      requestAnimationFrame(render);

      let truck=component.scene.getObjectByName("TruckyBlue");


      //Render truck Movement animation
      component.manualMovement(truck);

      component.automaticMovement(truck);


      //render perspective camera/graph
      //janela de visualização
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

       //nome das cidades que aparece em cima das warehouses
       let sprite=new TextSprite({ text: this.warehouses[i].designation,alignment: 'left',
         color: '#000000',
         fontFamily: '"Times New Roman", Times, serif',
         fontStyle: 'italic', });
      sprite.position.setX(base.position.x);
      sprite.position.setY(base.position.y+3.2);
      sprite.position.setZ(base.position.z);
      this.scene.add(sprite)

      //load á figura 3D
      const loader = new GLTFLoader();
      loader.load('/assets/network/warehouse.glb', (gltf) => {
        gltf.scene.name = this.warehouses[i].designation;
        gltf.scene.position.set(base.position.x, base.position.y, base.position.z);
        gltf.scene.scale.set(0.28, 0.28, 0.28);
        this.scene.add(gltf.scene);

      }, undefined, function (error) {

        console.error(error);
      });
      this.scene.add(base);
      this.warehouseBaseMaterial.map = new THREE.TextureLoader().load('assets/network/rotunda.jpg');
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
        elemLigMaterial.map= new THREE.TextureLoader().load('assets/network/road.jpg')
        let elemLigGeometry =new THREE.BoxGeometry(0.3, 0.20, 2);

        //roda ate ao teta 
        let elemLig0Mesh=new THREE.Mesh(elemLigGeometry,elemLigMaterial);
        elemLig0Mesh.position.set(ware0.position.x+ this.warehouseBaseGeometry.parameters.radiusTop*Math.cos(teta0),ware0.position.y,ware0.position.z-this.warehouseBaseGeometry.parameters.radiusTop*Math.sin(teta0));
        elemLig0Mesh.rotateY(teta0)
        this.scene.add(elemLig0Mesh)


        let elemLig1Mesh=new THREE.Mesh(elemLigGeometry,elemLigMaterial);
        elemLig1Mesh.position.set(ware1.position.x+ this.warehouseBaseGeometry.parameters.radiusTop*Math.cos(teta1),ware1.position.y,ware1.position.z-this.warehouseBaseGeometry.parameters.radiusTop*Math.sin(teta1));
        elemLig1Mesh.rotateY(teta1)
        this.scene.add(elemLig1Mesh)

        let roadMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
        roadMaterial.map= new THREE.TextureLoader().load('assets/network/road1.jpg')

        //formula da distancia entre dois pontos
        let roadGeometry =new THREE.BoxGeometry(2, 0.20,  Math.sqrt(Math.pow(elemLig0Mesh.position.x-elemLig1Mesh.position.x,2)+Math.pow(elemLig0Mesh.position.y-elemLig1Mesh.position.y,2)+Math.pow(elemLig0Mesh.position.z-elemLig1Mesh.position.z,2)));      let roadMesh=new THREE.Mesh(roadGeometry,roadMaterial);
        //posiçao conforme o ponto medio entre os elementos de ligaçao
        roadMesh.position.set((elemLig0Mesh.position.x+elemLig1Mesh.position.x)/2,(elemLig0Mesh.position.y+elemLig1Mesh.position.y)/2,(elemLig0Mesh.position.z+elemLig1Mesh.position.z)/2);

        this.scene.add(roadMesh)

        //rotação 
        let beta =Math.asin((elemLig0Mesh.position.y-elemLig1Mesh.position.y)/roadGeometry.parameters.depth);
        let omega=teta0+Math.PI/2;
        roadMesh.rotation.set(beta,omega,0, "ZYX")

        this.roadsData.set(<string>this.getRouteByWarehouses(ware0, ware1)?.routeId.toString(),[teta0,teta1,elemLig0Mesh.position.x,elemLig0Mesh.position.y,elemLig0Mesh.position.z,elemLig1Mesh.position.x,elemLig1Mesh.position.y,elemLig1Mesh.position.z,roadMesh.position.x,roadMesh.position.y,roadMesh.position.z,beta,(teta0+Math.PI/2)])
      }
    }
  }


  private addTruck(){
    const ware0 = this.scene.getObjectByName(this.routes[0].departureId);
    const ware1 = this.scene.getObjectByName(this.routes[0].arrivalId);

    //carregar a figura 3D
    const loader = new GLTFLoader();
    loader.load('/assets/network/Truck.glb', (gltf) => {
      gltf.scene.name = "TruckyBlue";
      gltf.scene.position.set(<number>this.scene.getObjectByName(this.routes[0].departureId)?.position.x, <number>this.scene.getObjectByName(this.routes[0].departureId)?.position.y, <number>this.scene.getObjectByName(this.routes[0].departureId)?.position.z);
      gltf.scene.scale.set(0.4, 0.4, 0.4);
      let roadData=this.roadsData.get(<string>this.getRouteByWarehouses(ware0, ware1)?.routeId);
      if(roadData!=null) {
        gltf.scene.rotation.set(roadData[NetworkComponent.BETA],roadData[NetworkComponent.INCLINATION] , 0, "ZYX")
        this.scene.add(gltf.scene);
        this.truckChek = 1;
      }
    }, undefined, function (error) {

      console.error(error);
    });
  }


  private automaticMovement(truck:any) {
    //Automatic truck movement

    if (this.activateMotion == 1 && this.truckChek == 1) {

      const departure = this.scene.getObjectByName(this.routes[0].departureId);
      const arrival = this.scene.getObjectByName(this.routes[0].arrivalId);
      let roadData = this.roadsData.get(<string>this.getRouteByWarehouses(departure, arrival)?.routeId);
      if (roadData!=null) {
        let path = new CatmullRomCurve3([
          new Vector3(departure?.position.x, departure?.position.y, departure?.position.z),//inicio
          new Vector3(roadData[NetworkComponent.EL0_X],roadData[NetworkComponent.EL0_Y],roadData[NetworkComponent.EL0_Z]),//EL0
          new Vector3(roadData[NetworkComponent.ROAD_X],roadData[NetworkComponent.ROAD_Y],roadData[NetworkComponent.ROAD_Z]),//PM
          new Vector3(roadData[NetworkComponent.EL1_X],roadData[NetworkComponent.EL1_Y],roadData[NetworkComponent.EL1_Z]),//EL1
          new Vector3(arrival?.position.x, arrival?.position.y, arrival?.position.z),//fim
        ]);


        const time = .0002 * performance.now();
        const points = path.getPoint(time);


        if (arrival?.position.x != undefined && departure?.position.x != undefined) {
          /* if(Math.abs(departure?.position.x) - Math.abs(points.x) <0.010 && Math.abs(departure?.position.y) - Math.abs(points.y) <0.010 && Math.abs(departure?.position.z) - Math.abs(points.z) <0.010){

           }*/
          truck?.position?.set(points.x, points.y, points.z);

          console.log("Departure  : " + departure?.position.x + " " + departure?.position.y + " " + departure?.position.z)
          console.log("Arrival  : " + arrival?.position.x + " " + arrival?.position.y + " " + arrival?.position.z)
          console.log("=========================")
          console.log("Truck :" + truck.position.x + " " + truck.position.y + " " + truck.position.z)
          console.log("\n")

          if (parseInt(Math.abs(arrival?.position.x).toFixed(2)) == parseInt(Math.abs(truck?.position.x).toFixed(2)) && parseInt(Math.abs(arrival?.position.y).toFixed(2)) == parseInt(Math.abs(truck?.position.y).toFixed(2)) && parseInt(Math.abs(arrival?.position.z).toFixed(2)) == parseInt(Math.abs(truck?.position.z).toFixed(2))) {
            this.activateMotion = 0;
            this.truckChek = 0;
            this.scene.remove(truck);
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
    const light1 = new THREE.PointLight(0xFFFFFF, 1, 10000);
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
    this.scene.add(light4);

    const light_amb = new THREE.AmbientLight(0x8080ff, 0.01);
    this.scene.add(light_amb);

    const focusLight = new THREE.SpotLight(0xffffff, 1);
    this.camera.add(focusLight);
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


  public getRouteByWarehouses(ware1:any,ware2:any):Route | null{
    for(let i=0;i<this.routes.length;i++){
      if(ware1.warehouseIdentifier==this.routes[i].arrivalId && ware2.warehouseIdentifier==this.routes[i].departureId||ware1.warehouseIdentifier==this.routes[i].departureId && ware2.warehouseIdentifier==this.routes[i].arrivalId){
        return this.routes[i];
      }
    }
    return null;
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


  public scrollAutomaticDelivery(el: HTMLElement) {


    el.scrollIntoView({behavior: 'smooth'});

  }

  public scrollManualDelivery(el: HTMLElement) {

    el.scrollIntoView({behavior: 'smooth'});

  }
}



