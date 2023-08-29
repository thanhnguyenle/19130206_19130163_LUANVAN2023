FROM openjdk:17-alpine

EXPOSE 8084

RUN mkdir /app

COPY build/libs/order-service-0.0.1-SNAPSHOT.jar /app/order-service.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/order-service.jar"]
