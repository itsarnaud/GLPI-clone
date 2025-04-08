package io.github.itsarnaud.infraneo.domain.port.out;

import io.github.itsarnaud.infraneo.domain.entity.User;

public interface UserPersistancePort {

    void saveUser(User user);


}
