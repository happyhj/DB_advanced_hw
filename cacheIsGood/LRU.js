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
  this.dataSourceRef;

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
	var nextNode = nodeToRemove.next;
	var prevNode = nodeToRemove.prev;
	
	prevNode.next = nextNode;
	nextNode.prev = prevNode;
	// nodeToRemove.next.prev = nodeToRemove.prev;
 // nodeToRemove.prev.next = nodeToRemove.next;
}

// 가득 차 있는지 확인한다.
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
var cache = new LRU(2);

var node1 = new Node(1,123);
cache.pushNode(node1);
var node2 = new Node(2,123);
cache.pushNode(node2);
var node3 = new Node(3,123);
cache.pushNode(node3);
var node4 = new Node(4,123);
var node5 = new Node(5,123);
cache.pushNode(node4);

cache.removeNode(node4.prev);

cache.pushNode(node4);


//cache.pushNode(node);
//cache.removeNode(node2);


//cache.pushNode(node4);

console.log(cache.getCircleSizeNext());
/*
var cache = new LRU(5);
//console.log(cache.hash);
//console.log(cache.head);

cache.pushNode(new Node({id:1,value:10}));
cache.removeNode();
cache.pushNode(new Node({id:2,value:20}));
cache.pushNode(new Node({id:3,value:30}));
cache.pushNode(new Node({id:4,value:40}));
cache.pushNode(new Node({id:5,value:50}));

console.log(cache.head);
*/