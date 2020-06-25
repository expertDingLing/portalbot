const { ipcRenderer} = require("electron")

$('#setting').click(function(){
    ipcRenderer.send("setting");
})

$('#dashboard').click(function(){
    ipcRenderer.send("dashboard");
})

$('#logout').click(function(){
    ipcRenderer.send("unauthenticated")
})

$('#sentiment-data').click(function(){
    ipcRenderer.send("sentiment-data")
})

$('#trade-history').click(function(){
    ipcRenderer.send("trade-history")
})

$('#live-chart').click(function(){
    ipcRenderer.send("live-chart")
})