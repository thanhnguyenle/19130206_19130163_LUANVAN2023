package fitnlu.ntpos.inventoryservice.application.services.material;

import fitnlu.ntpos.inventoryservice.application.ports.output.IWriteMaterialPort;
import fitnlu.ntpos.inventoryservice.application.usecases.material.ICreateMaterialUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IAddMaterialService implements ICreateMaterialUseCase{
    private final IWriteMaterialPort writeMaterialPort;

    @Override
    public Material createMaterial(Material material) {
        return writeMaterialPort.createMaterial(material);
    }
}
