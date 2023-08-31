package fitnlu.ntpos.inventoryservice.application.services.materialSetupDefault;

import fitnlu.ntpos.inventoryservice.application.ports.output.IWriteMaterialDefaultPort;
import fitnlu.ntpos.inventoryservice.application.usecases.materialSetupDefault.IAddMaterialDefaultUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IAddMaterialDefaultService implements IAddMaterialDefaultUseCase {
    private final IWriteMaterialDefaultPort writeMaterialDefaultPort;
    @Override
    public boolean addMaterialDefault(MaterialSetupDefault materialSetupDefault) {
        return writeMaterialDefaultPort.addMaterialDefault(materialSetupDefault);
    }

    @Override
    public boolean addBatchMaterialDefault(List<MaterialSetupDefault> materialSetupDefault) {
        return writeMaterialDefaultPort.addBatchMaterialDefault(materialSetupDefault);
    }
}
