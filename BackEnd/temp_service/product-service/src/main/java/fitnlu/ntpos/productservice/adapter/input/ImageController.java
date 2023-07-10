package fitnlu.ntpos.productservice.adapter.input;

import fitnlu.ntpos.productservice.adapter.input.adapter.ChangeCategoryEndpointAdapter;
import fitnlu.ntpos.productservice.adapter.input.adapter.ChangeImageEndpointAdapter;
import fitnlu.ntpos.productservice.adapter.input.adapter.FindCategoryEndpointAdapter;
import fitnlu.ntpos.productservice.adapter.input.adapter.FindImageEndpointAdapter;
import fitnlu.ntpos.productservice.adapter.input.dto.CategoryInput;
import fitnlu.ntpos.productservice.adapter.input.dto.ProductImageInput;
import fitnlu.ntpos.productservice.adapter.input.dto.ProductImageOutput;
import fitnlu.ntpos.productservice.adapter.input.dto.ResultOutput;
import lombok.AllArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class ImageController {
    private final ChangeImageEndpointAdapter changeImageEndpointAdapter;
    private final FindImageEndpointAdapter findImageEndpointAdapter;

    //Query
    @SchemaMapping(typeName = "Query", field = "findImageByProduct")
    public List<ProductImageOutput> findImageByProduct(@Argument String productID){
        return findImageEndpointAdapter.findImageByProductID(productID);
    }

    @SchemaMapping(typeName = "Mutation", field = "batchAddImageToProduct")
    public ResultOutput batchAddImageToProduct(@Argument("productID") String id, @Argument("imageInputs") List<ProductImageInput> productImageInputs){
        return changeImageEndpointAdapter.batchAddImage(id, productImageInputs);
    }

    @SchemaMapping(typeName = "Mutation", field = "batchDeleteImageFromProduct")
    public ResultOutput batchDeleteImageFromProduct( @Argument("imageIDs") List<Integer> productImageInputs){
        return changeImageEndpointAdapter.batchDeleteImage(productImageInputs);
    }
}
