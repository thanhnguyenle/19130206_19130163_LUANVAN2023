package fitnlu.ntpos.notificationservice.dto;

import fitnlu.ntpos.notificationservice.event.Notification;
import lombok.Builder;
import lombok.Getter;

import java.util.List;
@Getter
@Builder
public class ListNotificationEvent {
    private List<Notification> notifications;
    private int currentPage;
    private int totalPage;
    private int totalItem;
}
