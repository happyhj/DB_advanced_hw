function getRandomRequestKey(startIndex, maxIndex){
	return Math.floor(Math.random()*(maxIndex+1-startIndex))+startIndex;
}
var source = [];
for(var i=0;i<9000;i++){
	source.push(getRandomRequestKey(1,1000));
}
for(var i=0;i<1000;i++){
	source.push(getRandomRequestKey(1001,10000));
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var result = shuffle(source);

function printArray(arr) {
	for(var i in arr) {
		console.log(arr[i]);
	}
}

printArray(result);