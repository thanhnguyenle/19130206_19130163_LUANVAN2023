package fitnlu.ntpos.inventoryservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MaterialImageInput {
    private int id;
    private String url;
    private String description;
}
