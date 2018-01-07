let sess;
const Nexmo = require('nexmo');
// Init Nexmo
const nexmo = new Nexmo({
    apiKey: 'f7e37b04',
    apiSecret: '60a6d48200f50365'
}, {debug:true
});


module.exports = function(app) {
// send sms
    app.get('/sms', (req, res) => {
        sess = req.session;
        if (sess.name) {
        res.render('sms',{
            title: 'send SMS',
            session: sess
        });
    }
else
    {
        res.render('login', {title: 'Login Page'});
    }
    });
//  catch sms submit
    app.post('/sms', (req, res) =>{
        //res.send(req.body);
        //console.log(req.body);
        const number = req.body.number;
        const text = req.body.text;

        nexmo.message.sendSms(
            'NEXMO' , number, text, { type: 'unicode'},
            (err, responseData) =>{
                if(err) {
                    console.log(err);
                } else {
                    console.log(responseData);
                    // Get data from response
                    const data = {
                        id: responseData.messages[0]['message-id'],
                        number: responseData.messages[0]['to']
                    }
                    // Emit to the client
                    let Io = req.app.get('io');
                    Io.emit('smsStatus', data);
                }
            }
        )

    });

};