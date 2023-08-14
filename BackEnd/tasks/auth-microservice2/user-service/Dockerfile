FROM openjdk:17-alpine

EXPOSE 8082

RUN mkdir /app

COPY build/libs/user-service-0.0.1-SNAPSHOT.jar /app/user-service.jar

COPY src/main/resources/keystore.jks /app/keystore.jks

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-Djavax.net.ssl.trustStore=keystore.jks","-Djavax.net.ssl.trustStorePassword=password","-jar", "/app/user-service.jar"]
