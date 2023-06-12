package fitnlu.ntpos.productservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.productservice.adapter.output.persistance.mapper.ProductMapperOutput;
import fitnlu.ntpos.productservice.adapter.output.persistance.repository.IProductDBIRepository;
import fitnlu.ntpos.productservice.application.ports.output.IWriteProductPort;
import fitnlu.ntpos.productservice.domain.model.Product;
import fitnlu.ntpos.productservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class WriteProductAdapter implements IWriteProductPort {
    private final IProductDBIRepository productDBIRepository;
    @Override
    public boolean addProduct(Product product) {
        return productDBIRepository.save(ProductMapperOutput.toEntity(product));
    }

    @Override
    public boolean updateProduct(String id, Product product) {
        return productDBIRepository.update(id, ProductMapperOutput.toEntity(product));
    }

    @Override
    public boolean deleteProduct(String id) {
        return productDBIRepository.deleteById(id);
    }

    @Override
    public boolean addBatchProductToCategory(String categoryID, List<String> productIDs) {
        return productDBIRepository.addBatchProductToCategory(categoryID, productIDs);
    }

    @Override
    public boolean addProductToCategory(String categoryID, String productID) {
        return productDBIRepository.addProductToCategory(categoryID, productID);
    }

    @Override
    public boolean addBatchProduct(List<Product> product) {
        return productDBIRepository.saveAll(product.stream().map(ProductMapperOutput::toEntity).toList());
    }

    @Override
    public boolean deleteBatchProduct(List<String> productIDs) {
        return productDBIRepository.deleteBatchProduct(productIDs);
    }

    @Override
    public boolean deleteProductFromCategory(String categoryID, String productID) {
        return productDBIRepository.removeProductFromCategory(categoryID, productID);
    }

    @Override
    public boolean deleteProductFromCategory(String categoryID, List<String> productIDs) {
        return productDBIRepository.removeBatchProductFromCategory(categoryID, productIDs);
    }

}
