# Reglas del proyecto

- Lee `PRODUCT.md`, `DESIGN.md`, `CHANGELOG.md` y `README.md` antes de modificar el sitio.
- La marca se presenta como sociedad de inversión privada con capital propio; no describirla como gestora, asesora financiera o captadora de fondos de terceros sin aprobación expresa.
- El sitio público está en inglés. Todo texto visible nuevo debe mantener un tono sobrio, preciso e institucional.
- Mantén salida estática compatible con Cloudflare Workers Static Assets.
- No añadas trackers, cookies, formularios externos ni scripts de terceros sin documentar su finalidad y tratamiento de datos.
- Los activos visuales deben ser reales, suministrados o correctamente licenciados; evita clichés financieros.
- Ejecuta `npm run check`, `npm run build`, `npm run check:seo` y `npm run deploy:dry` antes de cerrar cambios.
- Documenta cambios visibles, operativos o de arquitectura en `CHANGELOG.md`.
- Nunca versions secretos, tokens, archivos `.env`, datos financieros privados ni documentación interna de inversiones.
