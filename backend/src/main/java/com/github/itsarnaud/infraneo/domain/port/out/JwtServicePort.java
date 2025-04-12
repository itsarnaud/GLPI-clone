package com.github.itsarnaud.infraneo.domain.port.out;

public interface JwtServicePort {
    String generateToken(String email);
    String validateToken(String token);
}
