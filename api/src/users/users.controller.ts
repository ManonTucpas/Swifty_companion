import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Get(':login') // GET /users/:login
  async getUser(@Param('login') login: string) {
    console.log('GET /users/:login');
    return await this.usersService.getUserByLogin(login);
  }

  @Get(':id/cursus') // GET /users/:id/cursus
  async getstudentCursus(@Param('id') id: string) {
    console.log('GET /users/:id/cursus');
    return await this.usersService.getstudentCursus(id);
  }

  @Get(':id/projects') // GET /users/:id/projects
  async getStudentProjects(
    @Param('id') id: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    console.log('GET /users/:id/projects');
    return await this.usersService.getStudentProjects(id, page, pageSize);
  }
}
