package fitnlu.ntpos.productservice.application.services.image;

import fitnlu.ntpos.productservice.application.usecases.image.IAddImageToProductUseCase;
import fitnlu.ntpos.productservice.domain.model.ProductImage;

import java.util.List;

public class DeleteImageService implements IAddImageToProductUseCase {

    @Override
    public boolean addImageToProduct(String productID, List<ProductImage> images) {
        return false;
    }
}
