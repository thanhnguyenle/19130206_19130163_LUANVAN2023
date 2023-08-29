package fitnlu.ntpos.productservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.productservice.adapter.output.persistance.entities.CategoryEntities;
import fitnlu.ntpos.productservice.adapter.output.persistance.entities.ProductEntities;
import fitnlu.ntpos.productservice.adapter.output.persistance.entities.ProductImageEntities;
import fitnlu.ntpos.productservice.domain.model.Category;
import fitnlu.ntpos.productservice.domain.model.Product;
import fitnlu.ntpos.productservice.domain.model.ProductImage;

import java.util.List;

public class ProductMapperOutput {
    public static ProductEntities toEntity(Product product) {
        List< CategoryEntities> categories = product.getCategories()!=null?product.getCategories().stream().map(CategoryMapperOutput::toEntity).toList():List.of();
        List<ProductImageEntities> images = product.getImages()!=null?product.getImages().stream()
                        .map(image -> ProductImageEntities.builder()
                            .id(image.getId())
                            .url(image.getUrl())
                            .description(image.getDescription())
                            .build()).toList():List.of();
        return ProductEntities.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .images(images)
                .categories(categories)
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .unit(product.getUnit())
                .status(product.getStatus())
                .createdAt(product.getCreatedAt())
                .build();
    }
    public static Product toDomain(ProductEntities productEntities) {
        List<Category> categories = productEntities.getCategories()!=null?productEntities.getCategories().stream().map(CategoryMapperOutput::toDomain).toList():List.of();
        List<ProductImage> images = productEntities.getImages()!=null?productEntities.getImages().stream()
                .map(image -> ProductImage.builder()
                        .id(image.getId())
                        .url(image.getUrl())
                        .description(image.getDescription())
                        .build()).toList():List.of();
        return Product.builder()
                .id(productEntities.getId())
                .name(productEntities.getName())
                .description(productEntities.getDescription())
                .images(images)
                .categories(categories)
                .price(productEntities.getPrice())
                .quantity(productEntities.getQuantity())
                .unit(productEntities.getUnit())
                .status(productEntities.getStatus())
                .createdAt(productEntities.getCreatedAt())
                .build();
    }
}
