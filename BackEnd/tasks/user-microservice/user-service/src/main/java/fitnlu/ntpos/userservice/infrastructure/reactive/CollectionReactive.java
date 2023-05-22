package fitnlu.ntpos.userservice.infrastructure.reactive;

import lombok.*;
import reactor.core.publisher.Flux;

import java.util.function.Function;

@Getter(AccessLevel.PRIVATE)
public final class CollectionReactive<T> {

    private final Flux<T> flux;

    private CollectionReactive(Flux<T> flux) {
        this.flux = flux;
    }

    public Flux<T> toFlux() {
        return flux;
    }

    public <U> CollectionReactive<U> map(Function<? super T, ? extends U> mapper) {
        return CollectionReactive.of(flux.map(mapper));
    }

    public  static <T> CollectionReactive<T> of(Flux<T> map) {
        return new CollectionReactive<T>(map);
    }
}

