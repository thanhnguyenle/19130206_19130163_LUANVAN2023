FROM openjdk:17-alpine

EXPOSE 8082

RUN mkdir /app

COPY build/libs/*.jar /app/user-service.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/user-service.jar"]
