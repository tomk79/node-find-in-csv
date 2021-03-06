/**
 * node-find-in-csv
 */
module.exports = function( pathCsv, options ){
	var csv = require('csv');
	var fs = require('fs');
	var Promise = require("es6-promise").Promise;
	var crypto = require('crypto');

	var _this = this;
	this.pathCsv = pathCsv;
	this.csvAry = false;
	this.options = options || {};
	this.options.require = this.options.require || [];
	this.options.encrypted = this.options.encrypted || {};

	function loadCsv(callback){
		if( typeof(_this.csvAry) == typeof([]) && _this.csvAry.length ){
			callback(_this.csvAry);
			return;
		}
		var tmpCsvAry = [];
		new Promise(function(rlv, rjc){
			csv.parse(
				fs.readFileSync(_this.pathCsv),
				function(err, data){
					tmpCsvAry = data;
					rlv();
				}
			);
		})
		.then(function(){ return new Promise(function(rlv, rjc){
			// console.log(tmpCsvAry);
			var head = [];
			_this.csvAry = [];
			for(var idx in tmpCsvAry){
				var csvRow = tmpCsvAry[idx];
				if( idx == 0 ){
					for(var idx2 in csvRow){
						head[idx2] = csvRow[idx2];
					}
					// console.log(head);
					continue;

				}else{
					var row = {};
					for(var idx2 in csvRow){
						row[head[idx2]] = csvRow[idx2];
					}
					_this.csvAry.push(row);
					continue;
				}
			}
			// console.log(_this.csvAry);
			rlv();
		}); })
		.catch(function(err) {
			// console.error("Failed!", err);
			_this.csvAry = false;
		})
		.then(function(){
			callback(_this.csvAry);
			rlv();
		})
		;
		return;
	}

	this.get = function(tgt, callback){
		var _this = this;
		callback = callback || function(){};
		tgt = tgt || {};
		for( var i in this.options.require ){
			if( !(this.options.require[i] in tgt) ){
				callback(false);
				return;
			}
		}
		loadCsv(function(csvAry){
			var result = false;
			for(var idx in csvAry){
				var csvRow = csvAry[idx];
				var tgtResult = true;
				for(var tgtIdx in tgt){
					var tmpRwo = csvRow[tgtIdx];
					var tmpTgt = tgt[tgtIdx];

					// console.log(tgtIdx);
					if( _this.options.encrypted[tgtIdx] === 'md5' ){
						var sum = crypto.createHash('md5');
						sum.update(tmpTgt, 'utf8');
						tmpTgt = sum.digest('hex');

					}else if( _this.options.encrypted[tgtIdx] === 'sha1' ){
						var sum = crypto.createHash('sha1');
						sum.update(tmpTgt, 'utf8');
						tmpTgt = sum.digest('hex');

					}

					// console.log(tmpRwo);
					// console.log(tmpTgt);
					if( tmpRwo != tmpTgt ){
						tgtResult = false;
						break;
					}
				}
				if( tgtResult ){
					result = csvRow;
					for( var idx in _this.options.encrypted ){
						delete(result[idx]);
					}
					break;
				}
			}
			// console.log('result:',result);
			callback(result);
		});
		return;
	}


};
