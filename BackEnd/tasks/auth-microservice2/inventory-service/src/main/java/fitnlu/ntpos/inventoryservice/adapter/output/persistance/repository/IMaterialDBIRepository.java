package fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialEntities;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialImageEntities;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.domain.model.TimeSearch;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IMaterialDBIRepository {
    List<MaterialEntities> findAllMaterialByProductID(String productID) ;
    List<MaterialEntities> filterAllMaterialByProductID(IPaging paging, String productID, String searchType, String searchValue, String sortType, String sortValue) ;
    List<MaterialEntities> filterAllMaterialByProductID(String productID, String searchType, String searchValue, String sortType, String sortValue) ;
    List<MaterialEntities> findAllMaterialBySupplierID(String supplierID) ;
    List<MaterialEntities> filterAllMaterialBySupplierID(IPaging paging, String supplierID, String searchType, String searchValue, String sortType, String sortValue) ;
    List<MaterialEntities> filterAllMaterialBySupplierID(String supplierID, String searchType, String searchValue, String sortType, String sortValue) ;
    List<MaterialEntities> findAllMaterial() ;
    List<MaterialEntities> filterAllMaterial(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
    List<MaterialEntities> filterAllMaterial(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
    MaterialEntities findMaterial(String materialID) ;
    MaterialEntities createMaterial(MaterialEntities materialEntities);
    MaterialEntities updateMaterial(String id, MaterialEntities materialEntities);
    MaterialEntities deleteMaterial(String id);
     boolean addBatchMaterial(List<MaterialEntities> materialEntities) ;
     boolean deleteBatchMaterial(List<String> materialIDs) ;
    boolean addBatchImageToMaterial(String materialID, List<MaterialImageEntities> imageEntities);
    boolean deleteBatchImageFromMaterial(List<String> imageIDs);
    boolean deleteAllImageByMaterialID(String materialID);
}
