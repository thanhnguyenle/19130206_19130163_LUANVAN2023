FROM openjdk:17-alpine

EXPOSE 8090

RUN mkdir /app

COPY build/libs/*.jar /app/resource-service.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/resource-service.jar"]
