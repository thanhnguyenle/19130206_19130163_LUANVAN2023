package fitnlu.ntpos.inventoryservice.application.ports.output;

import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;

public interface IWriteMaterialReturnPort {
    MaterialReturn createMaterialReturn(MaterialReturn material);
    MaterialReturn deleteMaterialReturn(String id);
    MaterialReturn updateMaterialReturn(String id, MaterialReturn material);
}
