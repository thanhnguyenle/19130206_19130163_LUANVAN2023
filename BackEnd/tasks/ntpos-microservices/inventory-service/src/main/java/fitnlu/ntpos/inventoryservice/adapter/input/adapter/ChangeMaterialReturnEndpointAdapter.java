package fitnlu.ntpos.inventoryservice.adapter.input.adapter;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialReturnInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialReturnOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.MaterialReturnMapperInput;
import fitnlu.ntpos.inventoryservice.application.ports.input.IChangeMaterialReturnEndpointPort;
import fitnlu.ntpos.inventoryservice.application.ports.input.IFindMaterialEndpointPort;
import fitnlu.ntpos.inventoryservice.application.ports.output.IWriteMaterialReturnPort;
import fitnlu.ntpos.inventoryservice.application.usecases.materialReturn.*;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ChangeMaterialReturnEndpointAdapter implements IChangeMaterialReturnEndpointPort {
    private final ICreateMaterialReturnUseCase createMaterialReturnUseCase;
    private final IDeleteMaterialReturnUseCase deleteMaterialReturnUseCase;
    private final IUpdateMaterialReturnUseCase  updateMaterialReturnUseCase;


    @Override
    public MaterialReturnOutput createMaterialReturn(MaterialReturnInput materialReturnInput) {
        return MaterialReturnMapperInput.toDTO(createMaterialReturnUseCase.createMaterialReturn(MaterialReturnMapperInput.toDomain(materialReturnInput)));
    }

    @Override
    public MaterialReturnOutput deleteMaterialReturn(String id) {
        return MaterialReturnMapperInput.toDTO(deleteMaterialReturnUseCase.deleteMaterialReturn(id));
    }

    @Override
    public MaterialReturnOutput updateMaterialReturn(String id, MaterialReturnInput materialReturnInput) {
        return MaterialReturnMapperInput.toDTO(updateMaterialReturnUseCase.updateMaterialReturn(id,MaterialReturnMapperInput.toDomain(materialReturnInput)));
    }
}
