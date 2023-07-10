package fitnlu.ntpos.productservice.application.services.product;

import fitnlu.ntpos.productservice.application.ports.output.IWriteProductPort;
import fitnlu.ntpos.productservice.application.usecases.product.*;
import fitnlu.ntpos.productservice.domain.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class UpdateProductService implements IUpdateProductUseCase, IAddBatchProductToCategoryUseCase, IDeleteBatchProductFromCategoryUseCase, IAddProductToCategoryUseCase, IDeleteProductFromCategoryUseCase {
    private final IWriteProductPort writeProductPort;
    @Override
    public boolean updateProduct(String id, Product product) {
        return writeProductPort.updateProduct(id, product);
    }

    @Override
    public boolean addBatchProductToCategory(String categoryID, List<String> productIDs) {
        return writeProductPort.addBatchProductToCategory(categoryID, productIDs);
    }

    @Override
    public boolean addProductToCategory(String categoryID, String productID) {
        return writeProductPort.addProductToCategory(categoryID, productID);
    }


    @Override
    public boolean deleteProductBatchFromCategory(String categoryID, List<String> productIDs) {
        return writeProductPort.deleteProductFromCategory(categoryID, productIDs);
    }


    @Override
    public boolean deleteProductFromCategory(String categoryID, String productID) {
        return writeProductPort.deleteProductFromCategory(categoryID, productID);
    }
}
