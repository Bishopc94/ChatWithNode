var socket = io.connect();

function addMessage(msg, nickName) {
  $("#chatEntries").append('<div class="message"><p>' + nickName + ' : ' + msg + '</p></div>');
}

function sentMessage() {
  if ($('#messageInput').val() != "")
  {
    socket.emit('message', $('#messageInput').val());
    addMessage($('#messageInput').val(), "Me", new Date().toISOString(), true);
    $('#messageInput').val('');
  }
}

function setNickName() {
  if ($("#nickNameInput").val() != "")
  {
    socket.emit('setNickName', $("#nickNameInput").val());
    $('#chatControls').show();
    $('#nickNameInput').hide();
    $('#nickNameSet').hide();
  }
}

socket.on('message', function(data){
  addMessage(data['message'], data['nickName']);
});

$(function() {
  $("#chatControl").hide();
  $("#nickNameSet").click(function() {setNickName()});
  $("#submit").click(function() {sentMessage();});
});

