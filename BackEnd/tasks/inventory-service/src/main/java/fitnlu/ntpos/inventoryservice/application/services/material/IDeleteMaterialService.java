package fitnlu.ntpos.inventoryservice.application.services.material;

import fitnlu.ntpos.inventoryservice.application.ports.output.IWriteMaterialPort;
import fitnlu.ntpos.inventoryservice.application.usecases.material.IDeleteMaterialUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IDeleteMaterialService implements IDeleteMaterialUseCase {
    private final IWriteMaterialPort writeMaterialPort;
    @Override
    public Material deleteMaterial(String id) {
        return writeMaterialPort.deleteMaterial(id);
    }
}
