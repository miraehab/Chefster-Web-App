# Creating image #

# parent image from docker hub
From node:20-alpine

WORKDIR /server

# copy the content of the current directory to server directory inside the docker image
COPY . .
 
# install dependencies
RUN npm install
RUN apk add --no-cache bash

# To specify the port on which our server will be listening
# needed to run the container inside the docker desktop to do port mapping
EXPOSE 3000

# As the image is not where we run our program it's just a blue-print for our container
# So we use CMD not RUN
# to specify the commands that should run after the *container* was built and run
CMD ["npm", "start"]

# run " docker build -t image-name ." on the command line to build the image
# the . in the end is the relative path of the docker file  

### Run the image to build Container ###
# run " Docker images " to display all images
# run " docker run --name container-name image-name"
# run " docker ps " shows a list of running containers