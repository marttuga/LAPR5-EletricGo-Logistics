import { Service, Inject } from 'typedi';
import config from '../../config';
import IRouteDTO from '../dto/IRouteDTO';
import { Route } from '../domain/route/route';
import IRouteRepo from '../services/IRepos/IRouteRepo';
import IRouteService from './IServices/IRouteService';
import { Result } from '../core/logic/Result';
import { RouteMap } from '../mappers/RouteMap';
import {RouteId} from "../domain/route/routeId";
import {Distance} from "../domain/route/distance";
import {RouteTime} from "../domain/route/routeTime";
import {BatteryWaste} from "../domain/route/batteryWaste";
import {ExtraTime} from "../domain/route/extraTime";

@Service()
export default class RouteService implements IRouteService {
  constructor(@Inject(config.repos.route.name) private routeRepo: IRouteRepo) {}

  public async getRouteId(routeId: string, routeDTO: IRouteDTO): Promise<Result<IRouteDTO>> {
    try {
      const route = await this.routeRepo.findByRouteId(routeDTO.routeId);
      if (route === null) {
        return Result.fail<IRouteDTO>('Route not found');
      }

      const routeDTOResult = RouteMap.toDTO(route) as IRouteDTO;
      return Result.ok<IRouteDTO>(routeDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async getRoutes(): Promise<Result<IRouteDTO[]>> {
    try {
      let route = await this.routeRepo.getAll();

      if (route == null) {
        return Result.fail('Route not found');
      }

      const routeDTORes = route.map(item => RouteMap.toDTO(item));

      return Result.ok<IRouteDTO[]>(routeDTORes);
    } catch (e) {
      throw new Error(e);
    }
  }

  public async createRoute(routeId: string, routeDTO: IRouteDTO): Promise<Result<IRouteDTO>> {
    try {
      const route = await this.routeRepo.findByRouteId(routeDTO.routeId);

      if (route != null) {
        return Result.fail<IRouteDTO>('Route already exists: ' + routeDTO.routeId);
      }

      const routeOrError = await Route.create(routeDTO);

      if (routeOrError.isFailure) {
        return Result.fail<IRouteDTO>(routeOrError.errorValue());
      }

      const routeResult = routeOrError.getValue();
      await this.routeRepo.save(routeResult);

      const routeDTOResult = RouteMap.toDTO(routeResult) as IRouteDTO;
      return Result.ok<IRouteDTO>(routeDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateRoute(routeDTO: IRouteDTO): Promise<Result<IRouteDTO>> {
    try {
      const route = await this.routeRepo.findByRouteId(routeDTO.routeId);
      if (route === null) {
        return Result.fail<IRouteDTO>('Route not found');
      } else {
        /*route.routeId.props.routeId = routeDTO.routeId;
        route.distance.props.distance = routeDTO.distance;
        route.routeTime.props.routeTime = routeDTO.routeTime;
        route.batteryWaste.props.batteryWaste = routeDTO.batteryWaste;
        route.arrivalId = routeDTO.arrivalId;
        route.departureId = routeDTO.departureId;
        route.extraTime.props.extraTime = routeDTO.extraTime;*/
        const updated = await this.routeRepo.save(RouteMap.toDomain(routeDTO));

        const routeDTOResult = RouteMap.toDTO(updated) as IRouteDTO;
        return Result.ok<IRouteDTO>(routeDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
  public async postSGRAIRoutes(): Promise<Result<string>> {
    try {
        
   //TROFA-S.Tirso
   const r1={"routeId":"1", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W13", "departureId":"W11", "extraTime":"2"} as IRouteDTO;
   //S.Tirso-Paredes
   const r2={"routeId":"2", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W10", "departureId":"W07", "extraTime":"2"} as IRouteDTO;
   //Paredes-Valongo
   const r3={"routeId":"3", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W07", "departureId":"W15", "extraTime":"2"} as IRouteDTO;
   //S.Tirso-Trofa
   const r4={"routeId":"4", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W11", "departureId":"W13", "extraTime":"2"} as IRouteDTO;
   //Vale de Cambra-Arouca
  // const r5={"routeId":"5", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W14", "departureId":"W01", "extraTime":"2"} as IRouteDTO;
   //Arouca-Oliveira.A
   //const r6={"routeId":"6", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W01", "departureId":"W06", "extraTime":"2"} as IRouteDTO;
   //Oliveira.A-Vale Cambra
   const r7={"routeId":"7", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W06", "departureId":"W14", "extraTime":"2"} as IRouteDTO;
   //Vale Cambra-Trofa
   const r8={"routeId":"8", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W11", "departureId":"W01", "extraTime":"2"} as IRouteDTO;
   //Trofa-Vila do Conde
   const r9={"routeId":"9", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W13", "departureId":"W16", "extraTime":"2"} as IRouteDTO;
   //Vila do Conde-Povoa de Varzim
   const r10={"routeId":"10", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W16", "departureId":"W09", "extraTime":"2"} as IRouteDTO;
   //Arouca-Póvoa V
   const r11={"routeId":"11", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W09", "departureId":"W01", "extraTime":"2"} as IRouteDTO;
   //Gondomar-Maia
   //const r12={"routeId":"12", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W15", "departureId":"W04", "extraTime":"2"} as IRouteDTO;
   //Gondomar-Gaia
   const r13={"routeId":"13", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W03", "departureId":"W05", "extraTime":"2"} as IRouteDTO;
   //Valongo-Porto
   const r14={"routeId":"14", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W15", "departureId":"W08", "extraTime":"2"} as IRouteDTO;
   //Gaia-Matozinhos
   const r15={"routeId":"15", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W17", "departureId":"W05", "extraTime":"2"} as IRouteDTO;
   //Matozinhos-Espinho
   const r16={"routeId":"16", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W05", "departureId":"W02", "extraTime":"2"} as IRouteDTO;
   //Espinho-S.Maria.F
   const r17={"routeId":"17", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W02", "departureId":"W10", "extraTime":"2"} as IRouteDTO;
   //Espinho-S.João.M
   const r18={"routeId":"18", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W02", "departureId":"W12", "extraTime":"2"} as IRouteDTO;
   //S.João.M-Oliveira.A
   const r19={"routeId":"19", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W12", "departureId":"W06", "extraTime":"2"} as IRouteDTO;

   const r20 ={"routeId":"20", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W11", "departureId":"W09", "extraTime":"2"} as IRouteDTO;

   const r21={"routeId":"21", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W09", "departureId":"W08", "extraTime":"2"} as IRouteDTO;

   const r22={"routeId":"22", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W08", "departureId":"W03", "extraTime":"2"} as IRouteDTO;

   const r23={"routeId":"23", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W01", "departureId":"W03", "extraTime":"2"} as IRouteDTO;

   const r24={"routeId":"24", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W01", "departureId":"W08", "extraTime":"2"} as IRouteDTO;

   const r25={"routeId":"25", "distance":"2", "routeTime":"3", "batteryWaste":"22", "arrivalId":"W03", "departureId":"W11", "extraTime":"2"} as IRouteDTO;


        const list=[r1,r2,r3,r4,/*r5,r6,*/r7,r8,r9,r10,r11,/*r12,*/r13,r14,r15,r16,r17,r18,r19,r20,r21,r22,r23,r24,r25];
   
   for(let i=0;i<list.length;i++) {
     await this.createRoute(list[i].routeId, list[i]);
   }
      return Result.ok<string>("All done");
    } catch (e) {
      throw e;
    }
  }
}
