# Team Organization

On Wednesdays we meet with Professor Richards and discuss our progress and trajectory. Besides these meetings we will work asynchronously, communicating through Slack. This is ideal because excessive meetings can take up time and are hard to arrange among five students with varying schedules. 

At first, we discussed people's preferences on various technologies and what they would like to work on for the project. We haven't planned ahead yet on who will work on what, but we will plan to ensure that everyone is comfortable with their part. To help with scalability, each person will have a specific role — specifically frontend(s), backends, databases and DevOps — with a service that is seperate from the rest. For example, there can be two different backends for movie recommender systems and user management; a person with knowledge in information retrieval and Python can work on the recommender backend while another person with knowledge on Express and SQL can work on the database and user management. In short, we are utilizing people based on their preferences and seperating services to help create a good service that can be scalable — particulary one that has loose coupling and high cohesion.

As stated before, each one of us will contribute to seperate services of the entire application. For every week we will assign each other tasks for a service we will be working on via Slack. We will also ask each other's progress and hold live Zoom meetings if needed. Each team member will push new changes or fixes on our GitHub repository on a weekly basis to ensure our project is progressing in a timely way. Timothy came up with the project idea so he will be guiding us at first about the overall design and direction of the project; he can be considered a lead architect. However, we will all be involved in deciding the direction of the project as it progresses.

# Project Idea and Technologies

Our project idea is a movie recommendation system that will consist of a frontend, multiple backends and databases, and containerization tools.

Databases: We are undecided between using Postgres and/or MongoDB as we have not structurized or designed our databases yet. However, MongoDB will likely help maximize our project's scalability because it supports sharding and load-balancing. We want to have multiple databases to avoid storing everything under the same storage unit and help prevent future issues. 

Backend: One of the backends we are using is Flash because the movie recommender system will be Python-based. We may however use Express and Typescript as well for the backend for other features. Here, we are utilizing the ability to use different technologies for different purposes. Another benefit will be that if one server fails, the others will most likely not. 

Frontend: We may make a minimal webpage UI that presents movie recommendations and takes user ratings of movies as input. If so, we will likely use React, TypeScript, HTML, and a CSS framework. Typescript supports scalability.

DevOps: We will likely use Docker in this project. Additionally, we may use Nginx and Kubernetes. These containerization tools make serving our website less resource-intensive and help us keep our site from crashing. Some of us have experience with Docker, Kubernetes, and Nginx, while others have yet to understand their function in web development.

# Team Intentions

We want to create a service to recommend movies and TV shows based on a user's preference. Our project combines all of our interests in scalable web systems, data science, and information retrieval to help imitate modern systems. Our team hopes to create a dashboard of user recommendations, movie recommendation engine, and implement user authentication and management. 