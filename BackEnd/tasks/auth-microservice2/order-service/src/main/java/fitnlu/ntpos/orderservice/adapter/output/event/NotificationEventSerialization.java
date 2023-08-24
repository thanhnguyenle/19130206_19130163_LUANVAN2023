package fitnlu.ntpos.orderservice.adapter.output.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.serialization.Serializer;

@Data
@AllArgsConstructor
public class NotificationEventSerialization implements Serializer<Notification> {
    @Override
    public byte[] serialize(String topic, Notification data) {
        try {
            if (data == null)
                return null;
            else {
                return data.getBytesData();
            }
        } catch (Exception e) {
            throw new SerializationException(
                    "Error when serializing OrderPlacedEvent to byte[] " + e);
        }
    }
}
