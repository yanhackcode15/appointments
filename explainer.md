# Running full stack app with mongodb using Docker

1. Each frontend, backend, db should be set up as a container using docker-compose.yml.

```
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - mongodb
    environment:
      - MONGO_URI=mongodb://admin:password@mongodb:27017/salondb?authSource=admin

  mongodb:
    image: mongo:latest
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
      MONGO_INITDB_DATABASE: salondb
    ports:
      - "27017:27017"
    volumes:
      - mongodb-data:/data/db

volumes:
  mongodb-data:
```

2. Create a Dockerfile for each of the front end and backend service.

Exmaple: 
# Use an official Node runtime as a parent image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) into the container
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Bundle the app source inside the Docker image
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable
# ENV NODE_ENV production

# Run the application when the container launches
# CMD ["npm", "run", "start:prod"]
CMD ["npm", "run", "start"]


3. Start Services

```
docker-compose up --build
```

The --build option if you made code changes.


4. Verify Both Containers Are Running

docker ps

This command lists all running containers. You should see both your application and MongoDB containers listed.

5. Check Application Logs for more detailed error information:

docker logs <container_name_or_id_of_your_app> | grep "connection" // or for other keywords lke "auth"

This can give insights into why the connection might be failing, such as network issues, incorrect MongoDB URI, etc.

6. Ensure Correct MongoDB URI
7. if Db was set up with auth, the docker-compose should be: 

mongodb:
    image: mongo:latest
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
      MONGO_INITDB_DATABASE: salondb
    ports:
      - "27017:27017"
    volumes:
      - mongodb-data:/data/db
    networks:
      - app-network

if DB set up with no auth: 
mongodb:
    image: mongo:latest
    environment:
      MONGO_INITDB_DATABASE: salondb
    ports:
      - "27017:27017"
    volumes:
      - mongodb-data:/data/db
    networks:
      - app-network

# **Very impotant for auth** Add the user to db
When db user auth required, must add it to mongo. For Docker, you could create a container to pull mongoshell and connect to it. 

> docker run -it --rm --network salon-booking_app-network mongo:4.4 mongo -u admin -p password --authenticationDatabase admin mongodb://salon-booking-mongodb-1/salondb

once the shell is running, create the intended user.

> use salondb
switched to db salondb
> db.createUser({
...     user: "bird",
...     pwd: "your_secure_password",  // Choose a strong password
...     roles: [{ role: "readWrite", db: "salondb" }]
... })

#try changing user name if logging issues:
shell commands:
> use admin 
switched to db admin
> db.changeUserPassword("admin", "newPassword")



**Must append ?authSource=admin**
The mongodb at initial set up with use the env variable to create autnenticated user under teh admin db. So the URI must append it so it knows to use admin as the source for auth. 

When authen fails, try delete the vol. which will delete db user info. so previously created user should be deleted. Although i didn't see it happening

docker volume rm [volume_name]

# The environment variables MONGO_INITDB_ROOT_USERNAME, MONGO_INITDB_ROOT_PASSWORD, and MONGO_INITDB_DATABASE in a Docker Compose file for MongoDB are used to initialize the root user's credentials when the MongoDB container is started for the first time and the data directory (/data/db) is empty. These variables set up the initial administrative user and the default database.

# What Happens When You Change These Variables?
Once the MongoDB container has been initialized and the data directory has been populated, changing these environment variables in the Docker Compose file will not affect the existing credentials or databases. The initialization process that uses these variables only runs if the /data/db directory is empty, which typically means the container is being started for the first time without any existing data.

# How to Change Root Credentials After Initial Setup?
To change the root user's credentials after the MongoDB container has been initialized, you have a few options:

# Use MongoDB Shell Commands:
Connect to the MongoDB instance using the existing root credentials.
Use MongoDB shell commands to change the password. Here's an example of how to do it using os mongo shell:

> mongo -u admin -p oldPassword --authenticationDatabase admin

or you can do it via docker new container pulling old mongo which comes with shell: 
> docker run -it --rm --network salon-booking_app-network mongo:4.4 mongo -u admin -p password --authenticationDatabase admin mongodb://salon-booking-mongodb-1/salondb

must use the network name that's configured, mongo 4.4 comes with the shell, admin and password is the root credential, mongodb name can be obtained from: 
> docker ps

In the MongoDB shell:

> use admin
> db.changeUserPassword("admin", "newPassword")

# Reset the Environment:
completely reset the environment (including all databases and users)will delete all data, delete the MongoDB data volume and restart the container. The container will reinitialize using the new environment variables from the Docker Compose file.

> docker-compose down
> docker volume rm [volume_name]
> docker-compose up