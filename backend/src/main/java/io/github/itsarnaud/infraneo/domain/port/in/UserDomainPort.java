package io.github.itsarnaud.infraneo.domain.port.in;

import io.github.itsarnaud.infraneo.domain.entity.User;

public interface UserDomainPort {
    String registerUser(User user);
    String loginUser(User user);
}
