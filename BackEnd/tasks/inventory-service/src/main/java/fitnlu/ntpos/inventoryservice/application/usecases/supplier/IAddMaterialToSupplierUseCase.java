package fitnlu.ntpos.inventoryservice.application.usecases.supplier;

import fitnlu.ntpos.inventoryservice.domain.model.Supplier;

public interface IAddMaterialToSupplierUseCase {
    Supplier createSupplier(Supplier supplier);
}
