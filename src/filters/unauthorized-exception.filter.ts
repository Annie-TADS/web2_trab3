import {
  ExceptionFilter,
  ArgumentsHost,
  UnauthorizedException,
  HttpStatus,
  Injectable,
  Catch,
} from '@nestjs/common';
import { Response } from 'express';
import { EndpointAccessesService } from 'src/endpoint-accesses/endpoint-accesses.service';

@Injectable()
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly endpointAccessesService: EndpointAccessesService,
  ) {}

  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const req = context.getRequest();
    const res = context.getResponse<Response>();

    const moduleName = req.moduleName
    if (exception.message.toUpperCase() == 'FORBIDDEN RESOURCE' && moduleName) {
      const user = req.user;
      const userId = user ? user.id : null;

      if (userId) {
        this.endpointAccessesService.create({
          userId,
          endpoint: req.path,
          method: req.method,
          approved: false,
        });
      }
      
      const status = exception.getStatus
        ? exception.getStatus()
        : HttpStatus.FORBIDDEN;

      const message = `SEM PERMISSÃO PARA ACESSAR O MÓDULO ${moduleName}`;

      res.status(status).json({
        statusCode: status,
        message,
      });
    } else {
      console.error(exception)
    }
  }
}