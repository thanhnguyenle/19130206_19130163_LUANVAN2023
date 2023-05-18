package fitnlu.ntpos.productservice.adapter.input.adapter;

import fitnlu.ntpos.productservice.adapter.input.dto.CategoryInput;
import fitnlu.ntpos.productservice.adapter.input.dto.ProductImageInput;
import fitnlu.ntpos.productservice.adapter.input.dto.ProductImageOutput;
import fitnlu.ntpos.productservice.adapter.input.dto.ResultOutput;
import fitnlu.ntpos.productservice.adapter.input.mapper.ImageMapperInput;
import fitnlu.ntpos.productservice.application.ports.input.IChangeImageEndpointPort;
import fitnlu.ntpos.productservice.application.ports.input.IChangeProductEndpointPort;
import fitnlu.ntpos.productservice.application.ports.input.IFindImageEndpointPort;
import fitnlu.ntpos.productservice.application.usecases.image.IAddImageToProductUseCase;
import fitnlu.ntpos.productservice.application.usecases.image.IDeleteImageFromProductUseCase;
import fitnlu.ntpos.productservice.application.usecases.image.IFindImageByProductIDUseCase;
import fitnlu.ntpos.productservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ChangeImageEndpointAdapter implements IChangeImageEndpointPort {
    private final IAddImageToProductUseCase addImageToProductUseCase;
    private final IDeleteImageFromProductUseCase deleteImageFromProductUseCase;
    @Override
    public ResultOutput batchDeleteImage(List<Integer> imageIDs) {
        return ResultOutput.builder()
                .success(deleteImageFromProductUseCase.deleteImageFromProduct(imageIDs))
                .build();
    }

    @Override
    public ResultOutput batchAddImage(String productID, List<ProductImageInput> images) {
        return ResultOutput.builder()
                .success(addImageToProductUseCase.addImageToProduct(productID, images.stream().map(ImageMapperInput::toEntity).toList()))
                .build();
    }


}
