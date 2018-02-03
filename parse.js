
const gerar = (value) => {
    
    if(value) {
        const ByteInicial = "02 ";
        const TamanhoMensagem = gerarTamanhoString(value);
        const Mensagem = stringParaHex(value);
        const CheckSun = gerarCheckSum(value);
        const ByteFinal = " 03";
        return ByteInicial + TamanhoMensagem + Mensagem + CheckSun + ByteFinal;
    } else
        return false;
}


const dec2hexString = (dec) => {
    return '0x' + (dec+0x10000).toString(16).substr(-4).toUpperCase();
 }

function gerarTamanhoString(value) {
    const TamanhoString = value.length; 
    let Hex1 = TamanhoString % 256;
    let Hex16 = TamanhoString / 256;
    
    Hex1 = dec2hexString(Hex1);
    if(Hex1.length === 1) 
        Hex1 = "0"+Hex1;
    
    Hex16 = dec2hexString(Hex16);
    if(Hex16.length === 1) 
        Hex16 = "0"+Hex16;

    const result = Hex1+" "+Hex16;   

    return result;
}

function stringParaHex(value) {
 
    let Hex = "";
    let StringParser = [value];

    StringParser.forEach(Charactere => {
        return Hex += " "+dec2hexString(Charactere.charCode);
    });

    return Hex.toUpperCase();  
}

function gerarCheckSum(value) {

    let TamanhoString = value.length; 
    let Xor = "";
    const stringParse = [value];

    stringParse.forEach(Charactere => {
        // Xor ^= Charactere.charCode;
        // Xor ^= TamanhoString % 256;
        // Xor ^= TamanhoString / 256;

        Xor = Charactere.charCode;
        Xor = TamanhoString % 256;
        Xor = TamanhoString / 256;
    });   	
   
    
    let Hex1 = Xor % 16;
    let Hex16 = Xor / 16; 


    const result = " "+dec2hexString(Hex16) + dec2hexString(Hex1);
        
    return result.toUpperCase();
}

const hex2str = (hex) => {
    let str='';
    for (let i = 0; i < hex.length -1; i += 2){
        str += chr(hexdec(substr(hex, i, 2)));
    }
    return str;
}

const String2Hex = (value) => {
    let hex='';
    for (let i = 0; i < value.length; i++){
        hex += dec2hexString(value[i].charCode);
    }
    return hex;
}

module.exports = {
    gerar,
    hex2str,
    String2Hex
}