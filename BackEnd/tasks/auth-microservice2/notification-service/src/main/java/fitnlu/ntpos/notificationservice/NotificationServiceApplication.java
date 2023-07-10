package fitnlu.ntpos.notificationservice;

import fitnlu.ntpos.notificationservice.event.OrderPlacedEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;

@SpringBootApplication
@Slf4j
@EnableKafka
public class NotificationServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(NotificationServiceApplication.class, args);
    }

    @KafkaListener(topics = "orderTopic")
    public void handleOrderTopics(OrderPlacedEvent orderPlacedEvent){
        //send out an email notification
        log.info("Received Notification for Order - {}",orderPlacedEvent.getOrderNumber());
    }
}
