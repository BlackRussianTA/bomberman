before(function () {

    this.game = game;
    this.module = module;
    this.wrapper = privateUnitWrapper;


});

describe('Test for game', function () {
    it('test 1', function () {
        chai.assert.equal(5, 5);
    });

    it('game to exist', function(){
        chai.assert.typeOf(game, 'function')
    });

    //it('game to exist', function(){
      //  chai.assert.typeOf(game, 'undefined')
    //})
});

describe('Test for module', function(){
    it('test for module to exist', function(){
        chai.assert.typeOf(module, 'object')
    });
    it('test for privateUnitWrapper to exist', function(){
        chai.assert.typeOf(privateUnitWrapper, 'object')
    });
});

describe('Privite data tests - helpers', function(){
    it('test for privateUnitWrapper.helpers to be an object', function(){
        chai.assert.typeOf(privateUnitWrapper.helpers, 'object')
    });
    it('test for  privateUnitWrapper.helpers.getIndexOf to be a function', function(){
        chai.expect(privateUnitWrapper.helpers.getIndexOf).to.be.a('function');
    });
    it('test for  privateUnitWrapper.helpers.getRandomInt to be a function', function(){
        chai.expect(privateUnitWrapper.helpers.getRandomInt).to.be.a('function');
    });
    it('test for  privateUnitWrapper.helpers.createImageObject to be a function', function(){
        chai.expect(privateUnitWrapper.helpers.createImageObject).to.be.a('function');
    });
    it('test for  privateUnitWrapper.helpers.createStage to be a function', function(){
        chai.expect(privateUnitWrapper.helpers.createStage).to.be.a('function');
    });
    it('test for  privateUnitWrapper.helpers.buildGrid to be a function', function(){
        chai.expect(privateUnitWrapper.helpers.buildGrid).to.be.a('function');
    });
    it('test for  privateUnitWrapper.helpers.getNextGridElem to be a function', function(){
        chai.expect(privateUnitWrapper.helpers.getNextGridElem).to.be.a('function');
    });
    it('test for  privateUnitWrapper.helpers.isPossiblePlayerMove to be a function', function(){
        chai.expect(privateUnitWrapper.helpers.isPossiblePlayerMove).to.be.a('function');
    });
    it('test for  privateUnitWrapper.helpers.movePlayer to be a function', function(){
        chai.expect(privateUnitWrapper.helpers.movePlayer).to.be.a('function');
    });
    it('test for  privateUnitWrapper.helpers.getNextGridElem to be a function', function(){
        chai.expect(privateUnitWrapper.helpers.getNextGridElem).to.be.a('function');
    });
});

describe('Privite data tests - player', function(){
    it('test for privateUnitWrapper.player to be an object', function(){
        chai.assert.typeOf(privateUnitWrapper.player, 'object')
    });
    it('test for  privateUnitWrapper.player.init to be a function', function(){
        chai.expect(privateUnitWrapper.player.init).to.be.a('function');
    });
    it('test for creating a player', function(){
        var test = function(){
            var object = Object.create(privateUnitWrapper.player).init;
            if(typeof object === 'undefined'){
                return false;
            }
            return true;
        }();
        chai.expect(test).to.be.true;
    });
});

describe('Privite data tests - enemy', function(){
    it('test for privateUnitWrapper.enemy to be an object', function(){
        chai.assert.typeOf(privateUnitWrapper.enemy, 'object')
    });
    it('test for  privateUnitWrapper.enemy.init to be a function', function(){
        chai.expect(privateUnitWrapper.enemy.init).to.be.a('function');
    });
    it('test for  privateUnitWrapper.enemy.change_direction to be a function', function(){
        chai.expect(privateUnitWrapper.enemy.change_direction).to.be.a('function');
    });
    it('test for creating a enemy', function(){
        var test = function(){
            var object = Object.create(privateUnitWrapper.enemy).init;
            if(typeof object === 'undefined'){
                return false;
            }
            return true;
        }();
        chai.expect(test).to.be.true;
    });
});

describe('Privite data tests - gate', function(){
    it('test for privateUnitWrapper.gate to be an object', function(){
        chai.assert.typeOf(privateUnitWrapper.gate, 'object')
    });
    it('test for  privateUnitWrapper.gate.init to be a function', function(){
        chai.expect(privateUnitWrapper.gate.init).to.be.a('function');
    });
    it('test for creating a gate', function(){
        var test = function(){
            var object = Object.create(privateUnitWrapper.player).init;
            if(typeof object === 'undefined'){
                return false;
            }
            return true;
        }();
        chai.expect(test).to.be.true;
    });
});

