package fitnlu.ntpos.inventoryservice.application.usecases.materialSetupDefault;

import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;

public interface IUpdateMaterialDefault {
    boolean updateMaterialDefault(String materialId, MaterialSetupDefault materialSetupDefault);
}
