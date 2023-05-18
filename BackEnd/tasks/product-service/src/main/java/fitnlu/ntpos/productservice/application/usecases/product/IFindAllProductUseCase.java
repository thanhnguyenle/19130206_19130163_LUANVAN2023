package fitnlu.ntpos.productservice.application.usecases.product;

import fitnlu.ntpos.productservice.domain.model.Product;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;

import java.util.List;

public interface IFindAllProductUseCase {
    List<Product> findAllProduct();
    public List<Product> filterProduct(IPaging paging, String categoryID, String searchType, String searchValue, String sortType, String sortValue);

}
