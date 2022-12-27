import { Service, Inject } from 'typedi';
import config from "../../config";
import IRoleDTO from '../dto/IRoleDTO';
import { Role } from "../domain/role/role";
import IRoleRepo from '../services/IRepos/IRoleRepo';
import IRoleService from './IServices/IRoleService';
import { Result } from "../core/logic/Result";
import { RoleMap } from "../mappers/RoleMap";
import { RoleName } from '../domain/role/roleName';

@Service()
export default class RoleService implements IRoleService {
  constructor(
      @Inject(config.repos.role.name) private roleRepo : IRoleRepo
  ) {}

  public async getRoles(): Promise<Result<IRoleDTO[]>> {
    try {

      let truck = await this.roleRepo.getAllRoles();

      if (truck == null) {
        return Result.fail('roles not found');
      }

      const truckDTORes = truck.map(item => RoleMap.toDTO(item));

      return Result.ok<IRoleDTO[]>(truckDTORes);
    } catch (e) {
      throw new Error(e);
    }
  }



  public async getByName( name: string): Promise<Result<IRoleDTO>> {
    try {
      const truck = await this.roleRepo.findByName(name);
      if (truck === null) {
        return Result.fail<IRoleDTO>("role not found");
      }
      else {
        const truckDTOResult = RoleMap.toDTO( truck ) as IRoleDTO;
        return Result.ok<IRoleDTO>( truckDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }


  public async createRole( roleDTO: IRoleDTO): Promise<Result<IRoleDTO>> {

    try {
      const truck = await this.roleRepo.findByName(roleDTO.name);

      if (truck != null) {
  
        return Result.fail< IRoleDTO>("Role already exists: " +roleDTO.name);
      }
      const truckOrError = await Role.create(roleDTO);
      if (truckOrError.isFailure) {
        return Result.fail<IRoleDTO>(truckOrError.errorValue());
      }

      const truckResult = truckOrError.getValue();

      await this.roleRepo.save(truckResult);
      const truckDTOResult = RoleMap.toDTO( truckResult ) as IRoleDTO;

      return Result.ok<IRoleDTO>( truckDTOResult )
    } catch (e) {
      throw e;
    }
  }

  public async updateRole(roleDTO: IRoleDTO): Promise<Result<IRoleDTO>> {
    try {
      const truck = await this.roleRepo.findByName(roleDTO.name);

      if (truck === null) {
        return Result.fail<IRoleDTO>("Role not found");
      }
      else {
        truck.props.name=RoleName.create(roleDTO.name).getValue();

        await this.roleRepo.save(truck);

        const truckDTOResult = RoleMap.toDTO( truck ) as IRoleDTO;
        return Result.ok<IRoleDTO>( truckDTOResult )
        }
    } catch (e) {
      throw e;
    }
  }
}
