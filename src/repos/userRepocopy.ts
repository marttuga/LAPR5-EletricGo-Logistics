import { Service, Inject } from 'typedi';

import { Document, Model } from 'mongoose';
import { IUserPersistence } from '../dataschema/IUserPersistence';

import IUserRepo from "../services/IRepos/IUserRepo";
import { UserId } from "../domain/usercopy/userId";
import { UserEmail } from "../domain/usercopy/userEmail";
import { UserContact } from '../domain/usercopy/userContact';
import IUserRepocopy from '../services/IRepos/IUserRepocopy';
import { UserMapcopy } from '../mappers/UserMapcopy';
import { UserCopy } from '../domain/usercopy/userCopy';

@Service()
export default class UserRepocopy implements IUserRepocopy {
  private models: any;

  constructor(
    @Inject('userSchema') private userSchema : Model<IUserPersistence & Document>,
    @Inject('logger') private logger
  ) { }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

   public async getAll(): Promise<UserCopy[]> {

    const t = await this.userSchema.find();
    return t.map(item => UserMapcopy.toDomain(item));
  }
 
  public async exists (userId: UserId | string): Promise<boolean> {

    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

    const query = { domainId: idX}; 
    const userDocument = await this.userSchema.findOne( query );

    return !!userDocument === true;
  }
  public async save(user: UserCopy): Promise<UserCopy> {
		const query = { email: user.email.value  };

		const userDocument = await this.userSchema.findOne(query);

		try {
			if (userDocument === null) {
				const rawUser: any = UserMapcopy.toPersistence(user);
				const userCreated = await this.userSchema.create(rawUser);
				return UserMapcopy.toDomain(userCreated);
			} else {
        userDocument.firstName = user.props.firstName;
				userDocument.lastName = user.props.lastName;
				userDocument.email = user.props.email.props.value;
				userDocument.password = user.props.password.props.value;
				userDocument.role = user.props.role.value;
				userDocument.userContact = user.props.userContact.userContact;

				await userDocument.save();
				return user;
			}
		} catch (err) {
			throw err;
		}
	}

  public async findByEmail (email: UserEmail | string): Promise<UserCopy> {
    const query = { email: email.toString() };
    const userRecord = await this.userSchema.findOne( query );
console.log(userRecord)
    if( userRecord != null) {
      return UserMapcopy.toDomain(userRecord);
    }
    else
      return null;
  }

  public async findByContact (userContact: UserContact | number): Promise<UserCopy> {
    const query = { userContact: userContact.toString() };
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      return UserMapcopy.toDomain(userRecord);
    }
    else
      return null;
  }

  public async findById (userId: UserId | string): Promise<UserCopy> {

    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;

    const query = { domainId: idX }; 
    const userRecord = await this.userSchema.findOne( query );

    if( userRecord != null) {
      return UserMapcopy.toDomain(userRecord);
    }
    else
      return null;
  }
  public async delete(email: UserEmail | string): Promise<UserCopy> {

    const query = { email: email.toString() };
    const userRecord = await this.userSchema.findOne( query );

		if (userRecord != null) {
			userRecord.remove();
			return UserMapcopy.toDomain(userRecord);
		}
		return null;
	}

}