FROM node:18-alpine

WORKDIR .

COPY package*.json ./

RUN yarn install
RUN yarn add typescript @types/node -D

COPY . .

COPY entrypoint.sh /app/entrypoint.sh


RUN chmod +x /app/entrypoint.sh

RUN npx prisma generate


RUN yarn build

ENTRYPOINT ["sh", "/app/entrypoint.sh"]

EXPOSE 3003

