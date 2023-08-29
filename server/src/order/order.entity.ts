import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'LUKOIL_ORDER', synchronize: false })
export class Order {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'number' })
  id: number;
  @Column({ name: 'PAYMENT_ID', type: 'varchar2' })
  paymentId: string;
  @Column({ name: 'CARWASH_ID', type: 'number' })
  carWashId: number;
  @Column({ name: 'CREATED_AT', type: 'date' })
  createdAt: Date;
  @Column({ name: 'BAY_ID', type: 'number' })
  bayId: number;
  @Column({ name: 'ORDER_STATUS', type: 'varchar2' })
  orderStatus: string;
  @Column({ name: 'ORDER_SUM', type: 'number' })
  orderSum: number;
  @Column({ name: 'PARTNER_CARD', type: 'varchar2' })
  partnerCard: string;
}
