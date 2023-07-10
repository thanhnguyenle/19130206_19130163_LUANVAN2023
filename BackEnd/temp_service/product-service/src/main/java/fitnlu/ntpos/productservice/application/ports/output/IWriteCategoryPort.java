package fitnlu.ntpos.productservice.application.ports.output;

import fitnlu.ntpos.productservice.domain.model.Category;

import java.util.List;

public interface IWriteCategoryPort {
    boolean addCategory(Category category);
    boolean updateCategory(String id, Category category);
    boolean deleteCategory(String id);
    boolean addBatchCategory(List<Category> categories);
    boolean deleteBatchCategory(List<String> ids);
}
