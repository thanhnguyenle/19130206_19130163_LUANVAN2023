package fitnlu.ntpos.productservice.application.usecases.product;

import fitnlu.ntpos.productservice.domain.model.Product;
import fitnlu.ntpos.productservice.domain.model.TimeSearch;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;

import java.util.List;

public interface IFilterProductByTime {
    List<Product> filterProductByTime(TimeSearch timeSearch);
    List<Product> filterProductByTime(IPaging paging, TimeSearch timeSearch);
}
