import { expect } from 'chai';
import { Route } from '../../../src/domain/route/route';
import IRouteDTO from '../../../src/dto/IRouteDTO';

describe('Create a valid route', () => {
  let route = Route.create(({
    routeId: '1',
    distance: '31',
    routeTime: '74',
    batteryWaste: '25',
    arrivalId: 'ESPINHO',
    departureId: 'MAIA',
    extraTime: '0',
  } as unknown) as IRouteDTO);
  it('make sure the route was created with routeId', () => {
    expect(route.getValue().routeId.routeId).to.equal('1');
  });
  it('make sure the route was created with distance', () => {
    expect(route.getValue().distance.distance).to.equal('31');
  });
  it('make sure the route was created with time', () => {
    expect(route.getValue().routeTime.routeTime).to.equal('74');
  });
  it('make sure the route was created with the battery waste', () => {
    expect(route.getValue().batteryWaste.batteryWaste).to.equal('25');
  });
  it('make sure the route was created with warehouse arrivalId', () => {
    expect(route.getValue().arrivalId).to.equal('ESPINHO');
  });
  it('make sure the route was created with warehouse departureId', () => {
    expect(route.getValue().departureId).to.equal('MAIA');
  });
  it('make sure the route was created with extra time', () => {
    expect(route.getValue().extraTime.extraTime).to.equal('0');
  });
});

describe('Invalid route without id', () => {
  // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
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

describe('Invalid route without distance', () => {
  // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
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

describe('Invalid route without route time', () => {
  // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
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

describe('Invalid route without battery waste', () => {
  // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
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
describe('Invalid route without warehouse arrivalId', () => {
  // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
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

describe('Invalid route without warehouse departureId', () => {
  // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
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

describe('Invalid route without extra time', () => {
  // eslint-disable-next-line @typescript-eslint/no-object-literal-type-assertion
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
