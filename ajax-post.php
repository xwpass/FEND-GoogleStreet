<?php
    // empty JSON
    $methodType = $_SERVER['REQUEST_METHOD'];
    $data = array("msg" => "$methodType");

    if ($methodType === 'POST') {

        foreach ($_POST as $key => $value){
            // simply parrot back what was sent
            $data[$key] = $value;
        }
        echo json_encode($data, JSON_FORCE_OBJECT);
        return;


        if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
            && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
            // yes, is AJAX call
            // answer POST call and get the data that was sent
            if(isset($_POST["firstName"]) && !empty($_POST["firstName"])
                && isset($_POST["lastName"]) && !empty($_POST["lastName"])
                && isset($_POST["email"]) && !empty($_POST["email"])){


                // get the data from the post and store in variables
                $firstName = $_POST["firstName"];
                $lastName = $_POST["lastName"];
                $email = $_POST["email"];

                $data = array("msg" => "Thank you $firstName $lastName, you've been added to our mailing list!",
                    "firstName" => "$firstName", "lastName" => "$lastName",
                    "email" => "$email");
                ////////////////////////////////////////////////////////////
                ///   HERE'S WHERE YOU COULD DO A DATABASE ENTRY UPDATE
                ////////////////////////////////////////////////////////////


            } else {
                $data = array("msg" => "Either firstName, lastName, or email were not filled out correctly.");
            }



        } else {
            // not AJAX
            $data = array("msg" => "Has to be an AJAX call.");
        }


    } else {
        // simple error message, only taking POST requests
        $data = array("msg" => "Error: only POST allowed.");
    }

    echo json_encode($data, JSON_FORCE_OBJECT);

?>
