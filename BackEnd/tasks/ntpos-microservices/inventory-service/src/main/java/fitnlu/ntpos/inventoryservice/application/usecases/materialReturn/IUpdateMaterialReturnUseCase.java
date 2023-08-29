package fitnlu.ntpos.inventoryservice.application.usecases.materialReturn;

import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;

public interface IUpdateMaterialReturnUseCase {
    MaterialReturn updateMaterialReturn(String id, MaterialReturn materialReturn);
}
