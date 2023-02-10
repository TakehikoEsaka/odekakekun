#!/bin/bash

echo "waiting for postgres server"

while ! nc -z db 5432; do
  sleep 0.5
done

echo "Connection Successfully"

exec "$@"