FROM mhart/alpine-node:6.1
ADD . /opt/app
WORKDIR /opt/app
EXPOSE 3000
CMD ["node", "app.js"]