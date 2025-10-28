package com.github.itsarnaud.infraneo.infrastructure.security.service;

import com.github.itsarnaud.infraneo.domain.port.out.BcryptPasswordEncoderPort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class BcryptPasswordEncoderService implements BcryptPasswordEncoderPort {

    private final PasswordEncoder passwordEncoder;

    public BcryptPasswordEncoderService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public String encode(String password) {
        return passwordEncoder.encode(password);
    }

    public boolean matches(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

}
