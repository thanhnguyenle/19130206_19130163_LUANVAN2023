package fitnlu.ntpos.inventoryservice.application.ports.output;

import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.domain.model.TimeSearch;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IReadMaterialPort {
  List<Material> findAllMaterialByProductID(String productID) ;
    List<Material> filterAllMaterialByProductID(IPaging paging, String productID, String searchType, String searchValue, String sortType, String sortValue) ;
    List<Material> filterAllMaterialByProductID(String productID, String searchType, String searchValue, String sortType, String sortValue) ;
    List<Material> findAllMaterialBySupplierID(String supplierID) ;
    List<Material> filterAllMaterialBySupplierID(IPaging paging, String supplierID, String searchType, String searchValue, String sortType, String sortValue) ;
    List<Material> filterAllMaterialBySupplierID(String supplierID, String searchType, String searchValue, String sortType, String sortValue) ;
    List<Material> findAllMaterial() ;
    List<Material> filterAllMaterial(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
    List<Material> filterAllMaterial(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
    Material findMaterial(String materialID) ;
}
