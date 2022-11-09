import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import config from '../../../config';
import 'reflect-metadata';

import ITruckController from '../../../src/controllers/IControllers/ITruckController';
import ITruckDTO from '../../../src/dto/ITruckDTO';

describe('truck controller create', () => {

    it('createTruck: returns ITruckDTO', async function () {
        let body = {
          licencePlate: "1",
          tare: 31,
          capacity: 74,
          maxBateryCapacity: null,
          autonomyFullChargeLoad: 2,
          timeCharging: 1
        };
        let req: Partial<Request> = {};
        req.body = body;

        
        let truckServiceClass = require(config.services.post.path).default;
        let truckServiceInstance = Container.get(truckServiceClass);
        Container.set(config.services.post.name, truckServiceInstance);
        truckServiceInstance = Container.get(config.services.post.name);
        
        let truckControllerClass = require(config.controllers.post.path).default;
        let truckControllerInstance: ITruckController = Container.get(truckControllerClass)
        Container.set(config.controllers.post.name, truckControllerInstance);
        truckControllerInstance = Container.get(config.controllers.post.name);
        

        beforeEach(() => {
            // @ts-ignore
            sinon.stub(truckServiceInstance, "createTruck").returns(({
              licencePlate: "1",
              tare: 31,
              capacity: 74,
              maxBateryCapacity: null,
              autonomyFullChargeLoad: 2,
              timeCharging: 1
            }) as ITruckDTO);
        });
        afterEach(function () {
            sinon.restore();
        });
        it('should create ', async () => {
            const jsonStub = sinon.stub()
            const res = { status: status => ({ json: jsonStub, send: err => err }) }
            const statusSpy = sinon.spy(res, 'status')

            // @ts-ignore
            await truckControllerInstance.createTruck(<Request>req, <Response>res);

            // @ts-ignore
            sinon.assert.calledWith(res.status, 201);
            sinon.assert.calledWith(jsonStub, {
              licencePlate: "1",
              tare: 31,
              capacity: 74,
              maxBateryCapacity: null,
              autonomyFullChargeLoad: 2,
              timeCharging: 1
            });
        });
    });
});