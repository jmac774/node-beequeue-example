FROM node:8-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# Copy the package.json file only. This allows us to take advantage of cached Docker layers.
COPY package.json .

RUN yarn install

# Bundle app source
COPY . .

EXPOSE 9000
CMD ["yarn","start"]
