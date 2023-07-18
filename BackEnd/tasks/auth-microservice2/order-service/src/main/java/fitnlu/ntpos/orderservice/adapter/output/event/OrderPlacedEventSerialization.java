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
    private String userID;
    private String orderID;
    private String status;

    @Override
    public byte[] serialize(String topic, OrderPlacedEvent data) {
        try {
            byte[] userIDSerialize, orderIDSerialize, statusSerialize;
            int userIDSize, orderIDSize, statusSize;
            if (data == null)
                return null;
            else {
                if (data.getUserID() != null) {
                    userIDSerialize = data.getUserID().getBytes("UTF-8");
                    userIDSize = userIDSerialize.length;
                } else {
                    userIDSerialize = new byte[0];
                    userIDSize = 0;
                }
                if (data.getOrderID() != null) {
                    orderIDSerialize = data.getOrderID().getBytes("UTF-8");
                    orderIDSize = orderIDSerialize.length;
                } else {
                    orderIDSerialize = new byte[0];
                    orderIDSize = 0;
                }
                if (data.getStatus() != null) {
                    statusSerialize = data.getStatus().getBytes("UTF-8");
                    statusSize = statusSerialize.length;
                } else {
                    statusSerialize = new byte[0];
                    statusSize = 0;
                }
            }

            ByteBuffer buffer = ByteBuffer.allocate( 4 + userIDSize + 4 + orderIDSize + 4 + statusSize);
            buffer.putInt(userIDSize);
            buffer.put(userIDSerialize);

            buffer.putInt(orderIDSize);
            buffer.put(orderIDSerialize);

            buffer.putInt(statusSize);
            buffer.put(statusSerialize);
            return buffer.array();
        } catch (Exception e) {
            throw new SerializationException(
                    "Error when serializing OrderPlacedEvent to byte[] " + e);
        }
    }
}
