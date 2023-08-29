package fitnlu.ntpos.inventoryservice.application.services.materialReturn;

import fitnlu.ntpos.inventoryservice.application.ports.output.IReadMaterialReturnPort;
import fitnlu.ntpos.inventoryservice.application.usecases.materialReturn.IFindAllMaterialReturnUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.materialReturn.IFindMaterialReturnUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class IFindMaterialReturnService implements IFindAllMaterialReturnUseCase,
        IFindMaterialReturnUseCase {
    private final IReadMaterialReturnPort readMaterialReturnPort;
    @Override
    public List<MaterialReturn> findAllMaterialReturn() {
        return readMaterialReturnPort.findAllMaterialReturn();
    }

    @Override
    public List<MaterialReturn> filterAllMaterialReturn(IPaging paging, String searchType, String searchValue, String sortType, String sortValue) {
        return readMaterialReturnPort.filterAllMaterialReturn(paging, searchType, searchValue, sortType, sortValue);
    }

    @Override
    public List<MaterialReturn> filterAllMaterialReturn(String searchType, String searchValue, String sortType, String sortValue) {
        return readMaterialReturnPort.filterAllMaterialReturn(searchType, searchValue, sortType, sortValue);
    }

    @Override
    public MaterialReturn findMaterialReturn(String materialID) {
        return readMaterialReturnPort.findMaterialReturn(materialID);
    }
}
