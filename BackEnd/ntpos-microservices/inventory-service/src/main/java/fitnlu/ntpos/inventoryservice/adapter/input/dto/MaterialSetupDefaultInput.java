package fitnlu.ntpos.inventoryservice.adapter.input.dto;

public record MaterialSetupDefaultInput(
       String materialID,
       String unit,
       int quantity,
       String status,
       String description
) {
}
