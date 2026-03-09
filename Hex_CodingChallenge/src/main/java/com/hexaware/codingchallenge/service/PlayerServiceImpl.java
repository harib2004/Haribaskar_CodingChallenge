package com.hexaware.codingchallenge.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hexaware.codingchallenge.entity.Player;
import com.hexaware.codingchallenge.exception.PlayerNotFoundException;
import com.hexaware.codingchallenge.repository.PlayerRepository;

@Service
public class PlayerServiceImpl implements IPlayerService {
	@Autowired
    private PlayerRepository playerRepository;

    @Override
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    @Override
    public Player createPlayer(Player player) {
        return playerRepository.save(player);
    }

    @Override
    public Player getPlayerById(Integer id) {
        return playerRepository.findById(id).orElseThrow(() -> new PlayerNotFoundException("Player not found"));
    }

    @Override
    public Player updatePlayer(Integer playerId, Player updatedPlayer) {
        Player player = playerRepository.findById(playerId).orElseThrow(() -> new PlayerNotFoundException("Player not found"));
            player.setPlayerName(updatedPlayer.getPlayerName());
            player.setJerseyNumber(updatedPlayer.getJerseyNumber());
            player.setRole(updatedPlayer.getRole());
            player.setTotalMatches(updatedPlayer.getTotalMatches());
            player.setTeamName(updatedPlayer.getTeamName());
            player.setCountry(updatedPlayer.getCountry());
            player.setDescription(updatedPlayer.getDescription());
            return playerRepository.save(player);
        
    }

    @Override
    public void deletePlayer(Integer id) {
        playerRepository.deleteById(id);
    }
}

