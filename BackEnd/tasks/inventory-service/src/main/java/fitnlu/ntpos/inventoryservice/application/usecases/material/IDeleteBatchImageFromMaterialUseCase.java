package fitnlu.ntpos.inventoryservice.application.usecases.material;

import java.util.List;

public interface IDeleteBatchImageFromMaterialUseCase {
    boolean addBatchImageToProduct(String productID, List<String> imageIDs);
}
