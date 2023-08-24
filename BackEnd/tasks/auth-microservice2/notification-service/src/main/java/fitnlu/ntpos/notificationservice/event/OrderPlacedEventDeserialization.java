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
    private String userID;
    private String orderID;
    private String status;

    @Override
    public OrderPlacedEvent deserialize(String topic, byte[] data) {
        String userID, orderID, status;
        int userIDSize, orderIDSize, statusSize;
        try {
            if (data == null)
                return null;
            if (data.length < 16)
                throw new SerializationException("Size of data received " +
                        "by deserializer is shorter than expected");

            ByteBuffer buffer = ByteBuffer.wrap(data);

            userIDSize = buffer.getInt();
            byte[] nameBytes = new byte[userIDSize];
            buffer.get(nameBytes);
            userID = new String(nameBytes, "UTF-8");

            orderIDSize = buffer.getInt();
            byte[] orderBytes = new byte[orderIDSize];
            buffer.get(orderBytes);
            orderID = new String(orderBytes, "UTF-8");

            statusSize = buffer.getInt();
            byte[] statusBytes = new byte[statusSize];
            buffer.get(statusBytes);
            status = new String(statusBytes, "UTF-8");

            return new OrderPlacedEvent(userID, orderID, status);

        } catch (Exception e) {
            throw new SerializationException("Error when deserializing " + "byte[] to OrderPlacedEvent " + e);
        }
    }
}
