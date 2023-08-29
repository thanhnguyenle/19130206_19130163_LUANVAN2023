package fitnlu.ntpos.inventoryservice.application.usecases.material;

import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.domain.model.TimeSearch;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindAllMaterialUseCase {
    List<Material> findAllMaterial();
    List<Material> filterAllMaterial(IPaging paging,TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue );
    List<Material> filterAllMaterial(TimeSearch timeSearch,String searchType, String searchValue, String sortType, String sortValue );
}
