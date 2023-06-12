package fitnlu.ntpos.productservice.adapter.input.adapter;

import fitnlu.ntpos.productservice.adapter.input.dto.ListProductOutput;
import fitnlu.ntpos.productservice.adapter.input.dto.ProductImageOutput;
import fitnlu.ntpos.productservice.adapter.input.dto.ProductOutput;
import fitnlu.ntpos.productservice.adapter.input.mapper.CategoryMapperInput;
import fitnlu.ntpos.productservice.adapter.input.mapper.ImageMapperInput;
import fitnlu.ntpos.productservice.adapter.input.mapper.ProductMapperInput;
import fitnlu.ntpos.productservice.application.ports.input.IFindImageEndpointPort;
import fitnlu.ntpos.productservice.application.ports.input.IFindProductEndpointPort;
import fitnlu.ntpos.productservice.application.usecases.image.IFindImageByProductIDUseCase;
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
public class FindImageEndpointAdapter implements IFindImageEndpointPort {
    private final IFindImageByProductIDUseCase findImageByProductIDUseCase;

    @Override
    public List<ProductImageOutput> findImageByProductID(String productID) {
        return findImageByProductIDUseCase.findImageByProduct(productID).stream().map(ImageMapperInput::toDomain).toList();
    }
}
