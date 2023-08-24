package fitnlu.ntpos.notificationservice.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.apache.kafka.common.errors.SerializationException;

import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Notification {
    private String userID;
    private String description;
    private String status;
    private String timestamp;

}
