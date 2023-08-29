package fitnlu.ntpos.inventoryservice.application.services.supplier;

import fitnlu.ntpos.inventoryservice.application.ports.output.IWriteSupplierPort;
import fitnlu.ntpos.inventoryservice.application.usecases.supplier.ICreateSupplierUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.Supplier;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IAddSupplierService implements ICreateSupplierUseCase {
    private final IWriteSupplierPort writeSupplierPort;

    @Override
    public Supplier createSupplier(Supplier supplier) {
        return writeSupplierPort.createSupplier(supplier);
    }
}
