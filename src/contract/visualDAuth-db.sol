// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0 ;

contract Users {

    struct User{
        uint256 userCount;
        bytes32 userId;
        string username;
        string password;
        string mnemonicPhrase;
    }
    struct newUserObj{
            uint256 userCount;
            bytes32 userId;
            string username;
            string message;
            bool status;
        }
    mapping(string => User) UserDataBase;
    mapping(string => bool) UserExixts;
    uint256 private userCount = 0;

    event NewUserAdded(uint userCount, bytes32 userId, string username, string message, bool status);

    function addNewUser(string memory username, string memory password, string memory mnemonicPhrase) public {
    if (UserExixts[username]) {
        revert("Username already exists.");
    }
    userCount++;
    bytes32 userId = keccak256(abi.encodePacked(username, userCount));
    User memory newUser = User(userCount, userId, username, password, mnemonicPhrase);
    UserDataBase[username] = newUser;
    UserExixts[username] = true;
    string memory message = "User added successfully!";
    emit NewUserAdded(newUser.userCount, newUser.userId, newUser.username, message, true);
}

    
    struct IsUsernameAvailable{
        string message;
        bool status;
        bool result;
    }
    function isUserAlreadyRegistered(string memory username) public view returns (IsUsernameAvailable memory){
        if(bytes(username).length == 0){
            revert("Username cannot be empty.");
        }

        string memory message;
        if(UserExixts[username]){
            message = "Username is already taken.";
            IsUsernameAvailable memory usernameTaken = IsUsernameAvailable(message, true, UserExixts[username]);
            return usernameTaken;
        }
        message = "Username is available.";
        IsUsernameAvailable memory usernameAvailabilityMessage = IsUsernameAvailable(message, true, UserExixts[username]);
        return usernameAvailabilityMessage;
    }

    struct LoginUserMsg{
        string message;
        bool result;
        bool status; 
    }
    function loginRegisteredUser(string memory username, string memory password) public view returns(LoginUserMsg memory){
        if(UserExixts[username] == false){
            revert("User is not Registered.");
        }
        if(keccak256(abi.encodePacked(UserDataBase[username].username)) == keccak256(abi.encodePacked(username)) && keccak256(abi.encodePacked(UserDataBase[username].password)) == keccak256(abi.encodePacked(password))){
            LoginUserMsg memory loginUserMessageSuccess = LoginUserMsg("User login successful!", true , true);
            return loginUserMessageSuccess;
        }
        LoginUserMsg memory loginUserMessage = LoginUserMsg("User login failed!", false , true);
        return loginUserMessage;
    }
    struct VerifyMnemonicMsg{
        string message;
        bool status;
        bool result;
    }
    function verifyMnemonicPhrase( string memory username, string memory mnemonicPhrase) public view returns(VerifyMnemonicMsg memory){
        if(UserExixts[username] == false){
            revert("User is not registered.");
        }
        if(keccak256(abi.encodePacked(UserDataBase[username].mnemonicPhrase)) == keccak256(abi.encodePacked(mnemonicPhrase))){
            VerifyMnemonicMsg memory verifyMnemonicSuccess = VerifyMnemonicMsg("Mnemonic key verification successful!", true , true);
            return verifyMnemonicSuccess;
        }
        VerifyMnemonicMsg memory verifyMnemonicFailure = VerifyMnemonicMsg("Mnemonic key verification failed!", true , false);
        return verifyMnemonicFailure;
    }

    struct GetMnemonicMsg{
        string message;
        bool status;
        string result;
    }
    function getMnemonicPhrase(string memory username) public view returns(GetMnemonicMsg memory){
        if(UserExixts[username] == false){
            revert("User is not registered.");
        }
        string memory phrase = UserDataBase[username].mnemonicPhrase;
        GetMnemonicMsg memory getMnemonicSuccess = GetMnemonicMsg("User's mnemonic key found.", true , phrase);
        return getMnemonicSuccess;
    }

    event ResetUserPwd(string username, string message, bool status, bool result);
    function resetUserPassword(string memory username, string memory newPassword) public{
        if(bytes(username).length == 0){
            revert("Username is required!");
        }
        if(bytes(newPassword).length == 0){
            revert("New Password is required.");
        }
        UserDataBase[username].password = newPassword;
        emit ResetUserPwd(username, "Password reset successfull!", true , true);
    }


    event ChangeUsername(string message, bool status, bytes32 userId);

    function changeUsername(string memory username, string memory newUsername) public {
    if(UserExixts[username] == false){
        revert("User not found.");
    }
    if(UserExixts[newUsername] == true){
        revert("Username is already taken.");
    }

    User storage user = UserDataBase[username];
    user.username = newUsername;
    UserExixts[newUsername] = true;
    UserExixts[username] = false;
    bytes32 userId = keccak256(abi.encodePacked(newUsername, userCount));
    user.userId = bytes32(userId);
    emit ChangeUsername("Username changed successfully!", true , userId);
}
}

