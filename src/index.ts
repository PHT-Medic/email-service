import env from './env';
import createConfig from './config';

//--------------------------------------------------------------------
// Config
//--------------------------------------------------------------------
const config = createConfig({ env });

//--------------------------------------------------------------------
// Start
//--------------------------------------------------------------------

function start() {
    config.components.forEach((a) => a.start());
}

start();

// keep process running ;)
setInterval(() => {
    console.log('running...');
}, 1000 * 60 * 60);
