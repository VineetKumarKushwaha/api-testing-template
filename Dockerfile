FROM node:10

# app workdir
WORKDIR /api-testing

# copy app dependencies
COPY package*.json ./
COPY env.json ./

# install dependecies
RUN npm i

# build app source code
COPY src src

RUN ls

# Run the specified command within the container.
CMD [ "npm", "run", "test" ]