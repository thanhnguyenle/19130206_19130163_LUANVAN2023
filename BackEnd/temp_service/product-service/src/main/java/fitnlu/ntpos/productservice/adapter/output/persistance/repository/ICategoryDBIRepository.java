package fitnlu.ntpos.productservice.adapter.output.persistance.repository;

import fitnlu.ntpos.productservice.adapter.output.persistance.entities.CategoryEntities;
import fitnlu.ntpos.productservice.domain.model.Category;
import fitnlu.ntpos.productservice.domain.model.TimeSearch;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;

import java.util.List;
import java.util.Optional;

public interface ICategoryDBIRepository {
    List<CategoryEntities> findAll();
    List<CategoryEntities> filterCategory(IPaging paging,String searchType, String searchValue, String sortType, String sortValue);
    List<CategoryEntities> filterCategory(String searchType, String searchValue, String sortType, String sortValue);
    Optional<Integer> getTotalItem();
    Optional<CategoryEntities> findById(String id);

    boolean save(CategoryEntities category);
    boolean saveBatch(List<CategoryEntities> categories);

    boolean deleteById(String id);
    boolean deleteBatchCategory(List<String> categories);

    boolean update(String id, CategoryEntities category);

    List<CategoryEntities> findCategoryByProduct(String productID);
    List<CategoryEntities> filterCategory(IPaging paging, TimeSearch timeSearch);
    List<CategoryEntities> filterCategory(TimeSearch timeSearch);


}
