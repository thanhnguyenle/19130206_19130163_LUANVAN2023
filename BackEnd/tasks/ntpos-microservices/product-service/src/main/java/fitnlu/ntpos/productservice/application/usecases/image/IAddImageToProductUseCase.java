package fitnlu.ntpos.productservice.application.usecases.image;

import fitnlu.ntpos.productservice.domain.model.ProductImage;

import java.util.List;

public interface IAddImageToProductUseCase {
    boolean addImageToProduct(String productID, List<ProductImage> images);
}
