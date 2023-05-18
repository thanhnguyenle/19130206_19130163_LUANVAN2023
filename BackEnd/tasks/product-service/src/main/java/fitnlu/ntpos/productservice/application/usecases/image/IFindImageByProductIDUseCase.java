package fitnlu.ntpos.productservice.application.usecases.image;

import fitnlu.ntpos.productservice.domain.model.ProductImage;

import java.util.List;

public interface IFindImageByProductIDUseCase {
    List<ProductImage> findImageByProduct(String productID);
}
