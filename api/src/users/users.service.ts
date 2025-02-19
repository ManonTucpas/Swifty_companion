import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { AuthService } from 'src/auth/auth.service';
import { HttpErrorHandlerService } from 'src/common/http-error-handler.service';
import { StudentCursusDto } from 'src/dto/user-cursus.dto';
import { StudentProjectsDto } from 'src/dto/user-projects.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly authService: AuthService,
        private readonly httpErrorHandlerService: HttpErrorHandlerService,
    ) { }

    async getUserByLogin(login: string) {
        // Get token from AuthService
        const accessToken = this.authService.getAccessToken();
        if (!accessToken) {
            console.log('No access token');
            throw new HttpException({ message: 'Unauthorized' }, 401);
        }
        try {
            const response = await axios.get(`${process.env.INTRA_URL}/users?filter[login]=${login}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            // Ensure response.data is defined and contains at least one element
            console.log("data:", response.data);
            if (response.data && Array.isArray(response.data) && response.data.length > 0) {

                const student = {
                    id: response.data[0].id,
                    login: response.data[0].login,
                    email: response.data[0].email,
                    first_name: response.data[0].first_name,
                    last_name: response.data[0].last_name,
                    image: response.data[0].image.versions.small,
                    phone: response.data[0].phone,
                    correction_point: response.data[0].correction_point,
                    wallet: response.data[0].wallet,
                }
                return student;
            }
            else {
                console.warn('No user found for login:', login);
                throw new HttpException('No student found for login: ' + login, HttpStatus.NOT_FOUND);
            }

        } catch (error) {
            if (error instanceof HttpException) {
                throw error; // Re-throw existing HttpException, don't log again
            }
            console.error('Unexpected error:', error); // Only log unexpected errors
            this.httpErrorHandlerService.handleAxiosError(error.code, 'Failed to fetch users');
        }
    }

    async getstudentCursus(id: string) {
        // Get token from AuthService
        const accessToken = this.authService.getAccessToken();
        if (!accessToken) {
            console.log('No access token');
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }
        console.log('GET /users/:id/cursus');
        try {
            const response = await axios.get(`${process.env.INTRA_URL}/users/${id}/cursus_users`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    filter: {
                        cursus_id: 21,
                    }
                }
            });
            const cursus: StudentCursusDto = {
                id: response.data[0].cursus.id,
                level: Math.floor(response.data[0].level),
                percentage: Math.round((response.data[0].level % Math.trunc(response.data[0].level)) * 100),
                skills: response.data[0].skills,
            }
            return cursus;
        } catch (error) {
            // throw new HttpException('Failed to fetch student cursus', HttpStatus.NOT_FOUND);
            this.httpErrorHandlerService.handleAxiosError(error, 'Failed to fetch users');
        }
    }

    async getStudentProjects(id: string, page: number, pageSize: number): Promise<{
        projects: StudentProjectsDto[]
    }> {

        // Get token from AuthService
        const accessToken = this.authService.getAccessToken();
        if (!accessToken) {
            console.log('No access token');
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        console.log('GET /users/:id/projects');

        try {
            // https://api.intra.42.fr/v2/users/73377/projects_users?filter[status]=finished
            const response = await axios.get(`${process.env.INTRA_URL}/users/${id}/projects_users`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    filter: {
                        status: 'finished'
                    },
                    page: page,
                    per_page: pageSize,
                }
            });
            const projects = response.data.map((project: any) => (
                {
                    id: project.project.id,
                    project_name: project.project.name,
                    final_mark: project.final_mark,
                    validated: project.final_mark == 0 ? false : true,
                }),
            );
            return projects;

        } catch (error) {
            this.httpErrorHandlerService.handleAxiosError(error, 'Failed to fetch users');
        }
    }
}

