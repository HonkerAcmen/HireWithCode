# 构建阶段
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com/
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build

# 产出静态文件到 /app/dist 供外部 nginx 映射