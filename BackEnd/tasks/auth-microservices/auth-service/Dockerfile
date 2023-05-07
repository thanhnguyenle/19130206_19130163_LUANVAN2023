FROM openjdk:17-jdk-slim

EXPOSE 8081

RUN mkdir /app

COPY build/libs/*.jar /app/spring-boot-application.jar

CMD ["java","-XshowSettings:vm","-XX:+UnlockExperimentalVMOptions","-jar", "/app/spring-boot-application.jar"]
