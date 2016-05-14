FROM mhart/alpine-node:6.1
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
ADD . /opt/app
WORKDIR /opt/app
EXPOSE 3000
CMD ["node", "app.js"]