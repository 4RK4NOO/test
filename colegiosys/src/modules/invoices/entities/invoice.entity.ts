import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { School } from '../../schools/entities/school.entity';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => School, school => school.id)
  school: School;

  @Column()
  amount: number;

  @Column()
  status: string; // pending, paid, etc.

  @CreateDateColumn()
  createdAt: Date;
}