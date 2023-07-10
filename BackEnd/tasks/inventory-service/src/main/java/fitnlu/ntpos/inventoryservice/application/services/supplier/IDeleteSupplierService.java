package fitnlu.ntpos.inventoryservice.application.services.supplier;

import fitnlu.ntpos.inventoryservice.application.ports.output.IWriteSupplierPort;
import fitnlu.ntpos.inventoryservice.application.usecases.supplier.IDeleteSupplierUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.Supplier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IDeleteSupplierService implements IDeleteSupplierUseCase {
    private final IWriteSupplierPort writeSupplierPort;
    @Override
    public Supplier deleteSupplier(String id) {
        return writeSupplierPort.deleteSupplier(id);
    }
}
