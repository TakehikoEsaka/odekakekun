#official base-image python
FROM python:3.9.6-slim-buster

#working directroy
WORKDIR /usr/src/

#environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

#install system depedencies
RUN apt-get update \
  && apt-get -y install netcat gcc postgresql \
  && apt-get clean

#install python depedencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

#add app
COPY . .

# TODO migrationをdocker実行時に動かすようにする
CMD uvicorn users.main:app --host 0.0.0.0 --port 80 --reload