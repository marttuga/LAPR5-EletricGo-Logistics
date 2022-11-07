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

}); */


