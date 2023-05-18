package fitnlu.ntpos.productservice.application.usecases.category;

import fitnlu.ntpos.productservice.domain.model.Category;

import java.util.List;

public interface IFindAllCategoryUseCase {
    List<Category> findAllCategory();
}
