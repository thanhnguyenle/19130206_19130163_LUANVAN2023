package fitnlu.ntpos.inventoryservice.application.usecases.material;

import java.util.List;

public interface IAddBatchImageToMaterialUseCase {
    boolean addBatchImageToProduct(String materialID, List<String> imageIDs);

}
