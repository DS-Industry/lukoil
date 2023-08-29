import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvironmentService {
  constructor(private readonly configService: ConfigService) {}

  public getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  }

  public getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  }

  public getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  }

  public getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  }

  public getDBCredentials() {
    return {
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      sid: this.configService.get<string>('DB_SID'),
      password: this.configService.get<string>('DB_PASSWORD'),
      username: this.configService.get<string>('DB_USERNAME'),
    };
  }

  public getDsCloudCredentials() {
    return {
      url: this.configService.get<string>('DS_CLOUD_URL'),
      apiKey: this.configService.get<string>('DS_CLOUD_API_KEY'),
      source: this.configService.get<number>('SOURCE'),
    };
  }

  public getPaymentApiKey() {
    return this.configService.get<string>('YOOKASS_APO_KEY_TEST');
  }
}
