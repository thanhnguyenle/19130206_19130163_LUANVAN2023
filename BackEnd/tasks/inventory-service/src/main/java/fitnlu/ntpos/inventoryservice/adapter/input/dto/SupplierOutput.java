package fitnlu.ntpos.inventoryservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SupplierOutput{
        private String id;
        private String name;
        private String address;
        private String phone;
        private String email;
        private String website;
        private String status;
        private String description;
}
