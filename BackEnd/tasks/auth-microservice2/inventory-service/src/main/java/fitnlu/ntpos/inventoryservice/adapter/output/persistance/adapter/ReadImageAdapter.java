package fitnlu.ntpos.inventoryservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.mapper.ImageMapperOutput;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.mapper.MaterialMapperOutput;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository.IImageDBIRepository;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository.IMaterialDBIRepository;
import fitnlu.ntpos.inventoryservice.application.ports.output.IReadImagePort;
import fitnlu.ntpos.inventoryservice.application.ports.output.IReadMaterialPort;
import fitnlu.ntpos.inventoryservice.domain.model.Image;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ReadImageAdapter implements IReadImagePort {
    private final IImageDBIRepository imageDBIRepository;
    @Override
    public List<Image> findAllImageByMaterialID(String materialID) {
        return imageDBIRepository.findAllImageByMaterialID(materialID)
                .stream()
                .map(ImageMapperOutput::toDomain)
                .toList();
    }
}
