let ui = require('cliui')();
let chalk = require('chalk');

let printCol=(cols,color='green')=>{
    ui.div(
      {
        text: cols[0],
        with: 20,
        padding: [0, 4, 0, 4]
      },
      {
        text: cols[1],
        with: 20
      },
      {
        text: chalk[color](cols[2]),
        align: 'right'
      }
    );
    console.log(ui.toString());
};

module.exports = {
    printCol,
    print(text,color){
        if(!color){
            console.log(text);
        }
        else{
            console.log(chalk[color](text));
        }
    }
};