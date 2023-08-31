package fitnlu.ntpos.inventoryservice.application.services.materialSetupDefault;

import fitnlu.ntpos.inventoryservice.application.ports.output.IWriteMaterialDefaultPort;
import fitnlu.ntpos.inventoryservice.application.usecases.materialSetupDefault.IDeleteMaterialDefaultUseCase;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IDeleteMaterialDefaultService implements IDeleteMaterialDefaultUseCase {
    private final IWriteMaterialDefaultPort writeMaterialDefaultPort;
    @Override
    public boolean deleteMaterialDefault(String materialId) {
        return writeMaterialDefaultPort.deleteMaterialDefault(materialId);
    }

    @Override
    public boolean deleteAllMaterialDefault() {
        return writeMaterialDefaultPort.deleteAllMaterialDefault();
    }
}
