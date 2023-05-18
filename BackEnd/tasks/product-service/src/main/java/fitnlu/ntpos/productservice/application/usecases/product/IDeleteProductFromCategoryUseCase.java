package fitnlu.ntpos.productservice.application.usecases.product;

import fitnlu.ntpos.productservice.domain.model.Product;

import java.util.List;

public interface IDeleteProductFromCategoryUseCase {
   boolean deleteProductFromCategory(String categoryID, String productID);

}
