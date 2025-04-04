package io.github.itsarnaud.glpiclone.application.mapper;

import io.github.itsarnaud.glpiclone.application.dto.UserDto;
import io.github.itsarnaud.glpiclone.domain.entity.User;

public class UserMapper {

    public static UserDto toDto(User user) {
        return UserDto.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
    }

    public static User toEntity(UserDto userDto) {
        return User.builder()
                .username(userDto.getUsername())
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .build();
    }

}
