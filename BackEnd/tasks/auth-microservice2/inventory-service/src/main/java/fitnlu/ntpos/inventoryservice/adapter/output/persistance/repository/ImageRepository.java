package fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialImageEntities;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
@Transactional
@RequiredArgsConstructor
public class ImageRepository implements IImageDBIRepository {
    private static final String FIND_ALL_IMAGE_BY_MATERIALID = "SELECT * FROM `image` WHERE materialID = :materialID";
    @NonNull
    private final Jdbi jdbi;
    @Override
    public List<MaterialImageEntities> findAllImageByMaterialID(String materialID) {
        return jdbi.withHandle(handle -> handle.createQuery(FIND_ALL_IMAGE_BY_MATERIALID)
                .bind("materialID",materialID)
                .mapToBean(MaterialImageEntities.class)
                .list());
    }
}
