package fitnlu.ntpos.inventoryservice.application.services.supplier;

import fitnlu.ntpos.inventoryservice.application.ports.output.IWriteSupplierPort;
import fitnlu.ntpos.inventoryservice.application.usecases.supplier.IAddMaterialToSupplierUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.supplier.IDeleteMaterialFromSupplierUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.supplier.IUpdateSupplierUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSupplier;
import fitnlu.ntpos.inventoryservice.domain.model.Supplier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IUpdateSupplierService implements IUpdateSupplierUseCase,
        IAddMaterialToSupplierUseCase, IDeleteMaterialFromSupplierUseCase {
    private final IWriteSupplierPort writeSupplierPort;
    @Override
    public Supplier updateSupplier(String id, Supplier supplier) {
        return writeSupplierPort.updateSupplier(id, supplier);
    }

    @Override
    public boolean addMaterialToSupplier(String supplierID, List<MaterialSupplier> materialSuppliers) {
        return writeSupplierPort.addMaterialToSupplier(supplierID, materialSuppliers);
    }

    @Override
    public boolean deleteMaterialFromSupplier(String supplierID, List<String> materialIDs) {
        return writeSupplierPort.deleteMaterialFromSupplier(supplierID, materialIDs);
    }

    @Override
    public boolean deleteALlMaterialFromSupplier(String supplierID) {
        return writeSupplierPort.deleteALlMaterialFromSupplier(supplierID);
    }
}
