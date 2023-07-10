package fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialImageEntities;

import java.util.List;

public interface IImageDBIRepository {
    List<MaterialImageEntities> findAllImageByMaterialID(String materialID);

}
