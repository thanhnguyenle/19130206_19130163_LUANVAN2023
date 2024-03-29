package fitnlu.ntpos.userservice.adapter.input.adapter;

import fitnlu.ntpos.userservice.adapter.input.dto.ListUserOutput;
import fitnlu.ntpos.userservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.userservice.adapter.input.dto.UserOutput;
import fitnlu.ntpos.userservice.adapter.input.mapper.UserMapperInput;
import fitnlu.ntpos.userservice.application.ports.input.IFindUserEndpointPort;
import fitnlu.ntpos.userservice.application.usecases.user.*;
import fitnlu.ntpos.userservice.domain.model.TimeSearch;
import fitnlu.ntpos.userservice.domain.model.User;
import fitnlu.ntpos.userservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.userservice.infrastructure.paging.IPaging;
import fitnlu.ntpos.userservice.infrastructure.paging.PageRequest;
import fitnlu.ntpos.userservice.infrastructure.reactive.CollectionReactive;
import fitnlu.ntpos.userservice.infrastructure.reactive.UnitReactive;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Adapter
@AllArgsConstructor
public class FindUserEndpointAdapter implements IFindUserEndpointPort {
    private final IFindUserUseCase iFindUserUseCase;
    private final IFindAllUserUseCase iFindAllUserUseCase;
    private final UserMapperInput userMapperInput;
    private final IFindAllUserByGroupNameUseCase iFindAllUserByGroupNameUseCase;
    private final IFindAllUserByGroupIDUseCase iFindAllUserByGroupIDUseCase;
    private final IFilterUserByTimeUseCase iFilterUserByTimeUseCase;
    private final IFilterUserUseCase iFilterUserUseCase;
    @Override
    public CollectionReactive<UserOutput> findALL() {
        return iFindAllUserUseCase.findAll().map(user ->{
            UserOutput userOutput = UserMapperInput.toDTO(user);
            userOutput.setVerify(iFindUserUseCase.isVerify(user.getId()));
            return UserMapperInput.toDTO(user);
        });
    }

    @Override
    public List<UserOutput> findAllSync() {
        return iFindAllUserUseCase.findAllSync().stream().map(user -> {
            UserOutput userOutput = UserMapperInput.toDTO(user);
            userOutput.setVerify(iFindUserUseCase.isVerify(user.getId()));
            return userOutput;
        }).collect(Collectors.toList());
    }

    @Override
    public UnitReactive<UserOutput> findById(String id) {
        return iFindUserUseCase.findById(id).map(user -> {
            UserOutput userOutput = UserMapperInput.toDTO(user);
            userOutput.setVerify(iFindUserUseCase.isVerify(user.getId()));
            return userOutput;
        });
    }

    @Override
    public UserOutput findByIdSync(String id) {
        UserOutput userOutput = UserMapperInput.toDTO(iFindUserUseCase.findByIdSync(id));
        userOutput.setVerify(iFindUserUseCase.isVerify(id));
        return userOutput;
    }

    @Override
    public List<UserOutput> findUserByGroupName(String groupName) {
        return iFindAllUserByGroupNameUseCase.findAllUserByGroupName(groupName).stream().map(user -> {
            UserOutput userOutput = UserMapperInput.toDTO(user);
            userOutput.setVerify(iFindUserUseCase.isVerify(user.getId()));
            return userOutput;
        }).collect(Collectors.toList());
    }

    @Override
    public List<UserOutput> findUserByGroupID(String groupID) {
        return iFindAllUserByGroupIDUseCase.findAllUserByGroupID(groupID).stream().map(user -> {
            UserOutput userOutput = UserMapperInput.toDTO(user);
            userOutput.setVerify(iFindUserUseCase.isVerify(user.getId()));
            return userOutput;
        }).collect(Collectors.toList());
    }

    @Override
    public List<UserOutput> filterUserByTime(TimeSearch timeSearch) {
        return iFilterUserByTimeUseCase.filterUserByTime(timeSearch).stream().map(user -> {
            UserOutput userOutput = UserMapperInput.toDTO(user);
            userOutput.setVerify(iFindUserUseCase.isVerify(user.getId()));
            return userOutput;
        }).collect(Collectors.toList());
    }

    @Override
    public ListUserOutput filterUser(PagingInput pagingInput, String groupID, String searchType, String searchValue, String sortType, String sortValue) {
        List<User> userOutputs = iFilterUserUseCase.filterUser(groupID,searchType,searchValue,sortType,sortValue);
        IPaging paging = pagingInput!=null?new PageRequest(pagingInput.page(),pagingInput.limit()):null;
        if(paging==null){
            return ListUserOutput.builder()
                    .users(userOutputs.stream().map(user -> {
                        UserOutput userOutput = UserMapperInput.toDTO(user);
                        userOutput.setVerify(iFindUserUseCase.isVerify(user.getId()));
                        return userOutput;
                    }).collect(Collectors.toList()))
                    .currentPage(1)
                    .totalItem(userOutputs.size())
                    .totalPage(1)
                    .build();
        }
        int totalItem = userOutputs.size();
        userOutputs = userOutputs.stream().skip(paging.getOffset()).limit(paging.getLimit()).collect(Collectors.toList());
        int totalPage = totalItem%paging.getLimit()==0?totalItem/paging.getLimit():totalItem/paging.getLimit()+1;
        return ListUserOutput.builder()
                .users(userOutputs.stream().map(user -> {
                    UserOutput userOutput = UserMapperInput.toDTO(user);
                    userOutput.setVerify(iFindUserUseCase.isVerify(user.getId()));
                    return userOutput;
                }).collect(Collectors.toList()))
                .totalItem(totalItem)
                .totalPage(totalPage)
                .currentPage(pagingInput.page())
                .build();
    }

    @Override
    public boolean isVerify(String id) {
        return iFindUserUseCase.isVerify(id);
    }

}
