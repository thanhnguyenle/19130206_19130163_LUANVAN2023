package fitnlu.ntpos.productservice.adapter.output.persistance.repository;

import fitnlu.ntpos.productservice.adapter.output.persistance.entities.CategoryEntities;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;

import java.util.List;
import java.util.Optional;

public interface IImageDBIRepository {
    List<CategoryEntities> findAll();
    List<CategoryEntities> filterCategory(IPaging paging);
    Optional<Integer> getTotalItem();
    Optional<CategoryEntities> findById(String id);

    boolean save(CategoryEntities category);
    boolean saveBatch(List<CategoryEntities> categories);

    boolean deleteById(String id);
    boolean deleteBatchCategory(List<String> categories);

    boolean update(String id, CategoryEntities category);



}
