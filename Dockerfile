FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force
RUN npm install -g npm
RUN npm install
RUN npm install pg --save
RUN npm i -D @types/bcrypt @types/nodemailer
RUN npm i bcrypt  @nestjs/jwt @nestjs-modules/mailer nodemailer hbs @nestjs/typeorm typeorm pg
# RUN npm install --save-dev webpack reflect-metadata rxjs
# RUN npm install @nestjs/typeorm @nestjs/serve-static
# RUN npm install @nestjs/websockets socket.io
# RUN npm install ejs
# RUN npm install --save-dev @nestjs/testing @types/jest @types/mocha

COPY . .

RUN npm run build

# Copy the compiled files to /app/dist

EXPOSE 3000

CMD [ "node", "dist/src/main.js" ]