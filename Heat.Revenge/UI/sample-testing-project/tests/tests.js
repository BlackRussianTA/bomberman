before(function () {

    this.game = game;
    this.module = module;

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
});



