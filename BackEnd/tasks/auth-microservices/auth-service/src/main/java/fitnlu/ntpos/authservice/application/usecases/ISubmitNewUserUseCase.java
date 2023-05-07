package fitnlu.ntpos.authservice.application.usecases;

import com.demo.productservice.domain.model.Product;
import com.demo.productservice.infrastructure.reactive.UnitReactive;
import fitnlu.ntpos.authservice.domain.model.User;
import fitnlu.ntpos.authservice.infrastructure.reactive.UnitReactive;

public interface ISubmitNewProductUseCase {
    UnitReactive<User> saveNew(User user);
    User saveNewSync(User user);
}