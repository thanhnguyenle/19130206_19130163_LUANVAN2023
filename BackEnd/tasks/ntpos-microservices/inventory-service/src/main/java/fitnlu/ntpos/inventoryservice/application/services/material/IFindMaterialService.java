package fitnlu.ntpos.inventoryservice.application.services.material;

import fitnlu.ntpos.inventoryservice.application.ports.output.IReadMaterialPort;
import fitnlu.ntpos.inventoryservice.application.usecases.material.IFindAllMaterialByProductIDUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.material.IFindAllMaterialBySupplierIDUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.material.IFindAllMaterialUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.material.IFindMaterialUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.domain.model.TimeSearch;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IFindMaterialService implements IFindAllMaterialByProductIDUseCase,
        IFindAllMaterialUseCase, IFindMaterialUseCase,
        IFindAllMaterialBySupplierIDUseCase{
    private final IReadMaterialPort readMaterialPort;
    @Override
    public List<Material> findAllMaterialByProductID(String productID) {
        return readMaterialPort.findAllMaterialByProductID(productID);
    }

    @Override
    public List<Material> filterAllMaterialByProductID(IPaging paging, String productID, String searchType, String searchValue, String sortType, String sortValue) {
        return readMaterialPort.filterAllMaterialByProductID(paging, productID, searchType, searchValue, sortType, sortValue);
    }

    @Override
    public List<Material> filterAllMaterialByProductID( String productID, String searchType, String searchValue, String sortType, String sortValue) {
        return readMaterialPort.filterAllMaterialByProductID( productID, searchType, searchValue, sortType, sortValue);
    }

    @Override
    public List<Material> findAllMaterialBySupplierID(String supplierID) {
        return readMaterialPort.findAllMaterialBySupplierID(supplierID);
    }

    @Override
    public List<Material> filterAllMaterialBySupplierID(IPaging paging, String supplierID, String searchType, String searchValue, String sortType, String sortValue) {
        return readMaterialPort.filterAllMaterialBySupplierID(paging, supplierID, searchType, searchValue, sortType, sortValue);
    }

    @Override
    public List<Material> filterAllMaterialBySupplierID(String supplierID, String searchType, String searchValue, String sortType, String sortValue) {
        return readMaterialPort.filterAllMaterialBySupplierID(supplierID, searchType, searchValue, sortType, sortValue);
    }

    @Override
    public List<Material> findAllMaterial() {
        return readMaterialPort.findAllMaterial();
    }

    @Override
    public List<Material> filterAllMaterial(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return readMaterialPort.filterAllMaterial(paging,timeSearch, searchType, searchValue, sortType, sortValue);
    }

    @Override
    public List<Material> filterAllMaterial( TimeSearch timeSearch,String searchType, String searchValue, String sortType, String sortValue) {
        return readMaterialPort.filterAllMaterial(timeSearch, searchType, searchValue, sortType, sortValue);
    }

    @Override
    public Material findMaterial(String materialID) {
        return readMaterialPort.findMaterial(materialID);
    }
}
