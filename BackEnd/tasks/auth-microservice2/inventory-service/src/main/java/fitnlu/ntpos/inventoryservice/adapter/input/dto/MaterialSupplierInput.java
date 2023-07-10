package fitnlu.ntpos.inventoryservice.adapter.input.dto;

public record MaterialSupplierInput(
         String materialID,
         String supplierID,
         String supplyDate,
         String status,
         String description
) {
}
