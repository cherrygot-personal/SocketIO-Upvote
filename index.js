var app     = require( 'express' )();
var http    = require( 'http' ).createServer( app );
var io      = require( 'socket.io' )( http );


const PORT = 3000;

app.get( '/', function( req, res ) { 
    res.sendFile( __dirname + '/public/index.html' );
}); 


http.listen( PORT, function() {
    console.log( 'listening on *:' + PORT );
});


var upvote_count = 0;
io.on( 'connection', function( socket ) {
    console.log( 'a user has connected!' );
    
    socket.on( 'disconnect', function() {
        console.log( 'user disconnected' );
    });
    
    socket.on( 'upvote-event', function( upvote_flag ) {
        upvote_count += upvote_flag ? 1: -1;
        var f_str = upvote_count + ( upvote_count == 1 ? ' upvote': ' upvotes');
        
        io.emit( 'update-upvotes', f_str );
    });
});
