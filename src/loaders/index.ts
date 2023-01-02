import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';
import RouteController from '../controllers/routeController';
import TruckController from '../controllers/TruckController';
import truckSchema from '../persistence/schemas/truckSchema';


export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const routeSchema = {
    // compare with the approach followed in repos and services
    name: 'routeSchema',
    schema: '../persistence/schemas/routeSchema',
  };
  const truckSchema = {
    // compare with the approach followed in repos and services
    name: 'truckSchema',
    schema: '../persistence/schemas/truckSchema',
  };
   const fleetPlaningSchema = {
    // compare with the approach followed in repos and services
    name: 'fleetPlaningSchema',
    schema: '../persistence/schemas/fleetPlaningSchema',
  }; 


  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const routeController = {
    name: config.controllers.route.name,
    path: config.controllers.route.path
  }
  const truckController = {
    name: config.controllers.truck.name,
    path: config.controllers.truck.path
  }
   const fleetPlaningController = {
    name: config.controllers.fleetPlaning.name,
    path: config.controllers.fleetPlaning.path
  } 
  const userController = {
    name: config.controllers.user.name,
    path: config.controllers.user.path
  } 

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const routeRepo = {
    name: config.repos.route.name,
    path: config.repos.route.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }
  const truckRepo = {
    name: config.repos.truck.name,
    path: config.repos.truck.path
  }
 
  const fleetPlaningRepo = {
    name: config.repos.fleetPlaning.name,
    path: config.repos.fleetPlaning.path
  }
   
 
 

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const routeService = {
    name: config.services.route.name,
    path: config.services.route.path
  }
  const truckService = {
    name: config.services.truck.name,
    path: config.services.truck.path
  }
   const fleetPlaningService = {
    name: config.services.fleetPlaning.name,
    path: config.services.fleetPlaning.path
  }
  const userService = {
    name: config.services.user.name,
    path: config.services.user.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      routeSchema,
      truckSchema,
       fleetPlaningSchema
    ],
    controllers: [
      roleController,
      routeController,
      truckController,
      fleetPlaningController,
      userController
    ],
    repos: [
      roleRepo,
      userRepo,
      routeRepo,
      truckRepo,
       fleetPlaningRepo
    ],
    services: [
      roleService,
      routeService,
      truckService,
       fleetPlaningService,
       userService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
