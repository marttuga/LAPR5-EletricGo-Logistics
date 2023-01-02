import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import { IUserDTO } from "../dto/IUserDTO";
import IUserServicecopy from "../services/IServices/IUserServicecopy";
import IUserControllercopy from "./IControllers/IUserControllercopy";


@Service()
export default class UserControllercopy implements IUserControllercopy {
	constructor(@Inject(config.services.user.name) private userServiceInstance: IUserServicecopy) {
	}

	public async createUser(req: Request, res: Response, next: NextFunction) {
		try {
			const userOrError = await this.userServiceInstance.createUser(req.body as IUserDTO) as Result<{ userDTO: IUserDTO, token: string }>;

			if (userOrError.isFailure) {
				return res.status(400).json(userOrError.error);
			}

			const userDTO = userOrError.getValue();
			return res.status(201).json(userDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async getEmail(req: Request, res: Response, next: NextFunction) {
		try {
		  const truckOrError = await this.userServiceInstance.getEmail(req.params.email ) as Result<IUserDTO>;
		 
	
		  if (truckOrError.isFailure) {
			return res.status(404).send();
		  }
	
		  const truckDTO = truckOrError.getValue();     
	
		  return res.json( truckDTO ).status(201);
		}
		catch (e) {
		  return next(e);
		}
	  };

	  public async getPhone(req: Request, res: Response, next: NextFunction) {
		try {
			const userContactt = parseInt(req.params.userContact);
			console.log(userContactt)
		  const truckOrError = await this.userServiceInstance.getPhone(userContactt) as Result<IUserDTO>;
		 
	
		  if (truckOrError.isFailure) {
			return res.status(404).send();
		  }
	
		  const truckDTO = truckOrError.getValue();     
	
		  return res.json( truckDTO ).status(201);
		}
		catch (e) {
		  return next(e);
		}
	  };

	public async findUser(req: Request, res: Response, next: NextFunction) {
		try {
			const emailParameter = req.query.email as string;
			const passwordParameter = req.query.password as string;

			const userOrError = await this.userServiceInstance.getUser({ email: emailParameter }, passwordParameter);

			if (userOrError.isFailure) {
				return res.status(404).json(userOrError.error);
			}

			const userDTO = userOrError.getValue();
			return res.status(200).json(userDTO);
		} catch (e) {
			return next(e);
		}
	}

	public async updateUser(req: Request, res: Response, next: NextFunction) {
	}

	/* public async deleteUser(req: Request, res: Response, next: NextFunction) {
		try {
			const emailParameter = req.params.email as string;
			const passwordParameter = req.params.password as string;

			const routeOrError = await this.userServiceInstance.deleteUser({ email: emailParameter }, passwordParameter);

			if (routeOrError.isFailure) {
				return res.status(404).json(routeOrError.error);
			}

			const routeDTO = routeOrError.getValue();
			return res.status(200).json(routeDTO);
		} catch (e) {
			return next(e);
		}
	} */
	 public async deleteUserByEmail(req: Request, res: Response, next: NextFunction) {
		try {
			const truckOrError = await this.userServiceInstance.deleteUserByEmail(req.params.email );
		   
	  
			if (truckOrError.isFailure) {
			  return res.status(404).send();
			}
	  
			const truckDTO = truckOrError.getValue();     
	  
			return res.json( truckDTO ).status(201);
		  }
		  catch (e) {
			return next(e);
		  }
		}; 
}