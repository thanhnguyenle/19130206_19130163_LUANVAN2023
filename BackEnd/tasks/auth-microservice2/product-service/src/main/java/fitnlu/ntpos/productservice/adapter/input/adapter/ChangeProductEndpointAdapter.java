package fitnlu.ntpos.productservice.adapter.input.adapter;

import fitnlu.ntpos.productservice.adapter.input.dto.ProductInput;
import fitnlu.ntpos.productservice.adapter.input.dto.ResultOutput;
import fitnlu.ntpos.productservice.adapter.input.mapper.CategoryMapperInput;
import fitnlu.ntpos.productservice.adapter.input.mapper.ImageMapperInput;
import fitnlu.ntpos.productservice.adapter.input.mapper.ProductMapperInput;
import fitnlu.ntpos.productservice.application.ports.input.IChangeProductEndpointPort;
import fitnlu.ntpos.productservice.application.usecases.image.IAddImageToProductUseCase;
import fitnlu.ntpos.productservice.application.usecases.product.*;
import fitnlu.ntpos.productservice.domain.model.Product;
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
    private final IDeleteAllCategoryOfProduct deleteAllCategoryOfProduct;
    private final IDeleteAllImageOfProduct deleteAllImageOfProduct;
    @Override
    public ResultOutput addProduct(ProductInput productInput) {
        Product product = ProductMapperInput.toDomain(productInput);
        Product result = addProductUseCase.addProduct(product);
        if(productInput.images()!=null)
            addImageToProductUseCase.addImageToProduct(result.getId(), productInput.images().stream().map(ImageMapperInput::toDomain).toList());
        if(productInput.categories()!=null)
            productInput.categories().forEach(categoryID -> addProductToCategoryUseCase.addProductToCategory(result.getId(), categoryID));
        return ResultOutput.builder()
                .success(result.getId()!=null)
                .build();
    }

    @Override
    public ResultOutput updateProduct(String id, ProductInput productInput) {
        Product product = ProductMapperInput.toDomain(productInput);
        boolean result = updateProductUseCase.updateProduct(id, product);
        if(result){
            if(productInput.images()!=null) {
                deleteAllImageOfProduct.deleteAllImageOfProduct(id);
                addImageToProductUseCase.addImageToProduct(id, productInput.images().stream().map(ImageMapperInput::toDomain).toList());
            }
            if(productInput.categories()!=null) {
                deleteAllCategoryOfProduct.deleteAllCategoryOfProduct(id);
                productInput.categories().forEach(categoryID -> addProductToCategoryUseCase.addProductToCategory(categoryID, id));
            }
        }
        return ResultOutput.builder()
                .success(result)
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

    @Override
    public ResultOutput deleteAllImageOfProduct(String productID) {
        return ResultOutput.builder()
                .success(deleteAllImageOfProduct.deleteAllImageOfProduct(productID))
                .build();
    }

    @Override
    public ResultOutput deleteAllCategoryOfProduct(String productID) {
        return ResultOutput.builder()
                .success(deleteAllCategoryOfProduct.deleteAllCategoryOfProduct(productID))
                .build();
    }
}
