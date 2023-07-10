package fitnlu.ntpos.inventoryservice.application.ports.input;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialImageOutput;
import fitnlu.ntpos.inventoryservice.domain.model.Image;

import java.util.List;

public interface IFindImageEndpointPort {
    List<MaterialImageOutput> findAllImageByMaterialID(String materialID);
}
