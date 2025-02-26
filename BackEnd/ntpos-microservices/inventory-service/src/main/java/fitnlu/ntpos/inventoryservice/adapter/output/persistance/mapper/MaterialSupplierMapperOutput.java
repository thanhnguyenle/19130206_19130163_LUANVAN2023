package fitnlu.ntpos.inventoryservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialSupplierEntities;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSupplier;

public class MaterialSupplierMapperOutput {
    public static MaterialSupplierEntities toEntities(MaterialSupplier materialSupplier) {
        return MaterialSupplierEntities.builder()
                .materialID(materialSupplier.getMaterialID())
                .supplierID(materialSupplier.getSupplierID())
                .description(materialSupplier.getDescription())
                .supplyDate(materialSupplier.getSupplyDate())
                .status(materialSupplier.getStatus())
                .build();
    }
    public static MaterialSupplier toDomain(MaterialSupplierEntities materialSupplierEntities){
        return MaterialSupplier.builder()
                .materialID(materialSupplierEntities.getMaterialID())
                .supplierID(materialSupplierEntities.getSupplierID())
                .description(materialSupplierEntities.getDescription())
                .supplyDate(materialSupplierEntities.getSupplyDate())
                .status(materialSupplierEntities.getStatus())
                .build();
    }
}
