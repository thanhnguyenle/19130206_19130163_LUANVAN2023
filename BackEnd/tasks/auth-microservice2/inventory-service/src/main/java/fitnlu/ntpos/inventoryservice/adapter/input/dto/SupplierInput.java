package fitnlu.ntpos.inventoryservice.adapter.input.dto;

public record SupplierInput(
         String name,
         String address,
         String phone,
         String email,
         String website,
         String status,
         String description
) {
}
