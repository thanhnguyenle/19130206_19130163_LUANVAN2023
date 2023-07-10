package fitnlu.ntpos.inventoryservice.application.ports.output;

import fitnlu.ntpos.inventoryservice.domain.model.MaterialSupplier;
import fitnlu.ntpos.inventoryservice.domain.model.Supplier;

import java.util.List;

public interface IWriteSupplierPort {
    Supplier createSupplier(Supplier supplier);

    Supplier updateSupplier(String id, Supplier supplier);

    Supplier deleteSupplier(String id);

    boolean addMaterialToSupplier(String supplierID, List<MaterialSupplier> materialSuppliers);

    boolean deleteMaterialFromSupplier(String supplierID, List<String> materialIDs);

    boolean deleteALlMaterialFromSupplier(String supplierID);
}