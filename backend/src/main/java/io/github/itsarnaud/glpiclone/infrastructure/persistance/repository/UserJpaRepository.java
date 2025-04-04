package io.github.itsarnaud.glpiclone.infrastructure.persistance.repository;

import io.github.itsarnaud.glpiclone.infrastructure.persistance.dao.UserDao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserJpaRepository extends JpaRepository<UserDao, UUID> {
}
