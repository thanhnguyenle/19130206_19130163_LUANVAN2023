package fitnlu.ntpos.inventoryservice.application.services.supplier;

import fitnlu.ntpos.inventoryservice.application.ports.output.IReadSupplierPort;
import fitnlu.ntpos.inventoryservice.application.usecases.supplier.IFindAllSupplierByMaterialIDUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.supplier.IFindAllSupplierUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.supplier.IFindSupplierUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSupplier;
import fitnlu.ntpos.inventoryservice.domain.model.Supplier;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IFindSupplierService implements IFindSupplierUseCase,
        IFindAllSupplierUseCase, IFindAllSupplierByMaterialIDUseCase {
    private final IReadSupplierPort readSupplierPort;
    @Override
    public List<MaterialSupplier> findALlSupplierByMaterialID(String materialID) {
        return readSupplierPort.findALlSupplierByMaterialID(materialID);
    }

    @Override
    public List<MaterialSupplier> filterALlSupplierByMaterialID(IPaging paging, String materialID, String searchType, String searchValue, String sortType, String sortValue) {
        return readSupplierPort.filterALlSupplierByMaterialID(paging, materialID, searchType, searchValue, sortType, sortValue);
    }

    @Override
    public List<MaterialSupplier> filterALlSupplierByMaterialID(String materialID, String searchType, String searchValue, String sortType, String sortValue) {
        return readSupplierPort.filterALlSupplierByMaterialID(materialID, searchType, searchValue, sortType, sortValue);
    }

    @Override
    public List<Supplier> findALlSupplier() {
        return readSupplierPort.findALlSupplier();
    }

    @Override
    public List<Supplier> filterALlSupplier(IPaging paging, String searchType, String searchValue, String sortType, String sortValue) {
        return readSupplierPort.filterALlSupplier(paging, searchType, searchValue, sortType, sortValue);
    }

    @Override
    public List<Supplier> filterALlSupplier(String searchType, String searchValue, String sortType, String sortValue) {
        return readSupplierPort.filterALlSupplier(searchType, searchValue, sortType, sortValue);
    }

    @Override
    public Supplier findSupplier(String id) {
        return readSupplierPort.findSupplier(id);
    }
}
