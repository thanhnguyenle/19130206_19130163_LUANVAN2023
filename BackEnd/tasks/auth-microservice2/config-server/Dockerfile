FROM openjdk:17-alpine

EXPOSE 8888

RUN mkdir /app

COPY build/libs/config-server-0.0.1-SNAPSHOT.jar /app/config-server.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/config-server.jar"]
