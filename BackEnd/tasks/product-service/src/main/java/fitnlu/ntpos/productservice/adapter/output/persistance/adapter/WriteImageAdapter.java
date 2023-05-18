package fitnlu.ntpos.productservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.productservice.application.ports.output.IReadImagePort;
import fitnlu.ntpos.productservice.domain.model.ProductImage;

import java.util.List;

public class WriteImageAdapter implements IReadImagePort {
    @Override
    public List<ProductImage> findImageByProductID(String productID) {
        return null;
    }
}
