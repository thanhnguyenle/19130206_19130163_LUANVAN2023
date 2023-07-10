package fitnlu.ntpos.inventoryservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class ListSupplierOutput {
    private List<SupplierOutput> supplierOutputs;
    private int currentPage;
    private int totalPage;
    private int totalItem;

}
