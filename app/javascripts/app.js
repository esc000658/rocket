// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.

import Delta_artifacts from '../../build/contracts/Delta.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
var Delta = contract(Delta_artifacts);


// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.

// CUENTAS QUE OBTENDREMOS DE METAMASK
var accounts;
var account;
var last_price;
var n;
var caution;
var sub_form_p;
var offered_status;

window.App = {
  start: function() {
    var self = this;
    document.getElementById("f_finish").style.visibility="hidden";   //visible
    caution = document.getElementById("alertp");
    sub_form_p = document.getElementById("sub_form_p");
    // Bootstrap the MetaCoin abstraction for Use.
    Delta.setProvider(web3.currentProvider);
    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        alert("There was an error getting your accounts.");
        return;
      }
      if (accs.length == 0) {
        alert("Could not get any account! Make sure your Ethereum client is configured correctly.");
        return;
      }
      accounts = accs;
      account = accounts[0];
      console.log(accounts);
      self.Auction_Data();
      self.Participant_Data();
    });
  },

  play: function() {
    var self = this;
    var price = last_price;
    var email = ''+document.getElementById("fi_email").value;
    var mount = document.getElementById("fi_mount").value;
    console.log(email,mount,price);
    setEstado("Executing transaction... (please wait)");
    // document.getElementById("loader").style.visibility="visible";   //visible
    Delta.deployed().then(function(instance) {
      return instance.ofertar(email, {
        from: account,
        value: web3.toWei(mount, "ether"),
        gas: 150000
      });
    }).then(function() {
      setEstado("Transaction completed!");
      self.Auction_Data();
      self.Participant_Data();
    }).catch(function(e) {
      console.log(e);
      setEstado("Error sending coin; check the log");
    });
  },

  terminar_j: function() {
    var self = this;
    setEstado("Closing Smart Contract ... (please wait)");
    // document.getElementById("loader").style.visibility="visible";   //visible
    Delta.deployed().then(function(instance) {
      return instance.terminar_subasta(n, {
        from: account,
        value: web3.toWei(0, "ether"),
        gas: 150000
      });
    }).then(function() {
      //destruir
      document.getElementById("f_finish").style.visibility="hidden";
      setEstado("Smart Contract Closed!");
      self.Auction_Data();
      self.Participant_Data();
    }).catch(function(e) {
      console.log(e);
      setEstado("Error executing function; check the log.");
    });
  },

  Auction_Data: function() {
    var self = this;
    Delta.deployed().then(function(instance){
      instance.offer_info({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {

        var form_p = document.getElementById("formp");
        var data_contenido = document.getElementById("contentp");

        if (!error) {
          try {
            caution.parentNode.removeChild(caution);
          } catch (e) {
          }
          //terminar.parentNode.removeChild(terminar);

          var offered_product = document.getElementById("f_product")
          var offered_price = document.getElementById("f_price")
          var offered_wallet = document.getElementById("f_home")
          var offered_time = document.getElementById("f_time")
          offered_product.innerHTML = event.args.o_item.valueOf();
          offered_price.innerHTML = event.args.o_price.valueOf()/1000000000000000000 + " ETH";
          offered_wallet.innerHTML = event.args.o_address.valueOf();
          offered_status = event.args.o_state.valueOf();
          var gamer_status = document.getElementById("f_player_state")
          let now= Date.now() / 1000 | 0;
          //offered_status = false;
          console.log(offered_status);
          if(offered_status){
            // ABIERTO
            console.log("Bidding is Open");
            setEstado("Bidding is Open");
            gamer_status.innerHTML = "Last player"
            n = event.args.o_ended.valueOf() - now;
            if(n<=0){
              document.getElementById("f_finish").style.visibility="visible";
            }
          } else {
            // TERMINADO
            document.getElementById("f_finish").style.visibility="hidden";
            console.log("Bidding is over");
            setEstado("Bidding is over");
            gamer_status.innerHTML = "Winner of the Bid - Project"
            try {
              form_p.parentNode.removeChild(form_p);
            } catch (e) {}
          }
        } else {
          data_contenido.parentNode.removeChild(data_contenido);
          form_p.parentNode.removeChild(form_p);
          console.error(error);
        }
      });
    });
  },

  Participant_Data: function() {
    Delta.deployed().then(function(instance){
      instance.last_bidder({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        if (!error) {
          var gamer_offer = document.getElementById("f_offer")
          var gamer_email = document.getElementById("f_email")
          var gamer_wallet = document.getElementById("f_wallet")

          last_price = event.args.my_monto.valueOf()/1000000000000000000;
          console.log("Last price:",last_price);

          gamer_email.innerHTML = event.args.my_email.valueOf();
          gamer_offer.innerHTML = last_price+ " ETH";
          gamer_wallet.innerHTML = event.args.my_address.valueOf();

        } else {
          console.error(error);
        }
      });
    });
  },

};


window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if ((typeof web3 !== 'undefined') || (typeof window.ethereum !== 'undefined') || (typeof window.web3 !== 'undefined')){
    console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8545"));
  }
  App.start();
});

window.setInterval(function(){
  var l = document.getElementById("f_time");
  try {
    l.innerHTML = secondsToString(n);
  } catch (e) {}
  if(n <= 0){
    n = 0;
    try {
      sub_form_p.parentNode.removeChild(sub_form_p);
    } catch (e) {
    }
  }else{
    n--;
  }
},1000);


function secondsToString(seconds){
  var numdays = Math.floor(seconds / 86400);
  var numhours = Math.floor((seconds % 86400) / 3600);
  var numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
  var numseconds = ((seconds % 86400) % 3600) % 60;
  if (n == 0){
    return "Finalized";
  }else if(numdays == 0 && numhours == 0 && numminutes == 0){
    return numseconds + " s";
  }else if(numdays == 0 && numhours == 0){
    return numminutes + " m " + numseconds + " s";
  }else if (numdays == 0) {
    return numhours + " h " + numminutes + " m " + numseconds + " s";
  }else{
    return numdays + " d " + numhours + " h " + numminutes + " m " + numseconds + " s";
  }
}

function setEstado(message) {
  var status = document.getElementById("f_status");
  status.innerHTML = message;
}
