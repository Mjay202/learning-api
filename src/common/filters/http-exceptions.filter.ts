import { ArgumentsHost, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

export class GlobalExceptionFilters implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const httpContext = host.switchToHttp();
        const response = httpContext.getResponse();
        const request = httpContext.getRequest();


        const message = exception instanceof HttpException ? exception.getResponse() : exception.message;

        const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        response.status(status).json({
            status: false,
            statusCode: status,
            error: message,
            path: request.url

        })
    }
}