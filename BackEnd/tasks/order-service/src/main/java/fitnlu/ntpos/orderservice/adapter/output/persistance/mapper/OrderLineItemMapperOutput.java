package fitnlu.ntpos.orderservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.OrderLineItemEntities;
import fitnlu.ntpos.orderservice.adapter.output.persistance.entities.TableEntities;
import fitnlu.ntpos.orderservice.domain.model.Order;

import java.util.List;

public class OrderMapperOutput {
    public static OrderEntities toEntity(Order order) {
        List<TableEntities> categories = order.getTable()!=null?order.getTable().stream().map(CategoryMapperOutput::toEntity).toList():List.of();
        List<OrderLineItemEntities> images = order.getOrderLineItems()!=null?product.getImages().stream()
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
                .unit(productEntities.getUnit())
                .status(productEntities.getStatus())
                .createdAt(productEntities.getCreatedAt())
                .build();
    }
}
