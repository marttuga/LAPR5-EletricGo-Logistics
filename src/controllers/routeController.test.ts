import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from '../../config';

import { Result } from '../core/logic/Result';

import IRouteService from '../services/IServices/IRouteService';
import RouteController from './routeController';
import IRouteDTO from '../dto/IRouteDTO';

describe('route controller', function() {
  beforeEach(function() {});

  it('createRoute: returns json with values', async function() {
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

    let routeServiceClass = require(config.services.route.path).default;
    let routeServiceInstance = Container.get(routeServiceClass);
    Container.set(config.services.route.name, routeServiceInstance);

    routeServiceInstance = Container.get(config.services.route.name);
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
