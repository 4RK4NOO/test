import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { School } from '../../schools/entities/school.entity';

export enum UserRole {
  ADMIN = 'admin',
  DIRECTOR = 'director',
  TEACHER = 'teacher',
  PARENT = 'parent',
  STUDENT = 'student'
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole
  })
  role: UserRole;

  @ManyToOne(() => School, school => school.users)
  school: School;
}