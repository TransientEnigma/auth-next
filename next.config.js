/** @type {import('next').NextConfig} */
module.exports = {
    i18n: {
      locales: ['en', 'fr', 'de'],
      defaultLocale: 'en',
    },
    // see all Headers Tutorial https://blog.kieranroberts.dev/http-security-headers-and-how-to-set-them-in-nextjs
    async headers() {
        return [
          {
            // this array will apply to all routes
            source: '/(.*)',
            headers: [
              {
                key: 'X-Content-Type-Options',
                value: 'nosniff',
              },
              // Warning: The Content-Security-Policy HTTP header has a frame-ancestors directive which obsoletes this.
              {
                key: 'X-Frame-Options',
                value: 'DENY',
              },
              // Warnings: not for production, see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
              {
                key: 'X-XSS-Protection',
                value: '1; mode=block',
              },
              // Note: Only works if domain registered on preload list: https://hstspreload.org/
              {
                key: 'Strict-Transport-Security', 
                value: 'max-age=63072000; includeSubDomains; preload'
              },
              // This used to be called Feature-Policy
              {
                key: 'Permissions-Policy',
                value: "camera=(self), microphone=(self), geolocation=('https://google.com'), browsing-topics=()"
              },
              // sends the path, origin, and query string with a same-origin request from equal protocol levels (e.g. HTTPS to HTTPS)
              {
                key: 'Referrer-Policy',
                value: 'origin-when-cross-origin',
              },
              // to recieve violation reports add, report-to /csp-violation-report-endpoint/
              // also it would be better to use a nonce rather than usafe-inline
              {
                key: 'Content-Security-Policy',
                value:
                  "default-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' *.anywhere.com; script-src 'self' *.localhost:3000 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'none'; ",
              }
            ],
          },
        ];
      },
  }
