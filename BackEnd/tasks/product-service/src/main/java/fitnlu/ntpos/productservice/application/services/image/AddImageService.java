package fitnlu.ntpos.productservice.application.services.image;

import fitnlu.ntpos.productservice.application.usecases.image.IFindImageByProductIDUseCase;
import fitnlu.ntpos.productservice.domain.model.ProductImage;

import java.util.List;

public class FindImageService implements IFindImageByProductIDUseCase {
    @Override
    public List<ProductImage> findImageByProduct(String productID) {
        return null;
    }
}
