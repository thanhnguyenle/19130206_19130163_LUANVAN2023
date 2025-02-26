package fitnlu.ntpos.inventoryservice.adapter.input.adapter;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.*;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.ImageMapperInput;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.MaterialMapperInput;
import fitnlu.ntpos.inventoryservice.application.ports.input.IChangeMaterialEndpointPort;
import fitnlu.ntpos.inventoryservice.application.usecases.material.*;
import fitnlu.ntpos.inventoryservice.domain.model.Image;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;
import org.apache.commons.codec.binary.StringUtils;

import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Adapter
@RequiredArgsConstructor
public class ChangeMaterialEndpointAdapter implements IChangeMaterialEndpointPort {
    private final ICreateMaterialUseCase createMaterialUseCase;
    private final IUpdateMaterialUseCase updateMaterialUseCase;
    private final IDeleteMaterialUseCase deleteMaterialUseCase;
    private final IAddBatchMaterialUseCase addBatchMaterialUseCase;
    private final IDeleteBatchMaterialUseCase deleteBatchMaterialUseCase;
    private final IAddBatchImageToMaterialUseCase addBatchImageToMaterialUseCase;
    private final IDeleteBatchImageFromMaterialUseCase deleteBatchImageFromMaterialUseCase;
    private final FindMaterialDefaultEndpointAdapter findMaterialDefaultEndpointAdapter;
    private final FindMaterialEndpointAdapter findMaterialEndpointAdapter;

    @Override
    public MaterialOutput createMaterial(MaterialInput materialInput) {
        MaterialOutput materialOutput = MaterialMapperInput.toDTO(createMaterialUseCase.createMaterial(MaterialMapperInput.toDomain(materialInput)));
        addBatchImageToMaterialUseCase.addBatchImageToProduct(materialOutput.getId(), materialInput.images().stream().map(image -> Image.builder()
                .url(image)
                .build()).toList());
        return materialOutput;
    }

    @Override
    public MaterialOutput updateMaterial(String id, MaterialInput materialInput) {
        MaterialOutput materialOutput = MaterialMapperInput.toDTO(updateMaterialUseCase.updateMaterial(id, MaterialMapperInput.toDomain(materialInput)));
        //image
        deleteBatchImageFromMaterialUseCase.deleteAllImageByMaterialID(id);
        addBatchImageToMaterialUseCase.addBatchImageToProduct(materialOutput.getId(), materialInput.images().stream().map(image -> Image.builder()
                .url(image)
                .build()).toList());
        return materialOutput;
    }

    @Override
    public MaterialOutput deleteMaterial(String id) {
        return MaterialMapperInput.toDTO(deleteMaterialUseCase.deleteMaterial(id));
    }

    @Override
    public ResultOutput addBatchMaterial(List<MaterialInput> materialInputs) {
        return ResultOutput.builder()
                .success(addBatchMaterialUseCase.addBatchMaterial(materialInputs.stream().map(material ->{
                    Material materialOutput = createMaterialUseCase.createMaterial(MaterialMapperInput.toDomain(material));
                    addBatchImageToMaterialUseCase.addBatchImageToProduct(materialOutput.getId(), material.images().stream().map(image -> Image.builder()
                            .url(image)
                            .build()).toList());
                    return materialOutput;
                }).toList()))
                .build();
    }

    @Override
    public ResultOutput deleteBatchMaterial(List<String> materialIDs) {
        return ResultOutput.builder()
                .success(deleteBatchMaterialUseCase.deleteBatchMaterial(materialIDs))
                .build();
    }

    @Override
    public ResultOutput addBatchImageToMaterial(String materialID, List<MaterialImageInput> imageInputs) {
        return ResultOutput.builder()
                .success(addBatchImageToMaterialUseCase.addBatchImageToProduct(materialID, imageInputs.stream().map(ImageMapperInput::toDomain).toList()))
                .build();
    }

    @Override
    public ResultOutput deleteBatchImageFromMaterial(List<String> imageIDs) {
        return ResultOutput.builder()
                .success(deleteBatchImageFromMaterialUseCase.deleteBatchImageToMaterial(imageIDs))
                .build();
    }

    @Override
    public ResultOutput deleteAllImageByMaterialID(String materialID) {
        return ResultOutput.builder()
                .success(deleteBatchImageFromMaterialUseCase.deleteAllImageByMaterialID(materialID))
                .build();
    }

    @Override
    public boolean importToMaterial() {
//        for(MaterialSetupDefaultOutput materialSetupDefaultOutput: findMaterialDefaultEndpointAdapter.findAllMaterialDefaultNotRepeat()){
//            byte[] bytes = StringUtils.getBytesUtf8(materialSetupDefaultOutput.getName());
//            String utf8String = StringUtils.newStringUtf8(bytes);
//            System.out.println(utf8String);
//        }
        findMaterialDefaultEndpointAdapter.findAllMaterialDefaultNotRepeat().forEach(materialSetupDefaultOutput -> {
            byte[] bytes = StringUtils.getBytesUtf8(materialSetupDefaultOutput.getName());
            String utf8String = StringUtils.newStringUtf8(bytes);
            List<MaterialOutput> materialOutputList = findMaterialEndpointAdapter.findMaterialByName(utf8String);
            int quantity = materialSetupDefaultOutput.getQuantity();
            if(!materialOutputList.isEmpty()){
                int origin_quantity = materialOutputList.get(0).getQuantity();
                updateMaterialUseCase.updateQuantityMaterial(materialOutputList.get(0).getId(),origin_quantity+quantity);
            }
        });
        return true;
    }

    @Override
    public boolean exportFromMaterial() {
        findMaterialDefaultEndpointAdapter.findAllMaterialDefaultNotRepeat().forEach(materialSetupDefaultOutput -> {
            byte[] bytes = StringUtils.getBytesUtf8(materialSetupDefaultOutput.getName());
            String utf8String = StringUtils.newStringUtf8(bytes);
            List<MaterialOutput> materialOutputList = findMaterialEndpointAdapter.findMaterialByName(utf8String);
            AtomicInteger quantity = new AtomicInteger(materialSetupDefaultOutput.getQuantity());
            AtomicInteger total_quantity = new AtomicInteger();
            materialOutputList.forEach(materialOutput -> {
                total_quantity.addAndGet(materialOutput.getQuantity());
            });
            if(quantity.get() >total_quantity.get()){
                throw new RuntimeException("Quantity is not enough!");
            }else{
                materialOutputList.forEach(materialOutput -> {
                    int origin_quantity = materialOutput.getQuantity();
                    if(origin_quantity< quantity.get()){
                        updateMaterialUseCase.updateQuantityMaterial(materialOutput.getId(),0);
                        quantity.addAndGet(-origin_quantity);
                    }else{
                        updateMaterialUseCase.updateQuantityMaterial(materialOutput.getId(),origin_quantity-quantity.get());
                        quantity.addAndGet(0);
                    }

                });
            }
        });
        return true;
    }
}
