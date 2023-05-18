package fitnlu.ntpos.productservice.adapter.input;

import fitnlu.ntpos.productservice.adapter.input.adapter.ChangeCategoryEndpointAdapter;
import fitnlu.ntpos.productservice.adapter.input.adapter.FindCategoryEndpointAdapter;
import fitnlu.ntpos.productservice.adapter.input.dto.*;
import fitnlu.ntpos.productservice.domain.model.TimeSearch;
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

    //Query
    @SchemaMapping(typeName = "Query", field = "categories")
    public List<CategoryOutput> categories(){
        return findCategoryEndpointAdapter.getAllCategories();
    }

    @SchemaMapping(typeName = "Query", field = "category")
    public CategoryOutput category(@Argument String id){
        return findCategoryEndpointAdapter.getCategoryById(id);
    }

    @SchemaMapping(typeName = "Query", field = "categoriesFilter")
    public ListCategoryOutput categoriesFilter(@Argument PagingInput paging, @Argument String searchType, @Argument String searchValue, @Argument String sortType, @Argument String sortValue){
        return findCategoryEndpointAdapter.filterCategory(paging, searchType, searchValue, sortType, sortValue);
    }
    @SchemaMapping(typeName = "Query", field = "categoriesFilterByTime")
    public ListCategoryOutput categoriesFilterByTime(@Argument PagingInput paging, @Argument TimeSearch timeSearch){
        return findCategoryEndpointAdapter.filterCategoryByTime(paging, timeSearch);
    }
}
