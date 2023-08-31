package fitnlu.ntpos.inventoryservice.application.services.materialSetupDefault;

import fitnlu.ntpos.inventoryservice.application.ports.output.IReadMaterialDefaultPort;
import fitnlu.ntpos.inventoryservice.application.usecases.materialSetupDefault.IFindAllMaterialDefaultUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class IFindAllMaterialDefaultService implements IFindAllMaterialDefaultUseCase {
    private IReadMaterialDefaultPort readMaterialDefaultPort;
    @Override
    public List<MaterialSetupDefault> findAllMaterialDefault() {
        return readMaterialDefaultPort.findAllMaterialDefault();
    }

    @Override
    public MaterialSetupDefault findMaterialDefaultByMaterialID(String materialID) {
        return readMaterialDefaultPort.findMaterialDefaultByMaterialID( materialID);
    }
}
