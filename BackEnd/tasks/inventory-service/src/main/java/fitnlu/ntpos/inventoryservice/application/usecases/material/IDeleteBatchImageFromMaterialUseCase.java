package fitnlu.ntpos.inventoryservice.application.usecases.material;

import java.util.List;

public interface IDeleteBatchImageFromMaterialUseCase {
    boolean deleteBatchImageToMaterial(List<String> imageIDs);
    boolean deleteAllImageByMaterialID(String materialID);
}
