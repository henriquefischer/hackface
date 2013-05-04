console.log("content_loaded");
var chatData;

WEB_SOCKET_DEBUG = true;

var pusher = new Pusher('9883bff79170576dee78');
var channel = pusher.subscribe("1456182473");
channel.bind('my_event', function(data) {
	alert(JSON.stringify(data));
});

function seekChatData(id){
	var i = -1;
	var response = false;
	while (chatData[++i])
		if (chatData[i]["from"]["id"]==id)
			response = chatData[i];
			
	return response;
}

$("body").on("mousedown",".talking_head",function(){
	$("#head_close").fadeIn(200);
	chatID = $(this).attr("id");
	chatID = chatID.replace(/(head)/,"chat");
	$("#"+chatID).fadeOut(200,function(){ $(this).remove(); });
});
$("body").on("mouseup",".talking_head",function(){
	$("#head_close").fadeOut(200);
});
$("body").on("dblclick",".talking_head",function(){
	chatID = $(this).attr("id");
	chatID = chatID.replace(/(head)/,"chat");
	userID = chatID.replace(/(chat_)/,"");
	singleChatData = seekChatData(userID);
	position = $(this).offset();
	$("body").append("<div id='"+chatID+"'></div>");
	$("#"+chatID).css({
		"z-index": 10001,
		"width": "260px",
		"height": "280px",
		"box-shadow": "0px 0px 5px #AAA",
		"background":"#FFF",
		"position": "fixed",
		"top": position.top,
		"left": position.left+70+"px",
		"display": "none"
	}).fadeIn(200).
	append("<div class='chat_name'>"+singleChatData["from"]["nome"]+"</div>").
	append("<div class='chat_conversation'></div>").
	append("<div class='chat_input'><input type='text' name='' placeholder='Say something...'/></div>");
	
	$("#"+chatID+">.chat_name").css({
		"height": "19px",
		"border-bottom":"1px solid #3B559F",
		"padding":"0px 5px",
		"margin":"10px 10px 0px 10px",
		"line-height":"19px",
		"vertical-align":"middle",
		"color":"#3B559F",
		"font":"14px tahoma"
	});
	
	$("#"+chatID+">.chat_conversation").css({
		"height": "219px",
		"overflow": "auto"
	});
	
	$("#"+chatID+">.chat_input").css({
		"height": "30px",
		"border-top":"1px solid #AFAFAF",
		"vertical-align":"middle",
		"color":"#3B559F",
	});
	
	$("#"+chatID+">.chat_input>input").css({
		"border": "none",
		"height":"20px",
		"padding":"5px",
		"width":"250px",
		"font":"11px tahoma",
		"line-height":"20px",
		"vertica-align":"middle"
	});
	
	var i=0;
	var last = singleChatData["msg"][i]["author"]
	while (singleChatData["msg"][i]){
		if (singleChatData["msg"][i]["author"]==userID){
			$("#"+chatID+">.chat_conversation").append("<p style='"+(last!=userID?"margin:5px 10px 0px 10px; padding-top:5px; border-top:1px solid #DDD;":"margin: 0px 10px;")+" padding-right: 40px; width: 180px; word-break: break-all;'>"+singleChatData["msg"][i]["text"]+"</p>");
			last = singleChatData["msg"][i]["author"];
		}else{
			$("#"+chatID+">.chat_conversation").append("<p style='"+(last==userID?"margin:5px 10px 0px 10px; padding-top:5px; border-top:1px solid #DDD;":"margin: 0px 10px;")+" padding-left:40px; width: 180px; word-break: break-all; text-align: right;'>"+singleChatData["msg"][i]["text"]+"</p>");
			last = singleChatData["msg"][i]["author"];
		}
		i++;
	}
});

chrome.runtime.onMessage.addListener(function(request){
	chatData = request;

	console.log("Content Script Message Arrived!");
	i=0;
	while (request[i]){
		$("body").append("<div id='head_"+request[i]["from"]["id"]+"' class='talking_head'><img src='https://graph.facebook.com/"+request[i]["from"]["id"]+"/picture?type=square'/></div>");
		$("#head_"+request[i]["from"]["id"]).css({
			"z-index": 10000,
			"background": "#FFF",
			"width": "50px",
			"height": "50px",
			"position": "fixed",
			"top": "0px",
			"left": "0px",
			"padding": "5px",
			"box-shadow": "0px 0px 5px #AAA"
		}).draggable();
		console.log("Talking Head For "+request[i]["from"]["nome"]+" Created!");
		i++;
	}
	
	if (i>0){
		$("body").append("<div id='head_close'><img src='"+chrome.extension.getURL('x-icon.png')+"' width='80' height='80'/></div>")
		$("#head_close").css({
			"position": "fixed",
			"margin-left":"-40px",
			"left":"50%",
			"bottom":"40px",
			"display":"none"
		}).droppable({
			drop: function( event, ui ) {
				$("#"+ui.draggable.attr("id")).remove();
			}
		});
	}
});