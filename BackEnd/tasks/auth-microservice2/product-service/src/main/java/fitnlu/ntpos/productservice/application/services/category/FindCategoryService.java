package fitnlu.ntpos.productservice.application.services.category;

import fitnlu.ntpos.productservice.application.ports.output.IReadCategoryPort;
import fitnlu.ntpos.productservice.application.usecases.category.*;
import fitnlu.ntpos.productservice.domain.model.Category;
import fitnlu.ntpos.productservice.domain.model.TimeSearch;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class FindCategoryService implements IFindCategoryUseCase,
        IFindAllCategoryUseCase,
        IFilterCategoryUseCase ,
        ITotalCategoryUseCase,
        IFindCategoryByProductIDUseCase,
        IFilterCategoryByTimeUseCase{
    private final IReadCategoryPort readCategoryPort;
    @Override
    public List<Category> findAllCategory() {
        return readCategoryPort.getAllCategories();
    }

    @Override
    public Category findCategory(String id) {
        return readCategoryPort.getCategoryById(id);
    }


    @Override
    public int totalCategory() {
        return readCategoryPort.getTotalItem();
    }

    @Override
    public List<Category> findCategoryByProduct(String productID) {
        return readCategoryPort.findCategoryByProduct(productID);
    }

    @Override
    public List<Category> filterCategory(IPaging paging, String searchType, String searchValue, String sortType, String sortValue) {
        return readCategoryPort.filterCategory(paging,searchType,searchValue,sortType,sortValue);
    }

    @Override
    public List<Category> filterCategory( String searchType, String searchValue, String sortType, String sortValue) {
        return readCategoryPort.filterCategory(searchType,searchValue,sortType,sortValue);
    }

    @Override
    public List<Category> filterCategory(IPaging paging, TimeSearch timeSearch) {
        return readCategoryPort.filterCategory(paging,timeSearch);
    }

    @Override
    public List<Category> filterCategory(TimeSearch timeSearch) {
        return readCategoryPort.filterCategory(timeSearch);
    }
}
