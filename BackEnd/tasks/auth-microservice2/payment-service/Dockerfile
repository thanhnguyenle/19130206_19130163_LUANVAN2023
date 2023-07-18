FROM openjdk:17-alpine

EXPOSE 8086

RUN mkdir /app

COPY build/libs/*.jar /app/payment-service.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/payment-service.jar"]
