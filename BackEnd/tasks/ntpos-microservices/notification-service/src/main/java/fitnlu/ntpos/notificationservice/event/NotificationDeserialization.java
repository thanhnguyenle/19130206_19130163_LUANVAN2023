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
@ToString
public class NotificationDeserialization implements Deserializer<Notification> {

    @Override
    public Notification deserialize(String topic, byte[] data) {
        try {
            if (data == null)
                return null;
            return fromBytesToClass(data);

        } catch (Exception e) {
            throw new SerializationException("Error when deserializing " + "byte[] to OrderPlacedEvent " + e);
        }
    }
    private Notification fromBytesToClass(byte[] data) throws UnsupportedEncodingException {
        String userID, description, status, timestamp;
        if (data.length < 16)
            throw new SerializationException("Size of data received " +
                    "by deserializer is shorter than expected");

        ByteBuffer buffer = ByteBuffer.wrap(data);

        userID = getDataFromBytes(buffer);

        description = getDataFromBytes(buffer);

        status = getDataFromBytes(buffer);

        timestamp = getDataFromBytes(buffer);

        return new Notification(userID, description, status, timestamp);
    }
    private String getDataFromBytes(ByteBuffer buffer) throws UnsupportedEncodingException {
        int bytes = buffer.getInt();
        byte[] nameBytes = new byte[bytes];
        buffer.get(nameBytes);
        return new String(nameBytes, "UTF-8");
    }

}
