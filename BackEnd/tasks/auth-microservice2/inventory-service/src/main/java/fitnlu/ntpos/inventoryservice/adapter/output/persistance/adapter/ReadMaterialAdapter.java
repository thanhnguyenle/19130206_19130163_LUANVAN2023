package fitnlu.ntpos.inventoryservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.mapper.MaterialMapperOutput;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository.IMaterialDBIRepository;
import fitnlu.ntpos.inventoryservice.application.ports.output.IReadMaterialPort;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.domain.model.TimeSearch;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Adapter
@RequiredArgsConstructor
public class ReadMaterialAdapter implements IReadMaterialPort {
    private final IMaterialDBIRepository materialDBIRepository;
    @Override
    public List<Material> findAllMaterialByProductID(String productID) {
        return materialDBIRepository.findAllMaterialByProductID(productID)
                .stream()
                .map(MaterialMapperOutput::toDomain)
                .toList();
    }

    @Override
    public List<Material> filterAllMaterialByProductID(IPaging paging, String productID, String searchType, String searchValue, String sortType, String sortValue) {
        return materialDBIRepository.filterAllMaterialByProductID(paging,productID,searchType,searchValue,sortType,sortValue)
                .stream()
                .map(MaterialMapperOutput::toDomain)
                .toList();
    }

    @Override
    public List<Material> filterAllMaterialByProductID(String productID, String searchType, String searchValue, String sortType, String sortValue) {
        return materialDBIRepository.filterAllMaterialByProductID(productID,searchType,searchValue,sortType,sortValue)
                .stream()
                .map(MaterialMapperOutput::toDomain)
                .toList();
    }

    @Override
    public List<Material> findAllMaterialBySupplierID(String supplierID) {
        return materialDBIRepository.findAllMaterialBySupplierID(supplierID)
                .stream()
                .map(MaterialMapperOutput::toDomain)
                .toList();
    }

    @Override
    public List<Material> filterAllMaterialBySupplierID(IPaging paging, String supplierID, String searchType, String searchValue, String sortType, String sortValue) {
        return materialDBIRepository.filterAllMaterialBySupplierID(paging,supplierID,searchType,searchValue,sortType,sortValue)
                .stream()
                .map(MaterialMapperOutput::toDomain)
                .toList();
    }

    @Override
    public List<Material> filterAllMaterialBySupplierID(String supplierID, String searchType, String searchValue, String sortType, String sortValue) {
        return materialDBIRepository.filterAllMaterialBySupplierID(supplierID,searchType,searchValue,sortType,sortValue)
                .stream()
                .map(MaterialMapperOutput::toDomain)
                .toList();
    }

    @Override
    public List<Material> findAllMaterial() {
        return materialDBIRepository.findAllMaterial()
                .stream()
                .map(MaterialMapperOutput::toDomain)
                .toList();
    }

    @Override
    public List<Material> filterAllMaterial(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return  materialDBIRepository.filterAllMaterial(paging,timeSearch,searchType,searchValue,sortType,sortValue)
                .stream()
                .map(MaterialMapperOutput::toDomain)
                .toList();
    }

    @Override
    public List<Material> filterAllMaterial(TimeSearch timeSearch,String searchType, String searchValue, String sortType, String sortValue) {
        return materialDBIRepository.filterAllMaterial(timeSearch, searchType,searchValue,sortType,sortValue)
                .stream()
                .map(MaterialMapperOutput::toDomain)
                .toList();
    }

    @Override
    public Material findMaterial(String materialID) {
        return MaterialMapperOutput.toDomain(materialDBIRepository.findMaterial(materialID));
    }
}
