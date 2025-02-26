package fitnlu.ntpos.productservice.application.usecases.product;

import java.util.List;

public interface IAddBatchProductToCategoryUseCase {
    boolean addBatchProductToCategory(String categoryID,List<String> productIDs);
}
