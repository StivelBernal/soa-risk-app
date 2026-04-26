import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { CheckRequestDto } from './dto/check-request.dto';
import { CheckResponseDto } from './dto/check-response.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';

@Controller('api')
@UseInterceptors(LoggingInterceptor)
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('check')
  async checkIdentity(@Body() dto: CheckRequestDto): Promise<CheckResponseDto> {
    return this.gatewayService.checkIdentity(dto.email, dto.mock);
  }
}
