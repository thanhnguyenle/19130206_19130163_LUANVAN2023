package fitnlu.ntpos.inventoryservice.application.ports.input;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.ListMaterialOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.domain.model.TimeSearch;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindMaterialEndpointPort {
    ListMaterialOutput findAllMaterialByProductID(String productID) ;
    ListMaterialOutput filterAllMaterialByProductID(PagingInput pagingInput, String productID, String searchType, String searchValue, String sortType, String sortValue) ;
   ListMaterialOutput findAllMaterialBySupplierID(String supplierID) ;
    ListMaterialOutput filterAllMaterialBySupplierID(PagingInput pagingInput, String supplierID, String searchType, String searchValue, String sortType, String sortValue) ;
   ListMaterialOutput findAllMaterial() ;
    ListMaterialOutput filterAllMaterial(PagingInput pagingInput, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
    MaterialOutput findMaterial(String materialID) ;
}
