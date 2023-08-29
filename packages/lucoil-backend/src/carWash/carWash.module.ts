import { Module } from '@nestjs/common';
import { CarWashController } from './carWash.controller';
import { CarWashService } from './carWash.service';
import { CarWashRepository } from './carWash.repository';
import { HttpModule } from '@nestjs/axios';
import { EnvironmentModule } from '../environment/environment.module';

@Module({
  imports: [HttpModule, EnvironmentModule],
  controllers: [CarWashController],
  providers: [CarWashService, CarWashRepository],
  exports: [CarWashService],
})
export class CarWashModule {}
