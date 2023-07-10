package fitnlu.ntpos.orderservice.adapter.output.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.kafka.common.errors.SerializationException;
import org.apache.kafka.common.serialization.Serializer;

import java.nio.ByteBuffer;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderPlacedEventSerialization implements Serializer<OrderPlacedEvent> {
    private String orderNumber;

    @Override
    public byte[] serialize(String topic, OrderPlacedEvent data) {
        try {
            byte[] serializedName;
            int stringSize;
            if (data == null)
                return null;
            else {
                if (data.getOrderNumber() != null) {
                    serializedName = data.getOrderNumber().getBytes("UTF-8");
                    stringSize = serializedName.length;
                } else {
                    serializedName = new byte[0];
                    stringSize = 0;
                }
            }

            ByteBuffer buffer = ByteBuffer.allocate( 4 + stringSize);
            buffer.putInt(stringSize);
            buffer.put(serializedName);

            return buffer.array();
        } catch (Exception e) {
            throw new SerializationException(
                    "Error when serializing Customer to byte[] " + e);
        }
    }
}
