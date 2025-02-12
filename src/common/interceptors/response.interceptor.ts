import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class ResponseInterceptor <T> implements NestInterceptor <T> {

    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> | Promise<Observable<any>> {
        const httpContext = context.switchToHttp();
        const response = httpContext.getResponse()

       return next.handle().pipe(
           map((data) => ({
               status: true,
               statusCode: response.statusCode,
               data: data
            })),
        )
    }
}