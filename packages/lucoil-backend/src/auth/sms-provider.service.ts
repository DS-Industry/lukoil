import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import * as url from 'url';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class SmsProviderService {
  private baseUrl;
  private login;
  private password;
  private sender;
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = configService.get<string>('BEELINE_URL');
    this.login = configService.get<string>('BEELINE_LOGIN');
    this.password = configService.get<string>('BEELINE_PSWD');
    this.sender = configService.get<string>('BEELINE_SENDER');
  }

  public async send(message: string, target: string): Promise<any> {
    const header: any = this.setHeaders();
    const params: string = this.setParams(message, target);
    try {
      const response = firstValueFrom(
        this.httpService.post(
          `${this.configService.get<string>('BEELINE_URL')}`,
          params,
          header,
        ),
      );

      return response;
    } catch (e) {
      throw new InternalServerErrorException('Unable to send sms');
    }
  }

  private setParams(message: string, target: string): string {
    const params = {
      user: this.configService.get<string>('BEELINE_LOGIN'),
      pass: this.configService.get<string>('BEELINE_PSWD'),
      action: 'post_sms',
      message: message,
      target: target,
      sender: this.configService.get<string>('BEELINE_SENDER'),
    };

    return new url.URLSearchParams(params).toString();
  }

  /**
   * Set headers for the request
   * @private
   */
  private setHeaders(): {
    headers: { 'Content-Type': string; Accept: string };
  } {
    return {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'text/xml',
      },
    };
  }
}
