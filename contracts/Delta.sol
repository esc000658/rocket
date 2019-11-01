//pragma solidity >=0.4.21 <0.6.0;
pragma solidity ^0.4.24;

contract Delta {

    // ITEM DATA
    uint starting_price;
    string item;
    bool open_game;
    uint end_time;
    address owner;

    // PLAYER DATA
    string players_name;
    string players_email;
    address player_address;
    uint offered_price;

    // MESSAGES
    event offer_info(string o_item, uint o_price, address o_address, uint o_ended, bool o_state);
    event last_bidder(address my_address, string my_email, uint my_monto);

    constructor() public {
      owner = msg.sender; //temporary data, account of the owner of the item
      player_address = owner;
      starting_price = 10 * 1000000000000000000;
      item = "PROJECT_0X001";
      open_game = true;
      end_time = now + (60*60*24*30); //86400;

      players_name = "Without Participants";
      players_email = "Not registered";
      offered_price = starting_price+1;

      emit offer_info(item, starting_price, owner, end_time, open_game);
      emit last_bidder(player_address, "Player email not yet registered", 0);
    }

    function make_an_offer (string memory _players_email) public payable{
      if((msg.value < offered_price) && (msg.value  <= starting_price) && open_game){
          // return money to the previous player
          player_address.transfer(address(this).balance-msg.value);
          // update new player data
          player_address = msg.sender;
          players_email = _players_email;
          offered_price = msg.value;
          emit last_bidder(player_address, players_email, offered_price);
      }else{
        revert();
      }
    }

    function finish_auction(uint time) public payable{
        if(time <= 0){
            open_game = false;
            owner.transfer(address(this).balance-msg.value);
            emit offer_info(item, starting_price, owner, end_time, open_game);
            emit last_bidder(player_address, players_email, offered_price);
        }
    }
}
