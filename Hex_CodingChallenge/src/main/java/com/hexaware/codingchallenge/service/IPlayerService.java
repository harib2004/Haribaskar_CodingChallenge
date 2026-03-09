package com.hexaware.codingchallenge.service;

import java.util.List;

import com.hexaware.codingchallenge.entity.Player;

public interface IPlayerService {
	
	public List<Player> getAllPlayers();
    public Player createPlayer(Player player);
    public Player getPlayerById(Integer id);
    public Player updatePlayer(Integer id, Player updatedPlayer);
    public void deletePlayer(Integer id);
}
