FROM openjdk:17-alpine

EXPOSE 8085

RUN mkdir /app

COPY build/libs/inventory-service-0.0.1-SNAPSHOT.jar /app/inventory-service.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/inventory-service.jar"]
