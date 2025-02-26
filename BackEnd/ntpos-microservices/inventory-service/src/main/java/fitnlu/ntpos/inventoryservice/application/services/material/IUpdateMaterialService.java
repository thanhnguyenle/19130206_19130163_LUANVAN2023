package fitnlu.ntpos.inventoryservice.application.services.material;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialImageEntities;
import fitnlu.ntpos.inventoryservice.application.ports.output.IWriteMaterialPort;
import fitnlu.ntpos.inventoryservice.application.usecases.material.*;
import fitnlu.ntpos.inventoryservice.domain.model.Image;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IUpdateMaterialService implements IUpdateMaterialUseCase,
        IAddBatchMaterialUseCase,
        IDeleteBatchMaterialUseCase, IAddBatchImageToMaterialUseCase,
    IDeleteBatchImageFromMaterialUseCase{
    private final IWriteMaterialPort writeMaterialPort;
    @Override
    public Material updateMaterial(String id, Material material) {
        return writeMaterialPort.updateMaterial(id, material);
    }

    @Override
    public boolean updateQuantityMaterial(String id, int quantity) {
        return writeMaterialPort.updateQuantityMaterial( id,  quantity);
    }

    @Override
    public boolean addBatchMaterial(List<Material> materials) {
        return writeMaterialPort.addBatchMaterial(materials);
    }

    @Override
    public boolean deleteBatchMaterial(List<String> materialIDs) {
        return writeMaterialPort.deleteBatchMaterial(materialIDs);
    }

    @Override
    public boolean addBatchImageToProduct(String materialID, List<Image> imageIDs) {
        return writeMaterialPort.addBatchImageToMaterial(materialID, imageIDs);
    }

    @Override
    public boolean deleteBatchImageToMaterial(List<String> imageIDs) {
        return writeMaterialPort.deleteBatchImageFromMaterial(imageIDs);
    }

    @Override
    public boolean deleteAllImageByMaterialID(String materialID) {
        return writeMaterialPort.deleteAllImageByMaterialID(materialID);
    }
}
