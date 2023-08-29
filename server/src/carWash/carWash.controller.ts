import { Controller, Get, Query } from '@nestjs/common';
import { CarWashService } from './carWash.service';
import { PingQueryDto } from './dto/query/ping-query.dto';

@Controller('carwash')
export class CarWashController {
  constructor(private readonly carWashService: CarWashService) {}

  @Get('/list')
  async getAllCarWashes() {
    return await this.carWashService.getCarWashList();
  }

  @Get('/ping')
  async pingCarWash(@Query() query: PingQueryDto) {
    const { carWashId, bayNumber } = query;
    return await this.carWashService.ping(String(carWashId), bayNumber);
  }
}
