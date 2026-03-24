#!/bin/sh
# Zapewnij katalog /app/data (volume montowany jako root)
mkdir -p /app/data
if [ -n "$DATABASE_URL" ]; then npx prisma migrate deploy; fi
exec node server.js
