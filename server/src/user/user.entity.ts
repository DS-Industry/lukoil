import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'LKUCLIENT', synchronize: false })
export class User {
  @PrimaryGeneratedColumn({ name: 'ID', type: 'number' })
  id: number;
  @Column({ name: 'PHONE', type: 'varchar2' })
  phone: string;
  @Column({ name: 'PARTNER_CARD', type: 'varchar2' })
  partnerCard: string;
  @Column({ name: 'INSERTED_AT', type: 'date' })
  insertDate: Date;
}
