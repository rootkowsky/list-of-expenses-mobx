const fs = require('fs');
const del = require('del');
const path = require('path');

const gulp = require('gulp');
const watch = require('gulp-watch');
const utils = require('./utils');

const process = require('process');
const exec = require('child_process').exec;

const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const webpackProdConfig = require('./webpack.prod.config.js');
const webpackDevConfig = require('./webpack.dev.config.js');

const log = (data) => process.stdout.write(data);

// ---------------------
// CONSTS
// ---------------------
const DIST_PATH = path.resolve('../dist/');

process.chdir(utils.path());

gulp.task("clean-dist", (callback) => {
	const distGlob = path.resolve(DIST_PATH, '**');
	del.sync([distGlob], {force: true});

	if (!fs.existsSync(DIST_PATH))
		fs.mkdirSync(DIST_PATH);

	callback();
	return true;
});

gulp.task("release-8080-windows", (callback) => {
	const port = 8080;
	exec(`netstat -ano | findstr :${port}`, function (err, stdout, stderr) {
		console.log(stdout);
		let result = /LISTENING\s*(\d+)$/gm.exec(stdout);
		if (result && result[1]) {
			const PID = result[1];
			console.log(`Port ${port} blocked by PID ${PID}`);
			exec(`taskkill /PID ${PID} /F`, function (err, stdout, stderr) {
				console.log(stdout);
			});
		}
		callback(err);
	});
});

const buildApp = (config, callback) => {
	const webpack = webpackStream(config);
	return gulp.src(config.entry.app)
		.pipe(webpack)
		.pipe(gulp.dest(config.output.path))
		.on('end', () => {callback();});
};

const watchApp = (config) => {
	const compiler = webpack(config);
	const {
		port,
		host: hostname,
		writeToDisk,
		quiet,
	} = config.devServer;

	new WebpackDevServer(compiler, {
		writeToDisk: writeToDisk,
		quiet: quiet,
	})
		.listen(port, hostname, function (err) {
			if (err) {
				console.log(err);
			}
		});
};

gulp.task("build-prod-app", (callback) => {
	return buildApp(webpackProdConfig, callback);
});

gulp.task("watch-prod-app", (callback) => {
	watchApp(webpackProdConfig);
});

gulp.task("build-dev-app", (callback) => {
	return buildApp(webpackDevConfig, callback);
});

gulp.task("watch-dev-app", (callback) => {
	watchApp(webpackDevConfig);
});

gulp.task("build-prod", gulp.series(
	gulp.parallel(
		"build-prod-app",
	),
));

gulp.task("develop-prod", gulp.series(
	gulp.parallel(
		"watch-prod-app",
	),
));

gulp.task("build-dev", gulp.series(
	gulp.parallel(
		"build-dev-app",
	),
));

gulp.task("develop-dev", gulp.series(
	gulp.parallel(
		"watch-dev-app",
	),
));