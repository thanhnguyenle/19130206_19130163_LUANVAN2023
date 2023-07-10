package fitnlu.ntpos.inventoryservice.adapter.input.dto;

import java.util.List;

public record MaterialInput(
         String name,
         double price,
         String unit,
         int quantity,
         String status,
         String description,
         long expiredDate,
         long manufacturerDate,
         List<String> images

) {
}
