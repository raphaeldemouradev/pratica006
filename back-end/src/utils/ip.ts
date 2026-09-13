/**
 * Anonimiza endereços IPv4 e IPv6 removendo os identificadores finais.
 */
export function anonymizeIP(ip?: string | string[] | null): string {
  if (!ip) return '0.0.0.0';

  // Se vier como array de strings, pega o primeiro IP da lista
  const rawValue = Array.isArray(ip) ? ip[0] : ip;

  // Garante que é uma string válida antes de manipular
  if (!rawValue || typeof rawValue !== 'string') {
    return '0.0.0.0';
  }

  // Trata sintaxe de IPv4 mapeado em IPv6 (ex: ::ffff:192.168.1.1)
  const cleanIP = rawValue.replace(/^::ffff:/, '');

  if (cleanIP.includes('.')) {
    // IPv4: Mascara o último octeto (ex: 192.168.1.100 -> 192.168.1.0)
    return cleanIP.split('.').slice(0, 3).join('.') + '.0';
  } else if (cleanIP.includes(':')) {
    // IPv6: Mantém os primeiros 3 blocos (ex: 2001:db8:85a3:: -> 2001:db8:85a3::)
    const parts = cleanIP.split(':');
    return parts.slice(0, 3).join(':') + '::';
  }

  return '0.0.0.0';
}