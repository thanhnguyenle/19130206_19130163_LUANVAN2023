package fitnlu.ntpos.chatservice.constants;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;

@RefreshScope
public class KafkaConstants {
    public static final String KAFKA_TOPIC = "kafka-chat-3";
    public static final String GROUP_ID = "kafka-sandbox";
//    @Value("${spring.kafka.bootstrap-servers}")
    public static String KAFKA_BROKER="localhost:9092";
}
