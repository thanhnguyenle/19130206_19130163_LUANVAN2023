package fitnlu.ntpos.inventoryservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialEntities;
import fitnlu.ntpos.inventoryservice.domain.model.Material;

public class MaterialMapperOutput {
    public static MaterialEntities toEntities(Material material) {
        return MaterialEntities.builder()
                .id(material.getId())
                .name(material.getName())
                .description(material.getDescription())
                .unit(material.getUnit())
                .price(material.getPrice())
                .status(material.getStatus())
                .expiredDate(material.getExpiredDate())
                .manufacturerDate(material.getManufacturerDate())
                .quantity(material.getQuantity())
                .build();
    }
    public static Material toDomain(MaterialEntities materialEntities){
        return Material.builder()
                .id(materialEntities.getId())
                .name(materialEntities.getName())
                .description(materialEntities.getDescription())
                .unit(materialEntities.getUnit())
                .price(materialEntities.getPrice())
                .status(materialEntities.getStatus())
                .expiredDate(materialEntities.getExpiredDate())
                .manufacturerDate(materialEntities.getManufacturerDate())
                .quantity(materialEntities.getQuantity())
                .build();
    }
}
