package fitnlu.ntpos.inventoryservice.application.ports.input;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.ListMaterialSupplierOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.ListSupplierOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.SupplierOutput;
import fitnlu.ntpos.inventoryservice.domain.model.Supplier;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindSupplierEndpointPort {
    ListMaterialSupplierOutput findALlSupplierByMaterialID(String materialID) ;

    ListMaterialSupplierOutput filterALlSupplierByMaterialID(PagingInput pagingInput, String materialID, String searchType, String searchValue, String sortType, String sortValue);

    ListSupplierOutput findALlSupplier();

    ListSupplierOutput filterALlSupplier(PagingInput pagingInput, String searchType, String searchValue, String sortType, String sortValue) ;

    SupplierOutput findSupplier(String id) ;
}
