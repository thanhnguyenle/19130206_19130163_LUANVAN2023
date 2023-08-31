package fitnlu.ntpos.inventoryservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository.IMaterialSetupDefaultDBIRepository;
import fitnlu.ntpos.inventoryservice.application.ports.output.IWriteMaterialDefaultPort;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class WriteMaterialDefaultAdapter implements IWriteMaterialDefaultPort {
    private final IMaterialSetupDefaultDBIRepository materialSetupDefaultDBIRepository;

    @Override
    public boolean deleteMaterialDefault(String materialId) {
        return materialSetupDefaultDBIRepository.deleteMaterialDefault(materialId);
    }

    @Override
    public boolean deleteAllMaterialDefault() {
        return materialSetupDefaultDBIRepository.deleteAllMaterialDefault();
    }

    @Override
    public boolean addMaterialDefault(MaterialSetupDefault materialSetupDefault) {
        return materialSetupDefaultDBIRepository.addMaterialDefault(materialSetupDefault);
    }

    @Override
    public boolean addBatchMaterialDefault(List<MaterialSetupDefault> materialSetupDefault) {
        return materialSetupDefaultDBIRepository.addBatchMaterialDefault(materialSetupDefault);
    }

    @Override
    public boolean updateMaterialDefault(String materialId, MaterialSetupDefault materialSetupDefault) {
        return materialSetupDefaultDBIRepository.updateMaterialDefault(materialId, materialSetupDefault);
    }

    @Override
    public boolean updateBatchMaterialDefault(List<MaterialSetupDefault> materialSetupDefault) {
        return materialSetupDefaultDBIRepository.updateBatchMaterialDefault(materialSetupDefault);
    }
}
