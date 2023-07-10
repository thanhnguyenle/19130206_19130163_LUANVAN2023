package fitnlu.ntpos.inventoryservice.adapter.input.adapter;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.ListSupplierOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.SupplierOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.SupplierMapperInput;
import fitnlu.ntpos.inventoryservice.application.ports.input.IFindSupplierEndpointPort;
import fitnlu.ntpos.inventoryservice.application.usecases.supplier.IFindAllSupplierByMaterialIDUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.supplier.IFindAllSupplierUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.supplier.IFindSupplierUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.Supplier;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.PageRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class FindImageEndpointAdapter implements IFindSupplierEndpointPort {
    private final IFindAllSupplierUseCase findAllSupplierUseCase;
    private final IFindAllSupplierByMaterialIDUseCase findAllSupplierByMaterialIDUseCase;
    private final IFindSupplierUseCase findSupplierUseCase;

    @Override
    public ListSupplierOutput findALlSupplierByMaterialID(String materialID) {
        List<SupplierOutput> supplierOutputs = findAllSupplierByMaterialIDUseCase.findALlSupplierByMaterialID(materialID).stream().map(SupplierMapperInput::toDTO).toList();
        return ListSupplierOutput.builder()
                .supplierOutputs(supplierOutputs)
                .currentPage(1)
                .totalPage(1)
                .totalItem(supplierOutputs.size())
                .build();
    }

    @Override
    public ListSupplierOutput filterALlSupplierByMaterialID(PagingInput pagingInput, String materialID, String searchType, String searchValue, String sortType, String sortValue) {
        IPaging ipaging = pagingInput != null ? new PageRequest(pagingInput.page(), pagingInput.limit()) : null;
        List<Supplier> products = findAllSupplierByMaterialIDUseCase.filterALlSupplierByMaterialID(materialID, sortType, sortValue, searchType, searchValue);
        int totalItem = products.size();
        if (ipaging != null && ipaging.getPage() != null) {
            List<SupplierOutput> supplierOutputs = products.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(SupplierMapperInput::toDTO).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListSupplierOutput.builder()
                    .supplierOutputs(supplierOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        }
        return ListSupplierOutput.builder()
                .supplierOutputs(products.stream().map(SupplierMapperInput::toDTO).toList())
                .currentPage(1)
                .totalPage(1)
                .totalItem(totalItem)
                .build();
    }

    @Override
    public ListSupplierOutput findALlSupplier() {
        List<SupplierOutput> supplierOutputs = findAllSupplierUseCase.findALlSupplier().stream().map(SupplierMapperInput::toDTO).toList();
        return ListSupplierOutput.builder()
                .supplierOutputs(supplierOutputs)
                .currentPage(1)
                .totalPage(1)
                .totalItem(supplierOutputs.size())
                .build();
    }

    @Override
    public ListSupplierOutput filterALlSupplier(PagingInput pagingInput, String searchType, String searchValue, String sortType, String sortValue) {
        IPaging ipaging = pagingInput != null ? new PageRequest(pagingInput.page(), pagingInput.limit()) : null;
        List<Supplier> products = findAllSupplierUseCase.filterALlSupplier(sortType, sortValue, searchType, searchValue);
        int totalItem = products.size();
        if (ipaging != null && ipaging.getPage() != null) {
            List<SupplierOutput> supplierOutputs = products.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(SupplierMapperInput::toDTO).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListSupplierOutput.builder()
                    .supplierOutputs(supplierOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        }
        return ListSupplierOutput.builder()
                .supplierOutputs(products.stream().map(SupplierMapperInput::toDTO).toList())
                .currentPage(1)
                .totalPage(1)
                .totalItem(totalItem)
                .build();
    }

    @Override
    public SupplierOutput findSupplier(String id) {
        return SupplierMapperInput.toDTO(findSupplierUseCase.findSupplier(id));
    }
}
