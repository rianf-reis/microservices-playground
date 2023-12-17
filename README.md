# Microservices Playground

This repository contains a collection of microservices built with [NestJS](https://nestjs.com/). Each microservice is a separate NestJS application and they communicate with each other using [gRPC](https://grpc.io/).

## Microservices

The following microservices are included in this repository:

- [Notification Service](notification-service/README.md)
- [Order Service](order-service/README.md)
- [Product Service](product-service/README.md)
- [User Service](user-service/README.md)

Each microservice has its own README file with more detailed information.

## Future Improvements

In the future, this repository will also include:

- CI/CD scripts for automating the build, test, and deployment processes.
- An API Gateway for handling external requests and routing them to the appropriate microservices.

## Getting Started

To get started with this project, clone the repository and install the dependencies in each microservice:

```sh
git clone https://github.com/yourusername/microservices-playground.git
cd microservices-playground
cd notification-service && yarn && cd ..
cd order-service && yarn && cd ..
cd product-service && yarn && cd ..
cd user-service && yarn && cd ..