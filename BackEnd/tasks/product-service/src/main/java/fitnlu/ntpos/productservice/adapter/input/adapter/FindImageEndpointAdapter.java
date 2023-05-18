package fitnlu.ntpos.productservice.adapter.input.adapter;

import fitnlu.ntpos.productservice.adapter.input.dto.ListProductOutput;
import fitnlu.ntpos.productservice.adapter.input.dto.ProductImageOutput;
import fitnlu.ntpos.productservice.adapter.input.dto.ProductOutput;
import fitnlu.ntpos.productservice.adapter.input.mapper.CategoryMapperInput;
import fitnlu.ntpos.productservice.adapter.input.mapper.ProductMapperInput;
import fitnlu.ntpos.productservice.application.ports.input.IFindProductEndpointPort;
import fitnlu.ntpos.productservice.application.usecases.product.IFilterProductsUseCase;
import fitnlu.ntpos.productservice.application.usecases.product.IFindAllProductUseCase;
import fitnlu.ntpos.productservice.application.usecases.product.IFindProductUseCase;
import fitnlu.ntpos.productservice.application.usecases.product.ITotalProductUseCase;
import fitnlu.ntpos.productservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class FindImageEndpointAdapter implements IFindProductEndpointPort {
    private final IFindProductUseCase findProductUseCase;
    private final IFindAllProductUseCase findAllProductUseCase;
    private final IFilterProductsUseCase filterProductsUseCase;
    private final ITotalProductUseCase totalProductUseCase;

    @Override
    public ListProductOutput filterProduct(IPaging paging, String categoryID, String searchType, String searchValue, String sortType, String sortValue) {
        if(paging!=null && paging.getPage()==null){
            int totalPage =(int) Math.ceil(getTotalItem() / (paging.getLimit() *1.0));
            return ListProductOutput.builder()
                    .products(filterProductsUseCase.filterProduct(paging,categoryID,searchType,searchValue,sortType,sortValue).stream().map(ProductMapperInput::toDTO).toList())
                    .currentPage(paging.getPage())
                    .totalPage(totalPage<=0?1:totalPage)
                    .totalItem(getTotalItem())
                    .build();
        }
        return null;
    }

    @Override
    public List<ProductOutput> findAllProduct() {
       return findAllProductUseCase.findAllProduct().stream().map(product -> {
            ProductOutput productOutput = ProductMapperInput.toDTO(product);
            productOutput.setCategories(product.getCategories().stream().map(CategoryMapperInput::toDTO).toList());
            productOutput.setImages(product.getImages().stream().map(image -> ProductImageOutput.builder()
                    .url(image.getUrl())
                    .id(image.getId())
                    .description(image.getDescription())
                    .build()).toList());
            return productOutput;
        }).toList();
    }

    @Override
    public ProductOutput findProductById(String id) {
        return ProductMapperInput.toDTO(findProductUseCase.findProductById(id));
    }

    @Override
    public int getTotalItem() {
        return totalProductUseCase.getTotalItem();
    }

}
