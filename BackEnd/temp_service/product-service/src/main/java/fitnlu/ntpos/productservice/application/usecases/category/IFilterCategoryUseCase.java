package fitnlu.ntpos.productservice.application.usecases.category;

import fitnlu.ntpos.productservice.domain.model.Category;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;

import java.util.List;

public interface IFilterCategoryUseCase {
    List<Category> filterCategory(IPaging paging, String searchType, String searchValue, String sortType, String sortValue);
    List<Category> filterCategory( String searchType, String searchValue, String sortType, String sortValue);
}
