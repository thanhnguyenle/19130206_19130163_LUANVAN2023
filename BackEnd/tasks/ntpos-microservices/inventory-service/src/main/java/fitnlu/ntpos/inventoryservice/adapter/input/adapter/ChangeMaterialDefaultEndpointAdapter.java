package fitnlu.ntpos.inventoryservice.adapter.input.adapter;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialSetupDefaultInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialSetupDefaultOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.ResultOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.MaterialSetupDefaultMapperInput;
import fitnlu.ntpos.inventoryservice.application.ports.input.IWriteMaterialDefaultEndpointPort;
import fitnlu.ntpos.inventoryservice.application.usecases.material.IFindMaterialUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.materialSetupDefault.IAddMaterialDefaultUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.materialSetupDefault.IDeleteMaterialDefaultUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.materialSetupDefault.IUpdateMaterialDefaultUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Adapter
@RequiredArgsConstructor
public class ChangeMaterialDefaultEndpointAdapter implements IWriteMaterialDefaultEndpointPort {
    private final IDeleteMaterialDefaultUseCase deleteMaterialDefaultUseCase;
    private final IUpdateMaterialDefaultUseCase updateMaterialDefaultUseCase;
    private final IAddMaterialDefaultUseCase addMaterialDefaultUseCase;
    private final IFindMaterialUseCase findMaterialUseCase;

    @Override
    public ResultOutput deleteMaterialDefault(String materialId) {
        return ResultOutput.builder()
                .success(deleteMaterialDefaultUseCase.deleteMaterialDefault(materialId))
                .build();
    }

    @Override
    public ResultOutput deleteAllMaterialDefault() {
        return ResultOutput.builder()
                .success(deleteMaterialDefaultUseCase.deleteAllMaterialDefault())
                .build();
    }

    @Override
    public ResultOutput addMaterialDefault(MaterialSetupDefaultInput materialSetupDefault) {
        return ResultOutput.builder()
                .success(addMaterialDefaultUseCase.addMaterialDefault(MaterialSetupDefaultMapperInput.toDomain(materialSetupDefault)))
                .build();
    }

    @Override
    public ResultOutput addBatchMaterialDefault(List<MaterialSetupDefaultInput> materialSetupDefault) {
        List<MaterialSetupDefault> materialSetupDefaultInputs = materialSetupDefault.stream().map(materialSetupDefaultInput -> {
            MaterialSetupDefault materialSetupDefaultTemp =  MaterialSetupDefaultMapperInput.toDomain(materialSetupDefaultInput);
            if(materialSetupDefaultTemp.getQuantity()> findMaterialUseCase.findMaterial(materialSetupDefaultTemp.getMaterialId()).getQuantity()){
                throw new RuntimeException("Error quantity of material when setup default value!");
            }else{
                return materialSetupDefaultTemp;
            }
        }).toList();
        return ResultOutput.builder()
                .success(addMaterialDefaultUseCase.addBatchMaterialDefault(materialSetupDefaultInputs))
                .build();
    }

    @Override
    public ResultOutput updateMaterialDefault(String materialId, MaterialSetupDefaultInput materialSetupDefault) {
        return ResultOutput.builder()
                .success(updateMaterialDefaultUseCase.updateMaterialDefault(materialId, MaterialSetupDefaultMapperInput.toDomain(materialSetupDefault)))
                .build();
    }

    @Override
    public ResultOutput updateBatchMaterialDefault(List<MaterialSetupDefaultInput> materialSetupDefault) {
        ResultOutput checkStep01 = deleteAllMaterialDefault();
        System.out.println("Step 01: "+ checkStep01.isSuccess());
        return ResultOutput.builder()
                .success(checkStep01.isSuccess() && addBatchMaterialDefault(materialSetupDefault).isSuccess())
                .build();
    }
}
