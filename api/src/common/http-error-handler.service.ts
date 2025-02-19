import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";


@Injectable()
export class HttpErrorHandlerService {
    handleAxiosError(error: any, message: string) {

        if (axios.isAxiosError(error)) {
            const status = error.response?.status || 500;
            const errorMessage = error.response?.data?.message || message;
            switch (status) {
                case 400:
                    throw new HttpException(errorMessage || 'Bad Request', HttpStatus.BAD_REQUEST);
                case 401:
                    throw new HttpException(errorMessage || 'Unauthorized', HttpStatus.UNAUTHORIZED);
                case 403:
                    throw new HttpException(errorMessage || 'Forbidden', HttpStatus.FORBIDDEN);
                case 404:
                    throw new HttpException(errorMessage || 'Not Found', HttpStatus.NOT_FOUND);
                case 422:
                    throw new HttpException(errorMessage || 'Unprocessable Entity', HttpStatus.UNPROCESSABLE_ENTITY);
                case 500:
                    throw new HttpException(errorMessage || 'Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
                default:
                    throw new HttpException('Unexpected Error', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            throw new HttpException('Unknown error occurred', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}