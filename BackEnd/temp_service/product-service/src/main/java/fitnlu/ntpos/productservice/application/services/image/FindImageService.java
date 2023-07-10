package fitnlu.ntpos.productservice.application.services.image;

import fitnlu.ntpos.productservice.application.ports.output.IReadImagePort;
import fitnlu.ntpos.productservice.application.ports.output.IReadProductPort;
import fitnlu.ntpos.productservice.application.usecases.image.IFindImageByProductIDUseCase;
import fitnlu.ntpos.productservice.domain.model.ProductImage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class FindImageService implements IFindImageByProductIDUseCase {
    private final IReadImagePort iReadImagePort;
    @Override
    public List<ProductImage> findImageByProduct(String productID) {
        return iReadImagePort.findImageByProductID(productID);
    }
}
