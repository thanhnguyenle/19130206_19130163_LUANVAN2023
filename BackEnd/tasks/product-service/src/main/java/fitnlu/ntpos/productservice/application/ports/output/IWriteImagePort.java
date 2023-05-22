package fitnlu.ntpos.productservice.application.ports.output;

import fitnlu.ntpos.productservice.domain.model.ProductImage;

import java.util.List;

public interface IWriteImagePort {
    boolean addImageToProduct(String productID, List<ProductImage> images);
    boolean deleteImageFromProduct(List<Integer> imageIDs);
}
