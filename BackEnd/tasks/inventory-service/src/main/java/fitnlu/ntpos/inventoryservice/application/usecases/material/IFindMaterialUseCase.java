package fitnlu.ntpos.inventoryservice.application.usecases.material;

import fitnlu.ntpos.inventoryservice.domain.model.Material;

public interface IFindMaterialUseCase {
    Material updateMaterial(String id, Material material);
}
