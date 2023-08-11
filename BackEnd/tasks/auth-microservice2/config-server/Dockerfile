FROM openjdk:17-alpine

EXPOSE 8888

RUN mkdir /app

COPY build/libs/*.jar /app/config-server.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/config-server.jar"]
