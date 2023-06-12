package fitnlu.ntpos.productservice.application.services.product;

import fitnlu.ntpos.productservice.application.ports.output.IReadProductPort;
import fitnlu.ntpos.productservice.application.usecases.product.*;
import fitnlu.ntpos.productservice.domain.model.Product;
import fitnlu.ntpos.productservice.domain.model.TimeSearch;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class FindProductService implements
        IFindAllProductUseCase,
        IFindProductUseCase,
        IFilterProductsUseCase ,
        ITotalProductUseCase,
        IFilterProductByTime {
    private final IReadProductPort readProductPort;
    @Override
    public List<Product> filterProduct(IPaging paging, String categoryID, String searchType, String searchValue, String sortType, String sortValue) {
        return readProductPort.filterProduct(paging, categoryID, searchType, searchValue, sortType, sortValue);
    }

    @Override
    public List<Product> filterProduct(String categoryID, String searchType, String searchValue, String sortType, String sortValue) {
        return readProductPort.filterProduct(categoryID, searchType, searchValue, sortType, sortValue);
    }

    @Override
    public List<Product> findAllProduct() {
        return readProductPort.getAllProducts();
    }

    @Override
    public Product findProductById(String id) {
        return readProductPort.getProductById(id);
    }

    @Override
    public int getTotalItem() {
        return readProductPort.getTotalItem();
    }

    @Override
    public List<Product> filterProductByTime(TimeSearch timeSearch) {
        return readProductPort.filterProductByTime(timeSearch);
    }

    @Override
    public List<Product> filterProductByTime(IPaging paging, TimeSearch timeSearch) {
        return readProductPort.filterProductByTime(paging, timeSearch);
    }
}
