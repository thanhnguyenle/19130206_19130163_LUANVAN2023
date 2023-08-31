package fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository;

import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;

import java.util.List;

public interface IMaterialSetupDefaultDBIRepository {
    List<MaterialSetupDefault> findAllMaterialDefault();
    boolean deleteMaterialDefault(String materialId);
    boolean deleteAllMaterialDefault();
    boolean addMaterialDefault(MaterialSetupDefault materialSetupDefault);
    boolean addBatchMaterialDefault(List<MaterialSetupDefault>  materialSetupDefault);
    boolean updateMaterialDefault(String materialId, MaterialSetupDefault materialSetupDefault);
    boolean updateBatchMaterialDefault(List<MaterialSetupDefault> materialSetupDefault);

    MaterialSetupDefault findMaterialDefaultByMaterialID(String materialID);
}
