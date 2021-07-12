FROM dockerhub.bmi:5000/node:10.15.3-alpine-cst
ENV TZ=Asia/Shanghai
WORKDIR /usr/src/app
COPY . .
RUN npm --registry http://dockerhub.bmi:4873 install \
    && npm run compile \
    && rm -rf ./src \
    && ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
ENTRYPOINT [ "npm","run" ]
CMD [ "start" ]