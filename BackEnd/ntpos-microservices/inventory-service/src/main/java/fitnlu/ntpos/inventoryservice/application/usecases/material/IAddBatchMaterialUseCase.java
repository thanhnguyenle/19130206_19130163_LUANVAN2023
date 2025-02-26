package fitnlu.ntpos.inventoryservice.application.usecases.material;

import fitnlu.ntpos.inventoryservice.domain.model.Material;

import java.util.List;

public interface IAddBatchMaterialUseCase {
    boolean addBatchMaterial(List<Material> materials);
}
