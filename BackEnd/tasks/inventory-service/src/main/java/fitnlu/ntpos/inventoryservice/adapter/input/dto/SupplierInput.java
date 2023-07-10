package fitnlu.ntpos.inventoryservice.adapter.input.dto;

public record SupplierInput(
         String name,
         double price,
         String unit,
         int quantity,
         String status,
         String description,
         long expiredDate,
         long manufacturerDate
) {
}
