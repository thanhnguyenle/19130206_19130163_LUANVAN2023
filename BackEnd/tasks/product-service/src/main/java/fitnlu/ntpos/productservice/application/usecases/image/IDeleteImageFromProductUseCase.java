package fitnlu.ntpos.productservice.application.usecases.image;

import fitnlu.ntpos.productservice.domain.model.ProductImage;

import java.util.List;

public interface IDeleteImageFromProductUseCase {
    boolean addImageToProduct(String productID, List<ProductImage> images);
}
