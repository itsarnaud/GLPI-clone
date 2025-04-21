package com.github.itsarnaud.infraneo.domain.port.in;

import com.github.itsarnaud.infraneo.domain.entity.User;

public interface UserDomainPort {
    String registerUser(User user);
    String loginUser(User user);
}
