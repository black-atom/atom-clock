const { gerar, hex2str, String2Hex } = require('./parse');
const net = require('net');

const ip = "192.168.0.194";
const port = 3000;
const nsrInicio = 0;
const mensagem = "00+RR+00+N]1]";

const downloadAFD = (ip, msg, nsr) => {
    const mensagemParser = msg;
    const mesagem = gerar(mensagemParser).split(' ').join('');
    const hex2String = mesagem
    
    console.log(hex2String);
}

downloadAFD(ip, mensagem, nsrInicio)