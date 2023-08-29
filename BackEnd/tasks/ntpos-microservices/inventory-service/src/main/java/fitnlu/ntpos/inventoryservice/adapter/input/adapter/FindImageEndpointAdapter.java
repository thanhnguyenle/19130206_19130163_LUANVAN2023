package fitnlu.ntpos.inventoryservice.adapter.input.adapter;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialImageOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.ImageMapperInput;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.MaterialMapperInput;
import fitnlu.ntpos.inventoryservice.application.ports.input.IFindImageEndpointPort;
import fitnlu.ntpos.inventoryservice.application.usecases.image.IFindAllImageByMaterialIDUseCase;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class FindImageEndpointAdapter implements IFindImageEndpointPort {
    private final IFindAllImageByMaterialIDUseCase findImageEndpointPortUseCase;
    @Override
    public List<MaterialImageOutput> findAllImageByMaterialID(String materialID) {
        return findImageEndpointPortUseCase.findAllImageByMaterialID(materialID).stream().map(ImageMapperInput::toDTO).toList();
    }
}
