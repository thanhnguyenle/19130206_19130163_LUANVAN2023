package fitnlu.ntpos.inventoryservice.application.services.materialReturn;

import fitnlu.ntpos.inventoryservice.application.ports.output.IWriteMaterialReturnPort;
import fitnlu.ntpos.inventoryservice.application.usecases.material.ICreateMaterialUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.materialReturn.ICreateMaterialReturnUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IAddMaterialReturnService implements ICreateMaterialReturnUseCase {
    private final IWriteMaterialReturnPort writeMaterialReturnPort;
    @Override
    public MaterialReturn createMaterialReturn(MaterialReturn material) {
        return writeMaterialReturnPort.createMaterialReturn(material);
    }
}
