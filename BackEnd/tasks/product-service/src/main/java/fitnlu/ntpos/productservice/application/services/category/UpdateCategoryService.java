package fitnlu.ntpos.productservice.application.services.category;

import fitnlu.ntpos.productservice.application.ports.output.IWriteCategoryPort;
import fitnlu.ntpos.productservice.application.usecases.category.IUpdateCategoryUseCase;
import fitnlu.ntpos.productservice.domain.model.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateCategoryService implements IUpdateCategoryUseCase {
    private final IWriteCategoryPort writeCategoryPort;
    @Override
    public boolean updateCategory(String id, Category category) {
        return writeCategoryPort.updateCategory(id, category);
    }
}
