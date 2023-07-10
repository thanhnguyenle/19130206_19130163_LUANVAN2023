package fitnlu.ntpos.inventoryservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialImageEntities;
import fitnlu.ntpos.inventoryservice.domain.model.Image;

public class ImageMapperOutput {
    public static MaterialImageEntities toEntities(Image image) {
        return MaterialImageEntities.builder()
                .id(image.getId())
                .url(image.getUrl())
                .description(image.getDescription())
                .materialID(image.getMaterialID())
                .build();
    }
    public static Image toDomain(MaterialImageEntities materialImageEntities){
        return Image.builder()
                .id(materialImageEntities.getId())
                .url(materialImageEntities.getUrl())
                .description(materialImageEntities.getDescription())
                .materialID(materialImageEntities.getMaterialID())
                .build();
    }
}
