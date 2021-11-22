FROM node:14-alpine
WORKDIR /time-tagger
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "server"]