package fitnlu.ntpos.productservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.productservice.adapter.output.persistance.entities.ProductImageEntities;
import fitnlu.ntpos.productservice.domain.model.ProductImage;

import java.util.List;

public class ImageMapperOutput {
    public static ProductImageEntities toProductImageEntities(ProductImage productImage){
        return ProductImageEntities.builder()
                .id(productImage.getId())
                .url(productImage.getUrl())
                .description(productImage.getDescription())
                .build();
    }
    public static ProductImage toProductImage(ProductImageEntities productImageEntities){
        return ProductImage.builder()
                .id(productImageEntities.getId())
                .url(productImageEntities.getUrl())
                .description(productImageEntities.getDescription())
                .build();
    }
}
