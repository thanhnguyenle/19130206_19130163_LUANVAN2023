package fitnlu.ntpos.productservice.adapter.output.persistance.repository;

import fitnlu.ntpos.productservice.adapter.output.persistance.entities.CategoryEntities;
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
public class CategoryRepository implements ICategoryDBIRepository {
    private static final String GET_LIST = "select * from `category`";

    private static final String CREATE = "INSERT INTO `category` VALUES (:id, :name, :description)";
    private static final String DELETE = "DELETE FROM `category` WHERE id = :id";
    private static final String GET_ITEM_BYID = "SELECT * FROM `category` WHERE id = :id";
    private static final String UPDATE = "UPDATE `category` SET name =:name, description =:description WHERE id =:id";
    private static final String TOTAL_ITEM = "SELECT COUNT(*) FROM `category`";

    private static final String GET_CATEGORY_BY_PRODUCT = "SELECT * FROM `category` WHERE id IN (SELECT categoryID FROM `product_category` WHERE productID = :productID)";
    private static final String GET_LIST_CATEGORY_BY_TIME = "SELECT * FROM `category` WHERE createdAt BETWEEN :startTime AND :endTime";
    @NonNull
    private final Jdbi jdbi;


    @Override
    public List<CategoryEntities> findAll() {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST)
                .mapToBean(CategoryEntities.class)
                .list());
    }

    @Override
    public List<CategoryEntities> filterCategory(IPaging paging, String searchType, String searchValue, String sortType, String sortValue) {
      List<CategoryEntities> categoryEntities = filterCategory(searchType, searchValue, sortType, sortValue);
      if(paging!=null && paging.getLimit()!=null && paging.getOffset()!=null){
          return categoryEntities.stream().skip(paging.getOffset()).limit(paging.getLimit()).toList();
      }
        return categoryEntities;
    }
    public List<CategoryEntities> filterCategory( String searchType, String searchValue, String sortType, String sortValue) {
        StringBuilder sql = new StringBuilder(GET_LIST);
        if(searchType!=null && !searchType.isEmpty() && searchValue!=null && !searchValue.isEmpty()){
            sql.append(" WHERE LOWER(").append(searchType).append(")")
                    .append(" LIKE '%").append(searchValue).append("%'");
        }
        if(sortType!=null && !sortType.isEmpty() && sortValue!=null && !sortValue.isEmpty()){
            sql.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
        }
        return jdbi.withHandle(handle -> handle.createQuery(sql.toString())
                .mapToBean(CategoryEntities.class)
                .list());
    }

    @Override
    public Optional<CategoryEntities> findById(String id) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_ITEM_BYID)
                .bind("id", id)
                .mapToBean(CategoryEntities.class)
                .findFirst());
    }

    @Override
    public boolean save(CategoryEntities category) {
        return jdbi.withHandle(handle -> handle.createUpdate(CREATE)
                .bind("id", UUID.randomUUID().toString())
                .bind("name", category.getName())
                .bind("description", category.getDescription())
                .execute()) > 0;
    }

    @Override
    public boolean saveBatch(List<CategoryEntities> categories) {
        return jdbi.withHandle(handle ->{
            PreparedBatch preparedBatch = handle.prepareBatch(CREATE);
            categories.forEach(category -> preparedBatch
                    .bind("id",  UUID.randomUUID().toString())
                    .bind("name", category.getName())
                    .bind("description", category.getDescription())
                    .add());
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean deleteById(String id) {
        return jdbi.withHandle(handle -> handle.createUpdate(DELETE)
                .bind("id", id)
                .execute()) > 0;
    }

    @Override
    public boolean deleteBatchCategory(List<String> categories) {
        return jdbi.withHandle(handle ->{
            PreparedBatch preparedBatch = handle.prepareBatch(DELETE);
            categories.forEach(category -> preparedBatch
                    .bind("id", category)
                    .add());
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean update(String id, CategoryEntities category) {
        return jdbi.withHandle(handle -> handle.createUpdate(UPDATE)
                .bind("id", id)
                .bind("name", category.getName())
                .bind("description", category.getDescription())
                .execute()) > 0;
    }

    @Override
    public List<CategoryEntities> findCategoryByProduct(String productID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_CATEGORY_BY_PRODUCT)
                .bind("productID", productID)
                .mapToBean(CategoryEntities.class)
                .list());
    }

    @Override
    public List<CategoryEntities> filterCategory(IPaging paging, TimeSearch timeSearch) {
      if(paging!=null && paging.getLimit()!=null && paging.getOffset()!=null){
          return filterCategory(timeSearch).stream().skip(paging.getOffset()).limit(paging.getLimit()).toList();
      }
        return filterCategory(timeSearch);
    }

    @Override
    public List<CategoryEntities> filterCategory(TimeSearch timeSearch) {
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
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST_CATEGORY_BY_TIME)
                .bind("startTime", finalStartTime)
                .bind("endTime", finalEndTime)
                .mapToBean(CategoryEntities.class)
                .list());
    }

    @Override
    public Optional<Integer> getTotalItem() {
        return jdbi.withHandle(handle -> handle.createQuery(TOTAL_ITEM)
                .mapTo(Integer.class)
                .findFirst());
    }
}
