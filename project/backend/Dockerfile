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

#add entrypoint.sh
RUN ls
COPY ./entrypoint.sh .
RUN chmod +x /usr/src/entrypoint.sh

#entrypoint.sh
ENTRYPOINT ["/usr/src/entrypoint.sh"]
