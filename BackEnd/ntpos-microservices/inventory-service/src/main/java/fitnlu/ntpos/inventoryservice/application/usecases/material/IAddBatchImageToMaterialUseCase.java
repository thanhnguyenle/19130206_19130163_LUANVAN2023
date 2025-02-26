package fitnlu.ntpos.inventoryservice.application.usecases.material;

import fitnlu.ntpos.inventoryservice.domain.model.Image;

import java.util.List;

public interface IAddBatchImageToMaterialUseCase {
    boolean addBatchImageToProduct(String materialID, List<Image> imageIDs);

}
