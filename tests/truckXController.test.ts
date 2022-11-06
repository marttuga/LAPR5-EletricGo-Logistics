/* import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import ITruckService from "../src/services/IServices/ITruckService";
import TruckController from "../src/controllers/TruckController";
import ITruckDTO from '../src/dto/ITruckDTO';
import { LicencePlate } from '../src/domain/truck/licencePlate';
import { Capacity } from '../src/domain/truck/capacity';
import { Tare } from '../src/domain/truck/tare';
import { MaxBateryCapacity } from '../src/domain/truck/maxBateryCapacity';
import { AutonomyFullChargeLoad } from '../src/domain/truck/autonomyFullChargeLoad';
import { TimeCharging } from '../src/domain/truck/timeCharging';


describe('truck controller', function () {
	beforeEach(function() {
    });

    it('returns json with licencePlate, tare, capacity, maxBateryCapacity, autonomyFullChargeLoad, timeCharging values when createTruck', async function () {
        let body = { 
			 licenceP:LicencePlate.create("123"),
			 tare: Tare.create(2),
			 capacity: Capacity.create(32),
			 maxBateryCapacity:MaxBateryCapacity.create(22),
			 autonomyFullChargeLoad:AutonomyFullChargeLoad.create(2),
			 timeCharging:TimeCharging.create(2) 
		};
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};



		let truckSchemaInstance = require("../src/persistence/schemas/truckSchema").default;
		Container.set("truckSchema", truckSchemaInstance);

		let truckRepoClass = require("../src/repos/truckRepo").default;
		let truckRepoInstance = Container.get(truckRepoClass);
		Container.set("truckRepo", truckRepoInstance);

		let truckServiceClass = require("../src/services/truckService").default;
		let truckServiceInstance = Container.get(truckServiceClass);
		Container.set("truckService", truckServiceInstance);

		truckServiceInstance = Container.get("truckService");
		sinon.stub(truckServiceInstance, "createTruck").returns( Result.ok<ITruckDTO>( {"licencePlate": req.body.licenceP,"tare": req.body.tare, "capacity": req.body.capacity,"maxBateryCapacity": req.body.maxBateryCapacity,"autonomyFullChargeLoad": req.body.autonomyFullChargeLoad,"timeCharging": req.body.timeCharging} ));

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({"licencePlate": req.body.licenceP,"tare": req.body.tare, "capacity": req.body.capacity,"maxBateryCapacity": req.body.maxBateryCapacity,"autonomyFullChargeLoad": req.body.autonomyFullChargeLoad,"timeCharging": req.body.timeCharging}));
	});
}); */
 import 'reflect-metadata';

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
 




