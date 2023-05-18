package fitnlu.ntpos.productservice.adapter.input.adapter;

import fitnlu.ntpos.productservice.adapter.input.dto.ProductInput;
import fitnlu.ntpos.productservice.adapter.input.dto.ResultOutput;
import fitnlu.ntpos.productservice.adapter.input.mapper.ProductMapperInput;
import fitnlu.ntpos.productservice.application.ports.input.IChangeProductEndpointPort;
import fitnlu.ntpos.productservice.application.usecases.image.IAddImageToProductUseCase;
import fitnlu.ntpos.productservice.application.usecases.product.*;
import fitnlu.ntpos.productservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ChangeProductEndpointAdapter implements IChangeProductEndpointPort {
    private final IAddProductUseCase addProductUseCase;
    private final IDeleteProductUseCase deleteProductUseCase;
    private final IUpdateProductUseCase updateProductUseCase;
    private final IAddBatchProductUseCase addBatchProductUseCase;
    private final IDeleteBatchProductUseCase deleteBatchProductUseCase;
    private final IAddProductToCategoryUseCase addProductToCategoryUseCase;
    private final IAddBatchProductToCategoryUseCase addProductBatchToCategoryUseCase;
    private final IDeleteProductFromCategoryUseCase deleteProductFromCategoryUseCase;
    private final IDeleteBatchProductFromCategoryUseCase deleteProductBatchFromCategoryUseCase;
    private final IAddImageToProductUseCase addImageToProductUseCase;
    @Override
    public ResultOutput addProduct(ProductInput productInput) {
        boolean result = addProductUseCase.addProduct(ProductMapperInput.toDomain(productInput));
     return ResultOutput.builder()
                .success(result)
                .build();
    }

    @Override
    public ResultOutput updateProduct(String id, ProductInput productInput) {
        return ResultOutput.builder()
                .success(updateProductUseCase.updateProduct(id, ProductMapperInput.toDomain(productInput)))
                .build();
    }

    @Override
    public ResultOutput deleteProduct(String id) {
        return ResultOutput.builder()
                .success(deleteProductUseCase.deleteProduct(id))
                .build();
    }

    @Override
    public ResultOutput addBatchProductToCategory(String categoryID, List<String> productIDs) {
        return ResultOutput.builder()
                .success(addProductBatchToCategoryUseCase.addBatchProductToCategory(categoryID, productIDs))
                .build();
    }

    @Override
    public ResultOutput addProductToCategory(String categoryID, String productID) {
        return ResultOutput.builder()
                .success(addProductToCategoryUseCase.addProductToCategory(categoryID, productID))
                .build();
    }

    @Override
    public ResultOutput addBatchProduct(List<ProductInput> productInputs) {
        return ResultOutput.builder()
                .success(addBatchProductUseCase.addBatchProduct(productInputs.stream().map(ProductMapperInput::toDomain).toList()))
                .build();
    }

    @Override
    public ResultOutput deleteProductBatchFromCategory(String categoryID, List<String> productIDs) {
        return ResultOutput.builder()
                .success(deleteProductBatchFromCategoryUseCase.deleteProductBatchFromCategory(categoryID, productIDs))
                .build();
    }

    @Override
    public ResultOutput deleteProductFromCategory(String categoryID, String productID) {
        return ResultOutput.builder()
                .success(deleteProductFromCategoryUseCase.deleteProductFromCategory(categoryID, productID))
                .build();
    }

    @Override
    public ResultOutput deleteBatchProduct(List<String> productIDs) {
        return ResultOutput.builder()
                .success(deleteBatchProductUseCase.deleteBatchProduct(productIDs))
                .build();
    }
}
