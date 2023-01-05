import { Inject, Service } from "typedi";
import config from "../../config";
import { Result } from "../core/logic/Result";
import IUserService from "./IServices/IUserService";

import { randomBytes } from "crypto";
import argon2 from "argon2";
import IUserServicecopy from "./IServices/IUserServicecopy";
import IUserRepocopy from "./IRepos/IUserRepocopy";
import { UserEmail } from "../domain/usercopy/userEmail";
import { UserPassword } from "../domain/usercopy/userPassword";
import { UserContact } from "../domain/usercopy/userContact";
import { IUserDTO } from "../dto/IUserDTO";
import IRoleRepo from "./IRepos/IRoleRepo";
import { UserMapcopy } from "../mappers/UserMapcopy";
import { UserRole } from "../domain/usercopy/userRole";
import { UserCopy } from "../domain/usercopy/userCopy";

@Service()
export default class UserServicecopy implements IUserServicecopy {
	constructor(@Inject(config.repos.user.name) private userRepo: IUserRepocopy	) 
	{
	}

	public async createUser(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
		try {
			let userDocument = (await this.userRepo.findByEmail( userDTO.email ));
			if (userDocument != null) {
				return Result.fail<{ userDTO: IUserDTO, token: string }>("User already exists with email=" + userDTO.email);
			}
			const salt = randomBytes(32);
			const hashedPassword = await argon2.hash(userDTO.password, { salt });
	  
			const password = await UserPassword.create({ value: hashedPassword, hashed: true}).getValue();
			const email = await UserEmail.create( userDTO.email ).getValue();
			let role= await UserRole.create(userDTO.role).getValue()
			const userContact = await UserContact.create( userDTO.userContact ).getValue();

	  
			const userOrError = await UserCopy.create({
			  firstName: userDTO.firstName,
			  lastName: userDTO.lastName,
			  email: email,  
			  password: password,
			  role: role,
			  userContact:userContact
			});

			if (userOrError.isFailure) {
				return Result.fail<{ userDTO: IUserDTO, token: string }>(userOrError.errorValue());
			}

			const userResult = userOrError.getValue();

			await this.userRepo.save(userResult);
			
			const userDTOResult = UserMapcopy.toDTO(userResult) as IUserDTO;
console.log(userDTOResult)
			return Result.ok<{ userDTO: IUserDTO, token: string }>({
				userDTO: userDTOResult,
				token: "User created successfully."
			});
		} catch (e) {
			throw e;
		}
	}

	
	public async getEmail( email: string): Promise<Result<IUserDTO>> {
		try {
		  const truck = await this.userRepo.findByEmail(email);
		  if (truck === null) {
			return Result.fail<IUserDTO>("User not found");
		  }
		  else {
			const truckDTOResult = UserMapcopy.toDTO( truck ) as IUserDTO;
			return Result.ok<IUserDTO>( truckDTOResult )
			}
		} catch (e) {
		  throw e;
		}
	  }

	  public async getPhone( email: number): Promise<Result<IUserDTO>> {
		try {
		  const truck = await this.userRepo.findByContact(email);
		  if (truck === null) {
			return Result.fail<IUserDTO>("User not found");
		  }
		  else {
			const truckDTOResult = UserMapcopy.toDTO( truck ) as IUserDTO;
			return Result.ok<IUserDTO>( truckDTOResult )
			}
		} catch (e) {
		  throw e;
		}
	  }

	public async getUser(query: any, password: string): Promise<Result<IUserDTO>> {
		try {
			const userList = await this.userRepo.findByEmail(query);

			if (userList == null) {
				return Result.fail<IUserDTO>("Users not found.");
			}

			const validPassword = await argon2.verify(userList[0].password.value, password);

			if (!validPassword) {
				return Result.fail<IUserDTO>("Wrong password.");
			}

			const result = UserMapcopy.toDTO(userList[0]) as IUserDTO;
			return Result.ok<IUserDTO>(result);
		} catch (e) {
			throw e;
		}
	}

	public async updateUser(userDTO: IUserDTO): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
		return null;
	}

	public async getUsers(): Promise<Result<IUserDTO[]>> {
		try {
	
		  let truck = await this.userRepo.getAll();
	
		  if (truck == null) {
			return Result.fail('users not found');
		  }
	
		  const truckDTORes = truck.map(item => UserMapcopy.toDTO(item));
	
		  return Result.ok<IUserDTO[]>(truckDTORes);
		} catch (e) {
		  throw new Error(e);
		}
	  }

/* 	public async deleteUser(query: any, password: string): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
		try {
			const userList = (await this.userRepo.findByEmail(query));

			if (!userList) {
				return Result.fail<{ userDTO: IUserDTO, token: string }>("User not found.");
			}

			const validPassword = await argon2.verify(userList.password.value, password);

			if (!validPassword) {
				return Result.fail<{ userDTO: IUserDTO, token: string }>("Password doesn't match.");
			}

			await this.userRepo.delete(query);
			return Result.ok<{ userDTO: IUserDTO, token: string }>({
				userDTO: UserMapcopy.toDTO(userList),
				token: "User deleted successfully."
			});
		} catch (e) {
			throw e;
		}
	} */
	public async deleteUserByEmail(email: string): Promise<Result<{ userDTO: IUserDTO, token: string }>> {
		try {
			const userList = (await this.userRepo.findByEmail(email));

			if (!userList) {
				return Result.fail<{ userDTO: IUserDTO, token: string }>("User not found.");
			}

			await this.userRepo.delete(email);
			return Result.ok<{ userDTO: IUserDTO, token: string }>({
				userDTO: UserMapcopy.toDTO(userList),
				token: "User deleted successfully."
			});
		} catch (e) {
			throw e;
		}
	}

}