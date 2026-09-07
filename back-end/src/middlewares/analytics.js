import { anonymizeIP } from "../utils/ip.js";

// Lista em memória para armazenar os logs temporariamente no teste
export const trafficLogs = [];

export function trafficAnalyticsMiddleware(req, res, next) {
    // Ignora requisições de arquivos estáticos como imagens, CSS ou scripts para não poluir
    if (req.url.match(/\.(css|js|png|jpg|jpeg|ico|svg)$/)) {
        return next();
    }

    // Captura o IP real considerando eventuais proxies (ex: Cloudflare/Nginx)
    const rawIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const anonymizedIP = anonymizeIP(rawIP);

    const logEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(), 
        method: req.method,
        route: req.url,
        ip: anonymizedIP,
        userAgent: req.headers['user-agent'] || 'Desconhecido' // ?
    };

    // Salva no log interno
    trafficLogs.push(logEntry);

    // Exibe no terminal para acompanhamento em tempo real
    console.log(`[TRAFFIC LOG] ${logEntry.timestamp} | ${logEntry.method} ${logEntry.route} | IP: ${logEntry.ip}`);

    next();
}