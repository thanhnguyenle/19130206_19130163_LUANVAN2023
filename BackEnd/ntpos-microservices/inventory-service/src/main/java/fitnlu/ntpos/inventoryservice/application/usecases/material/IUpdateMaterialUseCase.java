package fitnlu.ntpos.inventoryservice.application.usecases.material;

import fitnlu.ntpos.inventoryservice.domain.model.Material;

public interface IUpdateMaterialUseCase {
    Material updateMaterial(String id, Material material);
    boolean updateQuantityMaterial(String id, int quantity);
}
