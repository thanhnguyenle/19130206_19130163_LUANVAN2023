package fitnlu.ntpos.notificationservice.controller;

import fitnlu.ntpos.notificationservice.domain.paging.IPaging;
import fitnlu.ntpos.notificationservice.domain.paging.PageRequest;
import fitnlu.ntpos.notificationservice.dto.ListOrderPlacedEvent;
import fitnlu.ntpos.notificationservice.dto.PagingInput;
import fitnlu.ntpos.notificationservice.dto.ResultOutput;
import fitnlu.ntpos.notificationservice.event.OrderPlacedEvent;
import fitnlu.ntpos.notificationservice.service.OrderPlacedEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class OrderPlacedEventController {
    private final OrderPlacedEventService orderPlacedEventService;
    @QueryMapping("orderPlacedEvents")
    public ListOrderPlacedEvent orderPlacedEvents() {
        List<OrderPlacedEvent> orderPlacedEvents = orderPlacedEventService.getAllListOrderPlacedEvents();
        int totalItem = orderPlacedEvents.size();
        return ListOrderPlacedEvent.builder()
                .orderPlacedEvents(orderPlacedEvents)
                .totalPage(1)
                .totalItem(totalItem)
                .currentPage(1)
                .build();
    }
    @QueryMapping("notificationOfUser")
    public ListOrderPlacedEvent notificationOfUser(@Argument String userID) {
        List<OrderPlacedEvent> orderPlacedEvents = orderPlacedEventService.getNotificationOfUserID(userID);
        int totalItem = orderPlacedEvents.size();
        return ListOrderPlacedEvent.builder()
                .orderPlacedEvents(orderPlacedEvents)
                .totalPage(1)
                .totalItem(totalItem)
                .currentPage(1)
                .build();
    }

    @QueryMapping("getOrderPlacedEventsByUserID")
    public ListOrderPlacedEvent getOrderPlacedEventsByUserID(@Argument  PagingInput pagingInput, @Argument String userID) {
        IPaging ipaging = pagingInput != null ? new PageRequest(pagingInput.page(), pagingInput.limit()) : null;
        List<OrderPlacedEvent> orderPlacedEvents = Collections.emptyList();
        if(userID == null || userID.equals(""))
            orderPlacedEvents = orderPlacedEventService.getAllListOrderPlacedEvents();
        else
            orderPlacedEvents = orderPlacedEventService.getAllListOrderPlacedEvents().stream().filter(orderPlacedEvent -> orderPlacedEvent.getUserID().equals(userID)).toList();
        int totalItem = orderPlacedEvents.size();
        if (ipaging != null && ipaging.getPage() != null) {
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListOrderPlacedEvent.builder()
                    .orderPlacedEvents(orderPlacedEvents.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).toList())
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        }else
            return ListOrderPlacedEvent.builder()
                    .orderPlacedEvents(orderPlacedEvents)
                    .totalPage(1)
                    .totalItem(totalItem)
                    .currentPage(1)
                    .build();

    }

//    @QueryMapping("orderPlacedEvents")
//    public ResultOutput orderPlacedEvent() {
//        orderPlacedEventService.createTopicPatition();
//        return ResultOutput.builder()
//                .success(true)
//                .build();
//    }

}
