package com.github.itsarnaud.infraneo.domain.port.out;

import com.github.itsarnaud.infraneo.domain.entity.User;

public interface UserPersistancePort {

    void saveUser(User user);
    User findUserByEmail(String email);


}
