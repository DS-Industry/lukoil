import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtTokenService } from '../frameworks/jwt/jwt-token.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entity/otp.entity';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { OTP_EXPIRY_TIME } from '../common/constants';
import { IJwtTokenPayload } from '../common/interfaces/jwt-token-payload.interface';
import { ConfigService } from '@nestjs/config';
import { SmsProviderService } from './sms-provider.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtTokenService,
    @InjectRepository(Otp) private readonly otpRepository: Repository<Otp>,
    private readonly configService: ConfigService,
    private readonly smsProviderService: SmsProviderService,
  ) {}

  public async sendOtp(phone: string) {
    const code = this.generateOTP();
    const message = `Ваш код ${code}`;

    //TODO
    //1) Add otp to db correct way. First find old one, remove it and then create a new one
    const otp = await this.addPhoneCode(phone, code);

    if (!otp) {
      throw new UnprocessableEntityException('Unable to create otp');
    }

    const sms = await this.smsProviderService.send(message, phone);

    if (!sms) {
      throw new UnprocessableEntityException('Send failed');
    }

    return {
      message: 'Success',
      target: phone,
    };
  }

  public async verifyOtp(phone: string, otp: string) {
    const currentOtp = await this.otpRepository.findOne({
      where: { phone: phone },
    });

    return !(
      !currentOtp ||
      this.isExpired(currentOtp.expireDate, OTP_EXPIRY_TIME) ||
      currentOtp.otp != otp
    );
  }

  public async singIn(phone: string, otp: string) {
    const isVerified = await this.verifyOtp(phone, otp);
    if (!isVerified) {
      throw new UnauthorizedException('Invalid OTP');
    }
    const user = await this.userService.findOneByPhone(phone);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const accessToken = this.signAccessToken(phone);

    return {
      user,
      accessToken,
    };
  }

  public async register(phone: string, otp: string, partnerCard: string) {
    const isVerified = await this.verifyOtp(phone, otp);

    if (!isVerified) {
      throw new UnauthorizedException('Invalid OTP');
    }

    const isExists = await this.userService.findOneByPhone(phone);

    if (isExists) {
      throw new NotFoundException('User already exists');
    }

    const user = await this.userService.create(phone, partnerCard);

    if (!user) {
      throw new UnprocessableEntityException('Unable to register user');
    }

    const accessToken = this.signAccessToken(phone);

    return {
      user,
      accessToken,
    };
  }

  public async validateUserForJwt(phone: string) {
    const user = await this.userService.findOneByPhone(phone);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async addPhoneCode(phone: string, otp: string) {
    const currentOtp = await this.otpRepository.findOne({
      where: {
        phone: phone,
      },
    });

    if (currentOtp) {
      await this.otpRepository.delete({ phone: phone });
    }

    const newOtp = this.otpRepository.create({
      phone,
      otp,
    });

    return await this.otpRepository.save(newOtp);
  }

  private isExpired(timestamp: Date, expiryTime: number): boolean {
    const currentTime = moment();
    const diff = currentTime.diff(timestamp);
    return diff > expiryTime;
  }

  public signAccessToken(phone: any) {
    const payload: IJwtTokenPayload = { phone: phone };
    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn = this.configService.get<string>('JWT_EXPIRATION_TIME');

    return this.jwtService.signToken(payload, secret, expiresIn);
  }

  private generateOTP() {
    const digits = '0123456789';
    let otp = '';

    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      otp += digits[randomIndex];
    }

    return otp;
  }
}
