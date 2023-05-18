package fitnlu.ntpos.productservice.adapter.output.persistance.repository;

import fitnlu.ntpos.productservice.adapter.output.persistance.entities.ProductEntities;
import fitnlu.ntpos.productservice.domain.model.DateTime;
import fitnlu.ntpos.productservice.domain.model.TimeSearch;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.statement.PreparedBatch;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Transactional
@RequiredArgsConstructor
public class ProductRepository implements IProductDBIRepository {
    private static final String GET_LIST = "select * from `product`";

    private static final String CREATE = "INSERT INTO `product` VALUES (:id, :name,:price,:description,:quantity,:unit, :status)";
    private static final String DELETE = "DELETE FROM `product` WHERE id = :id";
    private static final String GET_ITEM_BYID = "SELECT * FROM `product` WHERE id = :id";
    private static final String UPDATE = "UPDATE `product` SET name =:name, description =:description, price =:price, unit =:unit, status =:status WHERE id =:id";
    private static final String TOTAL_ITEM = "SELECT COUNT(*) FROM `product`";
    private static final String SEARCH_BY_NAME = "SELECT * FROM `product` WHERE name LIKE '%:name%'";
    private static final String ADD_PRODUCT_TO_CATEGORY = "INSERT INTO `product_category` VALUES (:productID,:categoryID)";
    private static final String REMOVE_PRODUCT_FROM_CATEGORY = "DELETE FROM `product_category` WHERE productID =:productID AND categoryID =:categoryID";
    private static final String GET_LIST_PRODUCT_BY_TIME = "SELECT * FROM `product` WHERE createdAt BETWEEN :startTime AND :endTime";
    @NonNull
    private final Jdbi jdbi;


