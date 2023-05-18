package fitnlu.ntpos.productservice.infrastructure.reactive;

import lombok.AccessLevel;
import lombok.Getter;
import reactor.core.publisher.Mono;

import java.util.function.Function;

@Getter(AccessLevel.PRIVATE)
public final class UnitReactive<T> {

    private final Mono<T> mono;

    private UnitReactive(Mono<T> mono) {
        this.mono = mono;
    }

    public Mono<T> toMono() {
        return mono;
    }

    public <U> UnitReactive<U> map(Function<? super T, ? extends U> mapper) {
        return UnitReactive.of(mono.map(mapper));
    }

    public static <U> UnitReactive<U> of(Mono<U> map) {
        return new UnitReactive<U>((Mono<U>) map);
    }

    public <U> UnitReactive<U> flatMap(Function<? super T, ? extends UnitReactive<? extends U>> transformer) {
        Function<? super T, ? extends Mono<? extends U>> monoFunction = transformer.andThen(UnitReactive::toMono);
        return UnitReactive.of(mono.flatMap(monoFunction));
    }

    public static <U> UnitReactive<U> error(Throwable t) {
        return UnitReactive.of(Mono.error(t));
    }

}