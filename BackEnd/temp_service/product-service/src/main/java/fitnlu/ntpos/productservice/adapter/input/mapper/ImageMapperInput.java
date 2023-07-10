package fitnlu.ntpos.productservice.adapter.input.mapper;

import fitnlu.ntpos.productservice.adapter.input.dto.ProductImageInput;
import fitnlu.ntpos.productservice.adapter.input.dto.ProductImageOutput;
import fitnlu.ntpos.productservice.adapter.input.dto.ProductInput;
import fitnlu.ntpos.productservice.adapter.input.dto.ProductOutput;
import fitnlu.ntpos.productservice.domain.model.Category;
import fitnlu.ntpos.productservice.domain.model.Product;
import fitnlu.ntpos.productservice.domain.model.ProductImage;
import fitnlu.ntpos.productservice.infrastructure.annotations.Mapper;

import java.util.List;

@Mapper
public class ImageMapperInput {
    public static ProductImageOutput toDomain(ProductImage productImage){
        return ProductImageOutput.builder()
                .id(productImage.getId())
                .url(productImage.getUrl())
                .description(productImage.getDescription())
                .build();
    }
    public static ProductImage toEntity(ProductImageInput productImageInput){
        return ProductImage.builder()
                .id(productImageInput.getId())
                .url(productImageInput.getUrl())
                .description(productImageInput.getDescription())
                .build();
    }
}