    @Override
    public List<ProductEntities> findAll() {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST)
                .mapToBean(ProductEntities.class)
                .list());
    }
    public List<ProductEntities> filterProduct( String categoryID, String searchType, String searchValue, String sortType, String sortValue) {
        StringBuilder sql = new StringBuilder(GET_LIST);
        if(categoryID!=null && !categoryID.isEmpty()){
            sql.append(" WHERE id IN (SELECT productID FROM `product_category` WHERE categoryID = '").append(categoryID).append("')");
        }
        if(searchType!=null && !searchType.isEmpty() && searchValue!=null && !searchValue.isEmpty()){
            sql.append(" WHERE LOWER(").append(searchType).append(")")
                    .append(" LIKE '%").append(searchValue).append("%'");
        }
        if(sortType!=null && !sortType.isEmpty() && sortValue!=null && !sortValue.isEmpty()){
            sql.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
        }
        return jdbi.withHandle(handle -> handle.createQuery(sql.toString())
                .mapToBean(ProductEntities.class)
                .list());
    }
    @Override
    public List<ProductEntities> filterProduct(IPaging paging, String categoryID, String searchType, String searchValue, String sortType, String sortValue) {
        List<ProductEntities> list = filterProduct(categoryID, searchType, searchValue, sortType, sortValue);
        if(paging!=null && paging.getOffset()!=null && paging.getLimit()!=null){
            return list.stream().limit(paging.getLimit()).skip(paging.getOffset()).toList();
        }
        return list;
    }

    @Override
    public Optional<ProductEntities> findById(String id) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_ITEM_BYID)
                .bind("id", id)
                .mapToBean(ProductEntities.class)
                .findOne());
    }

    @Override
    public boolean save(ProductEntities product) {
      return jdbi.withHandle(handle -> handle.createUpdate(CREATE)
                .bind("id",UUID.randomUUID().toString())
                .bind("name", product.getName())
                .bind("description", product.getDescription())
                .bind("price", product.getPrice())
                .bind("quantity", product.getQuantity())
                .bind("unit", product.getUnit())
                .bind("status", product.getStatus())
                .execute()) > 0;
    }

    @Override
    public boolean saveAll(List<ProductEntities> products) {
      return  jdbi.withHandle(handle ->{
            PreparedBatch preparedBatch = handle.prepareBatch(CREATE);
            products.forEach(product -> preparedBatch
                    .bind("id", UUID.randomUUID().toString())
                    .bind("name", product.getName())
                    .bind("description", product.getDescription())
                    .bind("price", product.getPrice())
                    .bind("quantity", product.getQuantity())
                    .bind("unit", product.getUnit())
                    .bind("status", product.getStatus())
                    .add());
            return preparedBatch.execute().length>0;
        });
    }

    @Override
    public boolean deleteById(String id) {
        return jdbi.withHandle(handle -> handle.createUpdate(DELETE)
                .bind("id", id)
                .execute()) > 0;
    }

    @Override
    public boolean deleteBatchProduct(List<String> products) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(DELETE);
            products.forEach(product -> preparedBatch
                    .bind("id", product)
                    .add());
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean update(String id, ProductEntities product) {
        return jdbi.withHandle(handle -> handle.createUpdate(UPDATE)
                .bind("id",id)
                .bind("name", product.getName())
                .bind("description", product.getDescription())
                .bind("price", product.getPrice())
                .bind("unit", product.getUnit())
                .bind("status", product.getStatus())
                .execute()) > 0;
    }

    @Override
    public Optional<Integer> getTotalItem() {
        return jdbi.withHandle(handle -> handle.createQuery(TOTAL_ITEM)
                .mapTo(Integer.class)
                .findOne());
    }

    @Override
    public List<ProductEntities> searchByName(String name) {
        return jdbi.withHandle(handle -> handle.createQuery(SEARCH_BY_NAME)
                .bind("name", name)
                .mapToBean(ProductEntities.class)
                .list());
    }

    @Override
    public boolean addProductToCategory(String categoryID, String productID) {
        return jdbi.withHandle(handle -> handle.createUpdate(ADD_PRODUCT_TO_CATEGORY)
                .bind("categoryID", categoryID)
                .bind("productID", productID)
                .execute()) > 0;
    }

    @Override
    public boolean removeProductFromCategory(String categoryID, String productID) {
        return jdbi.withHandle(handle -> handle.createUpdate(REMOVE_PRODUCT_FROM_CATEGORY)
                .bind("categoryID", categoryID)
                .bind("productID", productID)
                .execute()) > 0;
    }

    @Override
    public boolean addBatchProductToCategory(String categoryID, List<String> productIDs) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(ADD_PRODUCT_TO_CATEGORY);
            productIDs.forEach(productID -> preparedBatch
                    .bind("categoryID", categoryID)
                    .bind("productID", productID)
                    .add());
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean removeBatchProductFromCategory(String categoryID, List<String> productIDs) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(REMOVE_PRODUCT_FROM_CATEGORY);
            productIDs.forEach(productID -> preparedBatch
                    .bind("categoryID", categoryID)
                    .bind("productID", productID)
                    .add());
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public List<ProductEntities> filterProductByTime(IPaging paging, TimeSearch timeSearch) {
        List<ProductEntities> list = filterProductByTime(timeSearch);
        if(paging!=null && paging.getOffset()!=null && paging.getLimit()!=null){
            return list.stream().limit(paging.getLimit()).skip(paging.getOffset()).toList();
        }
        return list;
    }

    @Override
    public List<ProductEntities> filterProductByTime(TimeSearch timeSearch) {
        DateTime dateTime = DateTime.builder().build();
        long currentTime = System.currentTimeMillis();
        dateTime.updateTime(currentTime);
        long startTime = currentTime;
        long endTime = currentTime;
        if(timeSearch == TimeSearch.ALL_TIME) {
            return findAll();
        }else if(timeSearch == TimeSearch.TODAY){
            startTime = (currentTime / 86400000) * 86400000;
        }else if(timeSearch == TimeSearch.YESTERDAY){
            startTime = (currentTime / 86400000) * 86400000 - 86400*1000;
            endTime = (currentTime / 86400000) * 86400000;
        }else if(timeSearch == TimeSearch.THIS_WEEK){
            startTime = dateTime.getStartWeek();
        }else if (timeSearch == TimeSearch.LAST_WEEK){
            startTime = dateTime.getEndWeek();
            endTime = dateTime.getStartWeek();
        }else if (timeSearch == TimeSearch.THIS_MONTH) {
            startTime = dateTime.getStartMonth();
        }else if (timeSearch == TimeSearch.LAST_MONTH) {
            startTime = dateTime.getEndMonth();
            endTime = dateTime.getStartMonth();
        }else if (timeSearch == TimeSearch.THIS_YEAR) {
            startTime = dateTime.getStartYear();
        }else if (timeSearch == TimeSearch.LAST_YEAR) {
            startTime = dateTime.getEndYear();
            endTime = dateTime.getStartYear();
        }
        long finalStartTime = startTime/1000;
        long finalEndTime = endTime/1000;
        System.out.println(finalStartTime+ " - " + finalEndTime);
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST_PRODUCT_BY_TIME)
                    .bind("startTime", finalStartTime)
                    .bind("endTime", finalEndTime)
                    .mapToBean(ProductEntities.class)
                    .list());
    }

}
