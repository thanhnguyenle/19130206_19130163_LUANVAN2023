package fitnlu.ntpos.inventoryservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialEntities;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.SupplierEntities;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.domain.model.Supplier;

public class SupplierMapperOutput {
    public static SupplierEntities toEntities(Supplier supplier) {
        return SupplierEntities.builder()
                .id(supplier.getId())
                .name(supplier.getName())
                .address(supplier.getAddress())
                .phone(supplier.getPhone())
                .email(supplier.getEmail())
                .description(supplier.getDescription())
                .status(supplier.getStatus())
                .website(supplier.getWebsite())
                .build();
    }
    public static Supplier toDomain(SupplierEntities supplierEntities){
        return Supplier.builder()
                .id(supplierEntities.getId())
                .name(supplierEntities.getName())
                .address(supplierEntities.getAddress())
                .phone(supplierEntities.getPhone())
                .email(supplierEntities.getEmail())
                .description(supplierEntities.getDescription())
                .status(supplierEntities.getStatus())
                .website(supplierEntities.getWebsite())
                .build();
    }
}
