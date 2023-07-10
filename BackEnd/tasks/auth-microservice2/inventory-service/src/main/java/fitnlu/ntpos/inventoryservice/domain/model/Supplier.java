package fitnlu.ntpos.inventoryservice.domain.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class Supplier {
    private String id;
    private String name;
    private String address;
    private String phone;
    private String email;
    private String website;
    private String status;
    private String description;
}
