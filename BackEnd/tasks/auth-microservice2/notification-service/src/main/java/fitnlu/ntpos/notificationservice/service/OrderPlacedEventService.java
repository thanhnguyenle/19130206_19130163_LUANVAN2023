package fitnlu.ntpos.notificationservice.service;

import fitnlu.ntpos.notificationservice.constants.KafkaConstants;
import fitnlu.ntpos.notificationservice.dto.ResultOutput;
import fitnlu.ntpos.notificationservice.event.OrderPlacedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.TopicPartition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@EnableKafka
public class OrderPlacedEventService {
    private final KafkaConsumer<String, OrderPlacedEvent> consumer = new KafkaConsumer<>(KafkaConstants.consumerConfigurations());
    public void createTopicPatition(){
        // Subscribe to topic
        TopicPartition partition = new TopicPartition(KafkaConstants.KAFKA_TOPIC, 0);
        List<TopicPartition> partitions = new ArrayList<>();
        partitions.add(partition);
        consumer.assign(partitions);
        // Seek to end
        int messagesToRetrieve = 3;
        consumer.seekToEnd(partitions);
        long startIndex = consumer.position(partition) - messagesToRetrieve;
        consumer.seek(partition, startIndex < 0 ? 0 : startIndex);
        // Poll for messages
        ConsumerRecords<String, OrderPlacedEvent> records =
                consumer.poll(Duration.ofMillis(100));
        System.out.println("--------------------------------------------------------");
        for (ConsumerRecord<String, OrderPlacedEvent> record : records){
            log.info("Key: " + record.key() + ", Value: " + record.value());
            log.info("Partition: " + record.partition() + ", Offset:" + record.offset());
        }
        System.out.println("--------------------------------------------------------");
    }
@KafkaListener(topics = "orderTopic")
public ResultOutput handleOrderTopics(OrderPlacedEvent orderPlacedEvent){
    //send out an email notification
    log.info("Received Notification for Order - {}",orderPlacedEvent.getOrderNumber());
    return ResultOutput.builder().message("Received Notification for Order - "+orderPlacedEvent.getOrderNumber()).build();
}
}
