package fitnlu.ntpos.inventoryservice.adapter.input.adapter;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.*;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.MaterialSupplierMapperInput;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.SupplierMapperInput;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.mapper.SupplierMapperOutput;
import fitnlu.ntpos.inventoryservice.application.ports.input.IFindSupplierEndpointPort;
import fitnlu.ntpos.inventoryservice.application.usecases.supplier.IFindAllSupplierByMaterialIDUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.supplier.IFindAllSupplierUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.supplier.IFindSupplierUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSupplier;
import fitnlu.ntpos.inventoryservice.domain.model.Supplier;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.PageRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class FindSupplierEndpointAdapter implements IFindSupplierEndpointPort {
    private final IFindAllSupplierUseCase findAllSupplierUseCase;
    private final IFindAllSupplierByMaterialIDUseCase findAllSupplierByMaterialIDUseCase;
    private final IFindSupplierUseCase findSupplierUseCase;

    @Override
    public ListMaterialSupplierOutput findALlSupplierByMaterialID(String materialID) {
        List<MaterialSupplierOutput> supplierOutputs = findAllSupplierByMaterialIDUseCase.findALlSupplierByMaterialID(materialID).stream().map(MaterialSupplierMapperInput::toDTO).toList();
        return ListMaterialSupplierOutput.builder()
                .materialSupplierOutputs(supplierOutputs)
                .currentPage(1)
                .totalPage(1)
                .totalItem(supplierOutputs.size())
                .build();
    }

    @Override
    public ListMaterialSupplierOutput filterALlSupplierByMaterialID(PagingInput pagingInput, String materialID, String searchType, String searchValue, String sortType, String sortValue) {
        IPaging ipaging = pagingInput != null ? new PageRequest(pagingInput.page(), pagingInput.limit()) : null;
        List<MaterialSupplier> products = findAllSupplierByMaterialIDUseCase.filterALlSupplierByMaterialID(materialID, searchType, searchValue, sortType, sortValue);
        int totalItem = products.size();
        if (ipaging != null && ipaging.getPage() != null) {
            List<MaterialSupplierOutput> supplierOutputs = products.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(MaterialSupplierMapperInput::toDTO).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListMaterialSupplierOutput.builder()
                    .materialSupplierOutputs(supplierOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        }
        return ListMaterialSupplierOutput.builder()
                .materialSupplierOutputs(products.stream().map(MaterialSupplierMapperInput::toDTO).toList())
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
        List<Supplier> products = findAllSupplierUseCase.filterALlSupplier(searchType, searchValue,sortType, sortValue);
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
