package fitnlu.ntpos.productservice.application.ports.input;

import fitnlu.ntpos.productservice.adapter.input.dto.CategoryOutput;
import fitnlu.ntpos.productservice.adapter.input.dto.ListCategoryOutput;
import fitnlu.ntpos.productservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.productservice.domain.model.TimeSearch;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;

import java.util.List;

public interface IFindCategoryEndpointPort {
    List<CategoryOutput> getAllCategories();
    CategoryOutput getCategoryById(String id);
    ListCategoryOutput filterCategory(PagingInput paging, String searchType, String searchValue, String sortType, String sortValue);
    Integer getTotalItem();

    ListCategoryOutput filterCategoryByTime(PagingInput paging, TimeSearch timeSearch);
}
