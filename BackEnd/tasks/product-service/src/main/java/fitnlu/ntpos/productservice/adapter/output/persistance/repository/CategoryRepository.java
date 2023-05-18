package fitnlu.ntpos.productservice.adapter.output.persistance.repository;

import fitnlu.ntpos.productservice.adapter.output.persistance.entities.ProductEntities;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.statement.PreparedBatch;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
@RequiredArgsConstructor
public class CategoryRepository implements IProductDBIRepository {
    private static final String GET_LIST = "select * from `product`";

    private static final String CREATE = "INSERT INTO `product` VALUES (id =:id, name =:name, description =:description, price =:price, unit =:unit, status =:status)";
    private static final String DELETE = "DELETE FROM `product` WHERE id = :id";
    private static final String GET_ITEM_BYID = "SELECT * FROM `product` WHERE id = :id";
    private static final String UPDATE = "UPDATE `product` SET name =:name, description =:description, price =:price, unit =:unit, status =:status WHERE id =:id";
    private static final String TOTAL_ITEM = "SELECT COUNT(*) FROM `product`";
    private static final String SEARCH_BY_NAME = "SELECT * FROM `product` WHERE name LIKE '%:name%'";
    @NonNull
    private final Jdbi jdbi;


    @Override
    public List<ProductEntities> findAll() {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST)
                .mapToBean(ProductEntities.class)
                .list());
    }

    @Override
    public List<ProductEntities> filterProduct(IPaging paging, String categoryID, String searchType, String searchValue, String sortType, String sortValue) {
        StringBuilder sql = new StringBuilder(GET_LIST);
        if(paging.getOffset()!=null && paging.getLimit()!=null){
            if(categoryID!=null && !categoryID.isEmpty()){
                sql.append(" WHERE categoryID = ").append(categoryID);
            }
            if(searchType!=null && !searchType.isEmpty() && searchValue!=null && !searchValue.isEmpty()){
                sql.append(" WHERE LOWER(").append(searchType).append(")")
                        .append(" LIKE '%").append(searchValue).append("%'");
            }
            if(sortType!=null && !sortType.isEmpty() && sortValue!=null && !sortValue.isEmpty()){
                sql.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
            }
            sql.append(" LIMIT ").append(paging.getOffset()).append(",").append(paging.getLimit());
        }
        return jdbi.withHandle(handle -> handle.createQuery(sql.toString())
                .mapToBean(ProductEntities.class)
                .list());
    }

    @Override
    public Optional<ProductEntities> findById(String id) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_ITEM_BYID)
                .bind("id", id)
                .mapToBean(ProductEntities.class)
                .findOne());
    }

    @Override
    public ProductEntities save(ProductEntities product) {
        jdbi.useHandle(handle -> {
            handle.createUpdate(CREATE)
                    .bind("id", product.getId())
                    .bind("name", product.getName())
                    .bind("description", product.getDescription())
                    .bind("price", product.getPrice())
                    .bind("unit", product.getUnit())
                    .bind("status", product.getStatus())
                    .execute();
        });
        return product;
    }

    @Override
    public List<ProductEntities> saveAll(List<ProductEntities> products) {
        jdbi.useHandle(handle ->{
            PreparedBatch preparedBatch = handle.prepareBatch(CREATE);
            products.forEach(product -> preparedBatch
                    .bind("id", product.getId())
                    .bind("name", product.getName())
                    .bind("description", product.getDescription())
                    .bind("price", product.getPrice())
                    .bind("unit", product.getUnit())
                    .bind("status", product.getStatus())
                    .add());
            preparedBatch.execute();
        });
        return products;
    }

    @Override
    public boolean deleteById(String id) {
        return jdbi.withHandle(handle -> handle.createUpdate(DELETE)
                .bind("id", id)
                .execute()) > 0;
    }

    @Override
    public boolean deleteBatchProduct(List<ProductEntities> products) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(DELETE);
            products.forEach(product -> preparedBatch
                    .bind("id", product.getId())
                    .add());
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean update(ProductEntities product) {
        return jdbi.withHandle(handle -> handle.createUpdate(UPDATE)
                .bind("id", product.getId())
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

}
