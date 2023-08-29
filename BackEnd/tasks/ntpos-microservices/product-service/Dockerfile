FROM openjdk:17-alpine

EXPOSE 8083

RUN mkdir /app

COPY build/libs/product-service-0.0.1-SNAPSHOT.jar /app/product-service.jar

COPY src/main/resources/keystore.jks /app/keystore.jks

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-Djavax.net.ssl.trustStore=keystore.jks","-Djavax.net.ssl.trustStorePassword=password","-jar", "/app/product-service.jar"]
