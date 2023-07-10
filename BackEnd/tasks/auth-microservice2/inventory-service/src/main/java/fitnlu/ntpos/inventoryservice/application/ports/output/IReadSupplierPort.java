package fitnlu.ntpos.inventoryservice.application.ports.output;

import fitnlu.ntpos.inventoryservice.domain.model.MaterialSupplier;
import fitnlu.ntpos.inventoryservice.domain.model.Supplier;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;

import java.util.List;

public interface IReadSupplierPort {
    List<MaterialSupplier> findALlSupplierByMaterialID(String materialID) ;

    List<MaterialSupplier> filterALlSupplierByMaterialID(IPaging paging, String materialID, String searchType, String searchValue, String sortType, String sortValue);

   List<MaterialSupplier> filterALlSupplierByMaterialID(String materialID, String searchType, String searchValue, String sortType, String sortValue) ;

  List<Supplier> findALlSupplier();

    List<Supplier> filterALlSupplier(IPaging paging, String searchType, String searchValue, String sortType, String sortValue) ;

    List<Supplier> filterALlSupplier(String searchType, String searchValue, String sortType, String sortValue);

    Supplier findSupplier(String id) ;
}
