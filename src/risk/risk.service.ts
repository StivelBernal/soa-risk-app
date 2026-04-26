import { Injectable } from '@nestjs/common';
import { BreachSummaryDto } from '../gateway/dto/breach-summary.dto';
import { RiskResultDto } from '../gateway/dto/risk-result.dto';

@Injectable()
export class RiskService {
  calculateRisk(breaches: BreachSummaryDto[]): RiskResultDto {
    const breachCount = breaches.length;
    let score = 0;

    // Base score on breach count
    if (breachCount === 0) {
      score = 0;
    } else if (breachCount <= 2) {
      score = 25;
    } else if (breachCount <= 5) {
      score = 50;
    } else if (breachCount <= 10) {
      score = 75;
    } else {
      score = 100;
    }

    // Adjust based on sensitive data classes
    const sensitiveClasses = ['Passwords', 'Email addresses', 'Credit cards', 'Social security numbers'];
    const hasSensitive = breaches.some(breach =>
      breach.dataClasses.some(dc => sensitiveClasses.includes(dc))
    );
    if (hasSensitive) {
      score += 20;
    }

    // Cap at 100
    score = Math.min(score, 100);

    // Determine category
    let category: string;
    if (score <= 25) {
      category = 'Bajo';
    } else if (score <= 50) {
      category = 'Medio';
    } else if (score <= 75) {
      category = 'Alto';
    } else {
      category = 'Crítico';
    }

    return { score, category };
  }
}
