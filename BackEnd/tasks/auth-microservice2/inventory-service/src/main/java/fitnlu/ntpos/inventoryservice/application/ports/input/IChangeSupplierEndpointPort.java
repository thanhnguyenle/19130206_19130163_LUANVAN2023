package fitnlu.ntpos.inventoryservice.application.ports.input;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialSupplierInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.ResultOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.SupplierInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.SupplierOutput;

import java.util.List;

public interface IChangeSupplierEndpointPort {
    SupplierOutput createSupplier(SupplierInput supplierInput);
    SupplierOutput updateSupplier(String id, SupplierInput supplierInput);
    SupplierOutput deleteSupplier(String id);
    ResultOutput addMaterialToSupplier(String supplierID, List<MaterialSupplierInput> materialSupplierInputs);

    ResultOutput deleteMaterialFromSupplier(String supplierID, List<String> materialIDs);

    ResultOutput deleteALlMaterialFromSupplier(String supplierID);
}
