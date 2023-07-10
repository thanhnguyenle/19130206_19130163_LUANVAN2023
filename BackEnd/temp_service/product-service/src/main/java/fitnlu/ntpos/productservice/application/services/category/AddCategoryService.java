package fitnlu.ntpos.productservice.application.services.category;

import fitnlu.ntpos.productservice.application.ports.output.IWriteCategoryPort;
import fitnlu.ntpos.productservice.application.usecases.category.IAddBatchCategoryUseCase;
import fitnlu.ntpos.productservice.application.usecases.category.IAddCategoryUseCase;
import fitnlu.ntpos.productservice.application.usecases.product.IAddBatchProductUseCase;
import fitnlu.ntpos.productservice.application.usecases.product.IAddProductUseCase;
import fitnlu.ntpos.productservice.domain.model.Category;
import fitnlu.ntpos.productservice.domain.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class AddCategoryService implements IAddCategoryUseCase, IAddBatchCategoryUseCase {
    private final IWriteCategoryPort writeCategoryPort;

    @Override
    public boolean addBatchCategory(List<Category> categories) {
        return writeCategoryPort.addBatchCategory(categories);
    }

    @Override
    public boolean addCategory(Category category) {
        return writeCategoryPort.addCategory(category);
    }
}
