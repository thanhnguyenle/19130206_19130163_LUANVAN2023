package fitnlu.ntpos.inventoryservice.application.usecases.supplier;

import java.util.List;

public interface IDeleteMaterialFromSupplierUseCase {
    boolean addMaterialToSupplier(String supplierID, List<String> materialIDs);
}
