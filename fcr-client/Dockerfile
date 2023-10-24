FROM node:16.14.0

WORKDIR /app/front

COPY package*.json ./

RUN npm cache clean --force

RUN npm install --legacy-peer-deps
RUN npm install webpack --save-dev

COPY . .

# RUN npm run build

EXPOSE 3030

CMD ["npm", "start"]

# Stage 1: Build
# Stage 1: Build
# FROM node:16.14.0 as build

# WORKDIR /app/front

# COPY package*.json ./

# RUN npm cache clean --force

# RUN npm install --legacy-peer-deps

# COPY . .

# RUN npm run build  # The "dist" directory is expected to be created in this step

# # Stage 2: Runtime
# FROM node:16.14.0

# WORKDIR /app/front

# COPY --from=build /app/front/dist ./dist

# EXPOSE 3030

# CMD ["npm", "start"]


