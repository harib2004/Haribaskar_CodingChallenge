package com.hexaware.codingchallenge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hexaware.codingchallenge.dto.PlayerDTO;
import com.hexaware.codingchallenge.entity.Player;
import com.hexaware.codingchallenge.service.PlayerServiceImpl;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    @Autowired
    private PlayerServiceImpl playerService;

    @GetMapping
    public List<Player> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @PostMapping
    public Player createPlayer(@RequestBody Player player) {
        return playerService.createPlayer(player);
    }

    @GetMapping("/{playerId}")
    public Player getPlayerById(@PathVariable Integer playerId) {
        return playerService.getPlayerById(playerId);
                
    }

    @PutMapping("/{playerId}")
    public PlayerDTO updatePlayer(@PathVariable Integer playerId, @RequestBody Player updatedPlayer) {        
        Player player = playerService.updatePlayer(playerId, updatedPlayer);
        return setDTO(player);
    }

    @DeleteMapping("/{playerId}")
    public String deletePlayer(@PathVariable Integer playerId) {
    		Player player =  playerService.getPlayerById(playerId);
    		if(player!=null) {
    			playerService.deletePlayer(playerId);
                return "Player deleted";
    		}
    		return "Player with "+playerId+" not found";    
    }
    
    private PlayerDTO setDTO(Player p) {
        
    	PlayerDTO dto = new PlayerDTO();
        dto.setId(p.getId());
        dto.setPlayerName(p.getPlayerName());
        dto.setJerseyNumber(p.getJerseyNumber());
        dto.setRole(p.getRole());
        dto.setTotalMatches(p.getTotalMatches());
        dto.setTeamName(p.getTeamName());
        dto.setCountry(p.getCountry());
        dto.setDescription(p.getDescription());
        return dto;
    }
}