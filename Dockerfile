FROM mhart/alpine-node:6.1
ADD . /opt/app
WORKDIR /opt/app
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]