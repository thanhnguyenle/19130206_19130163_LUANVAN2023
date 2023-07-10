package fitnlu.ntpos.inventoryservice.application.usecases.supplier;

import fitnlu.ntpos.inventoryservice.domain.model.MaterialSupplier;
import fitnlu.ntpos.inventoryservice.domain.model.Supplier;

import java.util.List;

public interface IAddMaterialToSupplierUseCase {
    boolean addMaterialToSupplier(String supplierID, List<MaterialSupplier> materialSuppliers);
}
