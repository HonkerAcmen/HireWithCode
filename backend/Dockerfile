# 构建阶段
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

# 运行阶段
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install --production --frozen-lockfile
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/main.js"]