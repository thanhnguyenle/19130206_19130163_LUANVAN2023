package fitnlu.ntpos.productservice.application.usecases.product;

import fitnlu.ntpos.productservice.domain.model.Product;

import java.util.List;

public interface IAddBatchProductUseCase {
    boolean addBatchProduct(List<Product> product);
}
