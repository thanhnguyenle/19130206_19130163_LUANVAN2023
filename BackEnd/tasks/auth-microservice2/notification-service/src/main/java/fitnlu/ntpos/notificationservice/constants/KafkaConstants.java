package fitnlu.ntpos.notificationservice.constants;

import fitnlu.ntpos.notificationservice.event.OrderPlacedEventDeserialization;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.Objects;
import java.util.Properties;

public class KafkaConstants {
    //Topic
    public static final String ORDER_TOPIC = "orderTopic";
    public static final String ALL_TOPIC = "allTopic";

    //Consumer
    public static final String GROUP_ID = "notificationId";
    public static final String KAFKA_BROKER = "broker:29092";
    private static Properties properties = null;
    public static Properties getProperties(){
        return Objects.requireNonNullElseGet(properties, Properties::new);
    }
    public static Properties consumerConfigurations() {
        Properties propertiesTemp = getProperties();
        propertiesTemp.setProperty(org.apache.kafka.clients.consumer.ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, KafkaConstants.KAFKA_BROKER);
        propertiesTemp.setProperty(org.apache.kafka.clients.consumer.ConsumerConfig.GROUP_ID_CONFIG, KafkaConstants.GROUP_ID);
       // propertiesTemp.setProperty("spring.kafka.template.default-topic", KafkaConstants.KAFKA_TOPIC);
        propertiesTemp.setProperty(org.apache.kafka.clients.consumer.ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class.getName());
        propertiesTemp.setProperty(org.apache.kafka.clients.consumer.ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, OrderPlacedEventDeserialization.class.getName());
        propertiesTemp.setProperty(org.apache.kafka.clients.consumer.ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
        propertiesTemp.setProperty(JsonDeserializer.TRUSTED_PACKAGES, "*");

        return propertiesTemp;
    }
}
