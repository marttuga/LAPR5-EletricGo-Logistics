import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';


interface UserContactProps {
  userContact: number;
}

export class UserContact extends ValueObject<UserContactProps> {
  get userContact(): number {
    return this.props.userContact;
  }
  
  private constructor (props: UserContactProps) {
    super(props);
  }

   public static create (userContact: number): Result<UserContact> {
    const guardResult = Guard.againstNullOrUndefined(userContact, 'userContact');
    if (!guardResult.succeeded) {
      return Result.fail<UserContact>(guardResult.message);
    } else {
      return Result.ok<UserContact>(new UserContact({ userContact: userContact }))
    }
  } 
    

}