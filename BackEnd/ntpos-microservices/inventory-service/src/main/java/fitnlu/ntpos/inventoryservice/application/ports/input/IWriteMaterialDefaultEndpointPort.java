package fitnlu.ntpos.inventoryservice.application.ports.input;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialSetupDefaultInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.ResultOutput;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;

import java.util.List;

public interface IWriteMaterialDefaultEndpointPort {
    ResultOutput deleteMaterialDefault(String materialId);
    ResultOutput deleteAllMaterialDefault();
    ResultOutput addMaterialDefault(MaterialSetupDefaultInput materialSetupDefault);
    ResultOutput addBatchMaterialDefault(List<MaterialSetupDefaultInput>  materialSetupDefault);
    ResultOutput updateMaterialDefault(String materialId, MaterialSetupDefaultInput materialSetupDefault);
    ResultOutput updateBatchMaterialDefault(List<MaterialSetupDefaultInput> materialSetupDefault);
}
