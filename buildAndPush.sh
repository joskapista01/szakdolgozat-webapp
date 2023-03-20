#!/bin/sh

docker build . -t docker.io/jozseftorocsik/szakdolgozat-webapp  --no-cache
docker push docker.io/jozseftorocsik/szakdolgozat-webapp

helm uninstall webapp -n apps
helm install webapp ./helm/webapp -n apps