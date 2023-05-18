package fitnlu.ntpos.productservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.productservice.adapter.output.persistance.mapper.CategoryMapperOutput;
import fitnlu.ntpos.productservice.adapter.output.persistance.repository.ICategoryDBIRepository;
import fitnlu.ntpos.productservice.application.ports.output.IReadCategoryPort;
import fitnlu.ntpos.productservice.domain.model.Category;
import fitnlu.ntpos.productservice.domain.model.TimeSearch;
import fitnlu.ntpos.productservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

@Adapter
@RequiredArgsConstructor
public class ReadCategoryAdapter implements IReadCategoryPort {
    private final ICategoryDBIRepository categoryDBIRepository;
    @Override
    public List<Category> getAllCategories() {
        return categoryDBIRepository.findAll().stream().map(CategoryMapperOutput::toDomain).toList();
    }

    @Override
    public Category getCategoryById(String id) {
        return categoryDBIRepository.findById(id).map(CategoryMapperOutput::toDomain).orElse(null);
    }

    @Override
    public List<Category> filterCategory(IPaging paging, String searchType, String searchValue, String sortType, String sortValue) {
        return categoryDBIRepository.filterCategory(paging,searchType,searchValue,sortType,sortValue).stream().map(CategoryMapperOutput::toDomain).toList();
    }

    @Override
    public List<Category> filterCategory(String searchType, String searchValue, String sortType, String sortValue) {
        return categoryDBIRepository.filterCategory(searchType,searchValue,sortType,sortValue).stream().map(CategoryMapperOutput::toDomain).toList();
    }

    @Override
    public Integer getTotalItem() {
        return categoryDBIRepository.getTotalItem().orElse(0);
    }

    @Override
    public List<Category> findCategoryByProduct(String productID) {
        return categoryDBIRepository.findCategoryByProduct(productID).stream().map(CategoryMapperOutput::toDomain).toList();
    }

    @Override
    public List<Category> filterCategory(IPaging paging, TimeSearch timeSearch) {
        return categoryDBIRepository.filterCategory(paging,timeSearch).stream().map(CategoryMapperOutput::toDomain).toList();
    }

    @Override
    public List<Category> filterCategory(TimeSearch timeSearch) {
        return categoryDBIRepository.filterCategory(timeSearch).stream().map(CategoryMapperOutput::toDomain).toList();
    }
}
