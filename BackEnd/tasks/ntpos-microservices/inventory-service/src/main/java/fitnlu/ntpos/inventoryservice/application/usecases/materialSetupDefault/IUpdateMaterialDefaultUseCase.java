package fitnlu.ntpos.inventoryservice.application.usecases.materialSetupDefault;

import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;

import java.util.List;

public interface IUpdateMaterialDefaultUseCase {
    boolean updateMaterialDefault(String materialId, MaterialSetupDefault materialSetupDefault);
    boolean updateBatchMaterialDefault(List<MaterialSetupDefault> materialSetupDefault);
}
