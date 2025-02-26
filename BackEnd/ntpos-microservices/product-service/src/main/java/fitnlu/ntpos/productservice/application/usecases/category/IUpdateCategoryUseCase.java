package fitnlu.ntpos.productservice.application.usecases.category;

import fitnlu.ntpos.productservice.domain.model.Category;

public interface IUpdateCategoryUseCase {
    boolean updateCategory(String id, Category category);
}
