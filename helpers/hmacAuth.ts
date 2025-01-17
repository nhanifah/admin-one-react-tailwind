import crypto from 'crypto';

export function generate_headers(method, pathWithQueryParam) {
    const datetime = new Date().toUTCString();
    const requestLine = `${method} ${pathWithQueryParam} HTTP/1.1`;
    const payload = [`date: ${datetime}`, requestLine].join("\n");
    const signature = crypto.createHmac('SHA256', 'cxmLLaPLxAPrNVbJhbN48sw0dE609H6y').update(payload).digest('base64');
  
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Date': datetime,
      'Authorization': `hmac username="bpPA4sSARoaDHVll", algorithm="hmac-sha256", headers="date request-line", signature="${signature}"`
    };
  }