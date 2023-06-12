package fitnlu.ntpos.productservice.application.ports.input;

import fitnlu.ntpos.productservice.adapter.input.dto.CategoryInput;
import fitnlu.ntpos.productservice.adapter.input.dto.ResultOutput;

import java.util.List;

public interface IChangeCategoryEndpointPort {
    ResultOutput addCategory(CategoryInput categoryInput);
    ResultOutput updateCategory(String id, CategoryInput categoryInput);
    ResultOutput deleteCategory(String id);
    ResultOutput addBatchCategory(List<CategoryInput> categories);
    ResultOutput deleteBatchCategory(List<String> ids);
}
