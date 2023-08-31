package fitnlu.ntpos.inventoryservice.adapter.input.mapper;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialSetupDefaultInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialSetupDefaultOutput;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;

public class MaterialSetupDefaultMapperInput {
    public static MaterialSetupDefaultOutput toDTO(MaterialSetupDefault material) {
        return MaterialSetupDefaultOutput.builder()
                .materialId(material.getMaterialId())
                .id(material.getId())
                .description(material.getDescription())
                .quantity(material.getQuantity())
                .status(material.getStatus())
                .unit(material.getUnit())
                .build();
    }

    public static MaterialSetupDefaultOutput toMaterialSetup(Material material) {
        return MaterialSetupDefaultOutput.builder()
                .materialId(material.getId())
                .description(material.getDescription())
                .quantity(0)
                .status(material.getStatus())
                .unit(material.getUnit())
                .build();
    }

    public static MaterialSetupDefault toDomain(MaterialSetupDefaultInput materialInput) {
        return MaterialSetupDefault.builder()
                .materialId(materialInput.materialID())
                .description(materialInput.description())
                .quantity(materialInput.quantity())
                .status(materialInput.status())
                .unit(materialInput.unit())
                .build();
    }

}
