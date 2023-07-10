package fitnlu.ntpos.inventoryservice.application.services.materialReturn;

import fitnlu.ntpos.inventoryservice.application.ports.output.IWriteMaterialReturnPort;
import fitnlu.ntpos.inventoryservice.application.usecases.materialReturn.IUpdateMaterialReturnUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IUpdateMaterialReturnService implements IUpdateMaterialReturnUseCase {
    private final IWriteMaterialReturnPort writeMaterialReturnPort;
    @Override
    public MaterialReturn updateMaterialReturn(String id, MaterialReturn materialReturn) {
        return writeMaterialReturnPort.updateMaterialReturn(id, materialReturn);
    }
}
