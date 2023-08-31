package fitnlu.ntpos.inventoryservice.application.usecases.materialSetupDefault;

public interface IDeleteMaterialDefaultUseCase {
    boolean deleteMaterialDefault(String materialId);
    boolean deleteAllMaterialDefault();
}
