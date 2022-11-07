import { expect } from 'chai';
import { LicencePlate } from '../../../src/domain/truck/licencePlate';
import { Truck } from '../../../src/domain/truck/truck';
import ITruckDTO from '../../../src/dto/ITruckDTO';

let truckServiceClass = require('../src/services/truckService').default;
let lp= LicencePlate.create("1");

describe(' getLicencePlate( licencePlate: string, truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>', () => {
  let truck = Truck.create({
    licencePlate: "1",
    tare: 31,
    capacity: 74,
    maxBateryCapacity: 25,
    autonomyFullChargeLoad: null,
    timeCharging: 1
  } as unknown as ITruckDTO
);
  it('Get truck by licence plate', () => {
    expect(truckServiceClass.getLicencePlate(lp,truck)).to.equal(truck);
  });
});


