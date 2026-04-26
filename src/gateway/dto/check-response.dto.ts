import { BreachSummaryDto } from './breach-summary.dto';
import { RiskResultDto } from './risk-result.dto';

export class CheckResponseDto {
  email: string;
  breaches: BreachSummaryDto[];
  risk: RiskResultDto;
  recommendations: string[];
}