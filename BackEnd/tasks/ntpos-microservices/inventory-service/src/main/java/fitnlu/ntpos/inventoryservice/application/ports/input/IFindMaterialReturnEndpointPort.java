package fitnlu.ntpos.inventoryservice.application.ports.input;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.ListMaterialReturnOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialReturnOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindMaterialReturnEndpointPort {
    ListMaterialReturnOutput findAllMaterialReturn() ;
    ListMaterialReturnOutput filterAllMaterialReturn(PagingInput pagingInput, String searchType, String searchValue, String sortType, String sortValue);
    MaterialReturnOutput findMaterialReturn(String materialID) ;
}
