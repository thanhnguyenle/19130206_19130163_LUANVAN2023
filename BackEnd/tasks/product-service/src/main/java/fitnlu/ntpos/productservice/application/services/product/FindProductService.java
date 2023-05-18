package fitnlu.ntpos.productservice.application.services.product;

import fitnlu.ntpos.productservice.application.usecases.product.IFilterProductsUseCase;
import fitnlu.ntpos.productservice.application.usecases.product.IFindAllProductUseCase;
import fitnlu.ntpos.productservice.application.usecases.product.IFindProductUseCase;
import fitnlu.ntpos.productservice.domain.model.Product;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;

import java.util.List;

public class FindProductService implements IFindAllProductUseCase, IFindProductUseCase, IFilterProductsUseCase {
    @Override
    public List<Product> filterProduct(IPaging paging, String categoryID, String searchType, String searchValue, String sortType, String sortValue) {
        return null;
    }

    @Override
    public List<Product> findAllProduct() {
        return null;
    }

    @Override
    public Product findProductById(String id) {
        return null;
    }

    @Override
    public Product findProductByName(String name) {
        return null;
    }
}
