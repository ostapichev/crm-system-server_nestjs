import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class CreateUpdateModel {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
