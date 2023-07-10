package fitnlu.ntpos.inventoryservice.application.usecases.material;

import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindAllMaterialBySupplierIDUseCase {
    List<Material> findAllMaterialBySupplierID(String supplierID);
    List<Material> filterAllMaterialBySupplierID(IPaging paging, String supplierID,String searchType, String searchValue, String sortType, String sortValue);
    List<Material> filterAllMaterialBySupplierID(String supplierID,String searchType, String searchValue, String sortType, String sortValue);
}
