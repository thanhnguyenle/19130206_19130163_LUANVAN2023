FROM openjdk:17-alpine

EXPOSE 8083

RUN mkdir /app

COPY build/libs/product-service-0.0.1-SNAPSHOT.jar /app/product-service.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/product-service.jar"]
