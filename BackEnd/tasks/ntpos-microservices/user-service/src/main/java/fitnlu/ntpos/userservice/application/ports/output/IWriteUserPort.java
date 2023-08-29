package fitnlu.ntpos.userservice.application.ports.output;

import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;

import java.util.List;

public interface IWriteUserPort {
    UnitReactive<User> saveNew(User user) ;
    User saveNewSync(User user) ;

    User deleteUserSync(String id) ;
    User updateUserSync(String id, User user) ;
    boolean addRoleToUser(String userID, List<String> roleName);
    boolean removeRoleFromUser(String userID, List<String>  roleName);
    boolean lockUser(String id);
    boolean unlockUser(String id);

    boolean addBatchUsers(List<User> users);
}

