import { Injectable } from '@nestjs/common';
import { BreachSummaryDto } from '../gateway/dto/breach-summary.dto';

@Injectable()
export class RecommendationService {
  generateRecommendations(breaches: BreachSummaryDto[]): string[] {
    const recommendations: string[] = [];

    if (breaches.length === 0) {
      recommendations.push('Tu correo electrónico no ha sido comprometido en filtraciones conocidas. Mantén buenas prácticas de seguridad.');
      return recommendations;
    }

    const hasPasswords = breaches.some(b => b.dataClasses.includes('Passwords'));
    const hasEmails = breaches.some(b => b.dataClasses.includes('Email addresses'));
    const hasCreditCards = breaches.some(b => b.dataClasses.includes('Credit cards'));

    if (hasPasswords) {
      recommendations.push('Cambia todas tus contraseñas inmediatamente, especialmente las reutilizadas.');
      recommendations.push('Usa un gestor de contraseñas para generar contraseñas únicas y fuertes.');
    }

    if (hasEmails) {
      recommendations.push('Monitorea tu correo electrónico por actividades sospechosas.');
      recommendations.push('Habilita la autenticación de dos factores (2FA) en tu cuenta de correo.');
    }

    if (hasCreditCards) {
      recommendations.push('Revisa tus estados de cuenta bancarios y contacta a tu banco si es necesario.');
      recommendations.push('Considera congelar tu crédito para prevenir fraudes.');
    }

    recommendations.push('Usa autenticación de dos factores en todas las cuentas posibles.');
    recommendations.push('Revisa y actualiza la configuración de privacidad en tus cuentas en línea.');
    recommendations.push('Evita reutilizar contraseñas entre diferentes servicios.');

    return recommendations;
  }
}
