package fitnlu.ntpos.authservice.application.services;

import com.demo.productservice.application.ports.output.IWriteProductPort;
import com.demo.productservice.application.usecases.ISubmitNewProductUseCase;
import com.demo.productservice.domain.model.Product;
import com.demo.productservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SubmitNewProductService implements ISubmitNewProductUseCase {
    private final IWriteProductPort iWriteProductPort;

    @Override
    public UnitReactive<Product> submit(Product product) {
        return iWriteProductPort.saveNew(product);
    }
}
