FROM node:alpine

WORKDIR /app
COPY . .
WORKDIR /app/src
RUN npm install
RUN chmod +x -R ./

COPY --chown=node:node . .
USER node
EXPOSE 8001
CMD ["--experimental-modules","index.js"]