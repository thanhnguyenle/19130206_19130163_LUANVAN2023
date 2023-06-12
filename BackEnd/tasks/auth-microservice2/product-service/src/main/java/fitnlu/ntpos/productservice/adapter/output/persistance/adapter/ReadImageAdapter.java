package fitnlu.ntpos.productservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.productservice.adapter.output.persistance.mapper.ImageMapperOutput;
import fitnlu.ntpos.productservice.adapter.output.persistance.mapper.ProductMapperOutput;
import fitnlu.ntpos.productservice.adapter.output.persistance.repository.IImageDBIRepository;
import fitnlu.ntpos.productservice.application.ports.output.IReadImagePort;
import fitnlu.ntpos.productservice.domain.model.ProductImage;
import fitnlu.ntpos.productservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Adapter
@RequiredArgsConstructor
public class ReadImageAdapter implements IReadImagePort {
    private final IImageDBIRepository imageDBIRepository;
    @Override
    public List<ProductImage> findImageByProductID(String productID) {
        return imageDBIRepository.findByProductID(productID).stream().map(ImageMapperOutput::toProductImage).toList();
    }
}
