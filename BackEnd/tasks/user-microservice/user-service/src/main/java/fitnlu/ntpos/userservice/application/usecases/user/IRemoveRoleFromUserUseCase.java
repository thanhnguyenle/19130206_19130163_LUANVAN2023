package fitnlu.ntpos.userservice.application.usecases.role;

public interface IRemoveRoleToUserUseCase {
    boolean removeRoleToUser(String username, String roleName);
}
