import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('courses')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @Roles('admin', 'director', 'teacher')
  findAll(@Request() req) {
    return this.coursesService.findAll(req.user.schoolId);
  }

  @Get(':id')
  @Roles('admin', 'director', 'teacher')
  findOne(@Param('id') id: string, @Request() req) {
    return this.coursesService.findOne(+id, req.user.schoolId);
  }

  @Post()
  @Roles('admin', 'director')
  create(@Body() dto: CreateCourseDto, @Request() req) {
    return this.coursesService.create(req.user.schoolId, dto);
  }

  @Patch(':id')
  @Roles('admin', 'director')
  update(@Param('id') id: string, @Body() dto: UpdateCourseDto, @Request() req) {
    return this.coursesService.update(+id, req.user.schoolId, dto);
  }

  @Delete(':id')
  @Roles('admin', 'director')
  remove(@Param('id') id: string, @Request() req) {
    return this.coursesService.remove(+id, req.user.schoolId);
  }
}