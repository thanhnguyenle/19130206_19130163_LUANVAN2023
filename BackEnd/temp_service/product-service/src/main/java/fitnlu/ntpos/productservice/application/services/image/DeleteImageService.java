package fitnlu.ntpos.productservice.application.services.image;

import fitnlu.ntpos.productservice.application.ports.output.IWriteImagePort;
import fitnlu.ntpos.productservice.application.usecases.image.IAddImageToProductUseCase;
import fitnlu.ntpos.productservice.application.usecases.image.IDeleteImageFromProductUseCase;
import fitnlu.ntpos.productservice.domain.model.ProductImage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class DeleteImageService implements IDeleteImageFromProductUseCase {
    private final IWriteImagePort iWriteImagePort;
    @Override
    public boolean deleteImageFromProduct(List<Integer> imageIDs) {
        return iWriteImagePort.deleteImageFromProduct(imageIDs);
    }
}
