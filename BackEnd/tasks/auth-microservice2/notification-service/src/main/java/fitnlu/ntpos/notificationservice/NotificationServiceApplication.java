package fitnlu.ntpos.notificationservice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.kafka.annotation.EnableKafka;

@SpringBootApplication
@Slf4j
@EnableKafka
@EnableDiscoveryClient
public class NotificationServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(NotificationServiceApplication.class, args);
    }

//    @KafkaListener(topics = "orderTopic")
//    public void handleOrderTopics(Notification orderPlacedEvent){
//        //send out an email notification
//        log.info("Received Notification for Order - {}",orderPlacedEvent.toString());
//    }
}
