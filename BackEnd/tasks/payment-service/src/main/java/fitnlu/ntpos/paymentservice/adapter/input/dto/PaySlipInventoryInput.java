package fitnlu.ntpos.paymentservice.adapter.input.dto;

import java.util.List;

public record PaySlipInput(
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
