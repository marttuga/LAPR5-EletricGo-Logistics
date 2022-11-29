// import 'reflect-metadata';

// import * as sinon from 'sinon';
// import { Response, Request, NextFunction } from 'express';
// import { Container } from 'typedi';
// import { Result } from '../src/core/logic/Result';
// import config from '../config';
// import IRouteService from '../src/services/IServices/IRouteService';
// import RouteController from '../src/controllers/routeController';
// import IRouteDTO from '../src/dto/IRouteDTO';

// describe('route controller', function() {
//   beforeEach(() => {
//     let routeSchemaInstance = require('../src/persistence/schemas/routeSchema').default;
//     Container.set('RouteSchema', routeSchemaInstance);

//     let routeRepoInstance = require('../src/repos/routeRepo').default;
//     Container.set('RouteRepo', routeRepoInstance);

//     let routeServiceClass = require('../src/services/routeService').default;
//     let routeServiceInstance = Container.get(routeServiceClass);
//     Container.set('RouteService', routeServiceInstance);
//   });
//   afterEach(() => {
//     sinon.restore();
//   });

//   it('Create a route with some attributes', async function() {
//     let body = {
//       routeId: '1',
//       distance: '31',
//       routeTime: '74',
//       batteryWaste: '25',
//       arrivalId: 'ESPINHO',
//       departureId: 'MAIA',
//       extraTime: '0',
//     };
//     let req: Partial<Request> = {};
//     req.body = body;

//     let res: Partial<Response> = {
//       json: sinon.spy(),
//     };
//     let next: Partial<NextFunction> = () => {};

//     let routeServiceInstance = Container.get(config.services.route.name);

//     const obj = sinon.stub(routeServiceInstance, 'createRoute').returns(Result.ok<IRouteDTO>(req.body as IRouteDTO));

//     const ctrl = new RouteController(routeServiceInstance as IRouteService);
//     await ctrl.createRoute(<Request>req, <Response>res, <NextFunction>next);
//     sinon.assert.calledOnce(obj);
//     sinon.assert.calledWith(obj, sinon.match(body));
//   });

//   it('Update Route Value Objects', async function() {
//     let body = {
//       routeId: '1',
//       distance: '31',
//       routeTime: '74',
//       batteryWaste: '25',
//       arrivalId: 'ESPINHO',
//       departureId: 'MAIA',
//       extraTime: '0',
//     };
//     let req: Partial<Request> = {};
//     req.body = body;

//     let res: Partial<Response> = {
//       json: sinon.spy(),
//     };
//     let next: Partial<NextFunction> = () => {};

//     let routeServiceInstance = Container.get(config.services.route.name);

//     const obj = sinon.stub(routeServiceInstance, 'updateRoute').returns(Result.ok<IRouteDTO>(req.body as IRouteDTO));

//     const ctrl = new RouteController(routeServiceInstance as IRouteService);
//     await ctrl.updateRoute(<Request>req, <Response>res, <NextFunction>next);

//     sinon.assert.calledOnce(obj);
//     sinon.assert.calledWith(
//       obj,
//       sinon.match({
//         routeId: '1',
//         distance: '31',
//         routeTime: '74',
//         batteryWaste: '25',
//         arrivalId: 'ESPINHO',
//         departureId: 'MAIA',
//         extraTime: '0',
//       }),
//     );
//   });

//   it('List all routes', async function() {
//     let body = [
//       {
//         routeId: '1',
//         distance: '31',
//         routeTime: '74',
//         batteryWaste: '25',
//         arrivalId: 'ESPINHO',
//         departureId: 'MAIA',
//         extraTime: '0',
//       },
//     ];

//     let req: Partial<Request> = {};
//     let res: Partial<Response> = {
//       json: sinon.spy(),
//     };
//     let next: Partial<NextFunction> = () => {};

//     let routeServiceInstance = Container.get(config.services.route.name);

//     const obj = sinon.stub(routeServiceInstance, 'getRoutes').returns(Result.ok<IRouteDTO[]>(body as IRouteDTO[]));

//     const ctrl = new RouteController(routeServiceInstance as IRouteService);
//     await ctrl.getRoute(<Request>req, <Response>res, <NextFunction>next);

//     sinon.assert.calledOnce(obj);
//     //sinon.assert.calledWith(obj, sinon.match(body as ITruckDTO[]));
//   });
// });
