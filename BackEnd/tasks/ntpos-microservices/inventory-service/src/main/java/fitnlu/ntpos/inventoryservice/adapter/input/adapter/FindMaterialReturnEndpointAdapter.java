package fitnlu.ntpos.inventoryservice.adapter.input.adapter;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.ListMaterialReturnOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialReturnOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.MaterialReturnMapperInput;
import fitnlu.ntpos.inventoryservice.application.ports.input.IFindMaterialReturnEndpointPort;
import fitnlu.ntpos.inventoryservice.application.usecases.materialReturn.IFindAllMaterialReturnUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.materialReturn.IFindMaterialReturnUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.PageRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class FindMaterialReturnEndpointAdapter implements IFindMaterialReturnEndpointPort {
    private final IFindMaterialReturnUseCase findMaterialReturnUseCase;
    private final IFindAllMaterialReturnUseCase findAllMaterialReturnUseCase;
    @Override
    public ListMaterialReturnOutput findAllMaterialReturn() {
        List<MaterialReturnOutput> materialReturnOutputs = findAllMaterialReturnUseCase.findAllMaterialReturn().stream().map(MaterialReturnMapperInput::toDTO).toList();
        return ListMaterialReturnOutput.builder()
                .materialReturnOutputs(materialReturnOutputs)
                .currentPage(1)
                .totalPage(1)
                .totalItem(materialReturnOutputs.size())
                .build();
    }

    @Override
    public ListMaterialReturnOutput filterAllMaterialReturn(PagingInput pagingInput, String searchType, String searchValue, String sortType, String sortValue) {
        IPaging ipaging = pagingInput != null ? new PageRequest(pagingInput.page(), pagingInput.limit()) : null;
        List<MaterialReturn> products = findAllMaterialReturnUseCase.filterAllMaterialReturn(searchType, searchValue,sortType, sortValue);
        int totalItem = products.size();
        if (ipaging != null && ipaging.getPage() != null) {
            List<MaterialReturnOutput> materialReturnOutputs = products.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(MaterialReturnMapperInput::toDTO).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListMaterialReturnOutput.builder()
                    .materialReturnOutputs(materialReturnOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        }
      return ListMaterialReturnOutput.builder()
                .materialReturnOutputs(products.stream().map(MaterialReturnMapperInput::toDTO).toList())
                .currentPage(1)
                .totalPage(1)
                .totalItem(totalItem)
                .build();
    }

    @Override
    public MaterialReturnOutput findMaterialReturn(String materialID) {
        return MaterialReturnMapperInput.toDTO(findMaterialReturnUseCase.findMaterialReturn(materialID));
    }
}
