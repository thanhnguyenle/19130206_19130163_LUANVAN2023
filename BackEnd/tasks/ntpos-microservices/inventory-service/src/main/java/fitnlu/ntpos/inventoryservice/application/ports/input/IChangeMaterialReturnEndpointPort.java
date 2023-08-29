package fitnlu.ntpos.inventoryservice.application.ports.input;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialReturnInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialReturnOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IChangeMaterialReturnEndpointPort {
    MaterialReturnOutput createMaterialReturn(MaterialReturnInput materialReturnInput);
    MaterialReturnOutput deleteMaterialReturn(String id);
    MaterialReturnOutput updateMaterialReturn(String id, MaterialReturnInput materialReturnInput);
}
