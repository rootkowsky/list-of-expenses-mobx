import * as React from "react";
import * as ReactDOM from "react-dom";
import {App} from "./App";
import {AppInitializer} from "./initializers/AppInitializer";

(async () => {
	const appElement = document.getElementById('app');
	if (!!appElement) {

		AppInitializer.init();

		const app = (
			<App/>
		);
		ReactDOM.render(app, appElement);
	}
})();