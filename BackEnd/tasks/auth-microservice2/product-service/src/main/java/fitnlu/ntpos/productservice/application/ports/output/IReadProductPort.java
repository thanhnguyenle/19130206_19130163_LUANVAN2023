package fitnlu.ntpos.productservice.application.ports.output;

import fitnlu.ntpos.productservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.productservice.domain.model.Product;
import fitnlu.ntpos.productservice.domain.model.TimeSearch;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;

import java.util.List;

public interface IReadProductPort {
    List<Product> getAllProducts();
    Product getProductById(String id);
    List<Product> filterProduct(IPaging paging, String categoryID, String searchType, String searchValue, String sortType, String sortValue);
    List<Product> filterProduct( String categoryID, String searchType, String searchValue, String sortType, String sortValue);
    int getTotalItem();
    List<Product> filterProductByTime(TimeSearch timeSearch);
    List<Product> filterProductByTime(IPaging paging , TimeSearch timeSearch);
}
