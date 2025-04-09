package io.github.itsarnaud.infraneo.infrastructure.persistance.service;


import io.github.itsarnaud.infraneo.infrastructure.persistance.mapper.UserMapper;
import io.github.itsarnaud.infraneo.domain.entity.User;
import io.github.itsarnaud.infraneo.domain.port.out.UserPersistancePort;
import io.github.itsarnaud.infraneo.infrastructure.persistance.repository.UserJpaRepository;
import org.springframework.stereotype.Service;

@Service
public class UserPersistanceService implements UserPersistancePort {

    private final UserJpaRepository userJpaRepository;


    public UserPersistanceService(UserJpaRepository userJpaRepository) {
        this.userJpaRepository = userJpaRepository;
    }

    public void saveUser(User user) {
        userJpaRepository.save(UserMapper.toDao(user));
    }

    public User findUserByEmail(String email) {
        return userJpaRepository.findByEmail(email)
                .map(UserMapper::toEntity)
                .orElse(null);
    }


}
