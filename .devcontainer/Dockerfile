FROM mcr.microsoft.com/devcontainers/javascript-node:1-20-bullseye

WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y curl git unzip

RUN curl https://bun.sh/install | bash

ENV PATH="/root/.bun/bin:${PATH}"

# Copy your application files (assuming your application is in the current directory)
COPY . .

# Open port 3000 for serving HTTP traffic
EXPOSE 3000

# Command to run your app using Bun
CMD ["bun", "run", "index.js"]