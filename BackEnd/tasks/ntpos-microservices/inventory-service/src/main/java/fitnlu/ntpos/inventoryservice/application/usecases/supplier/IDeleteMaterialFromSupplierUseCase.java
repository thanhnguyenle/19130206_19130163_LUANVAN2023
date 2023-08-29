package fitnlu.ntpos.inventoryservice.application.usecases.supplier;

import java.util.List;

public interface IDeleteMaterialFromSupplierUseCase {
    boolean deleteMaterialFromSupplier(String supplierID, List<String> materialIDs);
    boolean deleteALlMaterialFromSupplier(String supplierID);
}
