package fitnlu.ntpos.productservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
@Getter
@Builder
public class ListCategoryOutput {
    private List<CategoryOutput> categories;
    private int currentPage;
    private int totalPage;

    private int totalItem;




}
