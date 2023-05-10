package fitnlu.ntpos.userservice.application.usecases.role;

public interface IAddRoleToUserUseCase {
    boolean addRoleToUser(String username, String roleName);
}
