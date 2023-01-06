import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { UserId } from "./userId";
import { UserEmail } from "./userEmail";
import { Role } from "../role/role";
import { UserPassword } from "./userPassword";
import { Guard } from "../../core/logic/Guard";
import { UserContact } from "./userContact";
import { UserRole } from "./userRole";


interface UserCopyProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  password: UserPassword;
  role: UserRole;
  userContact:UserContact;
  active: boolean;

}

export class UserCopy extends AggregateRoot<UserCopyProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get email (): UserEmail {
    return this.props.email;
  }

  get firstName (): string {
    return this.props.firstName
  }

  get lastName (): string {
    return this.props.lastName;
  }

  get password (): UserPassword {
    return this.props.password;
  }

  get role (): UserRole {
    return this.props.role;
  }
  
  set role (value: UserRole) {
      this.props.role = value;
  }
  get userContact (): UserContact {
    return this.props.userContact;
  }
  
  set userContact (value: UserContact) {
      this.props.userContact = value;
  }

  get active (): boolean {
    return this.props.active;
  }

  
  public receiveActive (act:boolean) {

    this.props.active = act;
    }

  public markAsInactive () {
  this.props.active = false;
  }
  public markActive () {
    this.props.active = true;
  }
  public changeActive (act:boolean) {
    if(act===true){
     this.markAsInactive()
    }else{
      this.markActive()
    }
    
  }

  private constructor (props: UserCopyProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: UserCopyProps, id?: UniqueEntityID): Result<UserCopy> {

    const guardedProps = [
      { argument: props.firstName, argumentName: 'firstName' },
      { argument: props.lastName, argumentName: 'lastName' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.password, argumentName: "password" },
      { argument: props.role, argumentName: 'role' },
      { argument: props.userContact, argumentName: 'userContact' },
      { argument: props.active=true, argumentName: 'active' },

    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<UserCopy>(guardResult.message)
    }     
    else {
      const user = new UserCopy({...props}, id);
      return Result.ok<UserCopy>(user);
    }
  }

}