// import 'reflect-metadata';
// import * as sinon from 'sinon';
// import { Response, Request, NextFunction } from 'express';
// import config from '../config';
// import { Container } from 'typedi';
// import { Result } from '../src/core/logic/Result';

// import ITruckDTO from "../src/dto/ITruckDTO";
// import TruckController from "../src/controllers/truckController";
// import ITruckService from "../src/services/IServices/ITruckService";

// describe('Truck controller', function() {
// 	beforeEach(() => {
// 		let truckSchemaInstance = require("../src/persistence/schemas/truckSchema").default;
// 		Container.set("TruckSchema", truckSchemaInstance);

// 		let truckRepoInstance = require('../src/repos/truckRepo').default;
// 		Container.set("TruckRepo", truckRepoInstance);

// 		let truckServiceClass = require('../src/services/truckService').default;
// 		let truckServiceInstance = Container.get(truckServiceClass);
// 		Container.set("TruckService", truckServiceInstance);
// 	});

// 	afterEach(() => {
// 		sinon.restore();
// 	});

// 	it('Create a truck with some attributes', async function() {
// 		let body = { licencePlate: "AA-88-AA", tare: 420, capacity: 1000, maxBateryCapacity: 1000, autonomyFullChargeLoad: 100,  timeCharging: 1250};
// 		let req: Partial<Request> = {};
// 		req.body = body;

// 		let res: Partial<Response> = {
// 			json: sinon.spy(),
// 		};
// 		let next: Partial<NextFunction> = () => {};

// 		let truckServiceInstance = Container.get(config.services.truck.name);

// 		const obj = sinon.stub(truckServiceInstance, 'createTruck').returns(
// 			Result.ok<ITruckDTO>(req.body as ITruckDTO));

// 		const ctrl = new TruckController(truckServiceInstance as ITruckService);
// 		await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

// 		sinon.assert.calledOnce(obj);
// 		sinon.assert.calledWith(obj, sinon.match(body));
// 	});

// 	it('Update Truck Value Objects', async function () {
// 		let body = { licencePlate: "AA-88-AA", tare: 420, capacity: 1000, maxBateryCapacity: 1000, autonomyFullChargeLoad: 100,  timeCharging: 1250};
// 		let req: Partial<Request> = {};
// 		req.body = body;

// 		let res: Partial<Response> = {
// 			json: sinon.spy(),
// 		};
// 		let next: Partial<NextFunction> = () => { };

// 		let truckServiceInstance = Container.get(config.services.truck.name);

// 		const obj = sinon.stub(truckServiceInstance, 'updateTruck').returns(Result.ok<ITruckDTO>(req.body as ITruckDTO));

// 		const ctrl = new TruckController(truckServiceInstance as ITruckService);
// 		await ctrl.updateTruck(<Request>req, <Response>res, <NextFunction>next);

// 		sinon.assert.calledOnce(obj);
// 		sinon.assert.calledWith(obj, sinon.match({
// 			licencePlate: 'AA-88-AA',
// 			tare: 420,
// 			capacity: 1000,
// 			maxBateryCapacity: 1000,
// 			autonomyFullChargeLoad: 100,
// 			timeCharging: 1250
// 		}));
// 	});

// 	it('List all trucks', async function () {
// 		let body = [{licencePlate: "AA-88-AA", tare: 420, capacity: 1000, maxBateryCapacity: 1000, autonomyFullChargeLoad: 100,  timeCharging: 1250 }];

// 		let req: Partial<Request> = {};
// 		let res: Partial<Response> = {
// 			json: sinon.spy(),
// 		};
// 		let next: Partial<NextFunction> = () => { };

// 		let truckServiceInstance = Container.get(config.services.truck.name);

// 		const obj = sinon.stub(truckServiceInstance, 'getTrucks').returns(Result.ok<ITruckDTO[]>(body as ITruckDTO[]));

// 		const ctrl = new TruckController(truckServiceInstance as ITruckService);
// 		await ctrl.getTrucks(<Request>req, <Response>res, <NextFunction>next);

// 		sinon.assert.calledOnce(obj);
// 		//sinon.assert.calledWith(obj, sinon.match(body as ITruckDTO[]));
// 	});
// });


	


