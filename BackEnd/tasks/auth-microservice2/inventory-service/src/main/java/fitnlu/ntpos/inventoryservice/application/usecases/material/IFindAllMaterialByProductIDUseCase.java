package fitnlu.ntpos.inventoryservice.application.usecases.material;

import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindAllMaterialByProductIDUseCase {
    List<Material> findAllMaterialByProductID(String productID);
    List<Material> filterAllMaterialByProductID(IPaging paging, String productID, String searchType, String searchValue, String sortType, String sortValue);
    List<Material> filterAllMaterialByProductID(String productID, String searchType, String searchValue, String sortType, String sortValue);
}
