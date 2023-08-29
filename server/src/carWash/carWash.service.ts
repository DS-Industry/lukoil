import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CarWash } from './carWash.entity';
import { CarWashRepository } from './carWash.repository';

@Injectable()
export class CarWashService {
  constructor(private readonly carWashRepository: CarWashRepository) {}

  public async getCarWashList() {
    return await this.carWashRepository.getCarWashList();
  }

  public async ping(carWashId: string, bayNumber: number) {
    const bay = await this.carWashRepository.getCarWashBay(
      carWashId,
      bayNumber,
    );

    if (!bay) throw new NotFoundException(`Bay ${bayNumber} not found`);

    switch (bay.status) {
      case 'Free': {
        return bay;
        break;
      }
      case 'Busy': {
        throw new BadRequestException(`Bay ${bayNumber} busy`);
        break;
      }
      case 'Unavailable': {
        throw new BadRequestException(`Bay ${bayNumber} Unavailable`);
        break;
      }
      default: {
        break;
      }
    }
  }

  public async startCarWash(bayId: number, sum: number) {
    const result = await this.carWashRepository.startCarWash(bayId, sum);

    if (!result)
      throw new InternalServerErrorException(`Unable to start car wash`);
    console.log(result);
    return 200;
  }
}