describe('Privite data tests - stone', function(){
    it('test for privateUnitWrapper.player to be an object', function(){
        chai.assert.typeOf(privateUnitWrapper.stone, 'object')
    });
    it('test for  privateUnitWrapper.stone.init to be a function', function(){
        chai.expect(privateUnitWrapper.stone.init).to.be.a('function');
    });
    it('test for creating a stone', function(){
        var test = function(){
            var object = Object.create(privateUnitWrapper.stone).init;
            if(typeof object === 'undefined'){
                return false;
            }
            return true;
        }();
        chai.expect(test).to.be.true;
    });
});

describe('Privite data tests - coin', function(){
    it('test for privateUnitWrapper.coin to be an object', function(){
        chai.assert.typeOf(privateUnitWrapper.coin, 'object')
    });
    it('test for  privateUnitWrapper.coin.init to be a function', function(){
        chai.expect(privateUnitWrapper.coin.init).to.be.a('function');
    });
    it('test for creating a coin', function(){
        var test = function(){
            var object = Object.create(privateUnitWrapper.coin).init;
            if(typeof object === 'undefined'){
                return false;
            }
            return true;
        }();
        chai.expect(test).to.be.true;
    });
});

describe('Privite data tests - bomb', function(){
    it('test for privateUnitWrapper.bomb to be an object', function(){
        chai.assert.typeOf(privateUnitWrapper.bomb, 'object')
    });
    it('test for  privateUnitWrapper.bomb.init to be a function', function(){
        chai.expect(privateUnitWrapper.bomb.init).to.be.a('function');
    });
    it('test for creating a bomb', function(){
        var test = function(){
            var object = Object.create(privateUnitWrapper.bomb).init;
            if(typeof object === 'undefined'){
                return false;
            }
            return true;
        }();
        chai.expect(test).to.be.true;
    });
});

describe('Privite data tests - fire', function(){
    it('test for privateUnitWrapper.fire to be an object', function(){
        chai.assert.typeOf(privateUnitWrapper.fire, 'object')
    });
    it('test for  privateUnitWrapper.fire.init to be a function', function(){
        chai.expect(privateUnitWrapper.fire.init).to.be.a('function');
    });
    it('test for creating a fire', function(){
        var test = function(){
            var object = Object.create(privateUnitWrapper.fire).init;
            if(typeof object === 'undefined'){
                return false;
            }
            return true;
        }();
        chai.expect(test).to.be.true;
    });
});

describe('Privite data tests - game', function(){
    it('test for privateUnitWrapper.game to be an object', function(){
        chai.assert.typeOf(privateUnitWrapper.game, 'object')
    });
    it('test for  privateUnitWrapper.game.init to be a function', function(){
        chai.expect(privateUnitWrapper.game.init).to.be.a('function');
    });
    it('test for creating a game', function(){
        var test = function(){
            var object = Object.create(privateUnitWrapper.game).init;
            if(typeof object === 'undefined'){
                return false;
            }
            return true;
        }();
        chai.expect(test).to.be.true;
    });
    it('test for  privateUnitWrapper.game.player_move to be a function', function(){
        chai.expect(privateUnitWrapper.game.player_move).to.be.a('function');
    });
    it('test for  privateUnitWrapper.game.enemy_move to be a function', function(){
        chai.expect(privateUnitWrapper.game.enemy_move).to.be.a('function');
    });
    it('test for  privateUnitWrapper.game.remove_life to be a function', function(){
        chai.expect(privateUnitWrapper.game.remove_life).to.be.a('function');
    });
    it('test for  privateUnitWrapper.game.put_bomb to be a function', function(){
        chai.expect(privateUnitWrapper.game.put_bomb).to.be.a('function');
    });
    it('test for  privateUnitWrapper.game.perform_fire_objects to be a function', function(){
        chai.expect(privateUnitWrapper.game.perform_fire_objects).to.be.a('function');
    });
    it('test for  privateUnitWrapper.game.show_fire to be a function', function(){
        chai.expect(privateUnitWrapper.game.show_fire).to.be.a('function');
    });
});