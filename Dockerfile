FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node src/index.js
EXPOSE 3000
CMD ["npm", "run", "start"]
