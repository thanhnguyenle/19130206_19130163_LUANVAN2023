package fitnlu.ntpos.inventoryservice.application.services.materialReturn;

import fitnlu.ntpos.inventoryservice.application.ports.output.IWriteMaterialReturnPort;
import fitnlu.ntpos.inventoryservice.application.usecases.material.IDeleteMaterialUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.materialReturn.IDeleteMaterialReturnUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IDeleteMaterialReturnService implements IDeleteMaterialReturnUseCase {
    private final IWriteMaterialReturnPort writeMaterialReturnPort;
    @Override
    public MaterialReturn deleteMaterialReturn(String id) {
        return writeMaterialReturnPort.deleteMaterialReturn(id);
    }
}
