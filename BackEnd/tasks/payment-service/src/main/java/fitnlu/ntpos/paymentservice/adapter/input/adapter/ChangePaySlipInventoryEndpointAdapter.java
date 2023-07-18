package fitnlu.ntpos.paymentservice.adapter.input.adapter;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialImageInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.ResultOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.ImageMapperInput;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.MaterialMapperInput;
import fitnlu.ntpos.inventoryservice.application.ports.input.IChangeMaterialEndpointPort;
import fitnlu.ntpos.inventoryservice.application.usecases.material.*;
import fitnlu.ntpos.inventoryservice.domain.model.Image;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;

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
}
