import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import config from '../config';
import {Container} from 'typedi';
import ITruckDTO from "../src/dto/ITruckDTO";
import ITruckService from "../src/services/IServices/ITruckService";
import ITruckController from "../src/controllers/IControllers/ITruckController";
import {ITruckPersistence} from "../src/dataschema/ITruckPersistence";
import ITruckRepo from "../src/services/IRepos/ITruckRepo";

describe('Truck controller', () => {

	it('Truck controller Tests', async function() {
		
		let body ={licencePlate: "AA-88-AA", tare: 420, capacity: 1000, maxBateryCapacity: 1000, autonomyFullChargeLoad: 100,  timeCharging: 1250};

		
		let truckSchemaClass = require("../src/persistence/schemas/truckSchema").default;
		let truckSchemaInstance:ITruckPersistence=Container.get(truckSchemaClass);
		Container.set("TruckSchema", truckSchemaInstance);
		
		let truckRepoClass = require("../src/repos/truckRepo").default;
		let truckRepoInstance:ITruckRepo=Container.get(truckRepoClass);
		Container.set(config.repos.truck.name, truckRepoInstance);


		let truckServiceClass= require("../src/services/truckService").default;
		let truckServiceInstance:ITruckService= Container.get(truckServiceClass);
		Container.set(config.services.truck.name, truckServiceInstance);
		truckServiceInstance= Container.get(config.services.truck.name);
	
		let truckControllerClass= require("../src/controllers/TruckController").default;
		let truckControllerInstance:ITruckController=Container.get(truckControllerClass);
		Container.set(config.controllers.truck.name, truckControllerInstance);
		truckControllerInstance = Container.get(config.controllers.truck.name);


		let req: Partial<Request>= {};
		req.body = body;

	
	beforeEach(() => {
		
		sinon.stub(truckServiceInstance, "createTruck").returns(( {
			licencePlate: req.body.licencePlate,
			tare: req.body.tare,
			capacity: req.body.capacity,
			maxBateryCapacity: req.body.maxBateryCapacity,
			autonomyFullChargeLoad: req.body.autonomyFullChargeLoad,
			timeCharging: req.body.timeCharging
		}) as ITruckDTO);

	});

	afterEach(function () {
		sinon.restore();
	});

	it('Create a truck with some attributes', async ()=> {
		
		const jsonStub = sinon.stub()
		const res = { status: status => ({ json: jsonStub, send: err => err }) };
		const statusSpy = sinon.spy(res, 'status')

	
		let next: Partial<NextFunction> = () => {};
		
		await truckControllerInstance.createTruck(<Request>req, <Response>statusSpy, <NextFunction>next);
	
		sinon.assert.calledWith(statusSpy.status, 201);
		sinon.assert.calledOnce(jsonStub);
		sinon.assert.calledWith(jsonStub,{licencePlate: req.body.licencePlate,
			tare: req.body.tare,
			capacity: req.body.capacity,
			maxBateryCapacity: req.body.maxBateryCapacity,
			autonomyFullChargeLoad: req.body.autonomyFullChargeLoad,
			timeCharging: req.body.timeCharging} );
	}); 
/*
	it('Update Truck Value Objects', async function () {
		let body = { licencePlate: "AA-88-AA", tare: 420, capacity: 1000, maxBateryCapacity: 1000, autonomyFullChargeLoad: 100,  timeCharging: 1250};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy(),
		};
		let next: Partial<NextFunction> = () => { };

		let truckServiceInstance = Container.get(config.services.truck.name);

		const obj = sinon.stub(truckServiceInstance, 'updateTruck').returns(Result.ok<ITruckDTO>(req.body as ITruckDTO));

		const ctrl = new TruckController(truckServiceInstance as ITruckService);
		await ctrl.updateTruck(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		sinon.assert.calledWith(obj, sinon.match({
			licencePlate: 'AA-88-AA',
			tare: 12123,
			capacity: 5299,
			maxBateryCapacity: 80,
			autonomyFullChargeLoad: 70,
			timeCharging: 125
		}));
	});

	it('List all trucks', async function () {
		let body = [{licencePlate: "AA-88-AA", tare: 420, capacity: 1000, maxBateryCapacity: 1000, autonomyFullChargeLoad: 100,  timeCharging: 1250 }];

		let req: Partial<Request> = {};
		let res: Partial<Response> = {
			json: sinon.spy(),
		};
		let next: Partial<NextFunction> = () => { };

		let truckServiceInstance = Container.get(config.services.truck.name);

		const obj = sinon.stub(truckServiceInstance, 'getTrucks').returns(Result.ok<ITruckDTO[]>(body as ITruckDTO[]));

		const ctrl = new TruckController(truckServiceInstance as ITruckService);
		await ctrl.getTrucks(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(obj);
		//sinon.assert.calledWith(obj, sinon.match(body as ITruckDTO[]));
	});*/

/* import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import ITruckService from '../src/services/IServices/ITruckService';
import TruckController from '../src/controllers/truckController';
import ITruckDTO from '../src/dto/ITruckDTO';

describe('truck controller', function () {
  beforeEach(function () { });

  it('returns createTruck', async function () {
    let body = {
      licencePlate: '12-GH-12',
      tare: 5,
      capacity: 100,
      maxBaterycapacity: 100,
      autonomyFullChargeLoad: 80,
      timeCharging: 20000,
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => { };

    let truckSchemaInstance = require('../src/persistence/schemas/truckSchema').default;
    Container.set('truckSchema', truckSchemaInstance);

    let truckRepoClass = require('../src/repos/truckRepo').default;
    let truckRepoInstance = Container.get(truckRepoClass);
    Container.set('TruckRepo', truckRepoInstance);

    let truckServiceClass = require('../src/services/truckService').default;
    let truckServiceInstance = Container.get(truckServiceClass);
    Container.set('TruckService', truckServiceInstance);

    truckServiceInstance = Container.get('TruckService');
    sinon.stub(truckServiceInstance, 'createTruck').returns(
      Result.ok<ITruckDTO>({ licencePlate: req.body.licencePlate, tare: req.body.tare, capacity: req.body.capacity, maxBateryCapacity: req.body.maxBateryCapacity, autonomyFullChargeLoad: req.body.autonomyFullChargeLoad, timeCharging: req.body.timeCharging}),
    );

    const ctrl = new TruckController(truckServiceInstance as ITruckService);

    // eslint-disable-next-line @typescript-eslint/no-angle-bracket-type-assertion
    await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match({ licencePlate: req.body.licencePlate, tare: req.body.tare, capacity: req.body.capacity, maxBateryCapacity: req.body.maxBateryCapacity, autonomyFullChargeLoad: req.body.autonomyFullChargeLoad, timeCharging: req.body.timeCharging }));
  });
}); 

/* import { Request, NextFunction } from 'express';

let truckControllerClass = require('../src/controllers/TruckController').default;

describe('Test Handlers Controller' , function () {

  test('createTruck', () => {

    let body = {
      licencePlate: '12-GH-12',
      tare: 5,
      capacity: 100,
      maxBaterycapacity: 100,
      autonomyFullChargeLoad: 80,
      timeCharging: 20,
    };
    let req: Partial<Request> = {};
    req.body = body;

    const res = { text: '',
        send: function(input: any) { this.text = input } 
    };

    let next: Partial<NextFunction> = () => { };

    truckControllerClass.createTruck(req, res,next);
      
      expect(res.text).toEqual('hello world!');
  });

  test('getByLicencePLate', () => {



      const req = { params: { licencePlate: '12-GH-12' , body: {
        licencePlate: '12-GH-12',
        tare: 5,
        capacity: 100,
        maxBaterycapacity: 100,
        autonomyFullChargeLoad: 80,
        timeCharging: 20000,
      }}}; 

      const res = { text: '',
          send: function(input) { this.text = input } 
      };

      let next: Partial<NextFunction> = () => { };

      truckControllerClass.getByLicencePLate(req, res,next);
      
      expect(res.text).toEqual("");
  });
*/
})

}); 

