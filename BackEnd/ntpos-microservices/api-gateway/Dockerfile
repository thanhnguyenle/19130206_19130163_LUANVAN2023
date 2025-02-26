FROM openjdk:17-alpine

EXPOSE 8080

RUN mkdir /app

COPY build/libs/api-gateway-0.0.1-SNAPSHOT.jar /app/api-gateway.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/api-gateway.jar"]
