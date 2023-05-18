package fitnlu.ntpos.productservice.adapter.output.persistance.repository;

import fitnlu.ntpos.productservice.adapter.output.persistance.entities.ProductImageEntities;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.statement.PreparedBatch;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
@RequiredArgsConstructor
public class ImageRepository implements IImageDBIRepository {
    private static final String CREATE = "INSERT INTO `image` (url, description, productID) VALUES (:url, :description,:productID)";
    private static final String DELETE = "DELETE FROM `image` WHERE id = :id";
    private static final String GET_ITEM_BYID = "SELECT * FROM `image` WHERE id = :id";
    private static final String GET_IMAGE_BY_PRODUCTID = "SELECT * FROM `image` WHERE productID =:productID";
    private static final String UPDATE = "UPDATE `image` SET url =:url, description =:description WHERE id =:id";
    private static final String TOTAL_IMAGE_OF_PRODUCT = "SELECT COUNT(*) FROM `image` WHERE id =:id";

    @NonNull
    private final Jdbi jdbi;


    @Override
    public List<ProductImageEntities> findByProductID(String productID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_IMAGE_BY_PRODUCTID)
                .bind("productID", productID)
                .mapToBean(ProductImageEntities.class)
                .list());
    }

    @Override
    public boolean saveImageToProduct(String productID, ProductImageEntities image) {
        return jdbi.withHandle(handle -> handle.createUpdate(CREATE)
                .bind("id", image.getId())
                .bind("url", image.getUrl())
                .bind("description", image.getDescription())
                .bind("productID", productID)
                .execute() > 0);
    }

    @Override
    public boolean batchSaveImageToProduct(String productID, List<ProductImageEntities> images) {
        return jdbi.withHandle(handle -> {
            PreparedBatch batch = handle.prepareBatch(CREATE);
            for (ProductImageEntities image : images) {
                batch.bind("id", image.getId())
                        .bind("url", image.getUrl())
                        .bind("description", image.getDescription())
                        .bind("productID", productID)
                        .add();
            }
            return batch.execute().length > 0;
        });
    }

    @Override
    public boolean batchDeleteImageFromProduct( List<Integer> images) {
        return jdbi.withHandle(handle -> {
            PreparedBatch batch = handle.prepareBatch(DELETE);
            for (Integer image : images) {
                batch.bind("id", image)
                        .add();
            }
            return batch.execute().length > 0;
        });
    }

    @Override
    public boolean deleteImageFromProduct(Integer image) {
        return jdbi.withHandle(handle -> handle.createUpdate(DELETE)
                .bind("id", image)
                .execute() > 0);
    }

    @Override
    public boolean updateImageOfProduct(String imageID, ProductImageEntities images) {
        return jdbi.withHandle(handle -> handle.createUpdate(UPDATE)
                .bind("id", imageID)
                .bind("url", images.getUrl())
                .bind("description", images.getDescription())
                .execute() > 0);
    }
}
