import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { EndpointAccessesService } from 'src/endpoint-accesses/endpoint-accesses.service';

@Injectable()
export class EndpointSuccessInterceptor implements NestInterceptor {
  constructor(private endpointAccessService: EndpointAccessesService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const userId = user ? user.id : null;

    if (userId) {
        const dto = {
            userId,
            endpoint: req.path,
            method: req.method,
            approved: true
        }
        
        return next.handle().pipe(
        tap(() => {
            this.endpointAccessService.create(dto);
        }),
        );
    }   

    return next.handle()
  }
}