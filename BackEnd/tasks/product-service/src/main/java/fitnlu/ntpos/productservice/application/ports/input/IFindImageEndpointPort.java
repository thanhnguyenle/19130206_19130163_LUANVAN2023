package fitnlu.ntpos.productservice.application.ports.input;

import fitnlu.ntpos.productservice.adapter.input.dto.CategoryInput;
import fitnlu.ntpos.productservice.adapter.input.dto.ResultOutput;

import java.util.List;

public interface IFindImageEndpointPort {
    ResultOutput batchDeleteImage(List<Integer> imageIDs);
    ResultOutput batchAddImage(List<CategoryInput> categoryInputs);
}
