db.createUser({
  user: 'the_username',
  pwd: 'the_password',
  roles: [
    {
      role: 'dbOwner',
      db: 'the_database',
    }, 
    {
      role: 'dbOwner',
      db: 'the_test_database'
    }
  ],
});

db.createCollection('blogs');
db.createCollection('users');
db.users.insert({username: "testuser", name: "Test Name", passwordHash: "hash"})

