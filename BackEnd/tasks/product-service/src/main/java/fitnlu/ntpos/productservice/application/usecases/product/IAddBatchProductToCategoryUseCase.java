package fitnlu.ntpos.productservice.application.usecases.product;

import fitnlu.ntpos.productservice.domain.model.Product;

import java.util.List;

public interface IAddProductBatchToCategoryUseCase {
    boolean addBatchProductToCategory(String categoryID,List<String> productIDs);
}
