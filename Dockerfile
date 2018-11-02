FROM ubuntu:18.04

## install node.js
RUN apt-get update
RUN apt-get install -y nodejs npm

## install pip3
RUN apt install -y python3 python3-pip

# install awscli
RUN pip3 install -U awscli

# add our code
COPY . /app
WORKDIR /app

# install ruby gem
RUN apt install -y ruby-dev gcc automake libtool rubygems build-essential
# RUN gem install sass --no-user-install
RUN gem install scss_lint --no-user-install

# install npm deps
RUN npm install

EXPOSE 3000
