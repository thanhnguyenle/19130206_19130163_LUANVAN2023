package fitnlu.ntpos.notificationservice.controller;

import fitnlu.ntpos.notificationservice.dto.ListNotificationEvent;
import fitnlu.ntpos.notificationservice.event.Notification;
import fitnlu.ntpos.notificationservice.service.NotificationEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class NotificationEventController {
    private final NotificationEventService notificationEventService;

    @QueryMapping("notificationOfUser")
    public ListNotificationEvent notificationOfUser(@Argument String userID) {
        List<Notification> orderPlacedEvents = notificationEventService.getNotificationInTopic(userID);
        int totalItem = orderPlacedEvents.size();
        return ListNotificationEvent.builder()
                .notifications(orderPlacedEvents)
                .totalPage(1)
                .totalItem(totalItem)
                .currentPage(1)
                .build();
    }
}
