package fitnlu.ntpos.authservice.application.services;

import com.demo.productservice.application.ports.output.IReadProductPort;
import com.demo.productservice.application.usecases.IFindAllProductsUseCase;
import com.demo.productservice.domain.model.Product;
import com.demo.productservice.infrastructure.reactive.CollectionReactive;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class FindProductService implements IFindAllProductsUseCase {
    private final IReadProductPort iReadProductPort;
    @Override
    public CollectionReactive<Product> fetchAllPersisted() {
        return iReadProductPort.fetchAll();
    }
}
