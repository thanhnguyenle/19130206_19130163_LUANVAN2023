package fitnlu.ntpos.inventoryservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialReturnOutput;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.mapper.MaterialReturnMapperOutput;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository.IMaterialReturnDBIRepository;
import fitnlu.ntpos.inventoryservice.application.ports.output.IReadMaterialReturnPort;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ReadMaterialReturnAdapter implements IReadMaterialReturnPort {
    private final IMaterialReturnDBIRepository materialReturnDBIRepository;
    @Override
    public List<MaterialReturn> findAllMaterialReturn() {
        return materialReturnDBIRepository.findAllMaterialReturn()
                .stream()
                .map(MaterialReturnMapperOutput::toDomain)
                .toList();
    }

    @Override
    public List<MaterialReturn> filterAllMaterialReturn(IPaging paging, String searchType, String searchValue, String sortType, String sortValue) {
        return materialReturnDBIRepository.filterAllMaterialReturn(paging,searchType,searchValue,sortType,sortValue)
                .stream()
                .map(MaterialReturnMapperOutput::toDomain)
                .toList();
    }

    @Override
    public List<MaterialReturn> filterAllMaterialReturn(String searchType, String searchValue, String sortType, String sortValue) {
        return materialReturnDBIRepository.filterAllMaterialReturn(searchType,searchValue,sortType,sortValue)
                .stream()
                .map(MaterialReturnMapperOutput::toDomain)
                .toList();
    }

    @Override
    public MaterialReturn findMaterialReturn(String materialID) {
        return MaterialReturnMapperOutput.toDomain(materialReturnDBIRepository.findMaterialReturn(materialID));
    }
}
