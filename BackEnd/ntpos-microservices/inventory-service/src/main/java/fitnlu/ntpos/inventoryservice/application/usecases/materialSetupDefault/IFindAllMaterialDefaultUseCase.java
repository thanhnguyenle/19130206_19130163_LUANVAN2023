package fitnlu.ntpos.inventoryservice.application.usecases.materialSetupDefault;

import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;

import java.util.List;

public interface IFindAllMaterialDefaultUseCase {
    List<MaterialSetupDefault> findAllMaterialDefault();
    MaterialSetupDefault findMaterialDefaultByMaterialID(String materialID);
    List<MaterialSetupDefault> findAllMaterialDefaultNotRepeat();
}
