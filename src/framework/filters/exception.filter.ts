import {
  ExceptionFilter as NestExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ExceptionFilter implements NestExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    if (typeof exceptionResponse === 'string') {
      response.status(status).json({
        title: 'Error',
        detail: exceptionResponse,
        status,
        instance: request.path,
      });
      return;
    }

    const body = exceptionResponse as Record<string, unknown>;
    response.status(status).json({
      title: body['error'] as string,
      detail: Array.isArray(body['message'])
        ? (body['message'] as string[]).join('. ')
        : (body['message'] as string),
      status,
      instance: request.path,
    });
  }
}
