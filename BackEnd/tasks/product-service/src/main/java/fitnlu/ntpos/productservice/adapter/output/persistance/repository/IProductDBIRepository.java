package fitnlu.ntpos.productservice.adapter.output.persistance.repository;

import fitnlu.ntpos.productservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.productservice.adapter.output.persistance.entities.ProductEntities;
import fitnlu.ntpos.productservice.domain.model.TimeSearch;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;

import java.util.List;
import java.util.Optional;

public interface IProductDBIRepository {
    List<ProductEntities> findAll();
    List<ProductEntities> filterProduct(IPaging paging, String categoryID, String searchType, String searchValue, String sortType, String sortValue);
    List<ProductEntities> filterProduct( String categoryID, String searchType, String searchValue, String sortType, String sortValue);
    Optional<ProductEntities> findById(String id);

    boolean save(ProductEntities product);
    boolean saveAll(List<ProductEntities> products);

    boolean deleteById(String id);
    boolean deleteBatchProduct(List<String> products);

    boolean update(String id, ProductEntities product);

    Optional<Integer> getTotalItem();
    List<ProductEntities> searchByName(String name);

    boolean addProductToCategory(String categoryID,String productID);
    boolean removeProductFromCategory(String categoryID,String productID);
    boolean addBatchProductToCategory(String categoryID, List<String> productIDs);
    boolean removeBatchProductFromCategory(String categoryID, List<String> productIDs);
    List<ProductEntities> filterProductByTime(IPaging paging, TimeSearch timeSearch);
    List<ProductEntities> filterProductByTime(TimeSearch timeSearch);
}
