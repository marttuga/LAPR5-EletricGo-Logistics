import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import { ActivatedRoute } from "@angular/router";
import TextSprite from "@seregpie/three.text-sprite";
import {CatmullRomCurve3, Group, MeshBasicMaterial, MeshStandardMaterial, Object3D, Vector3} from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {WarehousesService} from "../../services/dotnet/warehouses.service";
import {RoutesService} from "../../services/node/routes.service";
import {TrucksService} from "../../services/node/truck.service";

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit, AfterViewInit {

  public automaticTruck:string;
  public checkerNetworkTruck:number=1
  public checkerNetworkPlanedRoutes:number=1

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
  private activeTrucks:Object3D[]=[];

  private skyBoxTexture:THREE.Texture;
  private skyBoxGroundTexture:THREE.Texture;

  private warehouseBaseGeometry = new THREE.CylinderGeometry(5, 5, 0.22, 64);
  private warehouseBaseMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
  private warehouse3D: Group;
  private roundaboutTexture: THREE.Texture ;
  private elemLigTexture: THREE.Texture ;
  private roadTexture:THREE.Texture;
  private truck3D:Group;

  private activateMotion=0;
  private isAutomaticMovement=0;

  private pathsData = new Map<string, CatmullRomCurve3>([]);
  private wareI_wareF_Data=new Map<string,string[]>();

  private roadsData = new Map<string, number[]>([]);//Experimentar com array bidimensional
  private static TETA_0=0;private static TETA_1=1;
  private static EL0_X=2;private static EL0_Y=3;private static EL0_Z=4;
  private static EL1_X=5;private static EL1_Y=6;private static EL1_Z=7;
  private static ROAD_X=8;private static ROAD_Y=9;private static ROAD_Z=10;
  private static BETA=11;private static OMEGA=12;

  private ambientSoundLoader = new THREE.AudioLoader();
  private ambientListener=new THREE.AudioListener();
  private ambientAudio=new THREE.Audio(this.ambientListener);

  private truckSoundLoader = new THREE.AudioLoader();
  private truckListener=new THREE.AudioListener();
  private truckAudio=new THREE.Audio(this.truckListener);

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

    //sounds
    this.camera.add( this.ambientListener);
    this.camera.add(this.truckListener);

    this.addSkybox();
    this.addWarehouses()
    this.addLights()
  }


  private addSkybox(){
    let skyboxGeo = new THREE.BoxGeometry(1000, 1000,1000);
    let skyboxMaterials= [
      new MeshBasicMaterial({map:this.skyBoxTexture,side:THREE.BackSide}),
      new MeshBasicMaterial({map:this.skyBoxTexture,side:THREE.BackSide}),
      new MeshBasicMaterial({map:this.skyBoxTexture,side:THREE.BackSide}),
      new MeshStandardMaterial({map:this.skyBoxGroundTexture,side:THREE.BackSide}),
      new MeshBasicMaterial({map:this.skyBoxTexture,side:THREE.BackSide}),
      new MeshBasicMaterial({map:this.skyBoxTexture,side:THREE.BackSide})
    ];

    let skybox = new THREE.Mesh(skyboxGeo,skyboxMaterials);
    skybox.position.y=400;
    skybox.receiveShadow=true;
    this.scene.add(skybox);
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

    controls.maxDistance = 1500;//900 zoom out
    controls.minDistance = 50;//100 zoom in
    controls.minAzimuthAngle = -Math.PI/2 ;//Rotação D 90º
    controls.maxAzimuthAngle = Math.PI/2 ;//Rotação E 90º
    controls.maxPolarAngle = Math.PI/2 //Rotação Eixo Y 90º
   // controls.minPolarAngle=Math.PI/2

    let component: NetworkComponent = this;
    (function render() {
      requestAnimationFrame(render);


      //Render truck Movement animation
      component.manualMovement();

      component.automaticMovement();


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

        let roadGeometry =new THREE.BoxGeometry(2, 0.20,  Math.sqrt(Math.pow(elemLig0Mesh.position.x-elemLig1Mesh.position.x,2)+Math.pow(elemLig0Mesh.position.y-elemLig1Mesh.position.y,2)+Math.pow(elemLig0Mesh.position.z-elemLig1Mesh.position.z,2)));
        let roadMesh=new THREE.Mesh(roadGeometry,roadMaterial);
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



  private addLights(){
    //*Light

    const light_amb = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(light_amb);

    const directLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directLight.castShadow=true;
    this.camera.add(directLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.8);
    spotLight.position.set(0, 500, 40);
    spotLight.castShadow=true;
    spotLight.target.position.set(0,0,40);
    spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.camera.far =1000;
    this.scene.add(spotLight);
    this.scene.add(spotLight.target);
  }


  private addTruck(truckName:string){

    // @ts-ignore
    const ware0 =  this.scene.getObjectByName( this.wareI_wareF_Data.get(truckName)[0]);
    // @ts-ignore
    const ware1 =  this.scene.getObjectByName( this.wareI_wareF_Data.get(truckName)[1]);


    if(ware0!=null&&ware1!=null){
      const truck3D = this.truck3D.clone();
      truck3D.name = this.automaticTruck;
      truck3D.position.set(ware0?.position.x+0.3, ware0.position.y, ware0.position.z);

      console.log(ware0?.name)
      console.log(ware1?.name)

      let roadData=this.roadsData.get(<string>this.getRouteByWarehouses(ware0.name, ware1.name)?.routeId);
console.log(roadData)
      if(roadData!=null) {
        truck3D.rotation.set(roadData[NetworkComponent.BETA],roadData[NetworkComponent.OMEGA] , 0, "ZYX")
        this.scene.add(truck3D);
        console.log("swuiiiiiii")
        if(this.isAutomaticMovement==1){
          this.activeTrucks.push(<Object3D<Event>>this.scene.getObjectByName(truck3D.name))
          console.log("A adicionar o TRUCk")
          this.isAutomaticMovement=0;
        }
      }
    }
  }

  public setAutomaticMovementRoutAndTruck(el:HTMLElement,map:Map<string,string[]>){
    map.forEach((value, key) => {
      this.automaticTruck=key;//atribuir um camião
      let path = new CatmullRomCurve3();

      for(let i=0;i<value.length-1;i++){
        let road=this.getRouteByWarehouses(value[i],value[i+1]);
        const wareDeparture = this.scene.getObjectByName(value[i]);
        let roadData=this.roadsData.get(<string>road?.routeId);
        if(roadData!=undefined){
        path.points.push(new Vector3(wareDeparture?.position.x,wareDeparture?.position.y,wareDeparture?.position.z));//WARE0
        path.points.push(new Vector3(roadData[NetworkComponent.EL0_X],roadData[NetworkComponent.EL0_Y],roadData[NetworkComponent.EL0_Z]));//EL0
        path.points.push(new Vector3((roadData[NetworkComponent.EL0_X]+roadData[NetworkComponent.ROAD_X])/2,(roadData[NetworkComponent.EL0_Y]+roadData[NetworkComponent.ROAD_Y])/2,(roadData[NetworkComponent.EL0_Z]+roadData[NetworkComponent.ROAD_Z])/2));//PM(EL0-PM))
        path.points.push(new Vector3(roadData[NetworkComponent.ROAD_X],roadData[NetworkComponent.ROAD_Y],roadData[NetworkComponent.ROAD_Z]));//PM
        path.points.push(new Vector3((roadData[NetworkComponent.EL1_X]+roadData[NetworkComponent.ROAD_X])/2,(roadData[NetworkComponent.EL1_Y]+roadData[NetworkComponent.ROAD_Y])/2,(roadData[NetworkComponent.EL1_Z]+roadData[NetworkComponent.ROAD_Z])/2));//PM(EL1-PM));
        path.points.push(new Vector3(roadData[NetworkComponent.EL1_X],roadData[NetworkComponent.EL1_Y],roadData[NetworkComponent.EL1_Z]));//EL1
        }
      }
      this.wareI_wareF_Data.set(this.automaticTruck,[value[0],value[1],value[value.length-1]]);
      this.pathsData.set(this.automaticTruck,path);
      this.addTruck(key)

    });

    this.scrollDone(el);
  }

  public startAutomaticMovement(){
    //ativar o som do camião
    this.truckAudio.play();

    let x3=document.getElementById("OptionStartAutomaticDelivery");
    let z=document.getElementById("OptionMakeDelivery");

    if (x3!=null && z!=null) {
      if (x3.style.display === "block" &&z.style.display === "none") {
        z.style.display = "block";
        x3.style.display = "none";

       //ativar o movimento do camião
        this.activateMotion=1;
      }
    }
  }

  private automaticMovement() {
    //Automatic truck movement


    if (this.activateMotion == 1 && this.activeTrucks.length!=0) {
      for(let i=0;i<this.activeTrucks.length;i++){



        // @ts-ignore
        const wareDeparture = this.scene.getObjectByName( this.wareI_wareF_Data.get(this.activeTrucks[i].name)[0]);
        // @ts-ignore
        const wareArrival = this.scene.getObjectByName(this.wareI_wareF_Data.get(this.activeTrucks[i].name)[2]);

        if(wareDeparture!=null&&wareArrival!=null){
        let pathsData=this.pathsData;

        if(pathsData!=null){
            const time = .0002 * performance.now();
            const points = this.pathsData.get(this.activeTrucks[i].name)?.getPoint(time);


            if (points!=undefined) {

              this.activeTrucks[i]?.position?.set(points.x, points.y, points.z);
              const wareDeparture = this.scene.getObjectByName(this.routes[1].departureId);
              const wareArrival = this.scene.getObjectByName(this.routes[1].arrivalId);


              console.log("Departure  : " + wareDeparture?.position.x + " " + wareDeparture?.position.y + " " + wareDeparture?.position.z)
              console.log("Arrival  : " + wareArrival?.position.x + " " + wareArrival?.position.y + " " + wareArrival?.position.z)
              console.log("=========================")
              console.log("Truck :" + this.activeTrucks[i].position.x + " " + this.activeTrucks[i].position.y + " " + this.activeTrucks[i].position.z)
              console.log("\n")

              if (parseInt(Math.abs(<number>wareArrival?.position.x).toFixed(2)) == parseInt(Math.abs(this.activeTrucks[i]?.position.x).toFixed(2)) && parseInt(Math.abs(<number>wareArrival?.position.y).toFixed(2)) == parseInt(Math.abs(this.activeTrucks[i]?.position.y).toFixed(2)) && parseInt(Math.abs(<number>wareArrival?.position.z).toFixed(2)) == parseInt(Math.abs(this.activeTrucks[i]?.position.z).toFixed(2))) {
                this.activateMotion = 0;
                this.automaticTruck = "";
                this.scene.remove(this.activeTrucks[i]);
                this.activeTrucks = this.activeTrucks.filter(obj => obj != this.activeTrucks[i]);
                this.truckAudio.stop();
              }
            }
          }}}
      }
  }


  private manualMovement(){
     /*
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

    }*/
  }





  private static getCoordinates(lat:number, lon:number, alt: number):any {
    let coordinatesArr: number[]=[];
       const min=-100;
       const max=100;
       const med=max/2;

      coordinatesArr[0]=-(((max-(min))/(8.7613-8.2451))*(lon-8.2451)+(min));
      coordinatesArr[1]=((((med-(-med))/(42.1115-40.8387))*(lat-40.8387)+(-med)));
      coordinatesArr[2]=((((max / 800) * alt)));
      parseInt( coordinatesArr[0].toFixed(4));
      parseInt( coordinatesArr[1].toFixed(4));
      parseInt( coordinatesArr[2].toFixed(4));

    return coordinatesArr;
  }


  onClick() {

  }

  onMouseMove(event: MouseEvent) {

  }

  public importLoaders(){
   /* this.ambientSoundLoader.load( 'assets/network/audio/Burn it Down.mp3', (buffer) => {
      this.ambientAudio.setBuffer( buffer );
      this.ambientAudio.setLoop( true );
      this.ambientAudio.setVolume( 0.5 );
      this.ambientAudio.play();
    });*/

    this.truckSoundLoader.load('assets/network/audio/Truck Sound.mp3', (buffer) => {
      this.truckAudio.setBuffer( buffer );
      this.truckAudio.setLoop( true );
      this.truckAudio.setVolume( 0.5 );
    });

    this.skyBoxTexture=new THREE.TextureLoader().load('assets/network/sky.jpg');

    this.skyBoxGroundTexture=new THREE.TextureLoader().load('assets/network/ground.jpg');
    this.skyBoxGroundTexture.anisotropy = 16;
    this.skyBoxGroundTexture.wrapS = this.skyBoxGroundTexture.wrapT = THREE.MirroredRepeatWrapping;
    this.skyBoxGroundTexture.minFilter = THREE.LinearFilter;
    this.skyBoxGroundTexture.magFilter = THREE.LinearFilter;
    this.skyBoxGroundTexture.generateMipmaps = false;
    this.skyBoxGroundTexture.needsUpdate = true;

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


  //Auxiliar Methods
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

  public makeDelivery() {//bloquear o make delivery e mostrar as opcoes de automatic ou manual movement
    let x1 = document.getElementById("OptionManualDelivery");
    let x2 = document.getElementById("OptionAutomaticDelivery");

    let z=document.getElementById("OptionMakeDelivery");

    if (x1!=null && x2!=null&&z!=null) {
      if (x1.style.display === "none" &&x2.style.display === "none") {
        x1.style.display = "block";
        x2.style.display = "block";
        z.style.display="none"
      }
    }
  }

  public scrollAutomaticDelivery(el: HTMLElement) {
    this.isAutomaticMovement=1;
    let x=document.getElementById("AutomaticSection");
    if(x!=null){
      x.style.display="block"
    }
    el.scrollIntoView({behavior: 'smooth'});

  }

  public scrollManualDelivery(el: HTMLElement) {
    let x=document.getElementById("ManualSection");
    if(x!=null){
      x.style.display="block"
    }
    el.scrollIntoView({behavior: 'smooth'});

  }
  /*public scrollToPlannedRoute(el1:string,el2: HTMLElement) {
    this.automaticTruck=el1;
    el2.scrollIntoView({behavior: 'smooth'});

  }*/

  public scrollDone(el: HTMLElement){
    let done=document.getElementById("ButtonDoneSection")
    if(done!=null){
      done.style.display="block"
    }
  el.scrollIntoView({behavior: 'smooth'});
  }

  public scrollCanvas(el: HTMLElement) {
    let x1 = document.getElementById("OptionManualDelivery");
    let x2 = document.getElementById("OptionAutomaticDelivery");
    let x3 = document.getElementById("OptionStartAutomaticDelivery");
    let x4=document.getElementById("ManualSection");
    let x5=document.getElementById("AutomaticSection");
    let done=document.getElementById("ButtonDoneSection")

    if (x1!=null && x2!=null&&x3!=null&&x4!=null&&x5!=null&&done!=null) {
      if (x1.style.display === "block" &&x2.style.display === "block") {
        x1.style.display = "none";
        x2.style.display = "none";
        x3.style.display="block"
        x4.style.display="none"
        x5.style.display="none"
        done.style.display="none";
      }
    }
    el.scrollIntoView({behavior: 'smooth'});

  }


}




