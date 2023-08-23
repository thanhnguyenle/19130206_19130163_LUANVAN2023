FROM openjdk:17-alpine

EXPOSE 8088

RUN mkdir /app

COPY build/libs/chat-service-0.0.1-SNAPSHOT.jar /app/chat-service.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/chat-service.jar"]
