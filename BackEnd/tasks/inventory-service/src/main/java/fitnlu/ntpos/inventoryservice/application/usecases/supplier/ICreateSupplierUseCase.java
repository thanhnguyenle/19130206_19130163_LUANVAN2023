package fitnlu.ntpos.inventoryservice.application.usecases.supplier;

import fitnlu.ntpos.inventoryservice.domain.model.Supplier;

public interface ICreateSupplierUseCase {
    Supplier createSupplier(Supplier supplier);
}
