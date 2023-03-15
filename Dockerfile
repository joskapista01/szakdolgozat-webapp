FROM node:18.13.0

RUN mkdir /webapp 

WORKDIR /webapp

COPY webapp/ .

RUN npm install &&\
    npm run-script build:k8s

EXPOSE 80

ENTRYPOINT ["npm", "run-script", "start:k8s"]