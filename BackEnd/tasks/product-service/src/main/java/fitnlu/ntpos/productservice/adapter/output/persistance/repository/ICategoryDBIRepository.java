package fitnlu.ntpos.productservice.adapter.output.persistance.repository;

import fitnlu.ntpos.productservice.adapter.output.persistance.entities.ProductEntities;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;

import java.util.List;
import java.util.Optional;

public interface ICategoryDBIRepository {
    List<ProductEntities> findAll();
    List<ProductEntities> filterProduct(IPaging paging, String categoryID, String searchType, String searchValue, String sortType, String sortValue);
    Optional<ProductEntities> findById(String id);

    ProductEntities save(ProductEntities product);
    List<ProductEntities> saveAll(List<ProductEntities> products);

    boolean deleteById(String id);
    boolean deleteBatchProduct(List<ProductEntities> products);

    boolean update(ProductEntities product);

    Optional<Integer> getTotalItem();
    List<ProductEntities> searchByName(String name);
}
