package fitnlu.ntpos.inventoryservice.adapter.input.dto;

public record MaterialProductInput(
         String productID,
         String materialID,
         String unit,
         int quantity,
         String status,
         String description
) {
}
