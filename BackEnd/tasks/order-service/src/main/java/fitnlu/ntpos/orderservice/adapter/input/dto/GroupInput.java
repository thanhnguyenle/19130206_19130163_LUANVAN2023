package fitnlu.ntpos.orderservice.adapter.input.dto;

import fitnlu.ntpos.orderservice.domain.model.Table;

import java.util.List;

public record GroupInput(
         String name,
         String status,
         String note,
         List<TableInput> tables
) {

}
