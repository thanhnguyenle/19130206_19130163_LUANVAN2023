FROM openjdk:17-alpine

EXPOSE 8080

RUN mkdir /app

COPY build/libs/*.jar /app/api-gateway.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/api-gateway.jar"]
