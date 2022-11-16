class Warehouse {
  warehouseIdentifier: string;
  designation: string;
  coordinates: Coordinate;
  address: Address;
  altitude: string;
}

class Coordinate {
  latitude:number;
  longitude:number;
}

class Address {
  street: string;
  doorNumber:number;
  city:string;
  zipcode:string;
}

