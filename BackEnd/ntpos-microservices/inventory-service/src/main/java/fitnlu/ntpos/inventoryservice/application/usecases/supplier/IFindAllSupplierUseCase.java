package fitnlu.ntpos.inventoryservice.application.usecases.supplier;

import fitnlu.ntpos.inventoryservice.domain.model.Supplier;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IFindAllSupplierUseCase {
    List<Supplier> findALlSupplier();
    List<Supplier> filterALlSupplier(IPaging paging, String searchType, String searchValue, String sortType, String sortValue );
    List<Supplier> filterALlSupplier(String searchType, String searchValue, String sortType, String sortValue );
}
