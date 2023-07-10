package fitnlu.ntpos.inventoryservice.adapter.input.mapper;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialReturnInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialReturnOutput;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialReturn;

public class MaterialReturnMapperInput {
    public static MaterialReturnOutput toDTO(MaterialReturn materialReturn) {
        return MaterialReturnOutput.builder()
                .id(materialReturn.getId())
                .materialID(materialReturn.getMaterialID())
                .price(materialReturn.getPrice())
                .unit(materialReturn.getUnit())
                .quantity(materialReturn.getQuantity())
                .status(materialReturn.getStatus())
                .description(materialReturn.getDescription())
                .returnDate(materialReturn.getReturnDate())
                .build();
    }

    public static MaterialReturn toDomain(MaterialReturnInput materialReturnInput) {
        return MaterialReturn.builder()
                .materialID(materialReturnInput.materialID())
                .price(materialReturnInput.price())
                .unit(materialReturnInput.unit())
                .quantity(materialReturnInput.quantity())
                .status(materialReturnInput.status())
                .description(materialReturnInput.description())
                .returnDate(materialReturnInput.returnDate())
                .build();
    }

}
