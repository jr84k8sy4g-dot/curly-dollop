# syntax=docker/dockerfile:1.7
# ─── Build stage ─────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY tsconfig.json next.config.mjs tailwind.config.ts postcss.config.mjs ./
COPY next-env.d.ts ./
COPY app ./app
COPY components ./components
COPY lib ./lib
COPY public ./public

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ─── Runtime stage ───────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

RUN addgroup --system --gid 1001 cdss \
 && adduser --system --uid 1001 cdss

COPY --from=builder --chown=cdss:cdss /app/public ./public
COPY --from=builder --chown=cdss:cdss /app/.next ./.next
COPY --from=builder --chown=cdss:cdss /app/node_modules ./node_modules
COPY --from=builder --chown=cdss:cdss /app/package.json ./package.json

USER cdss
EXPOSE 3000
CMD ["npm", "start"]
