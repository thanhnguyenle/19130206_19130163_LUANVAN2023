package fitnlu.ntpos.inventoryservice.application.usecases.materialReturn;

import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;

public interface IFindMaterialReturnUseCase {
    MaterialReturn findMaterialReturn(String materialID);
}
