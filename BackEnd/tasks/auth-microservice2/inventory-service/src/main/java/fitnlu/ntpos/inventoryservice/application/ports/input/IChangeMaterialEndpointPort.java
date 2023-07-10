package fitnlu.ntpos.inventoryservice.application.ports.input;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialImageInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.ResultOutput;
import fitnlu.ntpos.inventoryservice.domain.model.Image;
import fitnlu.ntpos.inventoryservice.domain.model.Material;

import java.util.List;

public interface IChangeMaterialEndpointPort {
    MaterialOutput createMaterial(MaterialInput materialInput);
    MaterialOutput updateMaterial(String id, MaterialInput materialInput);
    MaterialOutput deleteMaterial(String id);
    ResultOutput addBatchMaterial(List<MaterialInput> materialInputs);
    ResultOutput deleteBatchMaterial(List<String> materialIDs);
    ResultOutput addBatchImageToMaterial(String materialID, List<MaterialImageInput> imageInputs);
    ResultOutput deleteBatchImageFromMaterial(List<String> imageIDs);
    ResultOutput deleteAllImageByMaterialID(String materialID);
}
