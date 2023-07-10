package fitnlu.ntpos.inventoryservice.adapter.input.dto;

public record MaterialProductInput(
         String materialID,
         double price,
         String unit,
         int quantity,
         String status,
         String description,
         long returnDate
) {
}
