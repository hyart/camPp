const express = require('express');
const config = require('./config');
const {join} = require('path');
const app = express();

const {proxy, scriptUrl} = require('rtsp-relay')(app);

app.use(express.static(join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', join(__dirname, './public/views'));
app.use(express.json());

app.get('/', (req, res) => res.render(`index`, {scriptUrl: scriptUrl}));

app.ws('/api/stream/:ip', (ws, req) => {
    const url = `rtsp://${config.ipCamera.username}:${config.ipCamera.password}@${req.params.ip}/${config.ipCamera.path}`;
    proxy({
        url: url,
        verbose: true,
        transport: 'tcp',
        additionalFlags: ['-q', '1']
    })(ws)
});

app.listen(config.port, () => console.log(`App listening on port ${config.port}!`));