package fitnlu.ntpos.inventoryservice.application.usecases.material;

import fitnlu.ntpos.inventoryservice.domain.model.Material;

import java.util.List;

public interface IDeleteBatchMaterialUseCase {
    boolean addBatchMaterial(List<Material> materials);
}
