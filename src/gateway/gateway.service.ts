import { Injectable } from '@nestjs/common';
import { HibpService } from '../hibp/hibp.service';
import { RiskService } from '../risk/risk.service';
import { RecommendationService } from '../recommendation/recommendation.service';
import { CheckResponseDto } from './dto/check-response.dto';

@Injectable()
export class GatewayService {
  constructor(
    private readonly hibpService: HibpService,
    private readonly riskService: RiskService,
    private readonly recommendationService: RecommendationService,
  ) {}

  async checkIdentity(email: string, mock?: { enable: boolean; withLeaks: boolean }): Promise<CheckResponseDto> {
    // Get breaches
    const breaches = await this.hibpService.getBreaches(email, mock);

    // Calculate risk
    const risk = this.riskService.calculateRisk(breaches);

    // Generate recommendations
    const recommendations = this.recommendationService.generateRecommendations(breaches);

    return {
      email,
      breaches,
      risk,
      recommendations,
    };
  }
}
