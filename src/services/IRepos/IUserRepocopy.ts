import { Repo } from "../../core/infra/Repo";
import { User } from "../../domain/user/user";
import { UserContact } from "../../domain/user/userContact";
import { UserEmail } from "../../domain/user/userEmail";
import { UserCopy } from "../../domain/usercopy/userCopy";

export default interface IUserRepo extends Repo<UserCopy> {
	save(user: UserCopy): Promise<UserCopy>;
	findByEmail (email: UserEmail | string): Promise<UserCopy>;
	findById (id: string): Promise<UserCopy>;
	findByContact (userContact: UserContact | number): Promise<UserCopy>
	delete(email: UserEmail | string): Promise<UserCopy>
	getAll(): Promise<UserCopy[]>
	find(query?: any): Promise<UserCopy[]>
}
  