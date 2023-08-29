package fitnlu.ntpos.inventoryservice.adapter.input.mapper;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.SupplierInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.SupplierOutput;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.domain.model.Supplier;

public class SupplierMapperInput {
    public static SupplierOutput toDTO(Supplier supplier) {
        return SupplierOutput.builder()
                .id(supplier.getId())
                .name(supplier.getName())
                .address(supplier.getAddress())
                .phone(supplier.getPhone())
                .email(supplier.getEmail())
                .website(supplier.getWebsite())
                .status(supplier.getStatus())
                .description(supplier.getDescription())
                .build();
    }

    public static Supplier toDomain(SupplierInput supplierInput) {
        return Supplier.builder()
                .name(supplierInput.name())
                .address(supplierInput.address())
                .phone(supplierInput.phone())
                .email(supplierInput.email())
                .website(supplierInput.website())
                .status(supplierInput.status())
                .description(supplierInput.description())
                .build();
    }

}
