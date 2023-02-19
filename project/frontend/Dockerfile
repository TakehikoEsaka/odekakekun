FROM node:14-alpine

WORKDIR /app

# ローカルに定義しているパスをコンテナ内のPATHとして追加する
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile

CMD ["yarn", "start"]