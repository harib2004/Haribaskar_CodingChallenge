package com.hexaware.codingchallenge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hexaware.codingchallenge.entity.Player;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Integer> {

}
