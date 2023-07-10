package fitnlu.ntpos.inventoryservice.application.usecases.image;

import fitnlu.ntpos.inventoryservice.domain.model.Image;

import java.util.List;

public interface IFindAllImageByMaterialIDUseCase {
    List<Image> findAllImageByMaterialID(String materialID);
}
