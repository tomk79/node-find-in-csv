# find-in-csv

Easy way finding a row in a CSV.

<table>
  <thead>
	<tr>
	  <th></th>
	  <th>Linux</th>
	  <th>Windows</th>
	</tr>
  </thead>
  <tbody>
	<tr>
	  <th>master</th>
	  <td align="center">
		<a href="https://travis-ci.org/tomk79/node-find-in-csv"><img src="https://secure.travis-ci.org/tomk79/node-find-in-csv.svg?branch=master"></a>
	  </td>
	  <td align="center">
		<a href="https://ci.appveyor.com/project/tomk79/node-find-in-csv"><img src="https://ci.appveyor.com/api/projects/status/4r3uvp18tm9co988/branch/master?svg=true"></a>
	  </td>
	</tr>
	<tr>
	  <th>develop</th>
	  <td align="center">
		<a href="https://travis-ci.org/tomk79/node-find-in-csv"><img src="https://secure.travis-ci.org/tomk79/node-find-in-csv.svg?branch=develop"></a>
	  </td>
	  <td align="center">
		<a href="https://ci.appveyor.com/project/tomk79/node-find-in-csv"><img src="https://ci.appveyor.com/api/projects/status/4r3uvp18tm9co988/branch/develop?svg=true"></a>
	  </td>
	</tr>
  </tbody>
</table>

[![NPM](https://nodei.co/npm/find-in-csv.png)](https://nodei.co/npm/find-in-csv/)

## Install

```
$ npm install --save find-in-csv
```

## Usage

```js
var FindInCsv = require('find-in-csv');
var findInCsv = new FindInCsv( '/path/to/your.csv' );
/*
id,pw,name,prof
a,b,hoge,fuga
 */
findInCsv.get(
	{'id':'a', 'pw':'b'},
	function(result){
		console.log(result['id']); // a
		console.log(result['pw']); // b
		console.log(result['name']); // hoge
		console.log(result['prof']); // fuga
	}
);

```

## Options

```js
var FindInCsv = require('find-in-csv');
var findInCsv = new FindInCsv(
	'/path/to/your.csv',
	{
		"require": ['head1', 'head2'],
		"encrypted": {
			"pw": "sha1" // 'sha1' | 'md5'
		}
	}
);
```
