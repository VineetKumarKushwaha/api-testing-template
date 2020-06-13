FROM node:10

# app workdir
WORKDIR /usr/src/api-testing

# ARG NODE_ENV=development
# ENV NODE_ENV=${NODE_ENV}

# copy app dependencies
COPY package*.json ./
COPY env.json ./

# install dependecies
RUN npm i

# build app source code
COPY src src

# RUN ls

# Run the specified command within the container.
CMD [ "npm", "run", "test:nolint" ]