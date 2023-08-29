package fitnlu.ntpos.orderservice.adapter.output.event.configuration;

import fitnlu.ntpos.orderservice.adapter.output.event.Notification;
import fitnlu.ntpos.orderservice.adapter.output.event.NotificationEventSerialization;
import fitnlu.ntpos.orderservice.adapter.output.event.constants.GetPropertiesBean;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;
import org.springframework.kafka.support.serializer.JsonSerializer;

import java.util.HashMap;
import java.util.Map;

@EnableKafka
@Configuration
@RequiredArgsConstructor
public class ProducerConfiguration {
    private final GetPropertiesBean getPropertiesBean;
    @Bean
    public ProducerFactory<String, Notification> producerFactory() {
        return new DefaultKafkaProducerFactory<>(producerConfigurations());
    }

    @Bean
    public Map<String, Object> producerConfigurations() {
        Map<String, Object> configurations = new HashMap<>();
        configurations.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, getPropertiesBean.getBootstrapServer());
        configurations.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        configurations.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, NotificationEventSerialization.class);
        configurations.put(JsonSerializer.ADD_TYPE_INFO_HEADERS, "false");
        return configurations;
    }

    @Bean
    public KafkaTemplate<String, Notification> kafkaTemplate() {
        return new KafkaTemplate<>(producerFactory());
    }
}
