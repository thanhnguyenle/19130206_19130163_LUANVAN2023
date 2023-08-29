package fitnlu.ntpos.productservice.adapter.input.dto;

import java.util.List;

public record ProductInput(
        String name,
        String description,
        List<String> categories,
        double price,
        int quantity,
        String unit,
        String status,
        List<String> images

) {
}
