package fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialEntities;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.SupplierEntities;
import fitnlu.ntpos.inventoryservice.domain.model.Supplier;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;

import java.util.List;

public interface ISupplierDBIRepository {
    List<SupplierEntities> findALlSupplierByMaterialID(String materialID) ;

    List<SupplierEntities> filterALlSupplierByMaterialID(IPaging paging, String materialID, String searchType, String searchValue, String sortType, String sortValue);

    List<SupplierEntities> filterALlSupplierByMaterialID(String materialID, String searchType, String searchValue, String sortType, String sortValue) ;

    List<SupplierEntities> findALlSupplier();

    List<SupplierEntities> filterALlSupplier(IPaging paging, String searchType, String searchValue, String sortType, String sortValue) ;

    List<SupplierEntities> filterALlSupplier(String searchType, String searchValue, String sortType, String sortValue);

    SupplierEntities findSupplier(String id) ;
    SupplierEntities createSupplier(SupplierEntities supplierEntities);
    SupplierEntities updateSupplier(String id, SupplierEntities supplierEntities);
    SupplierEntities deleteSupplier(String id);
}
