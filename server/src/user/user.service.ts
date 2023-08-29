import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public async create(phone: string, partnerCard: string) {
    const user = new User();
    user.phone = phone;
    user.partnerCard = partnerCard;

    const isExists = await this.userRepository.findOne({
      where: { phone: phone },
    });

    if (isExists) throw new BadRequestException('User already exists');

    return await this.userRepository.save(user);
  }

  public async findOneByPhone(phone: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { phone: phone },
    });
  }
}
