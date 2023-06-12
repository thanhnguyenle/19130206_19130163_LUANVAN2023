package fitnlu.ntpos.productservice.application.services.product;

import fitnlu.ntpos.productservice.application.ports.output.IWriteProductPort;
import fitnlu.ntpos.productservice.application.usecases.product.IDeleteBatchProductUseCase;
import fitnlu.ntpos.productservice.application.usecases.product.IDeleteProductUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class DeleteProductService implements IDeleteBatchProductUseCase, IDeleteProductUseCase {
    private final IWriteProductPort writeProductPort;
    @Override
    public boolean deleteBatchProduct(List<String> productIDs) {
        return writeProductPort.deleteBatchProduct(productIDs);
    }

    @Override
    public boolean deleteProduct(String id) {
        return writeProductPort.deleteProduct(id);
    }
}
