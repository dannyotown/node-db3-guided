const db = require('../data/db-config')

function find(){
    return db('users')
    .then(users => {
      res.json(users);
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to get users' });
    });
}

function findById(id){
    return db('users').where({ id })
    .then(users => {
      const user = users[0];
  
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'Could not find user with given id.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to get user' });
    });
}

function add(userData){
    return db("users")
    .insert(userData)
    .then(ids => {
      res.status(201).json({ created: ids[0] });
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new user" });
    });
}

function update(){

}

function remove(){


}



module.exports = {
    find,
    findById,
    add,
    update,
    remove
}