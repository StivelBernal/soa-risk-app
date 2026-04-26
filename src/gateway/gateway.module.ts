import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { HibpModule } from '../hibp/hibp.module';
import { RiskModule } from '../risk/risk.module';
import { RecommendationModule } from '../recommendation/recommendation.module';

@Module({
  imports: [HibpModule, RiskModule, RecommendationModule],
  providers: [GatewayService],
  controllers: [GatewayController]
})
export class GatewayModule {}
