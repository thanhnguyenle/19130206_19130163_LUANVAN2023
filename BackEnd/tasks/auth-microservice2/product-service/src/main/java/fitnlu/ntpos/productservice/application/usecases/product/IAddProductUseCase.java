package fitnlu.ntpos.productservice.application.usecases.product;

import fitnlu.ntpos.productservice.domain.model.Product;

public interface IAddProductUseCase {
    Product addProduct(Product product);

}
