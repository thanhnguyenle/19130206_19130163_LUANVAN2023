FROM openjdk:17-alpine

EXPOSE 8081

RUN mkdir /app

COPY build/libs/auth-service-0.0.1-SNAPSHOT.jar /app/auth-service.jar

ADD keycloak.crt /usr/local/share/ca-certificates/keycloak.crt

RUN chmod 644 /usr/local/share/ca-certificates/keycloak.crt && update-ca-certificates

COPY keystore.jks /app/keystore.jks

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-Djavax.net.ssl.trustStore=keystore.jks","-Djavax.net.ssl.trustStorePassword=password","-jar", "/app/auth-service.jar"]