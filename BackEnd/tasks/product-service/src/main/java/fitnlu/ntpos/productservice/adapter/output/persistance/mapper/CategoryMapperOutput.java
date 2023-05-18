package fitnlu.ntpos.productservice.adapter.output.persistance.mapper;

import fitnlu.ntpos.productservice.adapter.output.persistance.entities.CategoryEntities;
import fitnlu.ntpos.productservice.adapter.output.persistance.entities.ProductEntities;
import fitnlu.ntpos.productservice.domain.model.Category;
import fitnlu.ntpos.productservice.domain.model.Product;

import java.util.List;

public class CategoryMapperOutput {
    public static CategoryEntities toEntity(Category category) {
        List<ProductEntities> products = category.getProducts()!=null?category.getProducts().stream().map(ProductMapperOutput::toEntity).toList():List.of();
        return CategoryEntities.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .products(products)
                .build();

    }
    public static Category toDomain(CategoryEntities categoryEntities) {
        List<Product> products = categoryEntities.getProducts()!=null?categoryEntities.getProducts().stream().map(ProductMapperOutput::toDomain).toList():List.of();
        return Category.builder()
                .id(categoryEntities.getId())
                .name(categoryEntities.getName())
                .description(categoryEntities.getDescription())
                .products(products)
                .build();
    }
}
