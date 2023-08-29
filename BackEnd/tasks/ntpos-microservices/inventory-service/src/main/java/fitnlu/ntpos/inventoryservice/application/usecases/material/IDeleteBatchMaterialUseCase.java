package fitnlu.ntpos.inventoryservice.application.usecases.material;

import java.util.List;

public interface IDeleteBatchMaterialUseCase {
    boolean deleteBatchMaterial(List<String> materialIDs);
}
