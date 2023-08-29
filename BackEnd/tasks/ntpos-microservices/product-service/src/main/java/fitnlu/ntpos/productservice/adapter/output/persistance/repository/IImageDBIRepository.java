package fitnlu.ntpos.productservice.adapter.output.persistance.repository;

import fitnlu.ntpos.productservice.adapter.output.persistance.entities.ProductImageEntities;

import java.util.List;

public interface IImageDBIRepository {
    List<ProductImageEntities> findByProductID(String productID);
    boolean saveImageToProduct(String productID ,ProductImageEntities image);
    boolean batchSaveImageToProduct(String productID,List<ProductImageEntities> images);
    boolean batchDeleteImageFromProduct(List<Integer> imageIDs);
    boolean deleteImageFromProduct(Integer imageIDs);
    boolean updateImageOfProduct(String imageID, ProductImageEntities images);
}
