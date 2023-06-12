package fitnlu.ntpos.orderservice.adapter.input.dto;

import java.util.List;

public record OrderTableInput(
        String name,
        int numberOfPeople,
        String status,
        String note,
         List<GroupInput> groups
) {
}
