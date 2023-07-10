package fitnlu.ntpos.inventoryservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.mapper.MaterialReturnMapperOutput;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository.IMaterialDBIRepository;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository.IMaterialReturnDBIRepository;
import fitnlu.ntpos.inventoryservice.application.ports.output.IWriteMaterialReturnPort;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

@Adapter
@RequiredArgsConstructor
public class WriteMaterialReturnAdapter implements IWriteMaterialReturnPort {
    private final IMaterialReturnDBIRepository materialReturnDBIRepository;
    @Override
    public MaterialReturn createMaterialReturn(MaterialReturn material) {
        return MaterialReturnMapperOutput.toDomain(materialReturnDBIRepository.createMaterialReturn(MaterialReturnMapperOutput.toEntities(material)));
    }

    @Override
    public MaterialReturn deleteMaterialReturn(String id) {
        return MaterialReturnMapperOutput.toDomain(materialReturnDBIRepository.deleteMaterialReturn(id));
    }

    @Override
    public MaterialReturn updateMaterialReturn(String id, MaterialReturn material) {
        return MaterialReturnMapperOutput.toDomain(materialReturnDBIRepository.updateMaterialReturn(id, MaterialReturnMapperOutput.toEntities(material)));
    }
}
