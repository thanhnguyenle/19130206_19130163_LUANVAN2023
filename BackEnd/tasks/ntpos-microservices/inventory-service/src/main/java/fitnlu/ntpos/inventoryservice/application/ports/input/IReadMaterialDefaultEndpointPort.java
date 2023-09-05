package fitnlu.ntpos.inventoryservice.application.ports.input;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialSetupDefaultOutput;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;

import java.util.List;

public interface IReadMaterialDefaultEndpointPort {
    List<MaterialSetupDefaultOutput> findAllMaterialDefault();
    List<MaterialSetupDefaultOutput> findAllMaterialDefaultNotRepeat();
}
