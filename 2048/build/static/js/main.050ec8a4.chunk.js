(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,r,t){},15:function(e,r,t){},17:function(e,r,t){"use strict";t.r(r);var n=t(0),a=t.n(n),o=t(2),i=t.n(o),c=(t(13),t(3)),l=t(4),f=t(6),u=t(5),s=t(7),d=(t(15),function(e){return a.a.createElement("div",{className:"game-over"},a.a.createElement("p",null,"Game Over"),a.a.createElement("p",null,"Score: ",e.score))}),m=function(e){function r(e){var t;Object(c.a)(this,r),(t=Object(f.a)(this,Object(u.a)(r).call(this,e))).addEventListener=function(){window.addEventListener("keydown",t.checkKey,!1)},t.removeEventListener=function(){window.removeEventListener("keydown",t.checkKey,!1)},t.changeGride=function(e){t.setState({size:e.target.value}),t.restartGame(e.target.value)},t.getFontStyle=function(e){return{2:{fontSize:60,backgroundColor:"#eee4da"},4:{fontSize:60,backgroundColor:"#eee1c9"},8:{fontSize:60,color:"#f9f6f2",backgroundColor:"#f3b27a"},16:{fontSize:60,color:"#f9f6f2",backgroundColor:"#f69664"},32:{fontSize:60,color:"#f9f6f2",backgroundColor:"#f77c5f"},64:{fontSize:60,color:"#f9f6f2",backgroundColor:"#f75f3b"},128:{fontSize:40,color:"#f9f6f2",backgroundColor:"#edd073"},256:{fontSize:40,color:"#f9f6f2",background:"#edcc62"},512:{fontSize:40,color:"#f9f6f2",background:"#edc950"},1024:{fontSize:30,color:"#f9f6f2",background:"#edc53f"},2048:{fontSize:30,color:"#f9f6f2",background:"#edc22e"}}[e]},t.restartGame=function(e){t.setState({score:0,isGameOver:!1,isWon:!1,grid:t.startGame(e)}),t.removeEventListener(),t.addEventListener()},t.checkKey=function(e){(e=e||window.event).keyCode>=49&&e.keyCode<=52&&t.makeAMove(e.keyCode-49)},t.copyGrid=function(e){for(var r=[],t=0;t<e.length;t++){r.push([]);for(var n=0;n<e.length;n++)r[t][n]=e[t][n]}return r},t.compareGrid=function(e,r){for(var t=0;t<r.length;t++)for(var n=0;n<r.length;n++)if(e[t][n]!==r[t][n])return!1;return!0},t.makeAMove=function(e){var r=t.state,n=r.grid,a=r.size,o=t.copyGrid(n),i=!1,c=!1;if(n.length>0){switch(e){case 0:o=t.flipGrid(o),i=!0;break;case 1:break;case 2:o=t.rotateGrid(o),o=t.flipGrid(o),c=!0,i=!0;break;default:o=t.rotateGrid(o),c=!0}for(var l=0;l<a;l++)o[l]=t.operate(o[l]);if(i&&(o=t.flipGrid(o)),c&&(o=t.rotateGrid(o)),!t.compareGrid(o,n)){o=t.addNumber(o);var f=t.isGameOver(o);o&&t.setState({grid:o,isGameOver:f}),f&&(t.removeEventListener(),console.log("Game over"))}}},t.isGameOver=function(e){for(var r=0;r<e.length;r++)for(var t=0;t<e.length;t++){if(0===e[r][t])return!1;if(3!==r&&e[r][t]===e[r+1][t])return!1;if(3!==t&&e[r][t]===e[r][t+1])return!1}return!0},t.operate=function(e){return e=t.move(e),e=t.merge(e),e=t.move(e)},t.flipGrid=function(e){for(var r=0;r<e.length;r++)e[r].reverse();return e},t.rotateGrid=function(e){for(var r=[],t=0;t<e.length;t++){r.push([]);for(var n=0;n<e.length;n++)r[t][n]=e[n][t]}return r},t.getGrid=function(e){for(var r=[],t=0;t<e;t++){r.push([]);for(var n=0;n<e;n++)r[t][n]=0}return r},t.addNumber=function(e){for(var r=[],t=0;t<e.length;t++)for(var n=0;n<e.length;n++)0===e[t][n]&&r.push({x:t,y:n});if(r.length>0){var a=r[Math.floor(Math.random()*r.length)],o=Math.random();return e[a.x][a.y]=o>.3?2:4,e}return null},t.startGame=function(e){var r=t.getGrid(e);return r=t.addNumber(r),r=t.addNumber(r)},t.move=function(e){var r=e.filter(function(e){return e});return new Array(e.length-r.length).fill(0).concat(r)},t.merge=function(e){for(var r=t.state,n=r.score,a=r.isWon,o=e.length;o>0;--o){var i=e[o],c=e[o-1];i===c&&(e[o]=i+c,n+=e[o],e[o-1]=0),e[o]>=2048&&(a=!0)}return t.setState({score:n,isWon:a}),e};var n=t.startGame(4);return t.state={size:4,gamerVariations:[4,8,16],isGameOver:!1,isWon:!1,score:0,grid:n},t}return Object(s.a)(r,e),Object(l.a)(r,[{key:"componentDidMount",value:function(){this.addEventListener()}},{key:"render",value:function(){var e=this,r=this.state,t=r.grid,n=r.isGameOver,o=r.score,i=r.isWon,c=r.gamerVariations,l=r.size;return a.a.createElement("div",{className:"App"},a.a.createElement("div",{className:"header"},a.a.createElement("div",{className:"clearfix mgBtm-20"},a.a.createElement("div",{className:"pull-left"},a.a.createElement("select",{onChange:function(r){return e.changeGride(r)}},c.map(function(e,r){return a.a.createElement("option",{value:e,key:r},e," Grid")})),i?a.a.createElement("h2",null,"You won Game"):null,n?a.a.createElement("h3",null,"Game over"):null)),a.a.createElement("div",{className:"clearfix mgBtm-20"},a.a.createElement("div",{className:"pull-left"},"Score: ",a.a.createElement("div",{className:"score"},o)),a.a.createElement("button",{className:"pull-right",onClick:function(r){return e.restartGame(l)}},"Restart")),a.a.createElement("p",null,"Use 1, 2, 3, 4 key to move left,right,up and down")),a.a.createElement("div",{className:"game",style:{width:90*l}},n?a.a.createElement(d,{score:o}):null,t.map(function(r,t){return a.a.createElement("div",{className:"row",key:t},r.map(function(r,t){return a.a.createElement("div",{className:"cell",key:t,style:e.getFontStyle(r)},0===r?null:r)}))})))}}]),r}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(m,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},8:function(e,r,t){e.exports=t(17)}},[[8,2,1]]]);
//# sourceMappingURL=main.050ec8a4.chunk.js.map