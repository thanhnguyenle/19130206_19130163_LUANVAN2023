package fitnlu.ntpos.productservice.application.usecases.product;

import fitnlu.ntpos.productservice.domain.model.Product;

public interface IUpdateProductUseCase {
    boolean updateProduct(String id, Product product);

}
