#!/usr/bin/env node

var fs = require('fs')
var path = require('path');
var program = require('commander') // Parse command line options
var pkg = require( path.join(__dirname, 'package.json') );

program
	.version(pkg.version)
	.option('-f, --force', 'Create new file whatever the file is exists.')
	.option('-r, --root', 'Create new file within root directory.')
	.parse(process.argv);

var force = program.force || false;

function createFile(dir) {
	var file = dir+'/index.php';

	fs.stat(file, function(err, stat) {
		if(err == null && !force) {
			console.log('Exists: '+dir+'/index.php');
		} else {
			fs.writeFile(file, "<?php\n//Silence is golden!", function(err, writeFile) {
				if (err) throw err;
				console.log('Created: '+dir+'/index.php');
			});
		}
	});
}

function walk(dir) {
	fs.readdirSync(dir).filter(function (f) {
		return f && f[0] != '.'; // Ignore hidden files
	})
	.map(function (f) {
		var subdir = (dir + '/' + f).replace('./', ''),
		stat = fs.statSync(subdir);

		if (stat.isDirectory()) {
			createFile(subdir);
			walk(subdir);
		}
	});
}

if(program.root)
	createFile('.');
walk('.');
