package com.github.itsarnaud.infraneo.infrastructure.persistance.mapper;

import com.github.itsarnaud.infraneo.domain.entity.User;
import com.github.itsarnaud.infraneo.infrastructure.persistance.dao.UserDao;

public class UserMapper {
    public static UserDao toDao(User user) {
        return UserDao.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
    }

    public static User toEntity(UserDao userDao) {
        return User.builder()
                .username(userDao.getUsername())
                .email(userDao.getEmail())
                .password(userDao.getPassword())
                .build();
    }
}
