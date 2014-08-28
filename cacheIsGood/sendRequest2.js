// 해시앱 캐시 사용함 
var mysql = require('mysql');
var fs = require('fs');
var data = fs.readFileSync('./randomIndexRequest.txt', 'utf8');

var connection = mysql.createConnection({
  host    : '10.73.45.75',
  port : 3306,
  user : 'root',
    //password : 'db1004',
    database:'popidb'
  });

connection.connect(function(err) {
  if (err) {
    console.error('mysql connection error');
    console.error(err);
    throw err;
  } else {
    console.error('mysql connection success!');
    main();
  }
});

function main() {
  var startTime = Date.now();
  var dataArr = data.split('\n');

  var cache = new LRU(10);
  var counter = 0;

  var i = 0;

  var query = connection.query('select * from big where id='+dataArr[i], queryHandler);
  function queryHandler(err,rows) {
    if(rows) {
      counter++;
      i++;
      // NO HIT 
      console.log("캐시에 없던 노드를 추가하기위해 꼬리를 삭제합니다.");
      var tail = cache.head.prev;
//      console.log(Object.keys(cache.hash).length);
//      console.log("tailID: "+tail.id);
      if(tail.id == 936){
//        console.log(Object.keys(cache.hash));
      }     
      cache.removeFromHash(tail);
 //     console.log(Object.keys(cache.hash).length);
   //                   console.log(Object.keys(cache.hash));

      if(Object.keys(cache.hash).length == 10) {
                process.exit();
      }
      cache.removeNode(tail);
      // 받은 값을 노드로 만들어서 head에 푸시
      //      cache[rows[0].id] = rows[0].text;
      console.log("캐시에 새로운 노드를 헤드로 추가합니다.");
      var newNode = new Node();
      newNode.value = rows[0].text;
      newNode.id = rows[0].id;
      cache.pushNode(newNode);
      // 지금 한 일을 해시에 업데이트 
      cache.addToHash(newNode);
      //cache[rows[0].id] = rows[0].text;

      //// 다음요청을 처리
      // 캐시에 존재하면 카운터를 올리고 i 도 증가시킨다. 반복시킴 
      while(true) {
        // HIT 시 처리 
        var i_ = dataArr[i];
        if(cache.isHit(i_)){
          counter++;
          console.log("hit");
          i++;
          console.log("해당 노드를 헤드로 옮깁니다.");

          // 해당 노드를 헤드로 
          var node = cache.getNode(i_);
          //console.log(node);
          cache.removeNode(node);
          cache.pushNode(node);
        }
        else {
          console.log("hit - no");
          break;
        } 
      }

     // 종료 조건 
      if(counter==10000){ 
        endTime=Date.now();
        console.log(Object.keys(cache.hash).length);
        console.log("timeDiff : "+(endTime-startTime)/1000+"s");
        process.exit();
        //return 0;
      }
      // 캐시에 없으면 다음 비동기 요청을 보낸다.
      connection.query('select * from big where id='+dataArr[i], queryHandler);
    }
  }
}




function Node(id, value) {
  this.prev = null;
  this.next = null;
  this.value = value | null ;
  this.id = id | null ;
}

function LRU(size) {
  this.size = size;
  this.hash = {};
  this.head = null;

  this.initHead();

  for(var i=1 ;i<size;i++){
    this.addBlankNode();
  }

}

LRU.prototype.initHead = function () {
  var node = new Node(0,0);
  node.next = node;
  node.prev = node;  
  this.head = node;
};
LRU.prototype.addBlankNode = function () {
  this.pushNode(new Node(-1,-1));
/*
  var node = new Node();
  this.pushNode(node);
*/
}

// 노드를 헤드로 넣는다. 
LRU.prototype.pushNode = function (newHeadNode) {
  var oldHeadNode = this.head;
  var tail = oldHeadNode.prev;
//  console.log(oldHeadNode);

  // 들어오는 화살표 
  oldHeadNode.prev = newHeadNode;
  tail.next = newHeadNode;

  // 나를 세팅 
    newHeadNode.next = oldHeadNode;
    newHeadNode.prev = tail;

  this.head = newHeadNode;
}

// 노드를 리스트에서 제거한다.
LRU.prototype.removeNode = function (nodeToRemove) {
  if(nodeToRemove.id === 936) {
    console.log("************************************** 936 지운당 ********************************************\n**************************************");
    console.log(nodeToRemove.next.id);
    console.log(nodeToRemove.prev.id);
  }
  var nextNode = nodeToRemove.next;
  var prevNode = nodeToRemove.prev;
  
  prevNode.next = nextNode;
  nextNode.prev = prevNode;
}

// DLL 이 가득 차 있는지 확인한다.
LRU.prototype.isFull = function () {
  return (this.head.prev.value === null)?false:true;
}

// 해시를 업데이트한다. 
LRU.prototype.addToHash = function (node) {
  this.hash[node.id] = node;
}

// 해시에서 키의 정보를 지운다.
LRU.prototype.removeFromHash = function (node) {
  delete this.hash[node.id];
}

LRU.prototype.isHit = function (requestId) {
  return (this.hash[requestId] === undefined)?false:true;
}

LRU.prototype.getNode = function (requestId) {
  return this.hash[requestId];
}

LRU.prototype.getHashSize = function () {
  return Object.keys(this.hash).length;
}

LRU.prototype.getCircleSizeNext = function () {
  var startNode = this.head;
  var currentNode = startNode.next;
  var count = 1;
  while(true){
    if(currentNode === startNode) break;
    count++;
    currentNode = currentNode.next;
  }
  return count;
};
LRU.prototype.getCircleSizePrev = function () {
  var startNode = this.head;
  var currentNode = startNode.prev;
  var count = 1;
  while(true){
    if(currentNode === startNode) break;
    count++;
    currentNode = currentNode.prev;
  }
  return count;
};