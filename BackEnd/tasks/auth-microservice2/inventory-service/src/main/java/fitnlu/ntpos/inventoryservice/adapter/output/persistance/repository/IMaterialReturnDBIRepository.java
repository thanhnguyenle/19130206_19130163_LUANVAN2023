package fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialEntities;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialReturnEntities;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IMaterialReturnDBIRepository {
    List<MaterialReturnEntities> findAllMaterialReturn() ;
    List<MaterialReturnEntities> filterAllMaterialReturn(IPaging paging, String searchType, String searchValue, String sortType, String sortValue);
    List<MaterialReturnEntities> filterAllMaterialReturn(String searchType, String searchValue, String sortType, String sortValue) ;
    MaterialReturnEntities findMaterialReturn(String materialID) ;
    MaterialReturnEntities createMaterialReturn(MaterialReturnEntities materialReturnEntities);
    MaterialReturnEntities deleteMaterialReturn(String id);
    MaterialReturnEntities updateMaterialReturn(String id, MaterialReturnEntities materialReturnEntities);
}
