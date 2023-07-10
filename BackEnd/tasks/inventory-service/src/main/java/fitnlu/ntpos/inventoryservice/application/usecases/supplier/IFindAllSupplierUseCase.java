package fitnlu.ntpos.inventoryservice.application.usecases.supplier;

import fitnlu.ntpos.inventoryservice.domain.model.Supplier;

public interface IFindAllSupplierUseCase {
    Supplier findSupplier(String id);
}
