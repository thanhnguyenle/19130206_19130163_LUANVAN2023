package fitnlu.ntpos.inventoryservice.application.usecases.supplier;

import fitnlu.ntpos.inventoryservice.domain.model.Supplier;

public interface IFindSupplierUseCase {
    Supplier updateSupplier(String id, Supplier supplier);
}
