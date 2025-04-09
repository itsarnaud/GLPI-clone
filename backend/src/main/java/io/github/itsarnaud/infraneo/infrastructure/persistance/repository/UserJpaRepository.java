package io.github.itsarnaud.infraneo.infrastructure.persistance.repository;

import io.github.itsarnaud.infraneo.infrastructure.persistance.dao.UserDao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserJpaRepository extends JpaRepository<UserDao, UUID> {
    Optional<UserDao> findByEmail(String email);
}
