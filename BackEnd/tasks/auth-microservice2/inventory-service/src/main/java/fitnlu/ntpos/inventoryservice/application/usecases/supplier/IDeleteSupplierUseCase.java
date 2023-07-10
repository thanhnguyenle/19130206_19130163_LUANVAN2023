package fitnlu.ntpos.inventoryservice.application.usecases.supplier;

import fitnlu.ntpos.inventoryservice.domain.model.Supplier;

public interface IDeleteSupplierUseCase {
    Supplier deleteSupplier(String id);
}
