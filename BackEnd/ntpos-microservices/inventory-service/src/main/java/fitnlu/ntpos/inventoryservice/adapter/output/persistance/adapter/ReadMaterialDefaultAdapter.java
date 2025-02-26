package fitnlu.ntpos.inventoryservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository.IMaterialSetupDefaultDBIRepository;
import fitnlu.ntpos.inventoryservice.application.ports.output.IReadMaterialDefaultPort;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ReadMaterialDefaultAdapter implements IReadMaterialDefaultPort {
    private final IMaterialSetupDefaultDBIRepository materialSetupDefaultDBIRepository;
    @Override
    public List<MaterialSetupDefault> findAllMaterialDefault() {
        return materialSetupDefaultDBIRepository.findAllMaterialDefault();
    }

    @Override
    public MaterialSetupDefault findMaterialDefaultByMaterialID(String materialID) {
        return materialSetupDefaultDBIRepository.findMaterialDefaultByMaterialID(materialID);
    }

    @Override
    public List<MaterialSetupDefault> findAllMaterialDefaultNotRepeat() {
        return materialSetupDefaultDBIRepository.findAllMaterialDefaultNotRepeat();
    }
}
