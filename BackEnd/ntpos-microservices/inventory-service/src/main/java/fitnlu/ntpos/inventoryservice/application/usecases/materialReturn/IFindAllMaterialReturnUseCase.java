package fitnlu.ntpos.inventoryservice.application.usecases.materialReturn;

import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindAllMaterialReturnUseCase {
    List<MaterialReturn> findAllMaterialReturn();
    List<MaterialReturn> filterAllMaterialReturn(IPaging paging, String searchType, String searchValue, String sortType, String sortValue );
    List<MaterialReturn> filterAllMaterialReturn(String searchType, String searchValue, String sortType, String sortValue );
}
