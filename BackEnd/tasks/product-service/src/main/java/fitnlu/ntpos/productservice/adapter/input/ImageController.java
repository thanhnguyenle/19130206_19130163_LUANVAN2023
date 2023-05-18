package fitnlu.ntpos.productservice.adapter.input;

import fitnlu.ntpos.productservice.adapter.input.adapter.ChangeCategoryEndpointAdapter;
import fitnlu.ntpos.productservice.adapter.input.adapter.FindCategoryEndpointAdapter;
import fitnlu.ntpos.productservice.adapter.input.dto.CategoryInput;
import fitnlu.ntpos.productservice.adapter.input.dto.ResultOutput;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class CategoryController {
    private final ChangeCategoryEndpointAdapter changeCategoryEndpointAdapter;
    private final FindCategoryEndpointAdapter findCategoryEndpointAdapter;

    //Mutation
    @SchemaMapping(typeName = "Mutation", field = "createCategory")
    public ResultOutput createCategory(@Argument CategoryInput categoryInput){
        return changeCategoryEndpointAdapter.addCategory(categoryInput);
    }

    @SchemaMapping(typeName = "Mutation", field = "updateCategory")
    public ResultOutput updateCategory(@Argument String id, @Argument CategoryInput categoryInput){
        return changeCategoryEndpointAdapter.updateCategory(id, categoryInput);
    }

    @SchemaMapping(typeName = "Mutation", field = "deleteCategory")
    public ResultOutput deleteCategory(@Argument String id){
        return changeCategoryEndpointAdapter.deleteCategory(id);
    }

    @SchemaMapping(typeName = "Mutation", field = "batchCreateCategory")
    public ResultOutput batchCreateCategory(@Argument List<CategoryInput> categoryInputs){
        return changeCategoryEndpointAdapter.addBatchCategory(categoryInputs);
    }

    @SchemaMapping(typeName = "Mutation", field = "batchDeleteCategory")
    public ResultOutput batchDeleteCategory(@Argument List<String> categoryIDs){
        return changeCategoryEndpointAdapter.deleteBatchCategory(categoryIDs);
    }
}
