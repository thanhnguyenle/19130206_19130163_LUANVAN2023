package fitnlu.ntpos.inventoryservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.mapper.MaterialSupplierMapperOutput;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.mapper.SupplierMapperOutput;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository.ISupplierDBIRepository;
import fitnlu.ntpos.inventoryservice.application.ports.output.IWriteSupplierPort;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSupplier;
import fitnlu.ntpos.inventoryservice.domain.model.Supplier;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class WriteSupplierAdapter implements IWriteSupplierPort {
    private final ISupplierDBIRepository supplierDBIRepository;
    @Override
    public Supplier createSupplier(Supplier supplier) {
        return SupplierMapperOutput.toDomain(supplierDBIRepository.createSupplier(SupplierMapperOutput.toEntities(supplier)));
    }

    @Override
    public Supplier updateSupplier(String id, Supplier supplier) {
        return SupplierMapperOutput.toDomain(supplierDBIRepository.updateSupplier(id, SupplierMapperOutput.toEntities(supplier)));
    }

    @Override
    public Supplier deleteSupplier(String id) {
        return SupplierMapperOutput.toDomain(supplierDBIRepository.deleteSupplier(id));
    }

    @Override
    public boolean addMaterialToSupplier(String supplierID, List<MaterialSupplier> materialSuppliers) {
        return supplierDBIRepository.addMaterialToSupplier(supplierID, materialSuppliers.stream().map(MaterialSupplierMapperOutput::toEntities).toList());
    }

    @Override
    public boolean deleteMaterialFromSupplier(String supplierID, List<String> materialIDs) {
        return supplierDBIRepository.deleteMaterialFromSupplier(supplierID, materialIDs);
    }

    @Override
    public boolean deleteALlMaterialFromSupplier(String supplierID) {
        return supplierDBIRepository.deleteALlMaterialFromSupplier(supplierID);
    }
}
