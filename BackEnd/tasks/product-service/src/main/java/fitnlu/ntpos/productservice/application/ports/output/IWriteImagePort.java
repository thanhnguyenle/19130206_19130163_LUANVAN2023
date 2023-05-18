package fitnlu.ntpos.productservice.application.ports.output;

import fitnlu.ntpos.productservice.domain.model.ProductImage;

import java.util.List;

public interface IWriteImagePort {
    List<ProductImage> getAllImages();
}
