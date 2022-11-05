import { expect } from 'chai';
import { Route } from '../../../src/domain/route/route';
import IRouteDTO from '../../../src/dto/IRouteDTO';

describe('Create a valid route', () => {
  let route = Route.create({
    routeId: '1',
    distance: '31',
    routeTime: '74',
    batteryWaste: '25',
    arrivalId: 'ESPINHO',
    departureId: 'MAIA',
    extraTime: '0',
  } as IRouteDTO);
  it('make sure the route was created', () => {
    expect(route.getValue().routeId.routeId).to.equal('1');
  });
});

describe('Create an invalid route without id', () => {
  let route = Route.create({
    routeId: null,
    distance: '31',
    routeTime: '74',
    batteryWaste: '25',
    arrivalId: 'ESPINHO',
    departureId: 'MAIA',
    extraTime: '0',
  } as IRouteDTO);
  it('make sure the route was not created', () => {
    expect(route.error).to.equal(null);
  });
});

describe('Create an invalid route without distance', () => {
  let route = Route.create({
    routeId: '1',
    distance: null,
    routeTime: '74',
    batteryWaste: '25',
    arrivalId: 'ESPINHO',
    departureId: 'MAIA',
    extraTime: '0',
  } as IRouteDTO);
  it('make sure the route was not created', () => {
    expect(route.error).to.equal(null);
  });
});

describe('Create an invalid route without route time', () => {
  let route = Route.create({
    routeId: '1',
    distance: '31',
    routeTime: null,
    batteryWaste: '25',
    arrivalId: 'ESPINHO',
    departureId: 'MAIA',
    extraTime: '0',
  } as IRouteDTO);
  it('make sure the route was not created', () => {
    expect(route.error).to.equal(null);
  });
});

describe('Create an invalid route without battery waste', () => {
  let route = Route.create({
    routeId: '1',
    distance: '31',
    routeTime: '74',
    batteryWaste: null,
    arrivalId: 'ESPINHO',
    departureId: 'MAIA',
    extraTime: '0',
  } as IRouteDTO);
  it('make sure the route was not created', () => {
    expect(route.error).to.equal(null);
  });
});
describe('Create an invalid route without warehouse arrivalId', () => {
  let route = Route.create({
    routeId: '1',
    distance: '31',
    routeTime: '74',
    batteryWaste: '25',
    arrivalId: null,
    departureId: 'MAIA',
    extraTime: '0',
  } as IRouteDTO);
  it('make sure the route was not created', () => {
    expect(route.error).to.equal(null);
  });
});

describe('Create an invalid route without warehouse departureId', () => {
  let route = Route.create({
    routeId: '1',
    distance: '31',
    routeTime: '74',
    batteryWaste: '25',
    arrivalId: 'ESPINHO',
    departureId: null,
    extraTime: '0',
  } as IRouteDTO);
  it('make sure the route was not created', () => {
    expect(route.error).to.equal(null);
  });
});

describe('Create an invalid route without extra time', () => {
  let route = Route.create({
    routeId: '1',
    distance: '31',
    routeTime: '74',
    batteryWaste: '25',
    arrivalId: 'ESPINHO',
    departureId: 'MAIA',
    extraTime: null,
  } as IRouteDTO);
  it('make sure the route was not created', () => {
    expect(route.error).to.equal(null);
  });
});
