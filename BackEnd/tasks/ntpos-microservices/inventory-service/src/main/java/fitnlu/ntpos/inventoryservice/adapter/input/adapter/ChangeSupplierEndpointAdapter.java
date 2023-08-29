package fitnlu.ntpos.inventoryservice.adapter.input.adapter;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialSupplierInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.ResultOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.SupplierInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.SupplierOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.MaterialSupplierMapperInput;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.SupplierMapperInput;
import fitnlu.ntpos.inventoryservice.application.ports.input.IChangeSupplierEndpointPort;
import fitnlu.ntpos.inventoryservice.application.usecases.supplier.*;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ChangeSupplierEndpointAdapter implements IChangeSupplierEndpointPort {
    private final ICreateSupplierUseCase createSupplierUseCase;
    private final IUpdateSupplierUseCase updateSupplierUseCase;
    private final IDeleteSupplierUseCase deleteSupplierUseCase;
    private final IAddMaterialToSupplierUseCase addMaterialToSupplierUseCase;
    private final IDeleteMaterialFromSupplierUseCase deleteMaterialFromSupplierUseCase;
    @Override
    public SupplierOutput createSupplier(SupplierInput supplierInput) {
        return SupplierMapperInput.toDTO(createSupplierUseCase.createSupplier(SupplierMapperInput.toDomain(supplierInput)));
    }

    @Override
    public SupplierOutput updateSupplier(String id, SupplierInput supplierInput) {
        return SupplierMapperInput.toDTO(updateSupplierUseCase.updateSupplier(id, SupplierMapperInput.toDomain(supplierInput)));
    }

    @Override
    public SupplierOutput deleteSupplier(String id) {
        return SupplierMapperInput.toDTO(deleteSupplierUseCase.deleteSupplier(id));
    }

    @Override
    public ResultOutput addMaterialToSupplier(String supplierID, List<MaterialSupplierInput> materialSupplierInputs) {
        return ResultOutput.builder()
                .success(addMaterialToSupplierUseCase.addMaterialToSupplier(supplierID, materialSupplierInputs.stream().map(MaterialSupplierMapperInput::toDomain).toList()))
                .build();
    }

    @Override
    public ResultOutput deleteMaterialFromSupplier(String supplierID, List<String> materialIDs) {
        return ResultOutput.builder()
                .success(deleteMaterialFromSupplierUseCase.deleteMaterialFromSupplier(supplierID, materialIDs))
                .build();
    }

    @Override
    public ResultOutput deleteALlMaterialFromSupplier(String supplierID) {
        return ResultOutput.builder()
                .success(deleteMaterialFromSupplierUseCase.deleteALlMaterialFromSupplier(supplierID))
                .build();
    }
}
