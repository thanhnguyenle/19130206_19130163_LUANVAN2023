package fitnlu.ntpos.inventoryservice.adapter.input.mapper;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialSupplierInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialSupplierOutput;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSupplier;

public class MaterialSupplierMapperInput {
    public static MaterialSupplierOutput toDTO(MaterialSupplier materialSupplier) {
        return MaterialSupplierOutput.builder()
                .materialID(materialSupplier.getMaterialID())
                .supplierID(materialSupplier.getSupplierID())
                .supplyDate(materialSupplier.getSupplyDate())
                .description(materialSupplier.getDescription())
                .status(materialSupplier.getStatus())
                .build();
    }

    public static MaterialSupplier toDomain(MaterialSupplierInput materialSupplierOutput) {
        return MaterialSupplier.builder()
                .materialID(materialSupplierOutput.materialID())
                .supplierID(materialSupplierOutput.supplierID())
                .supplyDate(materialSupplierOutput.supplyDate())
                .description(materialSupplierOutput.description())
                .status(materialSupplierOutput.status())
                .build();
    }

}
