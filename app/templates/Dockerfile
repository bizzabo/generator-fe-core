FROM node:8.9.1

ARG PROJECT_DIR=.

ENV SERVICE_NAME=<%= serviceName %>
ARG TARGET_DIR=/usr/lib/bizzabo/${SERVICE_NAME}

RUN mkdir -p ${TARGET_DIR}

COPY ${PROJECT_DIR} ${TARGET_DIR}/

WORKDIR ${TARGET_DIR}

RUN ls -la ${TARGET_DIR}/

ENV NODE_ENV=production

ENTRYPOINT ["npm", "start"]

