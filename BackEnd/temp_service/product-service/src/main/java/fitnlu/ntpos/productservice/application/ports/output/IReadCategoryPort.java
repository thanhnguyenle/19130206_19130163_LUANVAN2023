package fitnlu.ntpos.productservice.application.ports.output;

import fitnlu.ntpos.productservice.domain.model.Category;
import fitnlu.ntpos.productservice.domain.model.TimeSearch;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;

import java.util.List;
import java.util.Optional;

public interface IReadCategoryPort {
    List<Category> getAllCategories();
    Category getCategoryById(String id);
    List<Category> filterCategory(IPaging paging, String searchType, String searchValue, String sortType, String sortValue);
    List<Category> filterCategory(String searchType, String searchValue, String sortType, String sortValue);
    Integer getTotalItem();

    List<Category> findCategoryByProduct(String productID);
    List<Category> filterCategory(IPaging paging, TimeSearch timeSearch);
    List<Category> filterCategory(TimeSearch timeSearch);
}
