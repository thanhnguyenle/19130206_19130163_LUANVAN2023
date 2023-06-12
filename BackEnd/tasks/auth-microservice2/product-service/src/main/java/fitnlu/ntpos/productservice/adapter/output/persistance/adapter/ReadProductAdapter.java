package fitnlu.ntpos.productservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.productservice.adapter.output.persistance.entities.ProductEntities;
import fitnlu.ntpos.productservice.adapter.output.persistance.mapper.ProductMapperOutput;
import fitnlu.ntpos.productservice.adapter.output.persistance.repository.IProductDBIRepository;
import fitnlu.ntpos.productservice.application.ports.output.IReadProductPort;
import fitnlu.ntpos.productservice.domain.model.Product;
import fitnlu.ntpos.productservice.domain.model.TimeSearch;
import fitnlu.ntpos.productservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;
import lombok.RequiredArgsConstructor;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Adapter
@RequiredArgsConstructor
public class ReadProductAdapter implements IReadProductPort {
    private final IProductDBIRepository productDBIRepository;

    @Override
    public List<Product> getAllProducts() {
        return productDBIRepository.findAll().stream().map(ProductMapperOutput::toDomain).toList();
    }

    @Override
    public Product getProductById(String id) {
        Optional<ProductEntities> product = productDBIRepository.findById(id);
        if (product.isPresent()) {
            return ProductMapperOutput.toDomain(product.get());
        }else throw new RuntimeException("Product not found");
    }

    @Override
    public List<Product> filterProduct(IPaging paging, String categoryID, String searchType, String searchValue, String sortType, String sortValue) {
        return productDBIRepository.filterProduct(paging, categoryID, searchType, searchValue, sortType, sortValue).stream().map(ProductMapperOutput::toDomain).toList();
    }

    @Override
    public List<Product> filterProduct(String categoryID, String searchType, String searchValue, String sortType, String sortValue) {
        return productDBIRepository.filterProduct( categoryID, searchType, searchValue, sortType, sortValue).stream().map(ProductMapperOutput::toDomain).toList();
    }

    @Override
    public int getTotalItem() {
        return productDBIRepository.getTotalItem().orElse(0);
    }

    @Override
    public List<Product> filterProductByTime(TimeSearch timeSearch) {
        return productDBIRepository.filterProductByTime(timeSearch).stream().map(ProductMapperOutput::toDomain).toList();
    }

    @Override
    public List<Product> filterProductByTime(IPaging paging, TimeSearch timeSearch) {
        return productDBIRepository.filterProductByTime(paging, timeSearch).stream().map(ProductMapperOutput::toDomain).toList();
    }
}
