#cloud-config
# Install docker to run as a service
# Docker port:8080 
# For image resizing via a GET request, as a microservice
# https://docs.imgproxy.net/installation
runcmd:
  - yum install docker -y
  - service docker start
  - systemctl enable docker.service
  - docker pull darthsim/imgproxy:latest
  - docker run -d -p 80:8080 --restart always darthsim/imgproxy:latest 

