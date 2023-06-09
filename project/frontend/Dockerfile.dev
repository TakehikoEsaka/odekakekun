FROM node:14-alpine

WORKDIR /app

# ローカルに定義しているパスをコンテナ内のPATHとして追加する
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

# set yarn log level to verbose
ENV YARN_LOG_LEVEL=verbose

CMD ["yarn", "start"]