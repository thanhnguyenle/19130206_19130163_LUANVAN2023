package fitnlu.ntpos.inventoryservice.application.usecases.supplier;

import fitnlu.ntpos.inventoryservice.domain.model.MaterialSupplier;
import fitnlu.ntpos.inventoryservice.domain.model.Supplier;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindAllSupplierByMaterialIDUseCase {
    List<MaterialSupplier> findALlSupplierByMaterialID(String materialID);
    List<MaterialSupplier> filterALlSupplierByMaterialID(IPaging paging,String materialID, String searchType, String searchValue, String sortType, String sortValue );
    List<MaterialSupplier> filterALlSupplierByMaterialID(String materialID,String searchType, String searchValue, String sortType, String sortValue );
}
