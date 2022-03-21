<?php
//Class for connecting to db
class ConnectDb{
    private $servername;
    private $username;
    private $password;
    private $dbname;

    protected function connect() {
        $this->servername = "localhost";
        $this->username = "id17713924_user";
        $this->password = "MGGamers32$$";
        $this->dbname = "id17713924_scandiweb";

        $conn = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        return $conn;
    }
}