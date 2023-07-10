package fitnlu.ntpos.inventoryservice.application.services.image;

import fitnlu.ntpos.inventoryservice.application.ports.output.IReadImagePort;
import fitnlu.ntpos.inventoryservice.application.usecases.image.IFindAllImageByMaterialIDUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.Image;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class IFindImageService implements IFindAllImageByMaterialIDUseCase {
    private final IReadImagePort readImagePort;
    @Override
    public List<Image> findAllImageByMaterialID(String materialID) {
        return readImagePort.findAllImageByMaterialID(materialID);
    }
}
