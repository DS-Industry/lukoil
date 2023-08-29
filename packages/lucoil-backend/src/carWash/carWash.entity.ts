export class CarWash {
  id: string;
  name: string;
  address: string;
  isActive: boolean;
  type: string;
  stepCost: number;
  limitMinCost: number;
  limitMaxCost: number;
  boxes: Box[];
  price: Price[];
  tags: Tag[];

  public static toCarWash(data: any): CarWash {
    const boxes: Box[] = data.boxes.map((b, i) => {
      return Box.toBox(b);
    });
    const prices: Price[] = data.price.map((p) => {
      return Price.toPrice(p);
    });
    const tags: Tag[] = data.tags.map((t) => {
      return Tag.toTag(t);
    });

    return {
      id: data.id,
      name: data.name,
      address: data.address,
      isActive: data.isActive,
      type: data.type,
      stepCost: data.stepCost,
      limitMinCost: data.limitMinCost,
      limitMaxCost: data.limitMaxCost,
      price: prices,
      boxes,
      tags,
    };
  }
}

export class Location {
  lat: number;
  lon: number;
  carwashes: CarWash[];

  public static toLocation(data: any): Location {
    const carwashes: CarWash[] = data.carwashes.map((cw) => {
      return CarWash.toCarWash(cw);
    });

    return {
      lat: data.location.lat,
      lon: data.location.lon,
      carwashes,
    };
  }
}

export class Box {
  id: string;
  number: string;
  status: string;

  public static toBox(data: any): Box {
    return {
      id: data.identifier,
      number: data.bayNumber,
      status: data.status,
    };
  }
}

export class Price {
  id: number;
  name: string;
  description: string;
  cost: number;
  costType: number;

  public static toPrice(data: any): Price {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      cost: data.cost,
      costType: data.costType,
    };
  }
}

export class Tag {
  name: string;
  color: string;

  public static toTag(data: any): Tag {
    return {
      name: data.name,
      color: data.name,
    };
  }
}
