package org.example.service;

import org.example.model.User;
import org.springframework.stereotype.Service;
import jakarta.validation.Valid;
import jakarta.validation.Validator;
import jakarta.validation.ConstraintViolation;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {
    private List<User> users = new ArrayList<>();

    @Autowired
    private Validator validator;

    public List<User> getAllUsers() {
        return users;
    }

    public User addUser(@Valid User user) throws IllegalArgumentException {
        Set<ConstraintViolation<User>> violations = validator.validate(user);
        if (!violations.isEmpty()) {
            throw new IllegalArgumentException(violations.stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(", ")));
        }
        users.add(user);
        return user;
    }

    public Optional<User> getUserByUsername(String username) {
        return users.stream()
                .filter(user -> user.getUsername().equals(username))
                .findFirst();
    }

    public boolean deleteUser(String username) {
        return users.removeIf(user -> user.getUsername().equals(username));
    }

    public Optional<User> updateUser(String username, @Valid User updatedUser) throws IllegalArgumentException {
        Set<ConstraintViolation<User>> violations = validator.validate(updatedUser);
        if (!violations.isEmpty()) {
            throw new IllegalArgumentException(violations.stream()
                    .map(ConstraintViolation::getMessage)
                    .collect(Collectors.joining(", ")));
        }
        for (int i = 0; i < users.size(); i++) {
            if (users.get(i).getUsername().equals(username)) {
                users.set(i, updatedUser);
                return Optional.of(updatedUser);
            }
        }
        return Optional.empty();
    }
}
