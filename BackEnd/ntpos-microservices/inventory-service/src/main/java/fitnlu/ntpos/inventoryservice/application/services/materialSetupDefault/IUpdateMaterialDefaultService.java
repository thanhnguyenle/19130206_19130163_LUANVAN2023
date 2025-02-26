package fitnlu.ntpos.inventoryservice.application.services.materialSetupDefault;

import fitnlu.ntpos.inventoryservice.application.ports.output.IWriteMaterialDefaultPort;
import fitnlu.ntpos.inventoryservice.application.usecases.materialSetupDefault.IUpdateMaterialDefaultUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class IUpdateMaterialDefaultService implements IUpdateMaterialDefaultUseCase {
    private final IWriteMaterialDefaultPort writeMaterialDefaultPort;
    @Override
    public boolean updateMaterialDefault(String materialId, MaterialSetupDefault materialSetupDefault) {
        return writeMaterialDefaultPort.updateMaterialDefault(materialId, materialSetupDefault);
    }

    @Override
    public boolean updateBatchMaterialDefault(List<MaterialSetupDefault> materialSetupDefault) {
        return writeMaterialDefaultPort.updateBatchMaterialDefault(materialSetupDefault);
    }


}
