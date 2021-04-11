# API Gateway 

Our team created an API Gateway with [NGINX](https://www.nginx.com). With NGINX, we hope to create a reverse proxy to easily accept all API calls and return the proper responses between our services. We used a Docker image of NGINX to install and use it. We also created a .conf file that lists the NGINX configurations needed to run and manage all of our services.

In the future, we aim to potentially use NGINX for load balancing and other features, but for now, we are using it is as a simple API gateway. We might also create two API gateways between our web and mobile dashboards when they are eventually created—to form a backends for frontends setup.

# Installation and Build

- Prerequisites:
    - Docker
    
1) Build and run our entire app with Docker Compose.
    - In the `services` directory, run `docker-compose build`.
2) Run all the Docker containers with `docker-compose up`.
3) Once everything is up, you may access various parts of the application with the following links:
    - Dashboard: http://localhost:5050
    - Recommender: http://localhost:5050/api/v1/recommender
    - Database API: http://localhost:5050/api/v1/database