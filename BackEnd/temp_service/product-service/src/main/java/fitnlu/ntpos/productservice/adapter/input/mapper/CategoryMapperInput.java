package fitnlu.ntpos.productservice.adapter.input.mapper;

import fitnlu.ntpos.productservice.adapter.input.dto.CategoryInput;
import fitnlu.ntpos.productservice.adapter.input.dto.CategoryOutput;
import fitnlu.ntpos.productservice.adapter.input.dto.ListProductOutput;
import fitnlu.ntpos.productservice.domain.model.Category;
import fitnlu.ntpos.productservice.domain.model.Product;
import fitnlu.ntpos.productservice.infrastructure.annotations.Mapper;

import java.util.List;

@Mapper
public class CategoryMapperInput {
    public static Category mapperID(String id) {
        return Category.builder()
                .id(id)
                .build();
    }
    public static CategoryOutput toDTO(Category category) {
        List<Product> productList = category.getProducts()!=null?category.getProducts(): List.of();
        return CategoryOutput.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .products(productList.stream().map(ProductMapperInput::toDTO).toList())
                .build();
    }

    public static Category toDomain(CategoryInput categoryInput) {
        return Category.builder()
                .name(categoryInput.name())
                .description(categoryInput.description())
                .build();
    }
}
