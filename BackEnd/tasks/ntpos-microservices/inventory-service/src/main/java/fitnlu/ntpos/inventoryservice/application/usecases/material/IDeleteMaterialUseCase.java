package fitnlu.ntpos.inventoryservice.application.usecases.material;

import fitnlu.ntpos.inventoryservice.domain.model.Material;

public interface IDeleteMaterialUseCase {
    Material deleteMaterial(String id);
}
