package fitnlu.ntpos.inventoryservice.application.ports.output;

import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IReadMaterialReturnPort {
    List<MaterialReturn> findAllMaterialReturn() ;
    List<MaterialReturn> filterAllMaterialReturn(IPaging paging, String searchType, String searchValue, String sortType, String sortValue);
    List<MaterialReturn> filterAllMaterialReturn(String searchType, String searchValue, String sortType, String sortValue) ;
    MaterialReturn findMaterialReturn(String materialID) ;
}
