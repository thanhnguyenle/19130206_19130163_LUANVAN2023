package fitnlu.ntpos.productservice.adapter.input.adapter;

import fitnlu.ntpos.productservice.adapter.input.dto.CategoryInput;
import fitnlu.ntpos.productservice.adapter.input.dto.ResultOutput;
import fitnlu.ntpos.productservice.adapter.input.mapper.CategoryMapperInput;
import fitnlu.ntpos.productservice.application.ports.input.IChangeCategoryEndpointPort;
import fitnlu.ntpos.productservice.application.usecases.category.*;
import fitnlu.ntpos.productservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Adapter
@RequiredArgsConstructor
public class ChangeCategoryEndpointAdapter implements IChangeCategoryEndpointPort {
    private final IAddCategoryUseCase addCategoryUseCase;
    private final IUpdateCategoryUseCase updateCategoryUseCase;
    private final IDeleteCategoryUseCase deleteCategoryUseCase;
    private final IAddBatchCategoryUseCase addBatchCategoryUseCase;
    private final IDeleteBatchCategoryUseCase deleteBatchCategoryUseCase;

    @Override
    public ResultOutput addCategory(CategoryInput categoryInput) {
        return ResultOutput.builder()
                .success(addCategoryUseCase.addCategory(CategoryMapperInput.toDomain(categoryInput)))
                .build();
    }

    @Override
    public ResultOutput updateCategory(String id, CategoryInput categoryInput) {
        return ResultOutput.builder()
                .success(updateCategoryUseCase.updateCategory(id, CategoryMapperInput.toDomain(categoryInput)))
                .build();
    }

    @Override
    public ResultOutput deleteCategory(String id) {
        return ResultOutput.builder()
                .success(deleteCategoryUseCase.deleteCategory(id))
                .build();
    }

    @Override
    public ResultOutput addBatchCategory(List<CategoryInput> categories) {
        return ResultOutput.builder()
                .success(addBatchCategoryUseCase.addBatchCategory(categories.stream().map(CategoryMapperInput::toDomain).toList()))
                .build();
    }

    @Override
    public ResultOutput deleteBatchCategory(List<String> ids) {
        return ResultOutput.builder()
                .success(deleteBatchCategoryUseCase.deleteBatchCategory(ids))
                .build();
    }
}
