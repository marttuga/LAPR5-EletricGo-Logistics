import {Router} from 'express';
import {celebrate, Joi} from 'celebrate';
import {Container} from 'typedi';
import config from "../../../config";

import IUserController from "../../controllers/IControllers/IUserControllercopy";
import IUserControllercopy from '../../controllers/IControllers/IUserControllercopy';

const userRoute = Router();

export default (app: Router) => {
	app.use('/user', userRoute);

	const ctrl = Container.get(config.controllers.user.name) as IUserControllercopy;
	userRoute.post('/createUser',
		celebrate({
			body: Joi.object({
				firstName: Joi.string().required(),
				lastName: Joi.string().required(),
				email: Joi.string().required(),
				password: Joi.string().required(),
				role: Joi.string().required(),
				userContact: Joi.number().required(),
			})
		}),
		(req, res, next) => ctrl.createUser(req, res, next));

		userRoute.get('/getUser/:email/:password', (req, res, next) => ctrl.findUser(req, res, next));
		userRoute.get('/getUserByContact/:userContact/:password', (req, res, next) => ctrl.findUserContact(req, res, next));


	userRoute.get('/getUserByEmail/:email', (req, res, next) => ctrl.getEmail(req, res, next));
	userRoute.get('/getUserByPhone/:userContact', (req, res, next) => ctrl.getPhone(req, res, next));


	userRoute.put('/updateUser',
		celebrate({
			body: Joi.object({	
				firstName: Joi.string().required(),
				lastName: Joi.string().required(),
				email: Joi.string().required(),
				password: Joi.string().required(),
				role: Joi.string().required(),
				userContact: Joi.number().required(),
				
			})
		}),
		(req, res, next) => ctrl.updateUser(req, res, next));

	//userRoute.delete('/deleteAccount/:email/password', (req, res, next) => ctrl.deleteUser(req, res, next));
	userRoute.delete('/deleteAccountByEmail/:email', (req, res, next) => ctrl.deleteUserByEmail(req, res, next));
	userRoute.get('/getAll', (req, res, next) => ctrl.getUsers(req, res, next));

	userRoute.patch('/changeStatusToActive/:licencePlate',
(req, res, next) => ctrl.changeStatustoActive(req, res, next) );


userRoute.patch('/changeStatusToInactive/:licencePlate',
(req, res, next) => ctrl.changeStatustoInactive(req, res, next) );
   

userRoute.patch('/changeStatus/:licencePlate',
(req, res, next) => ctrl.changeStatus(req, res, next) );

}