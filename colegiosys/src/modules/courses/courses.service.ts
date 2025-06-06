import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { School } from '../schools/entities/school.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(School)
    private schoolsRepository: Repository<School>
  ) {}

  async findAll(schoolId: number): Promise<Course[]> {
    return this.coursesRepository.find({ where: { school: { id: schoolId } } });
  }

  async findOne(id: number, schoolId: number): Promise<Course> {
    const course = await this.coursesRepository.findOne({ where: { id, school: { id: schoolId } } });
    if (!course) throw new NotFoundException('Curso no encontrado');
    return course;
  }

  async create(schoolId: number, dto: CreateCourseDto): Promise<Course> {
    const school = await this.schoolsRepository.findOne({ where: { id: schoolId } });
    const course = this.coursesRepository.create({ ...dto, school });
    return this.coursesRepository.save(course);
  }

  async update(id: number, schoolId: number, dto: UpdateCourseDto): Promise<Course> {
    const course = await this.findOne(id, schoolId);
    Object.assign(course, dto);
    return this.coursesRepository.save(course);
  }

  async remove(id: number, schoolId: number): Promise<void> {
    const course = await this.findOne(id, schoolId);
    await this.coursesRepository.remove(course);
  }
}