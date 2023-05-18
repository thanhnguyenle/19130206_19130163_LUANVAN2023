package fitnlu.ntpos.productservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.productservice.adapter.output.persistance.mapper.CategoryMapperOutput;
import fitnlu.ntpos.productservice.adapter.output.persistance.repository.ICategoryDBIRepository;
import fitnlu.ntpos.productservice.application.ports.output.IWriteCategoryPort;
import fitnlu.ntpos.productservice.domain.model.Category;
import fitnlu.ntpos.productservice.infrastructure.annotations.Adapter;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class WriteCategoryAdapter implements IWriteCategoryPort {
    private final ICategoryDBIRepository categoryDBIRepository;
    @Override
    public boolean addCategory(Category category) {
        return categoryDBIRepository.save(CategoryMapperOutput.toEntity(category)) ;
    }

    @Override
    public boolean updateCategory(String id, Category category) {
        return categoryDBIRepository.update(id, CategoryMapperOutput.toEntity(category));
    }

    @Override
    public boolean deleteCategory(String id) {
        return categoryDBIRepository.deleteById(id);
    }

    @Override
    public boolean addBatchCategory(List<Category> categories) {
        return categoryDBIRepository.saveBatch(categories.stream().map(CategoryMapperOutput::toEntity).toList());
    }

    @Override
    public boolean deleteBatchCategory(List<String> ids) {
        return categoryDBIRepository.deleteBatchCategory(ids);
    }
}
