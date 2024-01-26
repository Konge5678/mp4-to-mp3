FROM node:14

# Install ffmpeg
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    ffmpeg -version

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

EXPOSE 3030
CMD [ "node", "server.js" ]