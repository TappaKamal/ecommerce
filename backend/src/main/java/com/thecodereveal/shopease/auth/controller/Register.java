package com.thecodereveal.shopease.auth.controller;

import org.springframework.web.bind.annotation.RestController;

import com.thecodereveal.shopease.auth.entities.User;
import com.thecodereveal.shopease.auth.repositories.UserDetailRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class Register {
    

    UserDetailRepository UR;
    @PostMapping("/add")
    public String addUser(@RequestBody User u)
    {
         UR.save(u);
         return "User Saved";
    }

    
}
