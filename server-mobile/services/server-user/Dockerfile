FROM node:latest

WORKDIR /orchestrator

COPY ["package.json", "package-lock.json*", "./"]

# RUN npm install -g nodemon
RUN npm install --production 

COPY . .

CMD ["node", "app.js"]