
import selectSound from './assets/audio/select.wav';
import doneSound from './assets/audio/done.wav';
import matchSound from './assets/audio/match.wav';

class AudioPlayer {
    constructor() {
        this.players = {
            'select': [ 
                new Audio(selectSound), 
                new Audio(selectSound), 
                new Audio(selectSound), 
                new Audio(selectSound) 
            ],
            'match': [
                new Audio(matchSound)
            ],
            'done': [
                new Audio(doneSound)
            ]
        }
    }

    findAvailablePlayer(key) {
        let keyPlayers = this.players[key] || [];
    
        return keyPlayers.find((player) => player.paused);
    }

    play(key) {
        let player = this.findAvailablePlayer(key);
        if (!player) {
            console.log('No available player');
            return;
        }
        // FIXME: Hack because volumes currently don't match
        if (key === 'select') {
            player.volume = 0.1;
        }

        player.play();
    }
}

export default AudioPlayer;
