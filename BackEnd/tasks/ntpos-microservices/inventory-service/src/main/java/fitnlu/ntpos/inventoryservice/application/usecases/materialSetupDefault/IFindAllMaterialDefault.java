package fitnlu.ntpos.inventoryservice.application.usecases.materialSetupDefault;

import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;

import java.util.List;

public interface IFindAllMaterialDefault {
    List<MaterialSetupDefault> findAllMaterialDefault();
}
