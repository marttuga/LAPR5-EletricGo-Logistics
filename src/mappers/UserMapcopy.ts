import { Container } from 'typedi';

import { Mapper } from "../core/infra/Mapper";

import {IUserDTO} from "../dto/IUserDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { UserEmail } from "../domain/usercopy/userEmail";

import RoleRepo from "../repos/roleRepo";
import { UserCopy } from '../domain/usercopy/userCopy';
import { UserPassword } from '../domain/usercopy/userPassword';

export class UserMapcopy extends Mapper<UserCopy> {

  public static toDTO( user: UserCopy): IUserDTO {
    return {
      //id: user.id.toString(),
      firstName: user.props.firstName,
      lastName: user.props.lastName,
      email: user.props.email.value,
      password: user.props.password.value,
      role: user.props.role.value,
      userContact: user.props.userContact.userContact
    } as IUserDTO;
  }

  public static async toDomain (raw: any): Promise<UserCopy> {
    const userEmailOrError = UserEmail.create(raw.email);
    const userPasswordOrError = UserPassword.create({value: raw.password, hashed: true});
    const repo = Container.get(RoleRepo);
    const role = await repo.findByName(raw.role);

    const userOrError = UserCopy.create({
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: userEmailOrError.getValue(),
      password: userPasswordOrError.getValue(),
      role: raw.role,
      userContact:raw.userContact
    }, new UniqueEntityID(raw.domainId))

    userOrError.isFailure ? console.log(userOrError.error) : '';
    
    return userOrError.isSuccess ? userOrError.getValue() : null;
  }

  public static toPersistence (user: UserCopy): any {
    const a = {
      domainId: user.id.toString(),
      email: user.props.email.value,
      password: user.props.password.value,
      firstName: user.props.firstName,
      lastName: user.props.lastName,
      role: user.props.role.value,
      userContact: user.props.userContact.userContact

    }
    return a;
  }
}