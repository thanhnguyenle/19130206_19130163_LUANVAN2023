package fitnlu.ntpos.inventoryservice.adapter.output.persistance.adapter;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.mapper.ImageMapperOutput;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.mapper.MaterialMapperOutput;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository.IMaterialDBIRepository;
import fitnlu.ntpos.inventoryservice.application.ports.output.IWriteMaterialPort;
import fitnlu.ntpos.inventoryservice.domain.model.Image;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Adapter
@RequiredArgsConstructor
public class WriteMaterialAdapter implements IWriteMaterialPort {
    private final IMaterialDBIRepository materialDBIRepository;
    @Override
    public Material createMaterial(Material material) {
        return MaterialMapperOutput.toDomain(materialDBIRepository.createMaterial(MaterialMapperOutput.toEntities(material)));
    }

    @Override
    public Material updateMaterial(String id, Material material) {
        return MaterialMapperOutput.toDomain(materialDBIRepository.updateMaterial(id, MaterialMapperOutput.toEntities(material)));
    }

    @Override
    public Material deleteMaterial(String id) {
        return MaterialMapperOutput.toDomain(materialDBIRepository.deleteMaterial(id));
    }

    @Override
    public boolean addBatchMaterial(List<Material> materials) {
        return materialDBIRepository.addBatchMaterial(materials.stream().map(MaterialMapperOutput::toEntities).toList());
    }

    @Override
    public boolean deleteBatchMaterial(List<String> materialIDs) {
        return materialDBIRepository.deleteBatchMaterial(materialIDs);
    }

    @Override
    public boolean addBatchImageToMaterial(String materialID, List<Image> imageEntities) {
        return materialDBIRepository.addBatchImageToMaterial(materialID, imageEntities.stream().map(ImageMapperOutput::toEntities).toList());
    }

    @Override
    public boolean deleteBatchImageFromMaterial(List<String> imageIDs) {
        return materialDBIRepository.deleteBatchImageFromMaterial(imageIDs);
    }

    @Override
    public boolean deleteAllImageByMaterialID(String materialID) {
        return materialDBIRepository.deleteAllImageByMaterialID(materialID);
    }

    @Override
    public boolean updateQuantityMaterial(String id, int quantity) {
        return materialDBIRepository.updateQuantityMaterial( id,  quantity);
    }
}
