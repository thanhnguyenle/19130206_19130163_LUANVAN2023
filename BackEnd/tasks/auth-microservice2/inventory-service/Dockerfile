FROM openjdk:17-alpine

EXPOSE 8085

RUN mkdir /app

COPY build/libs/*.jar /app/inventory-service.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/inventory-service.jar"]
