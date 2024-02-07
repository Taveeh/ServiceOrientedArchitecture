FROM node:20.9
RUN apt-get update && \
    apt-get install -y build-essential \
    wget \
    make \
    gcc \
    libc6-dev

WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package.json ./

ENV NODE_OPTIONS="--max_old_space_size=8192"

RUN yarn install
# we need the follow to re-build tfjs-node on the right system architecture
# RUN npm rebuild @tensorflow/tfjs-node --build-from-source

COPY . .

RUN yarn run build

EXPOSE 80

CMD ["yarn", "start:prod"]

