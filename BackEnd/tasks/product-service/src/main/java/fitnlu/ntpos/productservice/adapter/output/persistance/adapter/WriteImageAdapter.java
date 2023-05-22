package fitnlu.ntpos.productservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.productservice.adapter.output.persistance.mapper.ImageMapperOutput;
import fitnlu.ntpos.productservice.adapter.output.persistance.repository.IImageDBIRepository;
import fitnlu.ntpos.productservice.application.ports.output.IReadImagePort;
import fitnlu.ntpos.productservice.application.ports.output.IWriteImagePort;
import fitnlu.ntpos.productservice.domain.model.ProductImage;
import fitnlu.ntpos.productservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Adapter
@RequiredArgsConstructor
public class WriteImageAdapter implements IWriteImagePort {
    private final IImageDBIRepository imageDBIRepository;

    @Override
    public boolean addImageToProduct(String productID, List<ProductImage> images) {
        return imageDBIRepository.batchSaveImageToProduct(productID, images.stream().map(ImageMapperOutput::toProductImageEntities).toList());
    }

    @Override
    public boolean deleteImageFromProduct(List<Integer> imageIDs) {
        return imageDBIRepository.batchDeleteImageFromProduct(imageIDs);
    }
}
