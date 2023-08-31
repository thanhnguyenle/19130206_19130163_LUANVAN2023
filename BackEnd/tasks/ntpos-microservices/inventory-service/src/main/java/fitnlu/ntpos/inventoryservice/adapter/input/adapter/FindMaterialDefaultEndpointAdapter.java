package fitnlu.ntpos.inventoryservice.adapter.input.adapter;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialSetupDefaultOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.MaterialMapperInput;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.MaterialSetupDefaultMapperInput;
import fitnlu.ntpos.inventoryservice.application.ports.input.IFindMaterialEndpointPort;
import fitnlu.ntpos.inventoryservice.application.ports.input.IReadMaterialDefaultEndpointPort;
import fitnlu.ntpos.inventoryservice.application.usecases.material.IFindAllMaterialUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.materialSetupDefault.IFindAllMaterialDefaultUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Adapter
@RequiredArgsConstructor
public class FindMaterialDefaultEndpointAdapter implements IReadMaterialDefaultEndpointPort {
    private final IFindAllMaterialDefaultUseCase findAllMaterialDefaultUseCase;
    private final IFindAllMaterialUseCase findAllMaterialUseCase;
    @Override
    public List<MaterialSetupDefaultOutput> findAllMaterialDefault() {
        return findAllMaterialUseCase.findAllMaterial().stream().map(material -> {
            MaterialSetupDefault materialSetupDefault = findAllMaterialDefaultUseCase.findMaterialDefaultByMaterialID(material.getId());
            if(materialSetupDefault!=null){
                return MaterialSetupDefaultMapperInput.toDTO(materialSetupDefault);
            }else {
                return MaterialSetupDefaultMapperInput.toMaterialSetup(material);
            }
        }).toList();
    }
}
