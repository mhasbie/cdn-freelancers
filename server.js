const express = require('express');

const app = express();

app.use(express.static('./dist/cdn-demo'));
app.get('/*', function(req, res) {
	res.sendFile('index.html', {root: 'dist/cdn-demo/'});
});
app.listen(process.env.PORT || 8080);