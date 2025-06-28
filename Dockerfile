# 1. Base image with Node.js 20 to avoid engine warnings
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Install required OS packages (openssl for Prisma)
RUN apk add --no-cache openssl

# 4. Copy Prisma schema first to avoid cache busting during installs
COPY prisma ./prisma

# 5. Copy package files and install dependencies with legacy support
COPY package*.json ./
RUN npm install --legacy-peer-deps

# 6. Copy remaining application code
COPY . .

# 7. Generate Prisma client
RUN npx prisma generate

# 8. Build the Next.js app
RUN npm run build

# 9. Set production environment
ENV NODE_ENV=production

# 10. Expose the port
EXPOSE 3000

# 11. Start the Next.js server
CMD ["npm", "start"]
