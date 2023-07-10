package fitnlu.ntpos.notificationservice.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.serialization.Deserializer;

import java.nio.ByteBuffer;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderPlacedEventDeserialization implements Deserializer<OrderPlacedEvent> {
    private String orderNumber;

    @Override
    public OrderPlacedEvent deserialize(String topic, byte[] data) {
        String orderNumber;
        int orderNumberSize;
        try {
            if (data == null)
                return null;
            if (data.length < 16)
                throw new SerializationException("Size of data received " +
                        "by deserializer is shorter than expected");

            ByteBuffer buffer = ByteBuffer.wrap(data);
            orderNumberSize = buffer.getInt();

            byte[] nameBytes = new byte[orderNumberSize];
            buffer.get(nameBytes);
            orderNumber = new String(nameBytes, "UTF-8");

            return new OrderPlacedEvent(orderNumber);

        } catch (Exception e) {
            throw new SerializationException("Error when deserializing " + "byte[] to Customer " + e);
        }
    }
}
