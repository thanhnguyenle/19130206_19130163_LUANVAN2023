package fitnlu.ntpos.productservice.application.usecases.category;

import fitnlu.ntpos.productservice.domain.model.Category;

public interface IFindCategoryUseCase {
   Category findCategory(String id);
}
