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
        try {
            userJpaRepository.save(UserMapper.toDao(user));
        } catch (Exception e) {
            throw new RuntimeException("Error while saving user");
        }
    }

    public User findUserByEmail(String email) {
        try{
            return userJpaRepository.findByEmail(email)
                    .map(UserMapper::toEntity)
                    .orElse(null);
        }catch (Exception e) {
            throw new RuntimeException("Error while finding user by email");
        }
    }


}
