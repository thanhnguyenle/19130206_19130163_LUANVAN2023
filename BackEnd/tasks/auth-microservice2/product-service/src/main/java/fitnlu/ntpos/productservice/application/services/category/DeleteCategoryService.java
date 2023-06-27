package fitnlu.ntpos.productservice.application.services.category;

import fitnlu.ntpos.productservice.application.ports.output.IWriteCategoryPort;
import fitnlu.ntpos.productservice.application.usecases.category.IDeleteBatchCategoryUseCase;
import fitnlu.ntpos.productservice.application.usecases.category.IDeleteCategoryUseCase;
import fitnlu.ntpos.productservice.domain.model.Category;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class DeleteCategoryService implements IDeleteCategoryUseCase, IDeleteBatchCategoryUseCase {
    private final IWriteCategoryPort writeCategoryPort;
    @Override
    public boolean deleteBatchCategory(List<String> categories) {
        return writeCategoryPort.deleteBatchCategory(categories);
    }

    @Override
    public boolean deleteCategory(String id) {
        return writeCategoryPort.deleteCategory(id);
    }
}
