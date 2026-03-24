#!/bin/sh
# Napraw uprawnienia volume (montowany jako root)
mkdir -p /app/data
chown -R nextjs:nodejs /app/data
exec su-exec nextjs sh -c 'if [ -n "$DATABASE_URL" ]; then npx prisma migrate deploy; fi && exec node server.js'
