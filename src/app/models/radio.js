const radios = require('./schema/radio.js');

var Radio = function(modelo){};

Radio.getRadios = function(result){

    radios.aggregate([{$group :{_id : "$radiobasedsc",rows: {  $push: "$$ROOT" }}}]).allowDiskUse(true).exec(function (err,res) {
        if(err) {
            console.log("hay un error"+err);
            result(true, null);
        }else{
            console.log(res);
            result(false,res);
        }
    });

}
Radio.insertExcel = function(data,result){
    var objetoInsert = {};
    objetoInsert.radiobasedsc = data[0];
    objetoInsert.fecha = data[1];
    objetoInsert.region = data[2];
    objetoInsert.trafico = data[3];
    
    radios.insertMany(objetoInsert).then((data)=>{
        console.log("se inserto");
        console.log(data);
        result(null,data);
    }).catch((err)=> {
        result(true,err);
    });
}

module.exports = Radio;
