FROM mcr.microsoft.com/playwright:v1.62.0-noble
WORKDIR /tests
COPY package*.json ./
RUN npm ci
COPY . .
