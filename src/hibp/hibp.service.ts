import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { BreachSummaryDto } from '../gateway/dto/breach-summary.dto';

@Injectable()
export class HibpService {
  constructor(private readonly httpService: HttpService) {}

  async getBreaches(email: string, mock?: { enable: boolean; withLeaks: boolean }): Promise<BreachSummaryDto[]> {
    // MOCK MODE
    if (mock?.enable) {
      if (mock.withLeaks) {
        // Simula filtraciones reales
        return [
          {
            name: 'Adobe',
            title: 'Adobe',
            domain: 'adobe.com',
            breachDate: '2013-10-04',
            description: 'En octubre de 2013, Adobe sufrió una brecha de datos...',
            dataClasses: ['Email addresses', 'Passwords'],
          },
          {
            name: 'LinkedIn',
            title: 'LinkedIn',
            domain: 'linkedin.com',
            breachDate: '2012-05-05',
            description: 'En 2012, LinkedIn fue víctima de una filtración...',
            dataClasses: ['Email addresses', 'Passwords'],
          },
        ];
      } else {
        // Simula sin filtraciones
        return [];
      }
    }

    // Modo real (requiere API Key)
    try {
      const url = `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`;
      const response = await firstValueFrom(
        this.httpService
          .get(url, {
            headers: {
              'User-Agent': 'SOA-Risk-App/1.0',
            },
          })
          .pipe(
            catchError((error) => {
              if (error.response?.status === 404) {
                // No breaches found
                return Promise.resolve({ data: [] });
              }
              if (error.response?.status === 429) {
                throw new HttpException(
                  'Rate limit exceeded. Please try again later.',
                  HttpStatus.TOO_MANY_REQUESTS,
                );
              }
              throw new HttpException(
                'Error fetching breach data. Error: ' + error.message,
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }),
          ),
      );
      return response.data.map((breach: any) => ({
        name: breach.Name,
        title: breach.Title,
        domain: breach.Domain,
        breachDate: breach.BreachDate,
        description: breach.Description,
        dataClasses: breach.DataClasses,
      }));
    } catch (error) {
      throw error;
    }
  }
}
