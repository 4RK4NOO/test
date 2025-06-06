import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Course } from '../../courses/entities/course.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Course, course => course.id)
  course: Course;

  @ManyToOne(() => User, user => user.id)
  student: User;

  @Column()
  subject: string;

  @Column('decimal')
  value: number;
}