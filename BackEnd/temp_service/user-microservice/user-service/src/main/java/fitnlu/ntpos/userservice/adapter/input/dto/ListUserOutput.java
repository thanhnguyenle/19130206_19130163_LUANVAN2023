package fitnlu.ntpos.userservice.adapter.input.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Builder
public class ListUserOutput {
    private List<UserOutput> users;
    @Setter
    private int currentPage;
    @Setter
    private int totalPage;

    private int totalItem;
}
