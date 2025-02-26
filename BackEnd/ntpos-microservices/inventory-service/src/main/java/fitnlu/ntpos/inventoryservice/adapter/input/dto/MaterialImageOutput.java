package fitnlu.ntpos.inventoryservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MaterialImageOutput {
    private String id;
    private String url;
    private String description;
    private String materialID;
}
