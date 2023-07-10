package fitnlu.ntpos.inventoryservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialEntities;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialReturnEntities;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;

public class MaterialReturnMapperOutput {
    public static MaterialReturnEntities toEntities(MaterialReturn materialReturn) {
        return MaterialReturnEntities.builder()
                .id(materialReturn.getId())
                .materialID(materialReturn.getMaterialID())
                .quantity(materialReturn.getQuantity())
                .price(materialReturn.getPrice())
                .returnDate(materialReturn.getReturnDate())
                .description(materialReturn.getDescription())
                .status(materialReturn.getStatus())
                .unit(materialReturn.getUnit())
                .build();
    }
    public static MaterialReturn toDomain(MaterialReturnEntities materialReturnEntities){
        return MaterialReturn.builder()
                .id(materialReturnEntities.getId())
                .materialID(materialReturnEntities.getMaterialID())
                .quantity(materialReturnEntities.getQuantity())
                .price(materialReturnEntities.getPrice())
                .returnDate(materialReturnEntities.getReturnDate())
                .description(materialReturnEntities.getDescription())
                .status(materialReturnEntities.getStatus())
                .unit(materialReturnEntities.getUnit())
                .build();
    }
}
