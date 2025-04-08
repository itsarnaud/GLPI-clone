package io.github.itsarnaud.infraneo.domain.service;

import io.github.itsarnaud.infraneo.domain.entity.User;
import io.github.itsarnaud.infraneo.domain.port.out.UserPersistancePort;
import io.github.itsarnaud.infraneo.infrastructure.persistance.service.UserPersistanceService;
import org.springframework.stereotype.Service;

@Service
public class UserDomainService {

    private final UserPersistancePort userPersistanceService;

    public UserDomainService(UserPersistanceService userPersistanceService) {
        this.userPersistanceService = userPersistanceService;
    }

    public User registerUser(User user) {



    }

}
