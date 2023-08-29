package fitnlu.ntpos.productservice.application.usecases.category;

import fitnlu.ntpos.productservice.domain.model.Category;
import fitnlu.ntpos.productservice.domain.model.TimeSearch;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;

import java.util.List;

public interface IFilterCategoryByTimeUseCase {
    List<Category> filterCategory(IPaging paging, TimeSearch timeSearch);
    List<Category> filterCategory(TimeSearch timeSearch);
}
