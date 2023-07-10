package fitnlu.ntpos.orderservice.adapter.input.dto;

import java.util.List;

public record TableInput(
        String name,
        int numberOfPeople,
        String status,
        String note,
         List<String> groups
) {
}
