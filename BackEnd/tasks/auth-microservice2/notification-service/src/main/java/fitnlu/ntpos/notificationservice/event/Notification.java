package fitnlu.ntpos.notificationservice.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Notification {
    private String userID;
    private String description;
    private String status;
    private long timestamp;

}
