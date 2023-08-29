FROM openjdk:17-alpine

EXPOSE 8086

RUN mkdir /app

COPY build/libs/payment-service-0.0.1-SNAPSHOT.jar /app/payment-service.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/payment-service.jar"]
