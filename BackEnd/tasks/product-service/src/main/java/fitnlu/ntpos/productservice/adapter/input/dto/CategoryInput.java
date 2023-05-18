package fitnlu.ntpos.productservice.adapter.input.dto;

import java.util.List;

public record CategoryInput(
        String name,
        String description,
        List<String> products) {
}
