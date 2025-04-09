package io.github.itsarnaud.infraneo.domain.service;

import io.github.itsarnaud.infraneo.domain.entity.User;
import io.github.itsarnaud.infraneo.domain.port.in.UserDomainPort;
import io.github.itsarnaud.infraneo.domain.port.out.BcryptPasswordEncoderPort;
import io.github.itsarnaud.infraneo.domain.port.out.JwtServicePort;
import io.github.itsarnaud.infraneo.domain.port.out.UserPersistancePort;
import io.github.itsarnaud.infraneo.infrastructure.persistance.service.UserPersistanceService;
import io.github.itsarnaud.infraneo.infrastructure.security.service.JwtService;
import org.springframework.stereotype.Service;

@Service
public class UserDomainService implements UserDomainPort {

    private final UserPersistancePort userPersistanceService;
    private final JwtServicePort jwtService;
    private final BcryptPasswordEncoderPort bcryptPasswordEncoderService;

    public UserDomainService(UserPersistanceService userPersistanceService, JwtService jwtService, BcryptPasswordEncoderPort bcryptPasswordEncoderService) {
        this.userPersistanceService = userPersistanceService;
        this.jwtService = jwtService;
        this.bcryptPasswordEncoderService = bcryptPasswordEncoderService;
    }

    public String registerUser(User user) {
        user.setPassword(bcryptPasswordEncoderService.encode(user.getPassword()));
        userPersistanceService.saveUser(user);
        return jwtService.generateToken(user.getEmail());
    }

    public String loginUser(User user){
        User userFromDb = userPersistanceService.findUserByEmail(user.getEmail());
        if (userFromDb == null) {
            throw new RuntimeException("User not found");
        }
        if (!bcryptPasswordEncoderService.matches(user.getPassword(), userFromDb.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        return jwtService.generateToken(user.getEmail());
    }

}
