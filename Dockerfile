FROM node:14.15.0

ARG NODE_ENV
ARG NEXT_PUBLIC_SERVER_URL
ARG NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN
ARG INTERNAL_LOAD_BALANCER_ENDPOINT

ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ENV NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=${NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}
ENV NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN=${NEXT_PUBLIC_MIXPANEL_PROJECT_TOKEN}
ENV INTERNAL_LOAD_BALANCER_ENDPOINT=${INTERNAL_LOAD_BALANCER_ENDPOINT}

# Create app directory
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app

# add binaries to $PATH
ENV PATH /home/node/app/node_modules/.bin:$PATH

# Set user to avoid root
USER node

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./

# had to disable as it was not allowing to build without typescript
# when NODE_ENV was set to production
RUN yarn install --production=false

# Bundle app source
COPY . .

RUN node scripts/createEnv.js

# Build project to dist (javascript)
RUN yarn build

EXPOSE 3000

RUN node scripts/removeEnv.js

CMD [ "yarn", "start" ]