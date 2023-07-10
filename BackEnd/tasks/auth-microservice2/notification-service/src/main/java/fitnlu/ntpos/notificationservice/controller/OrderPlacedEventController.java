package fitnlu.ntpos.notificationservice.controller;

import fitnlu.ntpos.notificationservice.dto.ResultOutput;
import fitnlu.ntpos.notificationservice.service.OrderPlacedEventService;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OrderPlacedEventController {
    private final OrderPlacedEventService orderPlacedEventService;
    @QueryMapping("orderPlacedEvent")
    public ResultOutput orderPlacedEvent() {
        orderPlacedEventService.createTopicPatition();
        return ResultOutput.builder()
                .message("Create topic success")
                .build();
    }
}
