import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/req/create-order.dto';
import { CarWashService } from '../carWash/carWash.service';
import { OrderStatusEnum } from './dto/enum/order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly carWashService: CarWashService,
  ) {}

  async create(newOrder: CreateOrderDto) {
    //verify payment
    const { paymentId, carWashId, bayNumber, partnerCard, orderSum } = newOrder;
    const bay = await this.carWashService.ping(String(carWashId), bayNumber);

    const createdAt = new Date(Date.now());

    const order = new Order();

    if (orderSum <= 0) throw new BadRequestException('Unable to create order');

    order.orderSum = orderSum;
    order.createdAt = createdAt;
    order.carWashId = carWashId;
    order.bayId = Number(bay.id);
    order.partnerCard = partnerCard;
    order.orderStatus = OrderStatusEnum.CREATED;
    order.paymentId = paymentId;

    const createdOrder = await this.orderRepository.save(order);

    //Send order
    try {
      const sentOrder = await this.carWashService.startCarWash(
        Number(bay.id),
        createdOrder.orderSum,
      );
      return sentOrder;
    } catch (e) {
      await this.updateOrderStatus(createdOrder.id, OrderStatusEnum.CANCELED);
      throw new InternalServerErrorException('Unable to create order');
    }
  }

  async updateOrderStatus(orderId: number, status: string) {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId,
      },
    });

    if (!order) throw new NotFoundException('Order does not exists');

    order.orderStatus = status;

    await this.orderRepository.save(order);
  }
}
