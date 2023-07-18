FROM openjdk:17-alpine

EXPOSE 8084

RUN mkdir /app

COPY build/libs/*.jar /app/order-service.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/order-service.jar"]
