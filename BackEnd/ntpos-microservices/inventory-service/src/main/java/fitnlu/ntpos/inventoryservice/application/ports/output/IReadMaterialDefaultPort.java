package fitnlu.ntpos.inventoryservice.application.ports.output;

import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;

import java.util.List;

public interface IReadMaterialDefaultPort {
    List<MaterialSetupDefault> findAllMaterialDefault();

    MaterialSetupDefault findMaterialDefaultByMaterialID(String materialID);

    List<MaterialSetupDefault> findAllMaterialDefaultNotRepeat();
}
