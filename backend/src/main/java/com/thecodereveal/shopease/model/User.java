package com.thecodereveal.shopease.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity(name = "LegacyUser")
@Table(name = "legacy_users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;
}