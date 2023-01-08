 import { Inject, Service} from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import { IFleetPlaningPersistence } from '../dataschema/IFleetPlaningPersistence';

import { response } from "express";
import IFleetPlaningRepo from "../services/IRepos/IFleetPlaningRepo";
import { FleetPlaning } from "../domain/fleetPlan/fleetPlaning";
import { FleetPlaningMap } from "../mappers/FleetPlaningMap";
import { throws } from 'assert';
import { FleetPlaningId } from '../domain/fleetPlan/fleetPlaningId';
import { stringify } from 'querystring';
 import fetch from "node-fetch";
 import * as http from "http";
 import * as https from "https";
import { Console } from 'console';




@Service()
export default class FleetPlaningRepo implements IFleetPlaningRepo {
 
  constructor(
    @Inject('fleetPlaningSchema') private fleetPlaningSchema : Model<IFleetPlaningPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

   httpAgent = new http.Agent({});

    httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
  
// @ts-ignore
  public async exists(fleetPlaningId: FleetPlaningId | string): Promise<boolean> {
    const idX = fleetPlaningId instanceof FleetPlaningId ? (<FleetPlaningId>fleetPlaningId).fleetPlaningId : fleetPlaningId;

    const query = { domainId: idX };
    const t = await this.fleetPlaningSchema.findOne(query);

    return !!t === true;
  }

  
  public async getAllFleetPlanings(): Promise<FleetPlaning[]> {

    const t = await this.fleetPlaningSchema.find();

    return t.map(item => FleetPlaningMap.toDomain(item));
  }


  public async save(fleetPlaning: FleetPlaning): Promise<FleetPlaning>{

    const query = { fleetPlaningId: fleetPlaning.props.fleetPlaningId };
    const fleetPlaningDocument = await this.fleetPlaningSchema.findOne(query);

    try {
      if (fleetPlaningDocument === null) {

        const rawtruck: any = FleetPlaningMap.toPersistence(fleetPlaning);
        const truckCreated = await this.fleetPlaningSchema.create(rawtruck);
       

        return FleetPlaningMap.toDomain(truckCreated);
      
      } else {
        

        fleetPlaningDocument.truckId = fleetPlaning.props.truckId;
        fleetPlaningDocument.date = fleetPlaning.props.date;
        fleetPlaningDocument.route =fleetPlaning.props.route;


        await fleetPlaningDocument.save();

        return fleetPlaning;
      }
    } catch (err) {
      throw err;
    }
  }


  public async findFleetPlaningId (fleetPlaningId: FleetPlaningId | string): Promise<FleetPlaning> {
      const query = { fleetPlaningId: fleetPlaningId };
      const t = await this.fleetPlaningSchema.findOne(query as FilterQuery<IFleetPlaningPersistence & Document>);

      if (t != null) {
        return FleetPlaningMap.toDomain(t);
      } else return null;
    }



    public async getBestRoute(data: string, camiao: string): Promise<{ viagem: string[]; }> {

      const response = await fetch("http://localhost:64172/gera?date=" + data + "&truck=" + camiao, {method: "GET", agent: this.httpAgent,});
    
      const viagem = await response.json();
      return {viagem: viagem.gera};
    }
  
/*      private async getArmazemName(armazemId: string): Promise<string> {
     /* type Warehouse={id:string;wharehouseIdentifier:string; designation:string;latitude:number;longitude:number;street:string;doorNumber:number;city:string;zipCode:string;warehouseAltitude:string};

      const res = await fetch(
        `https://localhost:5001/api/warehouse/${armazemId.toString().padStart(3, "W0")}`,
        {
          method: "GET",
          agent: this.httpsAgent,
        }
      );
       const json =  await res.json();
      
      const result: Warehouse =JSON.parse(json);
      console.log(json); 
     
      return result.designation;  */
     /* const res = await fetch(
        `https://localhost:5001/api/warehouse/${armazemId.padStart(3, "W0")}`,
        {
          method: "GET",
          agent: this.httpsAgent,
        }
      );
      const json = await res.json();
      console.log(json);
      return json.designation.;
    }   */


    public async getNearestWarehouse(data: string, camiao: string): Promise<{ viagem: string[]; }> {const response = await fetch("http://localhost:64172/getNearestWarehouse?date=" + data + "&truck=" + camiao, {method: "GET", agent: this.httpAgent,});
  
      const viagem = await response.json();
      return {viagem: viagem.route_nearest_warehouse};

    }
  
    public async getRouteGreaterMass(data: string, camiao: string): Promise<{ viagem: string[]; }> {
      const response = await fetch("http://localhost:64172/getRouteGreaterMass?date=" + data + "&truck=" + camiao, {method: "GET", agent: this.httpAgent,});
  
      const viagem = await response.json();


      return {viagem: viagem.route_plus_mass};

    }
  
    public async getRouteBestRelation(data: string, camiao: string): Promise<{ viagem: string[]; }> {const response = await fetch("http://localhost:64172/getRouteBestRelation?date=" + data + "&truck=" + camiao, {method: "GET", agent: this.httpAgent,});
      
      const viagem = await response.json();

      return {viagem: viagem.route_best_relation};

    }
} 