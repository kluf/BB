var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

client.on('error', function(err) {
    console.log(err);
});

//--------- simple inserting and getting data by key/value
// client.set('color', 'red', redis.print);

// client.get('color', function(err, data) {
//     if (err) throw err;
//     console.log(data);
// });

//--------- end of simple inserting and getting data


//--------- simple inserting and getting data by hash table
// client.hmset('camping', {
//     'shelter' : '2-person tent',
//     'cooking': 'campstove'
// }, redis.print);

// client.hmget('camping', 'cooking', function(err, data) {
//     if (err) throw err;
//     console.log('Will be cooking with: ' + data);
// });

// client.hkeys('camping', function(err, keys) {
//     if (err) throw err;
//     keys.forEach(function(key, i) {
//         console.log(' ' + key);
//     });
// });

//--------- end of simple inserting and getting data by hash table



//--------- inserting and getting data by list

// client.lpush('tasks', 'Some teext here', redis.print);
// client.lpush('tasks', 'Some another teext here', redis.print);
// client.lrange('tasks', 0, -1, function(err, items) {
//     if (err) throw err;
//     items.forEach(function(item, i) {
//         console.log('  ' + item);
//     });
// });

//--------- end of simple inserting and getting data by list

//--------- inserting and getting data by sets

client.sadd('ip_address', '204.123.123.042', redis.print);
client.sadd('ip_address', '204.123.123.042', redis.print);
client.sadd('ip_address', '204.123.123.043', redis.print);
client.sadd('ip_address', '204.123.123.044', redis.print);
client.smembers('ip_address', function(err, members) {
    if (err) throw err;
    console.log(members);
});

//--------- end of simple inserting and getting data by sets