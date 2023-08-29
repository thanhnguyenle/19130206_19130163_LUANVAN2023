package fitnlu.ntpos.inventoryservice.adapter.input.mapper;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialImageInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialImageOutput;
import fitnlu.ntpos.inventoryservice.domain.model.Image;

public class ImageMapperInput {
    public static MaterialImageOutput toDTO(Image image) {
        return MaterialImageOutput.builder()
                .id(image.getId())
                .url(image.getUrl())
                .description(image.getDescription())
                .materialID(image.getMaterialID())
                .build();
    }

    public static Image toDomain(MaterialImageInput materialImageInput) {
        return Image.builder()
                .url(materialImageInput.url())
                .description(materialImageInput.description())
                .materialID(materialImageInput.materialID())
                .build();
    }

}
