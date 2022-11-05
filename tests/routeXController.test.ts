import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../src/core/logic/Result';
import IRouteService from '../src/services/IServices/IRouteService';
import RouteController from '../src/controllers/routeController';
import IRouteDTO from '../src/dto/IRouteDTO';

describe('route controller', function() {
  beforeEach(function() {});

  it('returns json with values when createRoute', async function() {
    let body = {
      routeId: '1',
      distance: '31',
      routeTime: '74',
      batteryWaste: '25',
      arrivalId: 'ESPINHO',
      departureId: 'MAIA',
      extraTime: '0',
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let routeSchemaInstance = require('../src/persistence/schemas/routeSchema').default;
    Container.set('routeSchema', routeSchemaInstance);

    let routeRepoClass = require('../src/repos/routeRepo').default;
    let routeRepoInstance = Container.get(routeRepoClass);
    Container.set('RouteRepo', routeRepoInstance);

    let routeServiceClass = require('../src/services/routeService').default;
    let routeServiceInstance = Container.get(routeServiceClass);
    Container.set('RouteService', routeServiceInstance);

    routeServiceInstance = Container.get('RouteService');
    sinon.stub(routeServiceInstance, 'createRoute').returns(
      Result.ok<IRouteDTO>({
        routeId: req.body.routeId,
        distance: req.body.distance,
        routeTime: req.body.routeTime,
        batteryWaste: req.body.batteryWaste,
        arrivalId: req.body.arrivalId,
        departureId: req.body.departureId,
        extraTime: req.body.extraTime,
      }),
    );

    const ctrl = new RouteController(routeServiceInstance as IRouteService);

    await ctrl.createRoute(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(
      res.json,
      sinon.match({
        routeId: req.body.routeId,
        distance: req.body.distance,
        routeTime: req.body.routeTime,
        batteryWaste: req.body.batteryWaste,
        arrivalId: req.body.arrivalId,
        departureId: req.body.departureId,
        extraTime: req.body.extraTime,
      }),
    );
  });
});
