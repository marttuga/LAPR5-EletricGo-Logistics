import { expect } from 'chai';
import { Truck } from '../../../src/domain/truck/truck';
import ITruckDTO from '../../../src/dto/ITruckDTO';

describe('Create a valid truck', () => {
  let truck = Truck.create({
    licencePlate: "1",
    tare: 31,
    capacity: 74,
    maxBateryCapacity: 25,
    autonomyFullChargeLoad: 2,
    timeCharging: 1
  } as unknown as ITruckDTO
);

  it('make sure the truck was created and get licence Plate', () => {
    expect(truck.getValue().licencePlate.toString()).to.equal("1");
  });
  it('make sure the truck was created and get tare', () => {
    expect(parseInt(truck.getValue().tare.toString())).to.equal(31);
  });
  it('make sure the truck was created and get max capacity', () => {
    expect(parseInt(truck.getValue().capacity.toString())).to.equal(74);
  });
  it('make sure the truck was created and get max capacity', () => {
    expect(parseInt(truck.getValue().maxBateryCapacity.toString())).to.equal(25);
  });
  it('make sure the truck was created and get autonomy', () => {
    expect(parseInt(truck.getValue().autonomyFullChargeLoad.toString())).to.equal(2);
  });
  it('make sure the truck was created and get time charging', () => {
    expect(parseInt(truck.getValue().timeCharging.toString())).to.equal(1);
  });

});

describe('invalid truck without licence plate', () => {
  let truck = Truck.create({
    licencePlate: null,
    tare: 31,
    capacity: 74,
    maxBateryCapacity: 25,
    autonomyFullChargeLoad: 2,
    timeCharging: 1
  } as unknown as ITruckDTO
);
  it('make sure the truck was not created', () => {
    expect(truck.error).to.equal(null);
  });
});

describe('invalid truck without tare', () => {
  let truck = Truck.create({
    licencePlate: "1",
    tare: null,
    capacity: 74,
    maxBateryCapacity: 25,
    autonomyFullChargeLoad: 2,
    timeCharging: 1
  } as unknown as ITruckDTO
);
  it('make sure the truck was not created', () => {
    expect(truck.error).to.equal(null);
  });
});

describe('invalid truck without capacity', () => {
  let truck = Truck.create({
    licencePlate: "1",
    tare: 31,
    capacity: null,
    maxBateryCapacity: 25,
    autonomyFullChargeLoad: 2,
    timeCharging: 1
  } as unknown as ITruckDTO
);
  it('make sure the truck was not created', () => {
    expect(truck.error).to.equal(null);
  });
});

describe('invalid truck without maximum batery', () => {
  let truck = Truck.create({
    licencePlate: "1",
    tare: 31,
    capacity: 74,
    maxBateryCapacity: null,
    autonomyFullChargeLoad: 2,
    timeCharging: 1
  } as unknown as ITruckDTO
);
  it('make sure the truck was not created', () => {
    expect(truck.error).to.equal(null);
  });
});
describe('invalid truck without warehouse autonomyFullChargeLoad', () => {
  let truck = Truck.create({
    licencePlate: "1",
    tare: 31,
    capacity: 74,
    maxBateryCapacity: 25,
    autonomyFullChargeLoad: null,
    timeCharging: 1
  } as unknown as ITruckDTO
);
  it('make sure the truck was not created', () => {
    expect(truck.error).to.equal(null);
  });
});

describe('invalid truck without warehouse timeCharging', () => {
  let truck = Truck.create({
    licencePlate: "1",
    tare: 31,
    capacity: 74,
    maxBateryCapacity: 25,
    autonomyFullChargeLoad: 2,
    timeCharging: null
  } as unknown as ITruckDTO
);
  it('make sure the truck was not created', () => {
    expect(truck.error).to.equal(null);
  });
});

