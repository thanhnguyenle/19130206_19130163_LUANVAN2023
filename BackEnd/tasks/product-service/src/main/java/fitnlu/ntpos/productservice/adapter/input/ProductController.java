package fitnlu.ntpos.productservice.adapter.input;

import fitnlu.ntpos.productservice.adapter.input.adapter.ChangeProductEndpointAdapter;
import fitnlu.ntpos.productservice.adapter.input.adapter.FindProductEndpointAdapter;
import fitnlu.ntpos.productservice.adapter.input.dto.*;
import fitnlu.ntpos.productservice.domain.model.TimeSearch;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;
import fitnlu.ntpos.productservice.infrastructure.paging.PageRequest;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class ProductController {
    private final ChangeProductEndpointAdapter changeProductEndpointAdapter;
    private final FindProductEndpointAdapter findProductEndpointAdapter;

    //Mutation
    @SchemaMapping(typeName = "Mutation", field = "createProduct")
    public ResultOutput createProduct(@Argument  ProductInput productInput){
        return changeProductEndpointAdapter.addProduct(productInput);
    }

    @SchemaMapping(typeName = "Mutation", field = "updateProduct")
    public ResultOutput updateProduct(@Argument String id, @Argument  ProductInput productInput){
        return changeProductEndpointAdapter.updateProduct(id, productInput);
    }

    @SchemaMapping(typeName = "Mutation", field = "deleteProduct")
    public ResultOutput deleteProduct(@Argument  String id){
        return changeProductEndpointAdapter.deleteProduct(id);
    }

    @SchemaMapping(typeName = "Mutation", field = "batchCreateProduct")
    public ResultOutput batchCreateProduct(@Argument  List<ProductInput> productInputs){
        return changeProductEndpointAdapter.addBatchProduct(productInputs);
    }

    @SchemaMapping(typeName = "Mutation", field = "batchDeleteProduct")
    public ResultOutput batchDeleteProduct(@Argument  List<String> productIDs){
        return changeProductEndpointAdapter.deleteBatchProduct(productIDs);
    }

    @SchemaMapping(typeName = "Mutation", field = "batchAddProductToCategory")
    public ResultOutput batchAddProductToCategory(@Argument String categoryID, @Argument  List<String> productIDs){
        return changeProductEndpointAdapter.addBatchProductToCategory(categoryID,productIDs);
    }

    @SchemaMapping(typeName = "Mutation", field = "batchDeleteProductFromCategory")
    public ResultOutput batchRemoveProductFromCategory(@Argument String categoryID, @Argument  List<String> productIDs){
        return changeProductEndpointAdapter.deleteProductBatchFromCategory(categoryID,productIDs);
    }

    //Query
    @SchemaMapping(typeName = "Query", field = "products")
    public List<ProductOutput> getALlProducts(){
        return findProductEndpointAdapter.findAllProduct();
    }

    @SchemaMapping(typeName = "Query", field = "product")
    public ProductOutput getProductByName(@Argument("id") String id){
        return findProductEndpointAdapter.findProductById(id);
    }

    @SchemaMapping(typeName = "Query", field = "productsFilter")
    public ListProductOutput getProductByName(@Argument PagingInput paging, @Argument String categoryID, @Argument String searchType, @Argument String searchValue, @Argument String sortType, @Argument String sortValue){
        return findProductEndpointAdapter.filterProduct(paging,categoryID,searchType,searchValue,sortType,sortValue);
    }

    @SchemaMapping(typeName = "Query", field = "productsFilterByTime")
    public ListProductOutput productsFilterByTime(@Argument PagingInput paging, @Argument TimeSearch timeSearch){
        return findProductEndpointAdapter.filterProductByTime(paging,timeSearch);
    }
}
