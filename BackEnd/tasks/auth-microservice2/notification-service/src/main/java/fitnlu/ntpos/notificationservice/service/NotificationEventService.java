package fitnlu.ntpos.notificationservice.service;

import fitnlu.ntpos.notificationservice.constants.GetPropertiesBean;
import fitnlu.ntpos.notificationservice.constants.KafkaConstants;
import fitnlu.ntpos.notificationservice.dto.PagingInput;
import fitnlu.ntpos.notificationservice.event.Notification;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.stereotype.Service;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.clients.consumer.ConsumerRecords;
import org.apache.kafka.clients.consumer.KafkaConsumer;
import org.apache.kafka.common.TopicPartition;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@EnableKafka
public class NotificationEventService {
    private final GetPropertiesBean getPropertiesBean;
    private final KafkaConsumer<String, Notification> consumer;
    public NotificationEventService(GetPropertiesBean getPropertiesBean){
        this.getPropertiesBean = getPropertiesBean;
        consumer = new KafkaConsumer<>(KafkaConstants.consumerConfigurations(getPropertiesBean.getBootstrapServer()));
    }

        public List<Notification> getNotificationInTopic(String topic){
        List<Notification> orderPlacedEvents = new ArrayList<>();
        // Subscribe to topic
        TopicPartition partition = new TopicPartition(topic, 0);
        List<TopicPartition> partitions = new ArrayList<>();
        partitions.add(partition);
        consumer.assign(partitions);
        // Seek to end
        consumer.seekToEnd(partitions);
        consumer.seek(partition, 0);
        // Poll for messages
        ConsumerRecords<String, Notification> records =
                consumer.poll(Duration.ofMillis(100));
        for(ConsumerRecord<String, Notification> record : records){
            orderPlacedEvents.add(record.value());
        }
        return orderPlacedEvents;
    }
    public List<Notification> getNotificationsByTopicPaging(String topic, PagingInput pagingInput){
        List<Notification> orderPlacedEvents = new ArrayList<>();
        // Subscribe to topic
        TopicPartition partition = new TopicPartition(topic, 0);
        List<TopicPartition> partitions = new ArrayList<>();
        partitions.add(partition);
        consumer.assign(partitions);
        // Seek to end
        int messagesToRetrieve = (pagingInput.page() - 1) * pagingInput.limit();
        consumer.seekToEnd(partitions);
        long startIndex = consumer.position(partition) - messagesToRetrieve;
        consumer.seek(partition, startIndex < 0 ? 0 : startIndex);
        // Poll for messages
        ConsumerRecords<String, Notification> records =
                consumer.poll(Duration.ofMillis(100));
        int count = pagingInput.limit();
        for(ConsumerRecord<String, Notification> record : records){
            orderPlacedEvents.add(record.value());
            if(--count < 0) break;
        }
        return orderPlacedEvents;
    }
}
