package fitnlu.ntpos.productservice.application.ports.input;

import fitnlu.ntpos.productservice.adapter.input.dto.ProductInput;
import fitnlu.ntpos.productservice.adapter.input.dto.ResultOutput;

import java.util.List;

public interface IChangeProductEndpointPort {
    ResultOutput addProduct (ProductInput productInput);
    ResultOutput updateProduct (String id, ProductInput productInput);
    ResultOutput deleteProduct (String id);
    ResultOutput addBatchProductToCategory(String categoryID, List<String> productIDs) ;
    ResultOutput addProductToCategory(String categoryID, String productID) ;
    ResultOutput addBatchProduct(List<ProductInput> productInputs) ;
    ResultOutput deleteProductBatchFromCategory(String categoryID, List<String> productIDs);
    ResultOutput deleteProductFromCategory(String categoryID, String productID);
    ResultOutput deleteBatchProduct(List<String> productIDs);
    ResultOutput deleteAllImageOfProduct(String productID) ;
    ResultOutput deleteAllCategoryOfProduct(String productID) ;
}
