package fitnlu.ntpos.inventoryservice.application.usecases.materialReturn.material;

import fitnlu.ntpos.inventoryservice.domain.model.Material;

public interface ICreateMaterialUseCase {
    Material createMaterial(Material material);
}
