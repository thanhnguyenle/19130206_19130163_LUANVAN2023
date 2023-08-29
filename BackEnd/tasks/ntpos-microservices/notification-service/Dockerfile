FROM openjdk:17-alpine

EXPOSE 8087

RUN mkdir /app

COPY build/libs/notification-service-0.0.1-SNAPSHOT.jar /app/notification-service.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/notification-service.jar"]
