FROM openjdk:17-alpine

EXPOSE 8081

RUN mkdir /app

COPY build/libs/*.jar /app/auth-service.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/auth-service.jar"]
