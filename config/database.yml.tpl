# MySQL.  Versions 4.1 and 5.0 are recommended.
#
# Install the MySQL driver:
#   gem install mysql2
#
# And be sure to use new-style password hashing:
#   http://dev.mysql.com/doc/refman/5.0/en/old-client.html
development:
  adapter: mysql2
  encoding: utf8
  reconnect: false
  database: googlereader_development
  pool: 5
  username: root
  password: secret
  host: localhost

# Warning: The database defined as "test" will be erased and
# re-generated from your development database when you run "rake".
# Do not set this db to the same as development or production.
test:
  adapter: mysql2
  encoding: utf8
  reconnect: false
  database: googlereader_test
  pool: 5
  username: root
  password: secret
  host: localhost

production:
  adapter: mysql2
  encoding: utf8
  reconnect: false
  database: googlereader_production
  pool: 5
  username: root
  password: secret
  host: localhost
