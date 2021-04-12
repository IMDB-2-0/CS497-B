# API Gateway 

**Author and owner: Hans Quiogue**

Our team created an API Gateway with [NGINX](https://www.nginx.com). With NGINX, we hope to create a reverse proxy to easily accept all API calls and return the proper responses between our services. We used a Docker image of NGINX—specifically Linux Alpine based—to install and use it. We also created a .conf file that lists the NGINX configurations needed to run and manage all of our services. Outside of the reverse proxy, we allow multiple HTTP request methods: GET, POST, PUT, and DELETE.

With this setup, we are able to easily send requests or retrieve responses from all our services using the same port due to the reverse proxy feature. In the future, we aim to potentially use NGINX for load balancing, security and other features, but for now, we are using it is as a simple API gateway. We might also create two API gateways between our web and mobile dashboards when they are eventually created—to form a backends for frontends setup.

# Installation and Build

- Prerequisites:
    - Install Docker
    
1) Build and run our entire app with Docker Compose.
    - In the `services` directory, run `docker-compose build`.
2) Run all the Docker containers with `docker-compose up`.
3) Once everything is up, you may access various parts of the application with the following links:
    - Dashboard: http://localhost:5050
    - Recommender: http://localhost:5050/api/v1/recommender
        - Docs: http://localhost:5050/api/v1/recommender/docs
    - Database API: http://localhost:5050/api/v1/database

The API for the listed services is documented in README markdown files and can be accessible in each subfolder inside `services`.