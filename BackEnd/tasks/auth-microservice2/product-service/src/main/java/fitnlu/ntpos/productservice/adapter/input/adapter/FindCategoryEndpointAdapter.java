package fitnlu.ntpos.productservice.adapter.input.adapter;

import fitnlu.ntpos.productservice.adapter.input.dto.*;
import fitnlu.ntpos.productservice.adapter.input.mapper.CategoryMapperInput;
import fitnlu.ntpos.productservice.adapter.input.mapper.ImageMapperInput;
import fitnlu.ntpos.productservice.adapter.input.mapper.ProductMapperInput;
import fitnlu.ntpos.productservice.adapter.output.persistance.entities.CategoryEntities;
import fitnlu.ntpos.productservice.application.ports.input.IFindCategoryEndpointPort;
import fitnlu.ntpos.productservice.application.usecases.category.*;
import fitnlu.ntpos.productservice.application.usecases.product.IFilterProductsUseCase;
import fitnlu.ntpos.productservice.domain.model.Category;
import fitnlu.ntpos.productservice.domain.model.Product;
import fitnlu.ntpos.productservice.domain.model.TimeSearch;
import fitnlu.ntpos.productservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;
import fitnlu.ntpos.productservice.infrastructure.paging.PageRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class FindCategoryEndpointAdapter implements IFindCategoryEndpointPort {
    private final IFindAllCategoryUseCase findAllCategoryUseCase;
    private final IFindCategoryUseCase findCategoryUseCase;
    private final IFilterCategoryUseCase filterCategoryUseCase;
    private final ITotalCategoryUseCase totalCategoryUseCase;
    private final IFilterProductsUseCase iFilterProductsUseCase;
    private final IFilterCategoryByTimeUseCase iFilterCategoryByTimeUseCase;

    @Override
    public List<CategoryOutput> getAllCategories() {
        return findAllCategoryUseCase.findAllCategory().stream().map(category -> {
            CategoryOutput categoryOutput = CategoryMapperInput.toDTO(category);
            List<ProductOutput> productOutputs = iFilterProductsUseCase.filterProduct(null,category.getId(),null,null,null,null).stream().map(ProductMapperInput::toDTO).toList();
            categoryOutput.setProducts(productOutputs);
            return categoryOutput;
        }).toList();
    }

    @Override
    public CategoryOutput getCategoryById(String id) {
        List<ProductOutput> productOutputs = iFilterProductsUseCase.filterProduct(null,id,null,null,null,null).stream().map(ProductMapperInput::toDTO).toList();
        CategoryOutput categoryOutput = CategoryMapperInput.toDTO(findCategoryUseCase.findCategory(id));
        categoryOutput.setProducts(productOutputs);
        return categoryOutput;
    }

    @Override
    public ListCategoryOutput filterCategory(PagingInput pagingInput, String searchType, String searchValue, String sortType, String sortValue) {
        IPaging paging = pagingInput!=null?new PageRequest(pagingInput.page(),pagingInput.limit()):null;
        List<Category> categories = filterCategoryUseCase.filterCategory(searchType,searchValue,sortType,sortValue);
        int totalItem = categories.size();
        if(paging!=null && paging.getPage()!=null){
            List<CategoryOutput> productsOutputs = categories.stream().skip(paging.getOffset()).limit(paging.getLimit()).map(product ->{
                CategoryOutput categoryOutput = CategoryMapperInput.toDTO(product);
                //get list product of category
                List<ProductOutput> productOutputs = iFilterProductsUseCase.filterProduct(null,product.getId(),null,null,null,null).stream().map(ProductMapperInput::toDTO).toList();
                categoryOutput.setProducts(productOutputs);
                return categoryOutput;
            }).toList();
            int totalPage = totalItem%paging.getLimit()==0?totalItem/paging.getLimit():totalItem/paging.getLimit()+1;
            return ListCategoryOutput.builder()
                    .categories(productsOutputs)
                    .currentPage(paging.getPage())
                    .totalPage(totalPage<=0?1:totalPage)
                    .totalItem(totalItem)
                    .build();
        }else{
            return ListCategoryOutput.builder()
                    .categories(categories.stream().map(category ->{
                        CategoryOutput categoryOutput = CategoryMapperInput.toDTO(category);
                        //get list product of category
                        List<ProductOutput> productOutputs = iFilterProductsUseCase.filterProduct(null,category.getId(),null,null,null,null).stream().map(ProductMapperInput::toDTO).toList();
                        categoryOutput.setProducts(productOutputs);
                        return categoryOutput;
                    }).toList())
                    .currentPage(1)
                    .totalPage(1)
                    .totalItem(categories.size())
                    .build();
        }
    }

    @Override
    public Integer getTotalItem() {
        return totalCategoryUseCase.totalCategory();
    }

    @Override
    public ListCategoryOutput filterCategoryByTime(PagingInput paging, TimeSearch timeSearch) {
        IPaging pagingInput = paging != null ? new PageRequest(paging.page(), paging.limit()) : null;
        List<Category> categoryEntities = iFilterCategoryByTimeUseCase.filterCategory(timeSearch);
        int totalItem = categoryEntities.size();
        if (paging != null && paging.page() != null) {
            List<CategoryOutput> productsOutputs = categoryEntities.stream().skip(pagingInput.getOffset()).limit(pagingInput.getLimit()).map(product -> {
                CategoryOutput categoryOutput = CategoryMapperInput.toDTO(product);
                //get list product of category
                List<ProductOutput> productOutputs = iFilterProductsUseCase.filterProduct(null, product.getId(), null, null, null, null).stream().map(ProductMapperInput::toDTO).toList();
                categoryOutput.setProducts(productOutputs);
                return categoryOutput;
            }).toList();
            int totalPage = totalItem % pagingInput.getLimit() == 0 ? totalItem / pagingInput.getLimit() : totalItem / pagingInput.getLimit() + 1;
            return ListCategoryOutput.builder()
                    .categories(productsOutputs)
                    .currentPage(pagingInput.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        } else {
            return ListCategoryOutput.builder()
                    .categories(categoryEntities.stream().map(category -> {
                        CategoryOutput categoryOutput = CategoryMapperInput.toDTO(category);
                        //get list product of category
                        List<ProductOutput> productOutputs = iFilterProductsUseCase.filterProduct(null, category.getId(), null, null, null, null).stream().map(ProductMapperInput::toDTO).toList();
                        categoryOutput.setProducts(productOutputs);
                        return categoryOutput;
                    }).toList())
                    .currentPage(1)
                    .totalPage(1)
                    .totalItem(totalItem)
                    .build();
        }

    }
}
