package fitnlu.ntpos.productservice.application.usecases.product;

import java.util.List;

public interface IDeleteBatchProductFromCategoryUseCase {
    boolean deleteProductBatchFromCategory(String categoryID,List<String> productIDs);

}
