package fitnlu.ntpos.inventoryservice.application.ports.output;

import fitnlu.ntpos.inventoryservice.domain.model.Image;

import java.util.List;

public interface IReadImagePort {
    List<Image> findAllImageByMaterialID(String materialID);
}
