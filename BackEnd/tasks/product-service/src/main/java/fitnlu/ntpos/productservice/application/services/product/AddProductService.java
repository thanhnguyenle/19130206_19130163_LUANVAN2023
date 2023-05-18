package fitnlu.ntpos.productservice.application.services.product;

import fitnlu.ntpos.productservice.application.ports.output.IWriteProductPort;
import fitnlu.ntpos.productservice.application.usecases.product.IAddBatchProductUseCase;
import fitnlu.ntpos.productservice.application.usecases.product.IAddProductUseCase;
import fitnlu.ntpos.productservice.domain.model.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class AddProductService implements IAddBatchProductUseCase, IAddProductUseCase {
    private final IWriteProductPort writeProductPort;
    @Override
    public boolean addBatchProduct(List<Product> product) {
        return writeProductPort.addBatchProduct(product);
    }

    @Override
    public boolean addProduct(Product product) {
        return writeProductPort.addProduct(product);
    }
}
