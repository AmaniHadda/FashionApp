FROM node:16.14.0

WORKDIR /app/fcr-admin

COPY package*.json ./

RUN npm cache clean --force

RUN npm install  --legacy-peer-deps

COPY . .

# RUN npm run build

EXPOSE 3033

CMD ["npm", "start"]
