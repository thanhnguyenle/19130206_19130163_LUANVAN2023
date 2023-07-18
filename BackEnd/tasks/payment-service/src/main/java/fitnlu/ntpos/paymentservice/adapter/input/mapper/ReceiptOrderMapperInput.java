package fitnlu.ntpos.paymentservice.adapter.input.mapper;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialOutput;
import fitnlu.ntpos.inventoryservice.domain.model.Material;

public class ReceiptOrderMapperInput {
    public static MaterialOutput toDTO(Material material) {
        return MaterialOutput.builder()
                .id(material.getId())
                .name(material.getName())
                .description(material.getDescription())
                .price(material.getPrice())
                .quantity(material.getQuantity())
                .expiredDate(material.getExpiredDate())
                .manufacturerDate(material.getManufacturerDate())
                .status(material.getStatus())
                .unit(material.getUnit())
                .build();
    }

    public static Material toDomain(MaterialInput materialInput) {
        return Material.builder()
                .name(materialInput.name())
                .description(materialInput.description())
                .price(materialInput.price())
                .quantity(materialInput.quantity())
                .expiredDate(materialInput.expiredDate())
                .manufacturerDate(materialInput.manufacturerDate())
                .status(materialInput.status())
                .unit(materialInput.unit())
                .build();
    }

}
