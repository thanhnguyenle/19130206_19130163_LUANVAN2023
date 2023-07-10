package fitnlu.ntpos.resourceservice.repository;

import fitnlu.ntpos.resourceservice.entities.ImageEntities;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
public interface ImageRepository extends JpaRepository<ImageEntities, Long> {
        Optional<ImageEntities> findById(final String id);
}
