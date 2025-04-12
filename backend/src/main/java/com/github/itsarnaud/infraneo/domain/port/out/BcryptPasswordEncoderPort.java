package com.github.itsarnaud.infraneo.domain.port.out;

public interface BcryptPasswordEncoderPort {

    String encode(String password);

    boolean matches(String rawPassword, String encodedPassword);
}
