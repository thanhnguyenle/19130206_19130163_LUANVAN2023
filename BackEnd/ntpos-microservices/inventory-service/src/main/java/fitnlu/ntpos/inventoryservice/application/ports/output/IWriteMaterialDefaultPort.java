package fitnlu.ntpos.inventoryservice.application.ports.output;

import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;

import java.util.List;

public interface IWriteMaterialDefaultPort {
    boolean deleteMaterialDefault(String materialId);
    boolean deleteAllMaterialDefault();
    boolean addMaterialDefault(MaterialSetupDefault materialSetupDefault);
    boolean addBatchMaterialDefault(List<MaterialSetupDefault>  materialSetupDefault);
    boolean updateMaterialDefault(String materialId, MaterialSetupDefault materialSetupDefault);
    boolean updateBatchMaterialDefault(List<MaterialSetupDefault> materialSetupDefault);
}
