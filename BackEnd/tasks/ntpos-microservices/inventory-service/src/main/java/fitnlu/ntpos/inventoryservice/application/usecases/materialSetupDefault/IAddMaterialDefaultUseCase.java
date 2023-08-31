package fitnlu.ntpos.inventoryservice.application.usecases.materialSetupDefault;

import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;

import java.util.List;

public interface IAddMaterialDefaultUseCase {
    boolean addMaterialDefault(MaterialSetupDefault materialSetupDefault);
    boolean addBatchMaterialDefault(List<MaterialSetupDefault> materialSetupDefault);
}
