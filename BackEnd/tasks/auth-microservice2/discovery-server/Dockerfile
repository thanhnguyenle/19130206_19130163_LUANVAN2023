FROM openjdk:17-alpine

EXPOSE 8761

RUN mkdir /app

COPY build/libs/discovery-server-0.0.1-SNAPSHOT.jar /app/eureka-server.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/eureka-server.jar"]
