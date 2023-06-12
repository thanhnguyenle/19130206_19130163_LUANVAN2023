package fitnlu.ntpos.productservice.application.ports.output;

import fitnlu.ntpos.productservice.domain.model.ProductImage;

import java.util.List;

public interface IReadImagePort {
    List<ProductImage> findImageByProductID(String productID);
}
