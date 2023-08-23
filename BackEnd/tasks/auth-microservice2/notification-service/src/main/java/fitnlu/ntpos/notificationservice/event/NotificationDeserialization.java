package fitnlu.ntpos.notificationservice.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.serialization.Deserializer;

import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NotificationDeserialization implements Deserializer<OrderPlacedEvent> {
    private String userID;
    private String description;
    private String status;
    private long timestamp;

    @Override
    public OrderPlacedEvent deserialize(String topic, byte[] data) {
        String userID, orderID, status;
        try {
            if (data == null)
                return null;
            if (data.length < 16)
                throw new SerializationException("Size of data received " +
                        "by deserializer is shorter than expected");

            ByteBuffer buffer = ByteBuffer.wrap(data);

            userID = getDataFromBytes(buffer);

            orderID = getDataFromBytes(buffer);

            status = getDataFromBytes(buffer);

            return new OrderPlacedEvent(userID, orderID, status);

        } catch (Exception e) {
            throw new SerializationException("Error when deserializing " + "byte[] to OrderPlacedEvent " + e);
        }
    }

    public String getDataFromBytes(ByteBuffer buffer) throws UnsupportedEncodingException {
        int bytes = buffer.getInt();
        byte[] nameBytes = new byte[bytes];
        buffer.get(nameBytes);
        return new String(nameBytes, "UTF-8");
    }
}
