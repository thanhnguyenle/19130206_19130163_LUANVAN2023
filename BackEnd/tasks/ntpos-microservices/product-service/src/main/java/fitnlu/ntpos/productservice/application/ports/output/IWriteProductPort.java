package fitnlu.ntpos.productservice.application.ports.output;

import fitnlu.ntpos.productservice.domain.model.Product;

import java.util.List;

public interface IWriteProductPort {
    Product addProduct (Product product);
    boolean updateProduct (String id, Product product);
    boolean deleteProduct (String id);
     boolean addBatchProductToCategory(String categoryID, List<String> productIDs) ;
     boolean addProductToCategory(String categoryID, String productID) ;
     boolean addBatchProduct(List<Product> product) ;
     boolean deleteBatchProduct(List<String> productIDs);
    boolean deleteProductFromCategory(String categoryID, String productID);
    boolean deleteProductFromCategory(String categoryID, List<String> productIDs);
    boolean deleteAllImageOfProduct(String productID) ;
    boolean deleteAllCategoryOfProduct(String productID) ;
}
