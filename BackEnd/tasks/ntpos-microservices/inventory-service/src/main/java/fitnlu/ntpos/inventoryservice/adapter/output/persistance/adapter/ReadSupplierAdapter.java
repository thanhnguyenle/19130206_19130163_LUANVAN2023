package fitnlu.ntpos.inventoryservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.mapper.MaterialSupplierMapperOutput;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.mapper.SupplierMapperOutput;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository.ISupplierDBIRepository;
import fitnlu.ntpos.inventoryservice.application.ports.output.IReadSupplierPort;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSupplier;
import fitnlu.ntpos.inventoryservice.domain.model.Supplier;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ReadSupplierAdapter implements IReadSupplierPort {
    private final ISupplierDBIRepository supplierDBIRepository;
    @Override
    public List<MaterialSupplier> findALlSupplierByMaterialID(String materialID) {
        return supplierDBIRepository.findALlSupplierByMaterialID(materialID)
                .stream()
                .map(MaterialSupplierMapperOutput::toDomain)
                .toList();
    }

    @Override
    public List<MaterialSupplier> filterALlSupplierByMaterialID(IPaging paging, String materialID, String searchType, String searchValue, String sortType, String sortValue) {
        return supplierDBIRepository.filterALlSupplierByMaterialID(paging,materialID,searchType,searchValue,sortType,sortValue)
                .stream()
                .map(MaterialSupplierMapperOutput::toDomain)
                .toList();
    }

    @Override
    public List<MaterialSupplier> filterALlSupplierByMaterialID(String materialID, String searchType, String searchValue, String sortType, String sortValue) {
        return supplierDBIRepository.filterALlSupplierByMaterialID(materialID,searchType,searchValue,sortType,sortValue)
                .stream()
                .map(MaterialSupplierMapperOutput::toDomain)
                .toList();
    }

    @Override
    public List<Supplier> findALlSupplier() {
        return supplierDBIRepository.findALlSupplier()
                .stream()
                .map(SupplierMapperOutput::toDomain)
                .toList();
    }

    @Override
    public List<Supplier> filterALlSupplier(IPaging paging, String searchType, String searchValue, String sortType, String sortValue) {
        return supplierDBIRepository.filterALlSupplier(paging,searchType,searchValue,sortType,sortValue)
                .stream()
                .map(SupplierMapperOutput::toDomain)
                .toList();
    }

    @Override
    public List<Supplier> filterALlSupplier(String searchType, String searchValue, String sortType, String sortValue) {
        return supplierDBIRepository.filterALlSupplier(searchType,searchValue,sortType,sortValue)
                .stream()
                .map(SupplierMapperOutput::toDomain)
                .toList();
    }

    @Override
    public Supplier findSupplier(String id) {
        return SupplierMapperOutput.toDomain(supplierDBIRepository.findSupplier(id));
    }
}
