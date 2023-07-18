package fitnlu.ntpos.notificationservice.service;

import fitnlu.ntpos.notificationservice.constants.KafkaConstants;
import fitnlu.ntpos.notificationservice.dto.PagingInput;
import fitnlu.ntpos.notificationservice.dto.ResultOutput;
import fitnlu.ntpos.notificationservice.event.OrderPlacedEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.TopicPartition;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@EnableKafka
public class OrderPlacedEventService {
    private final KafkaConsumer<String, OrderPlacedEvent> consumer = new KafkaConsumer<>(KafkaConstants.consumerConfigurations());
    public List<OrderPlacedEvent> getAllListOrderPlacedEvents(){
        List<OrderPlacedEvent> orderPlacedEvents = new ArrayList<>();
        // Subscribe to topic
        TopicPartition partition = new TopicPartition(KafkaConstants.ORDER_TOPIC, 0);
        List<TopicPartition> partitions = new ArrayList<>();
        partitions.add(partition);
        consumer.assign(partitions);
        // Seek to end
        consumer.seekToEnd(partitions);
        consumer.seek(partition, 0);
        // Poll for messages
        ConsumerRecords<String, OrderPlacedEvent> records =
                consumer.poll(Duration.ofMillis(100));
        for(ConsumerRecord<String, OrderPlacedEvent> record : records){
            orderPlacedEvents.add(record.value());
        }
        return orderPlacedEvents;
    }
    public List<OrderPlacedEvent> getListOrderPlacedEvents(PagingInput pagingInput){
        List<OrderPlacedEvent> orderPlacedEvents = new ArrayList<>();
        // Subscribe to topic
        TopicPartition partition = new TopicPartition(KafkaConstants.ORDER_TOPIC, 0);
        List<TopicPartition> partitions = new ArrayList<>();
        partitions.add(partition);
        consumer.assign(partitions);
        // Seek to end
        int messagesToRetrieve = (pagingInput.page() - 1) * pagingInput.limit();
        consumer.seekToEnd(partitions);
        long startIndex = consumer.position(partition) - messagesToRetrieve;
        consumer.seek(partition, startIndex < 0 ? 0 : startIndex);
        // Poll for messages
        ConsumerRecords<String, OrderPlacedEvent> records =
                consumer.poll(Duration.ofMillis(100));
        int count = pagingInput.limit();
        for(ConsumerRecord<String, OrderPlacedEvent> record : records){
            orderPlacedEvents.add(record.value());
            if(--count < 0) break;
        }
        return orderPlacedEvents;
    }
}
