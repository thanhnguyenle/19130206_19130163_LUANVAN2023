package fitnlu.ntpos.inventoryservice.application.ports.output;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialImageEntities;
import fitnlu.ntpos.inventoryservice.domain.model.Image;
import fitnlu.ntpos.inventoryservice.domain.model.Material;

import java.util.List;

public interface IWriteMaterialPort {
    Material createMaterial(Material material);
    Material updateMaterial(String id, Material material);
    Material deleteMaterial(String id);
    boolean addBatchMaterial(List<Material> materials);
    boolean deleteBatchMaterial(List<String> materialIDs);

    boolean addBatchImageToMaterial(String materialID, List<Image> imageEntities);
    boolean deleteBatchImageFromMaterial(List<String> imageIDs);
    boolean deleteAllImageByMaterialID(String materialID);

}
