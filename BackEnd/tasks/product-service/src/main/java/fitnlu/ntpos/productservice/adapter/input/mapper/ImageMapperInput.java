package fitnlu.ntpos.productservice.adapter.input.mapper;

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
    public static ProductOutput toDTO(Product product) {
        List<Category> categoryList = product.getCategories()!=null?product.getCategories():List.of();
        List<ProductImage> productImageList = product.getImages()!=null?product.getImages():List.of();
        return ProductOutput.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .unit(product.getUnit())
                .status(product.getStatus())
                .images(productImageList.stream().map(image -> ProductImageOutput.builder().build()).toList())
                .categories(categoryList.stream().map(CategoryMapperInput::toDTO).toList())
                .build();
    }
    public static Product toDomain(ProductInput productInput) {
        List<String> categoryList = productInput.category()!=null?productInput.category():List.of();
        List<String> imageList = productInput.images()!=null?productInput.images():List.of();
        return Product.builder()
                .name(productInput.name())
                .description(productInput.description())
                .price(productInput.price())
                .quantity(productInput.quantity())
                .unit(productInput.unit())
                .status(productInput.status())
                .categories(categoryList.stream().map(CategoryMapperInput::mapperID).toList())
                .images(imageList.stream().map(image -> ProductImage.builder().url(image).build()).toList())
                .build();
    }
}
