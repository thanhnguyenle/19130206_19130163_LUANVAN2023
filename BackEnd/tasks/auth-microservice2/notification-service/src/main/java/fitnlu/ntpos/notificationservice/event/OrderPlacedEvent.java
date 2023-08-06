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
public class OrderPlacedEvent  {
    private String userID;
    private String orderID;
    private String status;
}
