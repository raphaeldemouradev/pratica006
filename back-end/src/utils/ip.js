/**
 * Anonimiza endereços IPv4 e IPv6 removendo os identificadores finais.
 */
export function anonymizeIP(ip) {
  if (!ip) return '0.0.0.0';

  // Trata sintaxe de IPv4 mapeado em IPv6 (ex: ::ffff:192.168.1.1)
  const cleanIP = ip.replace(/^::ffff:/, '');

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