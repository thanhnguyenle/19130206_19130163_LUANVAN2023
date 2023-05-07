package fitnlu.ntpos.authservice.adapter.input.mapper;

import fitnlu.ntpos.authservice.adapter.input.dto.UserOutput;
import fitnlu.ntpos.authservice.adapter.input.dto.UserInput;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.annotations.Mapper;
import lombok.NoArgsConstructor;

@Mapper
@NoArgsConstructor
public class UserMapperInput {
    public UserOutput toDTO(User user) {
        return UserOutput.builder().id(user.getId()).name(user.getName()).username(user.getUsername()).password(user.getPassword()).email(user.getEmail()).phoneNumber(user.getPhoneNumber()).address(user.getAddress()).avatar(user.getAvatar()).roles(user.getRoles()).registeredAt(user.getRegisteredAt()).build();
    }

    public User toDomainFromSaveBody(UserInput userInput){
        return User.builder().name(userInput.name()).username(userInput.username()).password(userInput.password()).email(userInput.email()).phoneNumber(userInput.phoneNumber()).address(userInput.address()).avatar(userInput.avatar()).roles(userInput.roles()).build();
    }
}
