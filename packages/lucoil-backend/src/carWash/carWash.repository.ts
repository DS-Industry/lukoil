import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { EnvironmentService } from '../environment/environment.service';
import { firstValueFrom } from 'rxjs';
import { Box, Location } from './carWash.entity';

@Injectable()
export class CarWashRepository {
  private baseUrl: string;
  private apiKey: string;
  private source: number;
  constructor(
    private readonly httpService: HttpService,
    private readonly env: EnvironmentService,
  ) {
    const dsCloudCred = env.getDsCloudCredentials();
    this.baseUrl = dsCloudCred.url;
    this.apiKey = dsCloudCred.apiKey;
    this.source = dsCloudCred.source;
  }

  public async getCarWashList() {
    const headersReq: any = this.setHeaders(this.apiKey);
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrl}/external/collection/group/list?code=${this.source}`,
          { headers: headersReq },
        ),
      );

      return response.data.map((loc) => {
        return Location.toLocation(loc);
      });
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  public async getCarWashBay(carWashId: string, bayNumber: number) {
    const headersReq: any = this.setHeaders(this.apiKey);
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrl}/external/collection/device?carwashId=${carWashId}&bayNumber=${bayNumber}`,
          { headers: headersReq },
        ),
      );
      return Box.toBox(response.data);
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  public async startCarWash(bayId: number, sum: number) {
    const headersReq: any = this.setHeaders(this.apiKey);

    const body = {
      GVLCardNum: '0',
      GVLCardSum: sum.toString(),
      GVLSource: this.source,
    };
    try {
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.baseUrl}/external/mobile/write/${bayId}`,
          body,
          { headers: headersReq },
        ),
      );
      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  private setHeaders(apiKey: string) {
    return {
      akey: apiKey,
    };
  }
}
