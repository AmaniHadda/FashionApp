FROM node:16.14.0
WORKDIR /app/backend
COPY package.json .
RUN npm cache clean --force
RUN npm install --legacy-peer-deps
RUN npm install webpack --legacy-peer-deps
COPY . . 
EXPOSE 8882
CMD ["npm", "start"]

